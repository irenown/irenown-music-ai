import { jwtVerify, createRemoteJWKSet } from 'jose';
import DatabaseService from '../services/database.js';

const JWKS = createRemoteJWKSet(new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'));

/**
 * Middleware to validate the API key for protected routes
 */
export const validateApiKey = async (c, next) => {
    const apiKey = c.req.header('x-api-key');
    const db = new DatabaseService(c.env.DB);

    if (!apiKey) {
        return c.json({
            error: 'Authentication Required',
            details: 'Missing x-api-key header'
        }, 401);
    }

    try {
        const user = await db.getUserByApiKey(apiKey);

        if (!user) {
            return c.json({
                error: 'Invalid Credentials',
                details: 'The provided API key is not registered'
            }, 403);
        }

        // Attach user info to context for downstream usage
        c.set('user', user);
        await next();
    } catch (error) {
        console.error('Auth Middleware Error:', error);
        return c.json({ error: 'Internal Security Error' }, 500);
    }
};

/**
 * Middleware to verify Firebase IdToken (Edge version)
 * Note: Real implementation would use jose or similar to verify RS256 JWT
 */
export const authenticateUser = async (c, next) => {
    const authHeader = c.req.header('Authorization');
    const db = new DatabaseService(c.env.DB);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // Fallback to API Key if present
        if (c.req.header('x-api-key')) {
            return await validateApiKey(c, next);
        }
        return c.json({ error: 'Authentication required' }, 401);
    }

    const token = authHeader.split(' ')[1];

    try {
        const projectId = c.env.IDENTITY_PROVIDER_ID || 'irenown-mp-ai';
        // Securely verify the JWT using Remote JWK Set
        const { payload } = await jwtVerify(token, JWKS, {
            issuer: `https://securetoken.google.com/${projectId}`,
            audience: projectId,
        });

        const user = await db.getUserById(payload.sub || payload.user_id);

        if (!user) {
            return c.json({
                error: 'User not found in iRenown',
                details: 'Firebase account exists but sync is incomplete.'
            }, 404);
        }

        c.set('user', user);
        await next();
    } catch (error) {
        console.error('Firebase Auth Error:', error.message);
        return c.json({
            error: 'Invalid or expired token',
            details: error.message
        }, 401);
    }
};
