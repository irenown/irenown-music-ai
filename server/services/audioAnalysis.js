import fs from 'fs';
import wav from 'node-wav';
import MusicTempo from 'music-tempo';

/**
 * Service to analyze audio files for key, BPM, and duration
 */
class AudioAnalysisService {
    /**
     * Analyzes an audio file
     * @param {string} filePath - Path to the audio file
     * @returns {Promise<Object>} - Analysis results
     */
    async analyze(filePath) {
        try {
            console.log(`Analyzing audio: ${filePath}`);
            const buffer = fs.readFileSync(filePath);
            const result = wav.decode(buffer);

            const sampleRate = result.sampleRate;
            const channelData = result.channelData[0]; // Use first channel for analysis

            // 1. Detect BPM
            const mt = new MusicTempo(channelData);
            const bpm = Math.round(mt.tempo);

            // 2. Duration
            const duration = channelData.length / sampleRate;

            // 3. Key Detection (Naive implementation for MVP)
            // Note: True key detection requires spectral analysis (FFT)
            // For now, we return a placeholder or detected if using essentia.js later
            const key = "C Major"; // Placeholder until FFT logic is added

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
