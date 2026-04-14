import { fetchWithFallback } from '../../utils/index.js';
export default async function getProxies_Data(e) {
    const isSingle = e.urls.length === 1;

    const results = await Promise.all(e.urls.map((url, index) => fetchWithFallback(url, e).then((res) => ({ res, index }))));

    const responses = [];
    const proxies = [];

    for (const { res, index } of results) {
        if (Array.isArray(res?.data?.proxies) && res.data.proxies.length > 0) {
            processProxies(res.data.proxies, e, isSingle ? 0 : index + 1);
            responses.push({ status: res.status, headers: res.headers });
            proxies.push(res.data.proxies);
        }
    }

    if (proxies.length === 0) {
        throw new Error('未从任何 URL 找到有效的节点');
    }

    const flatProxies = proxies.flat();

    if (isSingle) {
        const response = responses[0];
        return {
            status: response.status,
            headers: response.headers,
            data: { proxies: flatProxies },
        };
    }

    const selected = responses[Math.floor(Math.random() * responses.length)];

    return {
        status: selected.status,
        headers: selected.headers,
        data: { proxies: flatProxies },
    };
}

// 处理代理数组的辅助函数
function processProxies(proxies, options, index) {
    proxies.forEach((proxy) => {
        if (index > 0) {
            proxy.name = `${proxy.name} [${index}]`;
            if (options.relay) {
                if (index === 1) {
                    options.proxyname ??= [];
                    options.proxyname.push(proxy.name);
                } else {
                    proxy['dialer-proxy'] = '🔗链式前置';
                    options.dialerproxy ??= [];
                    options.dialerproxy.push(proxy.name);
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
