import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

class AuphonicService {
    constructor() {
        this.apiKey = process.env.AUPHONIC_API_KEY;
        this.baseUrl = 'https://auphonic.com/api';
    }

    /**
     * Enhances audio using Auphonic's "Adaptive Leveler" and "Noise Reduction"
     * @param {string} inputPath - Local path to input file
     * @param {string} outputPath - Local path to save output file
     */
    async enhance(inputPath, outputPath) {
        if (!this.apiKey) throw new Error('AUPHONIC_API_KEY is missing');

        console.log(`Starting Auphonic enhancement for: ${inputPath}`);

        try {
            // 1. Create a Production
            const createRes = await axios.post(`${this.baseUrl}/productions.json`, {
                reset_on_error: true,
                metadata: { title: 'iRenown Vocal Enhancement' },
                algorithms: {
                    leveler: true,        // Adaptive Leveler
                    noiseandhum: true,    // Noise and Hum Reduction
                    normloudness: true,   // Normalize Loudness
                    loudness_target: -16  // Target LUFS for Vocals
                },
                output_basename: 'enhanced_vocal',
                output_files: [
                    { format: 'wav', ending: 'wav' }
                ]
            }, {
                auth: { username: this.apiKey, password: '' } // Auphonic uses Basic Auth with empty password for API Key usually, or Bearer? 
                // Correction: Auphonic API often uses Basic Auth with username=email, password=pass OR Bearer token. 
                // Documentation says: "If you use an access token (API key), use it as username and leave the password empty."
            });

            const production = createRes.data.data;
            const uuid = production.uuid;
            console.log(`Auphonic Production Created: ${uuid}`);

            // 2. Upload the file
            const formData = new FormData();
            formData.append('input_file', fs.createReadStream(inputPath));

            await axios.post(`${this.baseUrl}/production/${uuid}/upload.json`, formData, {
                headers: {
                    ...formData.getHeaders(),
                    'Authorization': `Basic ${Buffer.from(this.apiKey + ':').toString('base64')}`
                }
            });
            console.log('File uploaded to Auphonic.');

            // 3. Start Production
            await axios.post(`${this.baseUrl}/production/${uuid}/start.json`, {}, {
                auth: { username: this.apiKey, password: '' }
            });
            console.log('Auphonic Production Started...');

            // 4. Poll for completion
            const downloadUrl = await this.pollForCompletion(uuid);

            // 5. Download Result
            console.log(`Downloading result from: ${downloadUrl}`);
            const writer = fs.createWriteStream(outputPath);
            const response = await axios({
                url: downloadUrl,
                method: 'GET',
                responseType: 'stream',
                // Download usually requires auth too if private, but result URLs might be public or presigned? 
                // Auphonic download links need auth.
                auth: { username: this.apiKey, password: '' }
            });

            response.data.pipe(writer);

            return new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });

        } catch (error) {
            console.error('Auphonic Error:', error.response?.data || error.message);
            throw error;
        }
    }

    async pollForCompletion(uuid) {
        let retries = 0;
        const maxRetries = 60; // 5-10 mins

        while (retries < maxRetries) {
            await new Promise(r => setTimeout(r, 5000)); // Wait 5s

            const res = await axios.get(`${this.baseUrl}/production/${uuid}.json`, {
                auth: { username: this.apiKey, password: '' }
            });
            const status = res.data.data.status;

            if (status === 3) { // Done
                return res.data.data.output_files[0].download_url;
            } else if (status === 2) { // Error
                throw new Error(`Auphonic Processing Failed: ${res.data.data.error_message}`);
            }

            console.log(`Auphonic Status: ${res.data.data.status_string}...`);
            retries++;
        }
        throw new Error('Auphonic Timeout');
    }
}

export default new AuphonicService();
