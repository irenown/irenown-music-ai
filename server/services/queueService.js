import DatabaseService from './database.js';
import StorageService from './storageService.js';
import vocalEnhancement from './vocalEnhancement.js';
import audioAnalysis from './audioAnalysis.js';
import audioUtils from './audioUtils.js';
import elevenLabsApi from './elevenLabsApi.js';
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
        const { projectId, userId, username, vocalKey, vocalFilename, bpm, genre, name, tier, key, duration } = data;

        try {
            console.log(`[QueueWorker] Starting Job ${projectId} for ${username}`);

            // 1. Get raw vocal from R2
            const vocalObject = await this.storage.getFile(vocalKey);
            if (!vocalObject) throw new Error(`Vocal file not found: ${vocalKey}`);
            const vocalBuffer = await vocalObject.arrayBuffer();

            // 2. Silence Trimming & Enhancement
            const { buffer: trimmedVocal, offset: vocalOffset } = audioUtils.trimLeadingSilence(vocalBuffer);
            console.log(`[QueueWorker] Trimmed leading silence: ${vocalOffset}s`);

            // 3. Audio Analysis (BPM/Key detection)
            const analysis = await audioAnalysis.analyze(trimmedVocal);
            const finalBpm = bpm || analysis.bpm || 120;
            const finalKey = key || analysis.key || "C Major";

            // 4. Music Generation (Exclusively ElevenLabs)
            const finalDuration = duration || analysis.duration || 30;
            console.log(`Attempting AI Music Generation with ElevenLabs at ${finalBpm} BPM in ${finalKey} (Duration: ${finalDuration}s)`);

            try {
                instrumentalBuffer = await elevenLabsApi.generateMusic({
                    prompt: `melodic ${genre} instrumental, key of ${finalKey}, ${finalBpm} BPM, professional arrangement`,
                    duration: finalDuration
                }, this.env);
            } catch (genError) {
                console.error(`Music Generation Failed: ${genError.message}`);
                throw new Error(`Music Generation Failed: ${genError.message}`);
            }

            // 5. Mixing & Mastering (Cloudinary-based mixing)
            // Use the remaining start_offset detected in the analysis for fine-tuning
            const mixOffset = analysis.start_offset || 0;
            const mixedAudio = await audioProcessor.mixTracks(augmentedVocal, instrumentalBuffer, this.env, mixOffset);

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
