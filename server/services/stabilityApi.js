/**
 * Service to interact with Stability AI (Stable Audio)
 * (Edge compatible)
 */
class StabilityService {
    /**
     * Generates music based on a prompt
     */
    async generateMusic({ prompt, bpm, duration = 30 }, env) {
        const apiKey = env.PRODUCTION_AI_KEY_2;
        if (!apiKey) {
            throw new Error('PRODUCTION_AI_KEY_2 is not configured');
        }

        const fullPrompt = `${prompt}, ${bpm} BPM, studio quality, professional instrumental, no vocals`;
        console.log(`Requesting music generation from Stability AI: "${fullPrompt}"`);

        const formData = new FormData();
        formData.append('prompt', fullPrompt);
        formData.append('seconds_total', Math.min(duration, 45).toString());

        const response = await fetch('https://api.stability.ai/v2beta/stable-audio/generate', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Accept': 'audio/wav',
            },
            body: formData
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Stability AI generation failed: ${error}`);
        }

        return await response.arrayBuffer();
    }
}

export default new StabilityService();
