/**
 * Service to analyze audio files for key, BPM, and duration
 * (Edge compatible - simplified version without node-wav/music-tempo)
 */
class AudioAnalysisService {
    /**
     * Analyzes an audio buffer
     * @param {ArrayBuffer|Buffer} buffer - Raw audio data (WAV format)
     * @returns {Promise<Object>} - Analysis results
     */
    async analyze(buffer) {
        try {
            console.log(`Analyzing audio buffer (edge-compatible mode)...`);

            // Convert to Uint8Array for parsing
            const data = new Uint8Array(buffer);

            // Parse WAV header to get duration
            const duration = this.parseWavDuration(data);

            // Return default values for BPM and key (edge runtime limitation)
            // In production, these would come from user input or external API
            return {
                bpm: 120, // Default BPM
                key: "C Major", // Default key
                duration: parseFloat(duration.toFixed(2)),
                confidence: 0.5 // Indicate this is estimated
            };
        } catch (error) {
            console.error('Audio Analysis Error:', error);
            // Return safe defaults if analysis fails
            return {
                bpm: 120,
                key: "C Major",
                duration: 30,
                confidence: 0.3
            };
        }
    }

    /**
     * Parse WAV file header to extract duration
     */
    parseWavDuration(data) {
        try {
            // Check for "RIFF" header
            if (data[0] !== 0x52 || data[1] !== 0x49 || data[2] !== 0x46 || data[3] !== 0x46) {
                throw new Error('Not a valid WAV file');
            }

            // Find "data" chunk
            let dataChunkPos = 36; // Standard position
            while (dataChunkPos < data.length - 8) {
                if (data[dataChunkPos] === 0x64 && data[dataChunkPos + 1] === 0x61 &&
                    data[dataChunkPos + 2] === 0x74 && data[dataChunkPos + 3] === 0x61) {
                    break;
                }
                dataChunkPos++;
            }

            // Get sample rate (bytes 24-27)
            const sampleRate = data[24] | (data[25] << 8) | (data[26] << 16) | (data[27] << 24);

            // Get data chunk size (bytes after "data")
            const dataSize = data[dataChunkPos + 4] | (data[dataChunkPos + 5] << 8) |
                (data[dataChunkPos + 6] << 16) | (data[dataChunkPos + 7] << 24);

            // Get bytes per sample (bytes 34-35)
            const bitsPerSample = data[34] | (data[35] << 8);
            const bytesPerSample = bitsPerSample / 8;

            // Get number of channels (bytes 22-23)
            const numChannels = data[22] | (data[23] << 8);

            // Calculate duration
            const numSamples = dataSize / (bytesPerSample * numChannels);
            const duration = numSamples / sampleRate;

            return duration > 0 ? duration : 30; // Fallback to 30 seconds
        } catch (error) {
            console.error('WAV parsing error:', error);
            return 30; // Default duration
        }
    }
}

export default new AudioAnalysisService();
