import { fetchResponse, buildApiUrl } from '../../utils/index.js';
export default async function getOutbounds_Data(e) {
    const isSingle = e.urls.length === 1;
    const outboundsList = [];
    const responseList = [];

    const results = await Promise.allSettled(
        e.urls.map((url, index) =>
            fetchWithFallback(url, e)
                .then(res => ({ res, index }))
        )
    );

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
            data: { outbounds: outboundsList.flat() }
        };
    }

    const randomResponse = responseList[Math.floor(Math.random() * responseList.length)];

    return {
        status: randomResponse.status,
        headers: randomResponse.headers,
        data: { outbounds: outboundsList.flat() }
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
