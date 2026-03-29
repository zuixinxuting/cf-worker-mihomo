import { getmihomo_config } from './core/mihomo/index.js';
import { getsingbox_config } from './core/singbox/index.js';
import { getv2ray_config } from './core/v2ray/index.js';
import { getFakePage } from './core/page/page.js';
import { buildConfig } from './env.js';

export default async function handler(req, res) {
    const e = buildConfig(req, process.env, true);
    if (e.target) {
        try {
            let result;
            switch (e.target) {
                case 'singbox':
                    result = await getsingbox_config(e);
                    break;
                case 'mihomo':
                    result = await getmihomo_config(e);
                    break;
                case 'v2ray':
                    result = await getv2ray_config(e);
                    break;
                default:
                    throw new Error('Invalid config type');
            }
            if (result.headers) {
                for (const [key, value] of Object.entries(result.headers)) {
                    res.setHeader(key, value);
                }
            }
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.setHeader('Profile-web-page-url', e.url.origin);
            res.statusCode = result.status || 200;
            res.end(result.data);
            return res;
        } catch (err) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({ error: err.message }));
            return res;
        }
    }
    const html = await getFakePage(e);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.statusCode = 200;
    res.end(html);
    return res;
}
