import { getmihomo_config } from './core/mihomo/index.js';
import { getsingbox_config } from './core/singbox/index.js';
import { getv2ray_config } from './core/v2ray/index.js';
import { getFakePage } from './core/page/page.js';
import { buildConfig } from './env.js';

export default {
    async fetch(request, env) {
        const e = buildConfig(request, env, false);
        try {
            let res;
            if (e.target) {
                switch (e.target) {
                    case 'singbox':
                        res = await getsingbox_config(e);
                        break;
                    case 'mihomo':
                        res = await getmihomo_config(e);
                        break;
                    case 'v2ray':
                        res = await getv2ray_config(e);
                        break;
                    default:
                        throw new Error('Invalid config type');
                }
                const headers = new Headers(res.headers);
                headers.set('Content-Type', 'application/json; charset=utf-8');
                headers.set('Profile-web-page-url', e.url.origin);

                return new Response(res.data, {
                    status: res.status,
                    headers,
                });
            }
        } catch (err) {
            return new Response(err.message, {
                status: 400,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
            });
        }
        return new Response(await getFakePage(e), {
            status: 200,
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
            },
        });
    },
};
