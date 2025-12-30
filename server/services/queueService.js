import DatabaseService from './database.js';
import StorageService from './storageService.js';
import vocalEnhancement from './vocalEnhancement.js';
import audioAnalysis from './audioAnalysis.js';
import elevenLabsApi from './elevenLabsApi.js';
import stabilityApi from './stabilityApi.js';
import audioProcessor from './audioProcessor.js';

/**
 * Service to manage the production job queue on Cloudflare
 */
class QueueService {
    constructor(env) {
        this.env = env;
        this.db = new DatabaseService(env.DB);
        this.storage = new StorageService(env.BUCKET);
    }

    /**
     * Entry point for processing a job from the queue
     */
    async processJob(data) {
        const { projectId, userId, username, vocalKey, vocalFilename, bpm, genre, name, tier } = data;

        try {
            console.log(`[QueueWorker] Starting Job ${projectId} for ${username}`);

            // 1. Get raw vocal from R2
            const vocalObject = await this.storage.getFile(vocalKey);
            if (!vocalObject) throw new Error(`Vocal file not found: ${vocalKey}`);
            const vocalBuffer = await vocalObject.arrayBuffer();

            // 2. Vocal Enhancement (Using Auphonic/ElevenLabs - now Buffer-based)
            const augmentedVocal = await vocalEnhancement.enhance(vocalBuffer, this.env);

            // 3. Audio Analysis (BPM/Key detection)
            // Use original buffer for analysis to avoid format issues (ElevenLabs returns MP3, node-wav needs WAV)
            const analysis = await audioAnalysis.analyze(vocalBuffer);
            const finalBpm = bpm || analysis.bpm;

            // 4. Music Generation
            // TEMPORARY FIX: Use ElevenLabs for all tiers until Stability AI endpoint is resolved
            console.log(`Generating music with ElevenLabs (tier: ${tier})`);
            instrumentalBuffer = await elevenLabsApi.generateMusic({
                prompt: `melodic ${genre} instrumental, key of ${analysis.key}, ${finalBpm} BPM`,
                duration: analysis.duration
            }, this.env);

            /* DISABLED UNTIL STABILITY AI ENDPOINT IS FIXED
            let instrumentalBuffer;
            const isPremium = (tier === 'platinum' || tier === 'gold');

            if (isPremium) {
                instrumentalBuffer = await elevenLabsApi.generateMusic({
                    prompt: `melodic ${genre} instrumental, key of ${analysis.key}, ${finalBpm} BPM`,
                    duration: analysis.duration
                }, this.env);
            } else {
                instrumentalBuffer = await stabilityApi.generateMusic({
                    prompt: `catchy melodic ${genre} instrumental arrangement`,
                    bpm: finalBpm,
                    duration: analysis.duration
                }, this.env);
            }
            */

            // 5. Mixing & Mastering (Cloudinary-based mixing)
            const mixedAudio = await audioProcessor.mixTracks(augmentedVocal, instrumentalBuffer, this.env);

            // 6. Save results to R2
            const mixKey = `output/${projectId}.mp3`;
            await this.storage.uploadFile(mixedAudio, mixKey, 'audio/mpeg');

            const instKey = `instrumentals/${projectId}.wav`;
            await this.storage.uploadFile(instrumentalBuffer, instKey, 'audio/wav');

            // 7. Update DB
            const projectData = {
                id: projectId,
                user_id: userId,
                name: name,
                genre: genre,
                bpm: parseInt(finalBpm),
                mix_url: await this.storage.getSignedUrl(mixKey),
                instrumental_url: await this.storage.getSignedUrl(instKey),
                vocal_url: await this.storage.getSignedUrl(vocalKey),
                quality: isPremium ? 'premium' : 'standard',
                status: 'completed',
                storage_provider: 'r2'
            };

            await this.db.saveProject(projectData);
            await this.db.incrementUsage(userId, isPremium);

            console.log(`[QueueWorker] Job ${projectId} Successful!`);
            return projectData;

        } catch (error) {
            console.error(`[QueueWorker] Job ${projectId} Failed:`, error.message);

            // Mark as failed in DB
            await this.env.DB.prepare('UPDATE projects SET status = ? WHERE id = ?')
                .bind('failed', projectId).run();

            throw error; // Re-throw to allow Cloudflare Queue to handle retries
        }
    }
}

export default QueueService;
