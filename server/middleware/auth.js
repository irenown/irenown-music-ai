import db from '../services/database.js';
import admin from '../services/firebaseAdmin.js';

/**
 * Middleware to validate the API key for protected routes
 */
export const validateApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
        return res.status(401).json({
            error: 'Authentication Required',
            details: 'Missing x-api-key header'
        });
    }

    try {
        const user = db.getUserByApiKey(apiKey);

        if (!user) {
            return res.status(403).json({
                error: 'Invalid Credentials',
                details: 'The provided API key is not registered'
            });
        }

        // Attach user info to request for downstream usage
        req.user = user;
        next();
    } catch (error) {
        console.error('Auth Middleware Error:', error);
        res.status(500).json({ error: 'Internal Security Error' });
    }
};

/**
 * Middleware to verify Firebase IdToken
 */
export const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // Fallback to API Key if present
        if (req.headers['x-api-key']) {
            return validateApiKey(req, res, next);
        }
        return res.status(401).json({ error: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const user = db.getUserById(decodedToken.uid);

        if (!user) {
            return res.status(404).json({
                error: 'User not found in iRenown',
                details: 'Firebase account exists but sync is incomplete.'
            });
        }

        req.user = user;
        req.firebaseUser = decodedToken;
        next();
    } catch (error) {
        console.error('Firebase Auth Error:', error.message);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

/**
 * Middleware to restrict access based on user tier (e.g., silver, platinum)
 */
export const restrictToTier = (tier) => {
    return (req, res, next) => {
        const tiers = ['silver', 'gold', 'platinum'];
        const userTierIndex = tiers.indexOf(req.user.tier);
        const requiredTierIndex = tiers.indexOf(tier);

        if (userTierIndex < requiredTierIndex) {
            return res.status(403).json({
                error: 'Tier Restricted',
                details: `This action requires ${tier} access. Your current tier is ${req.user.tier}.`
            });
        }
        next();
    };
};
