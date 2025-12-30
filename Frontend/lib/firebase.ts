import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAkpeuzOi5IUCNsbFg6eBYQtWDeD4xP3Qs",
    authDomain: "irenown-mp-ai.web.app",
    projectId: "irenown-mp-ai",
    storageBucket: "irenown-mp-ai.firebasestorage.app",
    messagingSenderId: "1089501126274",
    appId: "1:1089501126274:web:c5c8a4f6afde6c845a9e9b",
    measurementId: "G-EG4K34VH4D"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export { auth };
