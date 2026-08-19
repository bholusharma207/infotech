const http = require('http');
const fs = require('fs');
const path = require('path');
const { arch } = require('os');

const PORT = 8080;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
    '.avif': 'image/avif',
    '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
    let decodedUrl = req.url;
    try {
        decodedUrl = decodeURIComponent(req.url.split('?')[0]);
    } catch (e) {
        decodedUrl = req.url.split('?')[0];
    }

    let relativePath = decodedUrl === '/' ? 'index.html' : decodedUrl;
    let filePath = path.join(__dirname, relativePath);

    // Safety check to prevent directory traversal
    if (!filePath.startsWith(__dirname)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    function tryServe(pathsToTry, defaultExt) {
        if (pathsToTry.length === 0) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1>', 'utf-8');
            return;
        }

        const currentPath = pathsToTry.shift();
        const extname = String(path.extname(currentPath)).toLowerCase();
        const contentType = MIME_TYPES[extname] || 'application/octet-stream';

        fs.readFile(currentPath, (error, content) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    tryServe(pathsToTry, defaultExt);
                } else {
                    res.writeHead(500);
                    res.end(`Server Error: ${error.code}`);
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }

    const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
    const candidates = [filePath];

    // If filename has no extension or is html, try fallback paths
    const ext = path.extname(cleanPath);
    if (!ext || ext === '.html') {
        const baseName = ext ? cleanPath : cleanPath + '.html';
        const fileInPages = path.join(__dirname, 'pages', path.basename(baseName));
        if (!candidates.includes(fileInPages)) {
            candidates.push(fileInPages);
        }
        if (!ext) {
            candidates.push(filePath + '.html');
        }
    }

    tryServe(candidates, ext);
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});


