/**
 * Service to handle Audio Mixing via Cloudinary
 * (Edge compatible)
 */
class AudioProcessor {
    /**
     * Mixes vocal and instrumental buffers using Cloudinary
     */
    async mixTracks(vocalBuffer, instrumentalBuffer, env) {
        const cloudName = env.ASSET_MANAGER_ID;
        const apiKey = env.ASSET_MANAGER_KEY;
        const apiSecret = env.ASSET_MANAGER_SECRET;

        console.log(`Mixing via Cloudinary...`);

        try {
            // 1. Upload Instrumental (Base Track) to Cloudinary
            const instUpload = await this.uploadToCloudinary(instrumentalBuffer, 'inst', env);
            const instId = instUpload.public_id;

            // 2. Upload Vocal (Overlay Track) to Cloudinary
            const vocalUpload = await this.uploadToCloudinary(vocalBuffer, 'vocal', env);
            const vocalId = vocalUpload.public_id.replace(/\//g, ':');

            // 3. Generate Transformation URL
            // Format: https://res.cloudinary.com/<cloud_name>/video/upload/l_video:<vocal_id>,fl_layer_apply/<inst_id>.mp3
            const mixUrl = `https://res.cloudinary.com/${cloudName}/video/upload/l_video:${vocalId},fl_layer_apply/${instId}.mp3`;

            console.log(`Cloudinary Mix URL: ${mixUrl}`);

            // 4. Fetch the result
            const response = await fetch(mixUrl);
            if (!response.ok) throw new Error(`Failed to fetch mix from Cloudinary: ${response.statusText}`);

            return await response.arrayBuffer();

        } catch (error) {
            console.error('Cloudinary Mixing Failed:', error.message);
            throw error;
        }
    }

    /**
     * Helper to upload buffer to Cloudinary using signed upload
     */
    async uploadToCloudinary(buffer, folder, env) {
        const cloudName = env.ASSET_MANAGER_ID;
        const apiKey = env.ASSET_MANAGER_KEY;
        const apiSecret = env.ASSET_MANAGER_SECRET;
        const timestamp = Math.round(new Date().getTime() / 1000);

        const signatureStr = `folder=temp_mix/${folder}&timestamp=${timestamp}${apiSecret}`;
        const signature = await this.sha1(signatureStr);

        const formData = new FormData();
        formData.append('file', new Blob([buffer]));
        formData.append('folder', `temp_mix/${folder}`);
        formData.append('timestamp', timestamp);
        formData.append('api_key', apiKey);
        formData.append('signature', signature);
        formData.append('resource_type', 'video');

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`Cloudinary Upload Failed: ${error}`);
        }

        return await response.json();
    }

    /**
     * Simple SHA1 implementation for Cloudinary signature
     */
    async sha1(str) {
        const msgUint8 = new TextEncoder().encode(str);
        const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }
}

export default new AudioProcessor();
