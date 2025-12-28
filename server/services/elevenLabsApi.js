import { ElevenLabsClient } from 'elevenlabs';
import fs from 'fs';
import path from 'path';

/**
 * Service to interact with ElevenLabs API for vocal cleaning and enhancement
 */
class ElevenLabsService {
    constructor() {
        this.client = null;
    }

    getClient() {
        if (!this.client) {
            if (!process.env.ELEVENLABS_API_KEY) {
                throw new Error('ELEVENLABS_API_KEY is not configured');
            }
            this.client = new ElevenLabsClient({
                apiKey: process.env.ELEVENLABS_API_KEY,
            });
        }
        return this.client;
    }

    /**
     * Cleans/Isolates vocals from an audio file
     * @param {string} filePath - Path to the local audio file
     * @returns {Promise<Buffer>} - Processed audio buffer
     */
    async isolateVoice(filePath) {
        try {
            console.log(`Sending file to ElevenLabs for voice isolation: ${filePath}`);

            const client = this.getClient();

            // Note: ElevenLabs SDK documentation suggests 'audioIsolation.isolate'
            // for the voice isolation feature.
            const audioStream = await client.audioIsolation.isolate({
                audio: fs.createReadStream(filePath),
            });

            // Convert stream to buffer
            const chunks = [];
            for await (const chunk of audioStream) {
                chunks.push(chunk);
            }
            return Buffer.concat(chunks);
        } catch (error) {
            console.error('ElevenLabs Audio Isolation Error:', error);
            throw error;
        }
    }

    /**
     * Enhances vocals by re-synthesizing for clarity (Speech-to-Speech)
     * @param {string} filePath - Path to the local audio file
     * @param {string} voiceId - ID of the target voice (optional)
     * @returns {Promise<Buffer>} - Processed audio buffer
     */
    async enhanceVoice(filePath, voiceId = 'pMsSEx9DpwtOf9uBxSrl') { // Default to a clean voice
        try {
            console.log(`Sending file to ElevenLabs for speech-to-speech enhancement: ${filePath}`);

            const client = this.getClient();

            const audioStream = await client.speechToSpeech.convert(voiceId, {
                audio: fs.createReadStream(filePath),
                model_id: 'eleven_multilingual_sts_v2',
            });

            const chunks = [];
            for await (const chunk of audioStream) {
                chunks.push(chunk);
            }
            return Buffer.concat(chunks);
        } catch (error) {
            console.error('ElevenLabs Speech-to-Speech Error:', error);
        }
    }

    /**
     * Generates music using ElevenLabs Music (Premium)
     * @param {Object} params - Generation parameters (prompt, duration)
     * @returns {Promise<Buffer>} - Generated audio buffer
     */
    async generateMusic(params) {
        try {
            console.log(`Generating Music with ElevenLabs: ${params.prompt}`);
            const client = this.getClient();

            // Note: ElevenLabs Music API usage via SDK
            const audioStream = await client.music.generate({
                text: params.prompt,
                duration: params.duration || 30
            });

            const chunks = [];
            for await (const chunk of audioStream) {
                chunks.push(chunk);
            }
            return Buffer.concat(chunks);
        } catch (error) {
            console.error('ElevenLabs Music Generation Error:', error);
            throw error;
        }
    }
}

export default new ElevenLabsService();
