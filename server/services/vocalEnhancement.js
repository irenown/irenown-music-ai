import elevenLabsApi from './elevenLabsApi.js';

/**
 * Service to enhance vocals (Edge compatible)
 */
class VocalEnhancementService {
    /**
     * Enhances a vocal track buffer
     * For Cloudflare, we'll use ElevenLabs Isolation as the primary enhancer
     */
    async enhance(vocalBuffer, env) {
        console.log(`Enhancing vocal buffer...`);

        try {
            // Primary: ElevenLabs Audio Isolation
            const enhanced = await elevenLabsApi.isolateVoice(vocalBuffer, env);
            console.log(`Vocal enhancement complete.`);
            return enhanced;

        } catch (error) {
            console.error('Vocal Enhancement Failed:', error.message);
            // Fallback: return original buffer if enhancement fails
            return vocalBuffer;
        }
    }
}

export default new VocalEnhancementService();
