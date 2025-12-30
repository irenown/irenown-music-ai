const fs = require('fs');
const http = require('http');
const path = require('path');

const filePath = path.join('server', 'node_modules', 'node-wav', 'file.wav');

if (!fs.existsSync(filePath)) {
    console.error('Test file not found:', filePath);
    process.exit(1);
}

const fileBuffer = fs.readFileSync(filePath);
const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';

const prefix = `--${boundary}\r\n` +
    `Content-Disposition: form-data; name="vocal"; filename="test.wav"\r\n` +
    `Content-Type: audio/wav\r\n\r\n`;

const genrePart = `\r\n--${boundary}\r\n` +
    `Content-Disposition: form-data; name="genre"\r\n\r\npop` +
    `\r\n--${boundary}\r\n` +
    `Content-Disposition: form-data; name="bpm"\r\n\r\n120` +
    `\r\n--${boundary}\r\n` +
    `Content-Disposition: form-data; name="name"\r\n\r\nDebug Test`;

const suffix = `\r\n--${boundary}--\r\n`;

const payload = Buffer.concat([
    Buffer.from(prefix),
    fileBuffer,
    Buffer.from(genrePart),
    Buffer.from(suffix)
]);

console.log('Sending request...');

const req = http.request({
    hostname: '127.0.0.1',
    port: 8787,
    path: '/api/debug-produce',
    method: 'POST',
    headers: {
        'x-api-key': 'debug-key-bypass',
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': payload.length
    }
}, (res) => {
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => {
        console.log('HTTP Status:', res.statusCode);
        try {
            const json = JSON.parse(data);
            console.log('ERROR_MSG_START');
            console.log(json.error);
            console.log('ERROR_MSG_END');
        } catch (e) {
            console.log('Raw Body:', data.substring(0, 500));
        }
    });
});

req.on('error', (e) => {
    console.error('Request Error:', e);
});

req.write(payload);
req.end();
