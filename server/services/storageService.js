import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import fs from 'fs';

/**
 * Service to handle cloud storage (S3/R2)
 */
class StorageService {
    constructor() {
        this.s3Client = null;
        this.bucketName = process.env.STORAGE_BUCKET;

        if (process.env.STORAGE_ACCESS_KEY) {
            this.s3Client = new S3Client({
                region: process.env.STORAGE_REGION || 'auto',
                endpoint: process.env.STORAGE_ENDPOINT,
                credentials: {
                    accessKeyId: process.env.STORAGE_ACCESS_KEY,
                    secretAccessKey: process.env.STORAGE_SECRET_KEY,
                },
                // R2 requires some specific settings for S3 compatibility
                forcePathStyle: true,
            });
        }
    }

    /**
     * Uploads a file to cloud storage
     */
    async uploadFile(filePath, key, contentType) {
        if (!this.s3Client) {
            console.warn(`[Storage] Cloud storage not configured. Mocking upload for ${key}`);
            return `local://${key}`;
        }

        const fileStream = fs.createReadStream(filePath);
        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            Body: fileStream,
            ContentType: contentType
        });

        await this.s3Client.send(command);
        return key;
    }

    /**
     * Generates a signed URL for a file
     */
    async getSignedUrl(key, expiresLimit = 3600) {
        if (!this.s3Client) {
            // Local fallback URL
            return `/${key.startsWith('output/') ? 'output' : 'uploads'}/${key.split('/').pop()}`;
        }

        const command = new GetObjectCommand({
            Bucket: this.bucketName,
            Key: key,
        });

        return await getSignedUrl(this.s3Client, command, { expiresIn: expiresLimit });
    }

    /**
     * Generates a signed PUT URL for external services (e.g. Dolby) to upload results
     */
    async getSignedUploadUrl(key, expiresLimit = 3600) {
        if (!this.s3Client) {
            // Local fallback not supported for external API writes without a tunnel
            throw new Error('Cloud Storage required for External API output');
        }

        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            ContentType: 'audio/wav' // content type can be inferred or fixed
        });

        return await getSignedUrl(this.s3Client, command, { expiresIn: expiresLimit });
    }
}

export default new StorageService();
