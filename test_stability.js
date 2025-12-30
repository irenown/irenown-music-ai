const https = require('https');

const apiKey = 'sk-W21BfqtLfCSVudT4GMgStULJ7KpXiUyruOHTVsfGfg5c63pA';

const endpoints = [
    'https://api.stability.ai/v2beta/stable-audio/generate',
    'https://api.stability.ai/v2beta/audio/stable-audio/generate',
    'https://api.stability.ai/v2beta/stable-audio/text-to-audio' // Legacy?
];

function testEndpoint(url) {
    console.log(`Testing ${url}...`);
    const req = https.request(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json' // Just checks connectivity/auth
        }
    }, (res) => {
        console.log(`${url} -> Status: ${res.statusCode}`);
        let data = '';
        res.on('data', d => data += d);
        res.on('end', () => console.log('Response:', data.substring(0, 100)));
    });

    req.on('error', e => console.error(`${url} Error:`, e.message));
    req.write(JSON.stringify({
        prompt: "test",
        seconds_total: 1
    }));
    req.end();
}

endpoints.forEach(testEndpoint);
