# iRenown AI - Edge API Suite (Cloudflare Workers)

This repository contains the core AI audio production services for the iRenown platform, now optimized for the Cloudflare edge. The project leverages Cloudflare Workers, D1 Database, R2 Storage, and Queues for a 100% cloud-hosted, high-performance backend.

## 🚀 Cloudflare Deployment

### 1. Prerequisites
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed.
- Cloudflare account with Workers Paid (required for Queues).
- API keys for integrated AI production services.

### 2. Setup & Deployment
1. **Initialize Database (D1)**:
   ```bash
   wrangler d1 create irenown-db
   # Update wrangler.toml with the generated database_id
   ```
2. **Apply Schema**:
   ```bash
   wrangler d1 execute irenown-db --file=./schema.sql 
   ```
3. **Configure Secrets**:
   ```bash
   wrangler secret put PRODUCTION_AI_KEY_1
   wrangler secret put PRODUCTION_AI_KEY_2
   wrangler secret put ASSET_MANAGER_ID
   wrangler secret put ASSET_MANAGER_KEY
   wrangler secret put ASSET_MANAGER_SECRET
   wrangler secret put IDENTITY_PROVIDER_ID
   ```
4. **Deploy**:
   ```bash
   wrangler deploy
   ```

## 🛰️ API Catalog

### Production Pipeline
- `POST /api/produce`: Queues a production job. (Requires `x-api-key`)
- `GET /api/jobs/:id`: Check status of a job.

### User Identity
- `POST /api/auth/register`: Synchronize user identity with iRenown.

## 🏛️ Edge Architecture
1. **Routing**: Powered by high-performance edge routing.
2. **Storage**: Edge-native cloud storage for all audio assets (uploads/output).
3. **Database**: Edge-native relational database for user profiles and project history.
4. **Processing**: Reliable background orchestration for production jobs.
5. **Services**: Direct integrations with proprietary AI generation and processing cores.

---
*Edge Migration completed on Dec 2025.*
