const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
    let safeUrl = decodeURIComponent(req.url.split('?')[0]);
    if (safeUrl === '/') safeUrl = '/index.html';

    let filePath = path.join(__dirname, safeUrl);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
    }

    if (fs.existsSync(filePath) && !fs.statSync(filePath).isDirectory()) {
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(fs.readFileSync(filePath));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found: ' + safeUrl);
    }
});

server.listen(PORT, () => {
    console.log(`HRMS Local Server running at http://localhost:${PORT}/`);
});
