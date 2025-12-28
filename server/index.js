import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Services
import vocalEnhancement from './services/vocalEnhancement.js';
import queueService from './services/queueService.js';
import paymentService from './services/paymentService.js';
import db from './services/database.js';
import { validateApiKey, authenticateUser } from './middleware/auth.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// General API Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Production-Specific Rate Limiting
const productionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: { error: 'Hourly production limit exceeded.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', apiLimiter);

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(cors());
app.use(express.json());

// Static folders
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/output', express.static(path.join(__dirname, 'output')));

// Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Routes
app.get('/health', async (req, res) => {
  res.json({
    status: 'operational',
    timestamp: new Date().toISOString(),
    version: '1.5.0',
    services: {
      database: 'healthy',
      queue: 'healthy',
      storage: 'healthy'
    }
  });
});

// Auth & Identity Synchronization
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, firebaseId } = req.body;

    if (!email || !firebaseId) {
      return res.status(400).json({ error: 'Email and Firebase ID are required' });
    }

    let user = db.getUserById(firebaseId);
    if (!user) {
      const apiKey = `ir_${uuidv4().replace(/-/g, '')}`;
      db.createUser({
        id: firebaseId,
        username: username || email.split('@')[0],
        email,
        password_hash: null,
        api_key: apiKey,
        tier: 'silver'
      });
      user = db.getUserById(firebaseId);
    }

    res.status(201).json({
      message: 'Profile synchronized',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        tier: user.tier,
        api_key: user.api_key
      }
    });
  } catch (error) {
    console.error('Registration/Sync Error:', error);
    res.status(500).json({ error: 'Failed to sync user profile' });
  }
});

app.get('/api/auth/me', authenticateUser, async (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      tier: req.user.tier,
      api_key: req.user.api_key
    }
  });
});

// Dashboard Endpoints
app.get('/api/projects', authenticateUser, async (req, res) => {
  try {
    const projects = db.getUserProjects(req.user.id);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.get('/api/usage', authenticateUser, async (req, res) => {
  try {
    const usage = await db.checkUsageLimit(req.user.id, req.user.tier);
    res.json({
      ...usage,
      plan: req.user.tier,
      resetDate: '1st of next month'
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch usage' });
  }
});

// Payment Endpoints
app.post('/api/payments/create-checkout-session', authenticateUser, async (req, res) => {
  try {
    const { plan, type } = req.body;
    let session;

    if (type === 'subscription') {
      // priceId would usually be defined in a config or constants file
      const priceIds = {
        'creator': 'price_1Q_creator_placeholder',
        'pro': 'price_1Q_pro_placeholder',
        'platinum': 'price_1Q_platinum_placeholder'
      };
      session = await paymentService.createSubscriptionSession(req.user.id, priceIds[plan]);
    } else {
      const amount = req.body.amount || 1;
      session = await paymentService.createCreditSession(req.user.id, amount);
    }

    res.json({ url: session.url });
  } catch (error) {
    console.error('Payment Error:', error);
    res.status(500).json({ error: 'Failed to create payment session' });
  }
});

// Stripe Webhook (Raw body required)
app.post('/api/payments/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = paymentService.stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    await paymentService.handleWebhook(event);
    res.json({ received: true });
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

// Production Endpoints
app.get('/api/jobs/:id', authenticateUser, async (req, res) => {
  try {
    const job = await queueService.getJobStatus(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/produce', authenticateUser, productionLimiter, upload.single('vocal'), async (req, res) => {
  try {
    const { genre, name, bpm } = req.body;
    const vocalFile = req.file;

    if (!vocalFile) {
      return res.status(400).json({ error: 'Vocal file is required' });
    }

    const jobId = `${uuidv4()}`;
    const job = await queueService.addJob({
      projectId: jobId,
      userId: req.user.id,
      username: req.user.username,
      vocalFilePath: vocalFile.path,
      vocalFilename: vocalFile.filename,
      bpm: bpm ? parseInt(bpm) : null,
      genre: genre || 'pop',
      name: name || 'Untitled Project',
      tier: req.user.tier
    });

    res.status(202).json({
      message: 'Production started',
      jobId: job.id,
      statusUrl: `/api/jobs/${job.id}`
    });
  } catch (error) {
    console.error('Production Error:', error);
    res.status(500).json({ error: 'Failed to start production' });
  }
});

app.listen(PORT, () => {
  console.log(`\n🎹 iRenown AI Engine v1.5.0`);
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API Base: http://localhost:${PORT}/api\n`);
});
