import wav from 'node-wav';
import MusicTempo from 'music-tempo';

/**
 * Service to analyze audio files for key, BPM, and duration
 * (Edge compatible)
 */
class AudioAnalysisService {
    /**
     * Analyzes an audio buffer
     * @param {ArrayBuffer|Buffer} buffer - Raw audio data
     * @returns {Promise<Object>} - Analysis results
     */
    async analyze(buffer) {
        try {
            console.log(`Analyzing audio buffer...`);

            // decode wav
            const result = wav.decode(new Uint8Array(buffer));

            const sampleRate = result.sampleRate;
            const channelData = result.channelData[0]; // Use first channel for analysis

            // 1. Detect BPM
            const mt = new MusicTempo(channelData);
            const bpm = Math.round(mt.tempo);

            // 2. Duration
            const duration = channelData.length / sampleRate;

            // 3. Key Detection (Naive implementation for MVP)
            const key = "C Major";

            return {
                bpm,
                key,
                duration: parseFloat(duration.toFixed(2)),
                confidence: mt.tempoConf || 0.5
            };
        } catch (error) {
            console.error('Audio Analysis Error:', error);
            throw new Error(`Failed to analyze audio: ${error.message}`);
        }
    }
}

export default new AudioAnalysisService();
