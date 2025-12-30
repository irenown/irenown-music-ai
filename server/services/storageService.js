/**
 * Service to handle Cloudflare R2 Storage operations
 */
class StorageService {
    constructor(bucket) {
        this.bucket = bucket;
    }

    /**
     * Uploads a file (as ArrayBuffer or ReadableStream) to R2
     */
    async uploadFile(data, key, contentType) {
        if (!this.bucket) {
            console.warn(`[Storage] R2 Bucket not configured. Mocking upload for ${key}`);
            return key;
        }

        await this.bucket.put(key, data, {
            httpMetadata: { contentType: contentType }
        });

        return key;
    }

    /**
     * Generates a signed URL for a file (Using a custom Worker endpoint or R2 public URL)
     * For now, we'll return the key or a projected URL if public access is enabled.
     * In a real Worker, you'd usually serve these via another route or a public bucket domain.
     */
    async getSignedUrl(key) {
        // Implementation depends on whether the bucket is public or requires a proxy worker
        // For iRenown, we'll assume a proxy route /api/storage/:key or a public domain
        return `/api/storage/${key}`;
    }

    /**
     * Fetches a file from R2
     */
    async getFile(key) {
        const object = await this.bucket.get(key);
        if (!object) return null;
        return object;
    }

    /**
     * Deletes a file from R2
     */
    async deleteFile(key) {
        await this.bucket.delete(key);
    }
}

export default StorageService;
