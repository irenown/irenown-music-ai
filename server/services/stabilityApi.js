import axios from 'axios';
import fs from 'fs';
import path from 'path';

/**
 * Service to interact with Stability AI (Stable Audio)
 */
class StabilityService {
    constructor() {
        this.apiKey = process.env.STABILITY_API_KEY;
        this.apiHost = 'https://api.stability.ai';
    }

    /**
     * Generates music based on a prompt
     * Stability Audio API Documentation: https://platform.stability.ai/docs/api-reference#tag/Audio
     */
    async generateMusic({ prompt, bpm, duration = 30 }) {
        if (!this.apiKey) {
            throw new Error('STABILITY_API_KEY is not configured');
        }

        try {
            const fullPrompt = `${prompt}, ${bpm} BPM, studio quality, professional instrumental, no vocals`;
            console.log(`Requesting music generation from Stability AI: "${fullPrompt}"`);

            const response = await axios.post(
                `${this.apiHost}/v2beta/stable-audio/text-to-audio`,
                {
                    prompt: fullPrompt,
                    output_format: "wav",
                    seconds_total: Math.min(duration, 45) // Free tier limit is often 45s
                },
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Accept': 'audio/wav'
                    },
                    responseType: 'arraybuffer'
                }
            );

            return Buffer.from(response.data);
        } catch (error) {
            const errorMessage = error.response?.data ?
                Buffer.from(error.response.data).toString() :
                error.message;
            console.error('Stability AI API Error:', errorMessage);
            throw new Error(`Stability AI generation failed: ${errorMessage}`);
        }
    }
}

export default new StabilityService();
