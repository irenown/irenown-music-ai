import auphonicService from './auphonicService.js';
import path from 'path';

/**
 * Service to enhance vocals using Auphonic API
 * (Replacing local FFmpeg)
 */
class VocalEnhancementService {
    /**
     * Enhances a vocal track using Auphonic
     * @param {string} inputPath - Path to the raw vocal (local)
     * @param {string} outputPath - Path to save the enhanced vocal (local)
     * @returns {Promise<string>} - Path to the enhanced file
     */
    async enhance(inputPath, outputPath) {
        console.log(`Enhancing vocal via Auphonic: ${inputPath}`);

        try {
            await auphonicService.enhance(inputPath, outputPath);
            console.log(`Auphonic enhancement complete: ${outputPath}`);
            return outputPath;

        } catch (error) {
            console.error('Vocal Enhancement Failed:', error.message);
            throw error;
        }
    }
}

export default new VocalEnhancementService();
