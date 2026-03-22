import { fetchResponse, buildApiUrl } from '../../utils/index.js';
export default async function getOutbounds_Data(e) {
    // 处理单个 URL 的情况
    if (e.urls.length === 1) {
        let response = await fetchWithFallback(e.urls[0], e);
        if (response?.data?.outbounds?.length > 0) {
            processOutbounds(response.data.outbounds, e, 0);
            return formatResponse(response);
        }
        return null;
    }

    // 处理多个 URL 的情况
    const outboundsList = [];
    const responseList = [];

    for (let i = 0; i < e.urls.length; i++) {
        const response = await fetchWithFallback(e.urls[i], e);

        if (response?.data?.outbounds?.length > 0) {
            processOutbounds(response.data.outbounds, e, i + 1);
            responseList.push(response);
            outboundsList.push(response.data.outbounds);
        }
    }

    if (responseList.length === 0) {
        throw new Error('No valid outbounds found from any URL');
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
    let response = await fetchResponse(url, options.userAgent, false);

    if (hasValidOutbounds(response)) {
        return response;
    }

    // 尝试使用构建的 API URL
    const apiUrl = buildApiUrl(url, options.sub, 'singbox');
    response = await fetchResponse(apiUrl, options.userAgent, false);

    if (hasValidOutbounds(response)) {
        return response;
    }

    return null;
}

// 检查响应是否包含有效的 outbounds
function hasValidOutbounds(response) {
    return response?.data?.outbounds && Array.isArray(response.data.outbounds);
}

// 处理 outbounds 数组
function processOutbounds(outbounds, options, index) {
    outbounds.forEach((outbound) => {
        if (index > 0) {
            outbound.tag = `${outbound.tag} [${index}]`;
        }
        if (options.udp_fragment) {
            outbound.udp_fragment = true;
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
