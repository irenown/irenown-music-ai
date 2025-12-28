import Queue from 'bull';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Services
import elevenLabsApi from './elevenLabsApi.js';
import stabilityApi from './stabilityApi.js';
import audioProcessor from './audioProcessor.js';
import audioAnalysis from './audioAnalysis.js';
import vocalEnhancement from './vocalEnhancement.js';
import storageService from './storageService.js';
import notificationService from './notificationService.js';
import db from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Service to manage the production job queue
 */
class QueueService {
    constructor() {
        // Initialize the production queue (Requires Redis)
        this.productionQueue = new Queue('production', {
            redis: {
                host: process.env.REDIS_HOST || '127.0.0.1',
                port: process.env.REDIS_PORT || 6379,
            },
            defaultJobOptions: {
                attempts: 2,
                backoff: {
                    type: 'exponential',
                    delay: 5000
                }
            }
        });

        this.processJobs();
        this.handleJobEvents();
    }

    /**
     * Add a production job to the queue
     */
    async addJob(data) {
        const job = await this.productionQueue.add(data, {
            attempts: 3,
            backoff: 5000 // 5 seconds
        });
        return job;
    }

    /**
     * Get job status
     */
    async getJobStatus(jobId) {
        const job = await this.productionQueue.getJob(jobId);
        if (!job) return null;

        const state = await job.getState();
        const progress = job.progress();
        const result = job.returnvalue;
        const reason = job.failedReason;

        return { id: job.id, state, progress, result, reason };
    }

    /**
     * Listen for queue events
     */
    handleJobEvents() {
        this.productionQueue.on('failed', async (job, err) => {
            console.error(`[Worker] Job ${job.id} definitively failed after ${job.attemptsMade} attempts: ${err.message}`);

            // Update project status to failed in DB
            try {
                db.prepare('UPDATE projects SET status = ? WHERE id = ?')
                    .run('failed', job.data.projectId);

                // Refund credits if it was a premium job
                const isPremium = (job.data.tier === 'platinum' || job.data.tier === 'gold');
                if (isPremium) {
                    console.log(`[Worker] Refunding premium credit for failed job ${job.id}`);
                    db.prepare('UPDATE users SET premium_credits = premium_credits + 1 WHERE id = ?')
                        .run(job.data.userId);
                }

                // Notify user of failure
                await notificationService.notifyJobFailed(job.data.userId, job.data, err.message);
            } catch (dbErr) {
                console.error('[Worker] Failed to update failure status in DB:', dbErr.message);
            }
        });

        this.productionQueue.on('completed', async (job, result) => {
            console.log(`[Worker] Job ${job.id} completed successfully.`);
            // Update status to completed (already default but good for safety)
            db.prepare('UPDATE projects SET status = ? WHERE id = ?')
                .run('completed', job.data.projectId);

            // Notify user of completion
            await notificationService.notifyJobComplete(job.data.userId, job.data);
        });
    }

    /**
     * Background worker process
     */
    processJobs() {
        this.productionQueue.process(async (job) => {
            const { projectId, userId, username, vocalFilePath, vocalFilename, bpm, genre, name, tier } = job.data;
            const outputDir = path.join(__dirname, '..', 'output');
            const uploadDir = path.join(__dirname, '..', 'uploads');

            try {
                console.log(`[Worker] Starting Job ${job.id} for ${username}: ${projectId}`);

                // 1. Vocal Enhancement (25%)
                job.progress(25);
                const enhancedVocalPath = path.join(uploadDir, `enhanced_${vocalFilename}`);
                await vocalEnhancement.enhance(vocalFilePath, enhancedVocalPath);

                // 2. Audio Analysis (50%)
                job.progress(50);
                const analysis = await audioAnalysis.analyze(enhancedVocalPath);
                const finalBpm = bpm || analysis.bpm;

                // 3. Music Generation (75%)
                job.progress(75);
                let instrumentalBuffer;
                const isPremium = (tier === 'platinum' || tier === 'gold');

                if (isPremium) {
                    const musicPrompt = `melodic ${genre} instrumental, key of ${analysis.key}, ${finalBpm} BPM, professional master`;
                    instrumentalBuffer = await elevenLabsApi.generateMusic({
                        prompt: musicPrompt,
                        duration: analysis.duration
                    });
                } else {
                    const musicPrompt = `catchy melodic ${genre} instrumental arrangement, professional studio production`;
                    instrumentalBuffer = await stabilityApi.generateMusic({
                        prompt: musicPrompt,
                        bpm: finalBpm,
                        duration: analysis.duration
                    });
                }

                if (!instrumentalBuffer) throw new Error('Music generation failed - No audio returned');

                const instrumentalPath = path.join(uploadDir, `inst_${projectId}.wav`);
                fs.writeFileSync(instrumentalPath, instrumentalBuffer);

                // 4. Mixing & Mastering (90%)
                job.progress(90);
                const mixedOutputPath = path.join(outputDir, `irenown_mix_${projectId}.mp3`);
                await audioProcessor.mixTracks(enhancedVocalPath, instrumentalPath, mixedOutputPath);

                // 5. Cloud Upload (95%)
                job.progress(95);
                const mixKey = `output/${projectId}.mp3`;
                await storageService.uploadFile(mixedOutputPath, mixKey, 'audio/mpeg');

                const instKey = `instrumentals/${projectId}.wav`;
                await storageService.uploadFile(instrumentalPath, instKey, 'audio/wav');

                const vocalKey = `enhanced/${vocalFilename}`;
                await storageService.uploadFile(enhancedVocalPath, vocalKey, 'audio/wav');

                // 6. Finalize & Save
                const projectData = {
                    id: projectId,
                    user_id: userId,
                    name: name,
                    genre: genre,
                    bpm: parseInt(finalBpm),
                    mix_url: await storageService.getSignedUrl(mixKey),
                    instrumental_url: await storageService.getSignedUrl(instKey),
                    vocal_url: await storageService.getSignedUrl(vocalKey),
                    quality: isPremium ? 'premium' : 'standard',
                    storage_provider: process.env.STORAGE_ACCESS_KEY ? 's3' : 'local'
                };

                db.saveProject(projectData);
                db.incrementUsage(userId, isPremium);

                console.log(`[Worker] Job ${job.id} Successful!`);
                job.progress(100);

                return projectData;

            } catch (error) {
                console.error(`[Worker] Job ${job.id} Failed:`, error.message);
                throw error;
            }
        });
    }
}

export default new QueueService();
