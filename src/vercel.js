import http from 'http';
import fs from 'fs';
import path from 'path';
import { buildConfig } from './utils/env.js';
import { handleRequest } from './utils/handler.js';

async function handler(req, res) {
    const e = buildConfig(req, process.env, true);

    try {
        const result = await handleRequest(e);

        for (const [key, value] of Object.entries(result.headers)) {
            res.setHeader(key, value);
        }

        res.statusCode = result.status;
        res.end(result.body);
    } catch (err) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify({ error: err.message }));
    }
}

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');

    // 静态模板处理
    if (url.pathname.startsWith('/template/')) {
        const filePath = path.join(process.cwd(), url.pathname);
        if (fs.existsSync(filePath)) {
            res.writeHead(200);
            fs.createReadStream(filePath).pipe(res);
            return;
        }
    }

    return handler(req, res);
});

server.listen(3000, () => {
    console.log('dev running: http://localhost:3000');
});
export default handler;
