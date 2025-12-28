import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// For a production environment, you would use a service account JSON file.
// For now, we'll try to initialize with environment variables or placeholder.
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            projectId: process.env.FIREBASE_PROJECT_ID,
            // You can add more config or use GOOGLE_APPLICATION_CREDENTIALS env var
        });
        console.log('✅ Firebase Admin initialized');
    } catch (error) {
        console.warn('⚠️ Firebase Admin initialization warning:', error.message);
        console.warn('Backend requests using Firebase Auth may fail until service account is configured.');
    }
}

export default admin;
