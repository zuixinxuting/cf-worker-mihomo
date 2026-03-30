import { fetchResponse, buildApiUrl } from '../../utils/index.js';
export default async function getOutbounds_Data(e) {
    const isSingle = e.urls.length === 1;
    const outboundsList = [];
    const responseList = [];

    const results = await Promise.allSettled(e.urls.map((url, index) => fetchWithFallback(url, e).then((res) => ({ res, index }))));

    for (const result of results) {
        if (result.status === 'rejected') continue;

        const { res, index } = result.value;
        if (res?.data?.outbounds?.length > 0) {
            processOutbounds(res.data.outbounds, e, isSingle ? 0 : index + 1);
            responseList.push(res);
            outboundsList.push(res.data.outbounds);
        }
    }

    if (responseList.length === 0) {
        throw new Error('未从任何 URL 找到有效的出站链接');
    }

    if (isSingle) {
        const response = responseList[0];
        return {
            status: response.status,
            headers: response.headers,
            data: { outbounds: outboundsList.flat() },
        };
    }

    const randomResponse = responseList[Math.floor(Math.random() * responseList.length)];

    return {
        status: randomResponse.status,
        headers: randomResponse.headers,
        data: { outbounds: outboundsList.flat() },
    };
}
// 带回退机制的请求
async function fetchWithFallback(url, options) {
    // const res = await fetchResponse(url, options.userAgent);

    // if (res?.data?.outbounds && Array.isArray(res.data.outbounds)) {
    //     return res;
    // }

    // 尝试使用构建的 API URL
    const apiUrl = buildApiUrl(url, options.sub, options.target);
    return await fetchResponse(apiUrl, options.userAgent);
}

// 处理 outbounds 数组
function processOutbounds(outbounds, options, index) {
    const isV113 = /1\.(1[3-9]|[3-9]\d)/i.test(options.userAgent);
    outbounds.forEach((outbound) => {
        if (index > 0) {
            outbound.tag = `${outbound.tag} [${index}]`;
            if (options.relay) {
                if (index === 1) {
                    options.proxyname ??= [];
                    options.proxyname.push(outbound.tag);
                } else {
                    outbound.detour = '🔗链式代理';
                }
            }
        }
        if (options.udp_fragment) {
            outbound.udp_fragment = true;
        }
        if (options.ech && outbound.tls) {
            outbound.tls = {
                ...outbound.tls,
                ech: {
                    enabled: true,
                    ...(isV113 && { query_server_name: 'cloudflare-ech.com' }),
                },
            };
        }
    });
}

// 格式化响应
function formatResponse(response) {
    return {
        status: response.status,
        headers: response.headers,
        data: response.data,
    };
}
