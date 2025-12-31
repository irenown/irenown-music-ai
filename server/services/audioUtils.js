/**
 * Audio Utilities for Edge
 * Handles silence trimming and basic signal analysis
 */

class AudioUtils {
    /**
     * Trims leading silence from a WAV buffer
     * @param {ArrayBuffer} buffer - WAV audio data
     * @returns {Object} - { buffer: TrimmedBuffer, offset: secondsRemoved }
     */
    trimLeadingSilence(buffer) {
        const data = new Uint8Array(buffer);

        // 1. Basic WAV Check
        if (data[0] !== 0x52 || data[1] !== 0x49 || data[2] !== 0x46 || data[3] !== 0x46) {
            console.warn('[AudioUtils] Not a standard WAV, skipping trim.');
            return { buffer, offset: 0 };
        }

        // 2. Find Data Chunk
        let pos = 12;
        let dataStart = -1;
        while (pos < data.length - 8) {
            const chunkId = String.fromCharCode(data[pos], data[pos + 1], data[pos + 2], data[pos + 3]);
            const chunkSize = data[pos + 4] | (data[pos + 5] << 8) | (data[pos + 6] << 16) | (data[pos + 7] << 24);

            if (chunkId === 'data') {
                dataStart = pos + 8;
                break;
            }
            pos += 8 + chunkSize;
        }

        if (dataStart === -1) return { buffer, offset: 0 };

        // 3. Scan for Peaks (Silence detection)
        // We look for the first sample that exceeds a small threshold
        const samples = new Int16Array(buffer, dataStart);
        const threshold = 500; // ~1.5% of max Int16 range
        let firstPeak = 0;

        for (let i = 0; i < samples.length; i++) {
            if (Math.abs(samples[i]) > threshold) {
                firstPeak = i;
                break;
            }
        }

        if (firstPeak === 0) return { buffer, offset: 0 };

        // 4. Calculate Offset
        const sampleRate = 44100; // Assumed default if not parsed
        const offset = firstPeak / sampleRate;
        console.log(`[AudioUtils] Detected leading silence: ${offset.toFixed(3)}s`);

        // 5. Create Trimmed Buffer
        // We need to preserve the WAV header but update the data size
        // For simplicity at Edge, if we trim a lot, we just return the original 
        // and tell the mixer to offset. But for "Sync", trimming is safer.

        const header = data.slice(0, dataStart);
        const trimmedData = data.slice(dataStart + (firstPeak * 2)); // * 2 for 16-bit

        const newBuffer = new Uint8Array(header.length + trimmedData.length);
        newBuffer.set(header, 0);
        newBuffer.set(trimmedData, header.length);

        // Update total file size in header (pos 4-7)
        const totalSize = newBuffer.length - 8;
        newBuffer[4] = totalSize & 0xFF;
        newBuffer[5] = (totalSize >> 8) & 0xFF;
        newBuffer[6] = (totalSize >> 16) & 0xFF;
        newBuffer[7] = (totalSize >> 24) & 0xFF;

        // Update data chunk size (pos dataStart - 4)
        const newDataSize = trimmedData.length;
        newBuffer[dataStart - 4] = newDataSize & 0xFF;
        newBuffer[dataStart - 3] = (newDataSize >> 8) & 0xFF;
        newBuffer[dataStart - 2] = (newDataSize >> 16) & 0xFF;
        newBuffer[dataStart - 1] = (newDataSize >> 24) & 0xFF;

        return {
            buffer: newBuffer.buffer,
            offset
        };
    }

    /**
     * Estimated BPM detection (Simplified for Edge)
     * High-pass filter -> Peak detection -> Interval averaging
     */
    async estimateBPM(buffer) {
        // Implementation for a real BPM guess if user doesn't provide one
        // For now, return a placeholder that signals "auto"
        return 0;
    }
}

export default new AudioUtils();
