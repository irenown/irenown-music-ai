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
    async checkUsageLimit(userId, tier) {
        const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"

        const usage = await this.db.prepare(`
            SELECT * FROM usage_tracking 
            WHERE user_id = ? AND month = ?
            `).bind(userId, currentMonth).first();

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

    async incrementUsage(userId, isPremium = false) {
        const currentMonth = new Date().toISOString().slice(0, 7);
        const column = isPremium ? 'premium_count' : 'standard_count';

        // D1 doesn't support ON CONFLICT(user_id, month) as easily if they aren't unique keys, 
        // but the table definition in the original init() had UNIQUE(user_id, month).
        // Let's use an UPSERT style query compatible with D1 (SQLite 3.3x+).
        return await this.db.prepare(`
            INSERT INTO usage_tracking(user_id, month, ${column}) 
            VALUES(?, ?, 1)
            ON CONFLICT(user_id, month) DO UPDATE SET 
                ${column} = ${column} + 1,
            updated_at = CURRENT_TIMESTAMP
                `).bind(userId, currentMonth).run();
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
                INSERT INTO users(id, username, email, password_hash, api_key, tier, stripe_customer_id, subscription_id, subscription_status, premium_credits, created_at)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `).bind(
                newId,
                `${user.username}${tempSuffix}`,
                user.email ? `${user.email}${tempSuffix}` : null, // append to email if exists 
                user.password_hash,
                `${user.api_key}${tempSuffix}`,
                user.tier,
                user.stripe_customer_id, user.subscription_id, user.subscription_status, user.premium_credits, user.created_at
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
