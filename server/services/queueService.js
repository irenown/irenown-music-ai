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
            // TEMPORARY WORKAROUND: Generate silent instrumental until API endpoints are fixed
            console.log(`[TEMP] Generating silent instrumental track (${analysis.duration}s)`);

            // Create a silent WAV file (44.1kHz, 16-bit, mono)
            const sampleRate = 44100;
            const numSamples = Math.floor(analysis.duration * sampleRate);
            const wavHeader = this.createWavHeader(numSamples, sampleRate);
            const silentSamples = new Uint8Array(numSamples * 2); // 16-bit = 2 bytes per sample

            const instrumentalBuffer = new Uint8Array(wavHeader.length + silentSamples.length);
            instrumentalBuffer.set(wavHeader, 0);
            instrumentalBuffer.set(silentSamples, wavHeader.length);

            // 5. Mixing & Mastering (Cloudinary-based mixing)
            const mixedAudio = await audioProcessor.mixTracks(augmentedVocal, instrumentalBuffer, this.env);

            // 6. Save results to R2
            const mixKey = `output/${projectId}.mp3`;
            await this.storage.uploadFile(mixedAudio, mixKey, 'audio/mpeg');

            const instKey = `instrumentals/${projectId}.wav`;
            await this.storage.uploadFile(instrumentalBuffer, instKey, 'audio/wav');

            // 7. Update DB
            const isPremium = (tier === 'platinum' || tier === 'gold');
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
}

export default QueueService;
