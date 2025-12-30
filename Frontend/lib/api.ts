import { auth } from "./firebase";
import { getIdToken } from "firebase/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const apiClient = {
    async request(endpoint: string, options: RequestInit = {}) {
        const currentUser = auth.currentUser;
        let token = typeof window !== 'undefined' ? localStorage.getItem('irenown_token') : null;

        // Auto-refresh token if user is logged in
        if (currentUser) {
            token = await getIdToken(currentUser, true);
            localStorage.setItem('irenown_token', token);
        }

        const apiKey = typeof window !== 'undefined' ? localStorage.getItem('irenown_api_key') : null;

        const isFormData = options.body instanceof FormData;

        const headers: Record<string, string> = {
            ...(!isFormData && { 'Content-Type': 'application/json' }),
            ...((options.headers as Record<string, string>) || {}),
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        if (apiKey) {
            headers['x-api-key'] = apiKey;
        }

        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Something went wrong');
        }

        return data;
    },

    get(endpoint: string) {
        return this.request(endpoint, { method: 'GET' });
    },

    post(endpoint: string, body: any) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
        });
    },

    setToken(token: string) {
        localStorage.setItem('irenown_token', token);
    },

    setApiKey(apiKey: string) {
        localStorage.setItem('irenown_api_key', apiKey);
    },

    clearAuth() {
        localStorage.removeItem('irenown_token');
        localStorage.removeItem('irenown_api_key');
        localStorage.removeItem('irenown_user');
    },

    setUser(user: any) {
        localStorage.setItem('irenown_user', JSON.stringify(user));
    },

    getUser() {
        const user = localStorage.getItem('irenown_user');
        return user ? JSON.parse(user) : null;
    }
};
