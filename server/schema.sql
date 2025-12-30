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
);

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
    storage_provider TEXT DEFAULT 'r2',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS usage_tracking (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    month TEXT,
    standard_count INTEGER DEFAULT 0,
    premium_count INTEGER DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, month)
);
