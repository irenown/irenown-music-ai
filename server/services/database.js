import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the db directory exists
const dbPath = path.join(__dirname, '..', '..', 'db', 'irenown.db');

class DatabaseService {
    constructor() {
        this.db = new Database(dbPath, { verbose: console.log });
        this.init();
    }

    init() {
        // Users Table
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE,
                password_hash TEXT,
                api_key TEXT UNIQUE NOT NULL,
                tier TEXT DEFAULT 'silver',
                stripe_customer_id TEXT,
                subscription_id TEXT,
                subscription_status TEXT,
                premium_credits INTEGER DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Projects Table
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS projects (
                id TEXT PRIMARY KEY,
                user_id TEXT,
                name TEXT NOT NULL,
                genre TEXT,
                bpm INTEGER,
                mix_url TEXT,
                instrumental_url TEXT,
                vocal_url TEXT,
                status TEXT DEFAULT 'completed',
                quality TEXT DEFAULT 'standard',
                storage_provider TEXT DEFAULT 'local',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )
        `);

        // Usage Tracking Table
        this.db.exec(`
            CREATE TABLE IF NOT EXISTS usage_tracking (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT,
                month TEXT,
                standard_count INTEGER DEFAULT 0,
                premium_count INTEGER DEFAULT 0,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(user_id, month)
            )
        `);

        // Seed default user if not exists for MVP
        const seedUser = this.db.prepare('SELECT id FROM users WHERE username = ?').get('irenown_admin');
        if (!seedUser) {
            this.prepare('INSERT INTO users (id, username, api_key, tier) VALUES (?, ?, ?, ?)')
                .run('user_admin_01', 'irenown_admin', 'irenown_dev_key_2025', 'platinum');

            // Also seed the demo user
            const demoPassHash = bcrypt.hashSync('demo123', 10);
            this.prepare('INSERT INTO users (id, username, email, password_hash, api_key, tier) VALUES (?, ?, ?, ?, ?, ?)')
                .run('user_demo_01', 'Demo User', 'demo@irenown.com', demoPassHash, 'irenown_demo_key_2025', 'gold');

            console.log('✅ Default production and demo users seeded.');
        }
    }

    // Generic Methods
    prepare(sql) {
        return this.db.prepare(sql);
    }

    transaction(fn) {
        return this.db.transaction(fn);
    }

    // Project Logic
    saveProject(project) {
        const stmt = this.db.prepare(`
            INSERT INTO projects (id, user_id, name, genre, bpm, mix_url, instrumental_url, vocal_url)
            VALUES (@id, @user_id, @name, @genre, @bpm, @mix_url, @instrumental_url, @vocal_url)
        `);
        return stmt.run(project);
    }

    getUserProjects(userId) {
        return this.db.prepare('SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC').all(userId);
    }

    getProjectById(projectId) {
        return this.db.prepare('SELECT * FROM projects WHERE id = ?').get(projectId);
    }

    deleteProject(projectId) {
        return this.db.prepare('DELETE FROM projects WHERE id = ?').run(projectId);
    }

    // Usage Tracking Logic
    async checkUsageLimit(userId, tier) {
        const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"

        const usage = this.db.prepare(`
            SELECT * FROM usage_tracking 
            WHERE user_id = ? AND month = ?
        `).get(userId, currentMonth);

        const limits = {
            silver: 20,
            gold: 50,
            platinum: 100
        };

        const limit = limits[tier] || 0;
        const used = usage ? usage.standard_count : 0;

        return {
            used,
            limit,
            remaining: limit - used,
            canGenerate: used < limit
        };
    }

    incrementUsage(userId, isPremium = false) {
        const currentMonth = new Date().toISOString().slice(0, 7);
        const column = isPremium ? 'premium_count' : 'standard_count';

        return this.db.prepare(`
            INSERT INTO usage_tracking (user_id, month, ${column}) 
            VALUES (?, ?, 1)
            ON CONFLICT(user_id, month) DO UPDATE SET 
                ${column} = ${column} + 1,
                updated_at = CURRENT_TIMESTAMP
        `).run(userId, currentMonth);
    }

    // Auth Logic
    getUserByApiKey(apiKey) {
        return this.db.prepare('SELECT * FROM users WHERE api_key = ?').get(apiKey);
    }

    getUserByEmail(email) {
        return this.db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    }

    getUserById(userId) {
        return this.db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    }

    createUser(user) {
        const stmt = this.db.prepare(`
            INSERT INTO users (id, username, email, password_hash, api_key, tier)
            VALUES (@id, @username, @email, @password_hash, @api_key, @tier)
        `);
        return stmt.run(user);
    }
}

export default new DatabaseService();
