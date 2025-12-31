/**
 * Service to handle Cloudflare D1 Database operations
 */
class DatabaseService {
    constructor(db) {
        this.db = db;
    }

    // Generic Methods
    prepare(sql) {
        return this.db.prepare(sql);
    }

    // Project Logic
    async saveProject(project) {
        return await this.db.prepare(`
            INSERT INTO projects (id, user_id, name, genre, bpm, mix_url, instrumental_url, vocal_url, quality, storage_provider, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                mix_url = excluded.mix_url,
                instrumental_url = excluded.instrumental_url,
                vocal_url = excluded.vocal_url,
                status = excluded.status,
                bpm = excluded.bpm,
                updated_at = CURRENT_TIMESTAMP
        `).bind(
            project.id || null,
            project.user_id || null,
            project.name || null,
            project.genre || null,
            project.bpm || null,
            project.mix_url || null,
            project.instrumental_url || null,
            project.vocal_url || null,
            project.quality || 'standard',
            project.storage_provider || 'r2',
            project.status || 'completed'
        ).run();
    }

    async updateProjectStatus(projectId, status) {
        return await this.db.prepare('UPDATE projects SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
            .bind(status, projectId).run();
    }

    async getUserProjects(userId) {
        const { results } = await this.db.prepare('SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC').bind(userId).all();
        return results;
    }

    async getProjectById(projectId) {
        return await this.db.prepare('SELECT * FROM projects WHERE id = ?').bind(projectId).first();
    }

    async deleteProject(projectId) {
        return await this.db.prepare('DELETE FROM projects WHERE id = ?').bind(projectId).run();
    }

    // Usage Tracking Logic
    async checkUsageLimit(userId) {
        const user = await this.db.prepare('SELECT tier, premium_credits, has_used_trial FROM users WHERE id = ?').bind(userId).first();

        if (!user) return { canGenerate: false, reason: 'User not found' };

        // 1. Check persistent premium credits first
        if (user.premium_credits > 0) {
            return {
                used: 0,
                limit: user.premium_credits,
                remaining: user.premium_credits,
                canGenerate: true,
                isPremium: true
            };
        }

        // 2. Check one-time free trial (1 track)
        if (!user.has_used_trial) {
            return {
                used: 0,
                limit: 1,
                remaining: 1,
                canGenerate: true,
                isTrial: true
            };
        }

        return {
            used: 1,
            limit: 1,
            remaining: 0,
            canGenerate: false,
            reason: 'Credit limit reached. Please purchase more credits.'
        };
    }

    async incrementUsage(userId) {
        const user = await this.db.prepare('SELECT premium_credits, has_used_trial FROM users WHERE id = ?').bind(userId).first();

        if (!user) return;

        if (user.premium_credits > 0) {
            // Deduct from persistent credits
            return await this.db.prepare('UPDATE users SET premium_credits = premium_credits - 1 WHERE id = ?')
                .bind(userId).run();
        } else if (!user.has_used_trial) {
            // Mark trial as used
            return await this.db.prepare('UPDATE users SET has_used_trial = 1 WHERE id = ?')
                .bind(userId).run();
        }
    }

    // Auth Logic
    async getUserByApiKey(apiKey) {
        return await this.db.prepare('SELECT * FROM users WHERE api_key = ?').bind(apiKey).first();
    }

    async getUserByEmail(email) {
        return await this.db.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();
    }

    async getUserById(userId) {
        return await this.db.prepare('SELECT * FROM users WHERE id = ?').bind(userId).first();
    }

    async createUser(user) {
        return await this.db.prepare(`
            INSERT INTO users(id, username, email, password_hash, api_key, tier)
            VALUES(?, ?, ?, ?, ?, ?)
                `).bind(
            user.id || null,
            user.username || null,
            user.email || null,
            user.password_hash || null,
            user.api_key || null,
            user.tier || 'silver'
        ).run();
    }
    async updateUserId(oldId, newId) {
        const user = await this.getUserById(oldId);
        if (!user) return false;

        // Strategy to handle UNIQUE constraints on username, email, api_key:
        // 1. Create new user with temporary unique values
        // 2. Move child records
        // 3. Delete old user (freeing up the unique values)
        // 4. Update new user to restore original values

        const tempSuffix = `_mig_${Date.now()}`;

        try {
            // 1. Insert new user (copy) with temp unique fields
            await this.db.prepare(`
                INSERT INTO users(id, username, email, password_hash, api_key, tier, stripe_customer_id, subscription_id, subscription_status, premium_credits, has_used_trial, created_at)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `).bind(
                newId,
                `${user.username}${tempSuffix}`,
                user.email ? `${user.email}${tempSuffix}` : null, // append to email if exists 
                user.password_hash,
                `${user.api_key}${tempSuffix}`,
                user.tier,
                user.stripe_customer_id, user.subscription_id, user.subscription_status, user.premium_credits, user.has_used_trial || 0, user.created_at
            ).run();

            // 2. Update child tables
            await this.db.prepare('UPDATE projects SET user_id = ? WHERE user_id = ?').bind(newId, oldId).run();
            await this.db.prepare('UPDATE usage_tracking SET user_id = ? WHERE user_id = ?').bind(newId, oldId).run();

            // 3. Delete old user
            await this.db.prepare('DELETE FROM users WHERE id = ?').bind(oldId).run();

            // 4. Restore original unique values
            await this.db.prepare(`
                UPDATE users 
                SET username = ?, email = ?, api_key = ?
            WHERE id = ?
                `).bind(user.username, user.email, user.api_key, newId).run();

            return true;
        } catch (error) {
            console.error('Migration failed:', error);
            // Verify if we need to rollback manually (delete newId if exists)
            // But strict rollback is hard. 
            throw error;
        }
    }

    async usernameExists(username) {
        const result = await this.db.prepare('SELECT 1 FROM users WHERE username = ?').bind(username).first();
        return !!result;
    }
}

export default DatabaseService;
