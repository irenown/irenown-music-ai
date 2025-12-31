/**
 * Service to interact with ElevenLabs API for vocal cleaning and enhancement
 * (Edge compatible)
 */
class ElevenLabsService {
    /**
     * Cleans/Isolates vocals from an audio buffer
     * @param {ArrayBuffer} audioBuffer - Raw audio data
     * @param {Object} env - Cloudflare environment bindings
     * @returns {Promise<ArrayBuffer>} - Processed audio
     */
    async isolateVoice(audioBuffer, env) {
        const apiKey = env.PRODUCTION_AI_KEY_1;
        console.log(`Sending buffer to ElevenLabs for voice isolation`);

        const formData = new FormData();
        formData.append('audio', new Blob([audioBuffer]), 'vocal.wav');

        const response = await fetch('https://api.elevenlabs.io/v1/audio-isolation', {
            method: 'POST',
            headers: {
                'xi-api-key': apiKey
            },
            body: formData
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`ElevenLabs Isolation Failed: ${error}`);
        }

        return await response.arrayBuffer();
    }

    /**
     * Generates music using ElevenLabs Music (Premium)
     */
    async generateMusic(params, env) {
        const apiKey = env.PRODUCTION_AI_KEY_1;
        const variations = ["cinematic", "soulful", "high-energy", "lo-fi", "lush", "gritty", "sparkling", "driving", "ethereal", "pumping", "ambient", "funky", "stadium", "intimate"];
        const randomVar = variations[Math.floor(Math.random() * variations.length)];
        const entropy = Math.random().toString(36).substring(7);
        const fullPrompt = `${randomVar} ${params.prompt} [${entropy}], professional arrangement, high-fidelity`;

        console.log(`Generating Music with ElevenLabs: ${fullPrompt}`);

        const response = await fetch('https://api.elevenlabs.io/v1/music', {
            method: 'POST',
            headers: {
                'xi-api-key': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: fullPrompt,
                music_length_ms: Math.floor((params.duration || 30) * 1000),
                model_id: 'music_v1'
            })
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`ElevenLabs Music Generation Failed: ${error}`);
        }

        return await response.arrayBuffer();
    }
}

export default new ElevenLabsService();
