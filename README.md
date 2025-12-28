# iRenown AI - Backend API Suite

This repository contains the core AI audio production services for the iRenown platform. The project is focused on high-performance vocal processing, music generation, and master mixing using industry-standard tools (FFmpeg, ElevenLabs, Stability AI).

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- FFmpeg installed on your system PATH
- Redis (Required for Job Queue)
- API keys for ElevenLabs, Stability AI, and Stripe

### Installation
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your environment variables in `.env`.

## 🛰️ API Catalog

### Production Pipeline
- `POST /api/produce`: Queues a production job. Returns `jobId`.
- `GET /api/jobs/:id`: Check status/progress of a production job.

### Project Vault
- `GET /api/projects`: Fetch completed project history.
- `DELETE /api/projects/:id`: Remove a project from the vault.

### Payments & Credits
- `POST /api/payments/subscribe`: Create a Stripe checkout session for monthly tiers.
- `POST /api/payments/credits`: Purchase individual premium song credits.

## 🏛️ Architecture (The iRenown Pipeline)
1. **Studio Enhancement**: Advanced vocal cleaning and dynamics processing.
2. **Melodic Analysis**: Automatic Key/BPM detection for musical alignment.
3. **Dual-Tier Generation**: Stability AI (Silver) vs ElevenLabs Music (Gold/Platinum).
4. **Master Mixing**: Professional 320kbps MP3 final masters via FFmpeg `loudnorm`.
5. **Cloud Vault**: Automatic upload to S3/R2 with secure signed URL access.

---
*Enterprise Backend Alignment completed on Dec 2025.*
