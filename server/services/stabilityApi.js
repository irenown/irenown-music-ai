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

        const response = await fetch('https://api.stability.ai/v2beta/audio/stable-audio-2/text-to-audio', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Accept': 'audio/mpeg'
            },
            body: Buffer.from(JSON.stringify({
                prompt: fullPrompt,
                seconds_total: Math.min(duration, 47)
            }))
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Stability AI generation failed: ${response.status} ${error}`);
        }

        return await response.arrayBuffer();
    }
}

export default new StabilityService();
