import axios from 'axios';

const BASE_URL = 'http://localhost:3001';
const DEV_KEY = 'irenown_dev_key_2025';

async function verifyBackend() {
    console.log('🚀 Starting Backend Verification...\n');

    try {
        // 1. Health Check
        console.log('🔍 Testing Health Check...');
        const health = await axios.get(`${BASE_URL}/health`);
        console.log('✅ Health OK:', health.data.message, `(v${health.data.version})`);

        // 2. Auth Test (Negative)
        console.log('\n🔒 Testing Security (Unauthorized Request)...');
        try {
            await axios.get(`${BASE_URL}/api/projects`);
        } catch (err) {
            if (err.response.status === 401) {
                console.log('✅ Security OK: Blocked request without API key.');
            } else {
                throw new Error(`Unexpected security response: ${err.response.status}`);
            }
        }

        // 3. Auth Test (Positive)
        console.log('\n🔑 Testing Security (Authorized Request with Dev Key)...');
        const projects = await axios.get(`${BASE_URL}/api/projects`, {
            headers: { 'x-api-key': DEV_KEY }
        });
        console.log(`✅ Security OK: Authorized access. Found ${projects.data.length} projects in vault.`);

        // 4. Production API (Dry Run / Validation)
        console.log('\n🎤 Testing Production API Validation...');
        try {
            await axios.post(`${BASE_URL}/api/produce`, {}, {
                headers: { 'x-api-key': DEV_KEY }
            });
        } catch (err) {
            if (err.response.status === 400) {
                console.log('✅ Production OK: Properly validated missing vocal track.');
            } else {
                throw new Error(`Unexpected production response: ${err.response.status}`);
            }
        }

        console.log('\n🏆 FINAL VERIFICATION SUCCESSFUL: Backend is Platinum Ready.');

    } catch (error) {
        console.error('\n❌ VERIFICATION FAILED:');
        console.error(error.message);
        if (error.response) {
            console.error('Response:', error.response.data);
        }
        process.exit(1);
    }
}

verifyBackend();
