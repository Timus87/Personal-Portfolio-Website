import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = process.cwd();
const mime = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8'
};

createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405); return res.end('Method not allowed');
    }
    const pathname = decodeURIComponent(url.pathname);
    if (pathname.split('/').some(segment => segment.startsWith('.'))) {
      res.writeHead(404); return res.end('Not found');
    }
    let file = normalize(join(root, pathname));
    if (!file.startsWith(root)) { res.writeHead(404); return res.end('Not found'); }
    try { if ((await stat(file)).isDirectory()) file = join(file, 'index.html'); }
    catch { if (!extname(file)) file = join(file, 'index.html'); }
    const content = await readFile(file);
    res.writeHead(200, { 'Content-Type': mime[extname(file).toLowerCase()] || 'application/octet-stream' });
    if (req.method === 'HEAD') return res.end();
    res.end(content);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>Not found</h1>');
  }
}).listen(Number(process.env.PORT) || 3000, () => console.log(`Site running at http://localhost:${Number(process.env.PORT) || 3000}`));
