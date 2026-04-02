import { fetchWithFallback } from '../../utils/index.js';
export default async function getProxies_Data(e) {
    const isSingle = e.urls.length === 1;
    const data = { proxies: [], providers: {} };

    const results = await Promise.allSettled(e.urls.map((url, index) => fetchWithFallback(url, e).then((res) => ({ res, index }))));

    const responses = [];

    for (const result of results) {
        if (result.status === 'rejected') continue;

        const { res, index } = result.value;
        if (res?.data?.proxies?.length) {
            processProxies(res.data.proxies, e, e.urls.length > 1 ? index + 1 : undefined);
            responses.push({ status: res.status, headers: res.headers });
            data.proxies.push(...res.data.proxies);
        }
    }

    if (responses.length === 0) return null;

    const selected = isSingle ? responses[0] : responses[Math.floor(Math.random() * responses.length)];

    return {
        status: selected.status,
        headers: selected.headers,
        data,
    };
}

// 处理代理数组的辅助函数
function processProxies(proxies, options, index = null) {
    proxies.forEach((proxy) => {
        if (index !== null) {
            proxy.name = `${proxy.name} [${index}]`;
            if (options.relay) {
                if (index === 1) {
                    options.proxyname ??= [];
                    options.proxyname.push(proxy.name);
                } else {
                    proxy['dialer-proxy'] = '🔗链式代理';
                }
            }
        }
        if (options.udp) {
            proxy.udp = true;
        }
        if (options.ech) {
            proxy['ech-opts'] = {
                enable: true,
                'query-server-name': 'cloudflare-ech.com',
            };
        }
    });
}
