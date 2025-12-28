import cloudinaryPkg from 'cloudinary';
const { v2: cloudinary } = cloudinaryPkg;
import fs from 'fs';
import axios from 'axios';
import { pipeline } from 'stream/promises';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

/**
 * Service to handle Audio Mixing via Cloudinary
 * (Replacing local FFmpeg)
 */
class AudioProcessor {
    /**
     * Mixes a vocal track and an instrumental track using Cloudinary
     * @param {string} vocalPath - Path to the vocal file
     * @param {string} instrumentalPath - Path to the instrumental file
     * @param {string} outputPath - Path to save the final mix
     * @returns {Promise<string>} - Path to the final mix
     */
    async mixTracks(vocalPath, instrumentalPath, outputPath) {
        console.log(`Mixing via Cloudinary: ${vocalPath} + ${instrumentalPath}`);

        try {
            // 1. Upload Instrumental (Base Track)
            // Use 'video' resource_type for audio to enable advanced mixing
            const instUpload = await cloudinary.uploader.upload(instrumentalPath, {
                resource_type: 'video',
                folder: 'temp_mix/inst'
            });
            const instId = instUpload.public_id;

            // 2. Upload Vocal (Overlay Track)
            const vocalUpload = await cloudinary.uploader.upload(vocalPath, {
                resource_type: 'video',
                folder: 'temp_mix/vocal'
            });
            // We need the public_id with : replaced by : for overlay syntax? 
            // Actually usually just the public_id is fine, but if it has slashes, might need care.
            // Cloudinary overlay syntax: l_video:<public_id>
            // Note: Cloudinary public_ids might contain slashes. We usually need to replace / with : in transformations? 
            // actually standard public_id works in recent versions if quoted or handled. 
            // Let's use the standard `l_video:folder:id` format (slashes become colons in URLs sometimes, but the SDK handles it if passed as object).
            const vocalId = vocalUpload.public_id.replace(/\//g, ':');

            // 3. Generate Transformation URL
            // We want to overlay the vocal ON TOP of the instrumental
            const url = cloudinary.url(instId, {
                resource_type: 'video',
                format: 'mp3',
                transformation: [
                    {
                        overlay: `video:${vocalId}`
                    },
                    {
                        flags: "layer_apply" // Mixes them
                    },
                    // Optional: Normalization or Volume adjustments
                    // { effect: "volume:loudnorm" } // if supported, or just rely on default mixing
                ]
            });

            console.log(`Generated Mix URL: ${url}`);

            // 4. Download Result
            const response = await axios({
                url: url,
                method: 'GET',
                responseType: 'stream'
            });

            await pipeline(response.data, fs.createWriteStream(outputPath));
            console.log(`Mixed file saved to: ${outputPath}`);

            // Optional: Cleanup Cloudinary assets to save storage?
            // await cloudinary.api.delete_resources([instUpload.public_id, vocalUpload.public_id], { resource_type: 'video' });

            return outputPath;

        } catch (error) {
            console.error('Cloudinary Mixing Failed:', error.message);
            throw error;
        }
    }

    /**
     * Extracts a segment of audio (Not fully implemented in Serverless migration yet)
     * Fallback: Just return input or implement Cloudinary trim
     */
    async trimAudio(inputPath, outputPath, startTime, duration) {
        // Cloudinary supports trimming via { start_offset: "...", duration: "..." }
        // For now, this might not be critical for the main flow.
        console.warn('Trim not implemented in Serverless mode');
        fs.copyFileSync(inputPath, outputPath);
        return outputPath;
    }
}

export default new AudioProcessor();
