import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { v4 as uuidv4 } from 'uuid';

// Services (Classes now, need instantiation with env)
import DatabaseService from './services/database.js';
import StorageService from './services/storageService.js';
import VocalEnhancementService from './services/vocalEnhancement.js';
import QueueService from './services/queueService.js';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors());

// Routes
app.get('/health', (c) => {
  return c.json({
    status: 'operational',
    timestamp: new Date().toISOString(),
    version: '2.0.0-edge',
    platform: 'Cloudflare Workers'
  });
});

// Auth & Identity Synchronization
app.post('/api/auth/register', async (c) => {
  const db = new DatabaseService(c.env.DB);
  try {
    const { username, email, firebaseId } = await c.req.json();

    if (!email || !firebaseId) {
      return c.json({ error: 'Email and Firebase ID are required' }, 400);
    }

    // 1. Check if user exists by Firebase ID
    let user = await db.getUserById(firebaseId);

    if (user) {
      // User already exists with this ID, return them
      return c.json({
        message: 'Profile synchronized',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          tier: user.tier,
          api_key: user.api_key
        }
      }, 200);
    }

    // 2. Check if user exists by Email (but different ID - likely re-installation or dev test)
    user = await db.getUserByEmail(email);

    if (user) {
      console.log(`Migrating user ${user.id} to new ID ${firebaseId}`);
      // Migrate the old user to the new Firebase ID
      await db.updateUserId(user.id, firebaseId);
      // Re-fetch user with new ID to get updated object if needed (or just use old object with new ID)
      user = await db.getUserById(firebaseId);
    } else {
      // 3. New User - Handle Username Uniqueness
      let finalUsername = username || email.split('@')[0];
      const baseUsername = finalUsername;
      let counter = 1;

      while (await db.usernameExists(finalUsername)) {
        finalUsername = `${baseUsername}${Math.floor(Math.random() * 1000)}`;
        counter++;
        if (counter > 10) break; // Safety break
      }

      const apiKey = `ir_${uuidv4().replace(/-/g, '')}`;
      await db.createUser({
        id: firebaseId,
        username: finalUsername,
        email,
        api_key: apiKey,
        tier: 'silver'
      });
      user = await db.getUserById(firebaseId);
    }

    return c.json({
      message: 'Profile synchronized',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        tier: user.tier,
        api_key: user.api_key
      }
    }, 201);
  } catch (error) {
    console.error('Registration/Sync Error:', error);
    return c.json({ error: 'Failed to sync user profile: ' + error.message }, 500);
  }
});

// Dashboard Endpoints
app.get('/api/projects', async (c) => {
  const db = new DatabaseService(c.env.DB);
  const apiKey = c.req.header('x-api-key');
  const user = await db.getUserByApiKey(apiKey);

  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const projects = await db.getUserProjects(user.id);
    return c.json(projects);
  } catch (error) {
    return c.json({ error: 'Failed to fetch projects' }, 500);
  }
});

// Debug Endpoint to test production synchronously
app.post('/api/debug-produce', async (c) => {
  try {
    const db = new DatabaseService(c.env.DB);
    const storage = new StorageService(c.env.BUCKET);
    const apiKey = c.req.header('x-api-key');

    // Bypass auth for local debugging if needed, or use a known key
    // For now, allow test with hardcoded or existing user
    let user = await db.getUserByApiKey(apiKey);
    if (!user) {
      // Fallback for testing ease - try to find *any* user
      const result = await c.env.DB.prepare('SELECT * FROM users LIMIT 1').first();
      if (result) user = result;
      else return c.json({ error: 'No users found for debug' }, 401);
    }

    const formData = await c.req.formData();
    const vocalFile = formData.get('vocal');
    const genre = formData.get('genre') || 'pop';
    const name = formData.get('name') || 'Debug Project';
    const bpm = formData.get('bpm');

    if (!vocalFile) return c.json({ error: 'Vocal file required' }, 400);

    const jobId = 'debug-' + uuidv4();
    const vocalKey = `projects/${user.id}/${jobId}/vocal`;

    // 1. Create project skeleton
    await db.saveProject({
      id: jobId,
      user_id: user.id,
      name,
      genre,
      bpm: bpm ? parseInt(bpm) : null,
      vocal_url: vocalKey,
      status: 'processing',
      quality: 'standard'
    });

    // 2. Upload raw
    await storage.uploadFile(await vocalFile.arrayBuffer(), vocalKey, vocalFile.type);

    // 3. Process Synchronously
    const queueService = new QueueService(c.env);
    console.log('Starting synchronous debug job...');

    try {
      const result = await queueService.processJob({
        projectId: jobId,
        userId: user.id,
        username: user.username,
        vocalKey,
        vocalFilename: vocalFile.name,
        bpm: bpm ? parseInt(bpm) : null,
        genre,
        name,
        tier: user.tier
      });
      return c.json({ status: 'success', result });
    } catch (processError) {
      // Return full stack trace
      return c.json({
        status: 'failed',
        error: processError.message,
        stack: processError.stack
      }, 500);
    }

  } catch (error) {
    return c.json({ error: error.message, stack: error.stack }, 500);
  }
});

// Production Endpoints
app.post('/api/produce', async (c) => {
  try {
    const db = new DatabaseService(c.env.DB);
    const storage = new StorageService(c.env.BUCKET);
    const apiKey = c.req.header('x-api-key');
    const user = await db.getUserByApiKey(apiKey);

    if (!user) return c.json({ error: 'Unauthorized' }, 401);

    const formData = await c.req.formData();
    const vocalFile = formData.get('vocal');
    const genre = formData.get('genre') || 'pop';
    const name = formData.get('name') || 'Untitled Project';
    const bpm = formData.get('bpm');

    if (!vocalFile) {
      return c.json({ error: 'Vocal file is required' }, 400);
    }

    const jobId = uuidv4();
    const vocalKey = `projects/${user.id}/${jobId}/vocal`;

    // 1. Create project skeleton in D1
    await db.saveProject({
      id: jobId,
      user_id: user.id,
      name,
      genre,
      bpm: bpm ? parseInt(bpm) : null,
      vocal_url: vocalKey, // Temporary reference
      status: 'processing',
      quality: user.tier === 'platinum' || user.tier === 'gold' ? 'premium' : 'standard'
    });

    // 2. Upload raw vocal to R2
    await storage.uploadFile(await vocalFile.arrayBuffer(), vocalKey, vocalFile.type);

    // 3. Process the job in background (without Queue binding)
    const queueService = new QueueService(c.env);

    // Use waitUntil to process in background after response
    c.executionCtx.waitUntil(async function () {
      try {
        await queueService.processJob({
          projectId: jobId,
          userId: user.id,
          username: user.username,
          vocalKey,
          vocalFilename: vocalFile.name,
          bpm: bpm ? parseInt(bpm) : null,
          genre,
          name,
          tier: user.tier
        });
      } catch (err) {
        console.error('Background Job Failed:', err);
      }
    }());

    return c.json({
      message: 'Production started',
      jobId,
      statusUrl: `/api/jobs/${jobId}`
    }, 202);
  } catch (error) {
    console.error('Production Error:', error);
    return c.json({ error: 'Failed to start production: ' + error.message }, 500);
  }
});

// Storage Proxy (to serve R2 files)
app.get('/api/storage/:key', async (c) => {
  const storage = new StorageService(c.env.BUCKET);
  const key = c.req.param('key');

  if (!key) return c.json({ error: 'Key required' }, 400);

  const object = await storage.getFile(key);
  if (!object) return c.json({ error: 'File not found' }, 404);

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);

  return new Response(object.body, {
    headers,
  });
});

// User Usage & Billing
app.get('/api/user/usage', async (c) => {
  const db = new DatabaseService(c.env.DB);
  const apiKey = c.req.header('x-api-key');
  const user = await db.getUserByApiKey(apiKey);

  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  try {
    const usage = await db.checkUsageLimit(user.id, user.tier);
    return c.json({
      tier: user.tier,
      usage
    });
  } catch (error) {
    console.error('Usage Fetch Error:', error);
    return c.json({ error: 'Failed to fetch usage' }, 500);
  }
});

app.get('/api/user/invoices', async (c) => {
  const db = new DatabaseService(c.env.DB);
  const apiKey = c.req.header('x-api-key');
  const user = await db.getUserByApiKey(apiKey);

  if (!user) return c.json({ error: 'Unauthorized' }, 401);

  // Since Stripe is not connected, return empty list or local invoice records if we had a table
  // For now, we'll return an empty list to prove it's "real" (no fake data)
  return c.json([]);
});

app.get('/api/jobs/:id', async (c) => {
  const db = new DatabaseService(c.env.DB);
  const jobId = c.req.param('id');

  try {
    const project = await db.getProjectById(jobId);
    if (!project) return c.json({ error: 'Job not found' }, 404);

    // Calculate progress based on status for the UI
    let progress = 0;
    switch (project.status) {
      case 'processing': progress = 45; break;
      case 'completed': progress = 100; break;
      case 'failed': progress = 0; break;
      default: progress = 10;
    }

    return c.json({
      id: project.id,
      state: project.status, // processing, completed, failed
      progress: progress,
      result: project.status === 'completed' ? project : null
    });
  } catch (error) {
    return c.json({ error: 'Failed to fetch job status' }, 500);
  }
});

// Cloudflare Worker Export
export default {
  fetch: app.fetch,

};
