// import fetch from 'node-fetch';
import YAML from 'yaml';
export const backimg = base64DecodeUtf8('aHR0cHM6Ly90LmFsY3kuY2MveWN5');
export const subapi = base64DecodeUtf8('aHR0cHM6Ly9zdWItc3RvcnQtbm9kZWpzLnBhZ2VzLmRldg==');
export const beiantext = base64DecodeUtf8('6JCMSUNQ5aSHMjAyNTAwMDHlj7c=');
export const beiandizi = base64DecodeUtf8('aHR0cHM6Ly90Lm1lL01hcmlzYV9rcmlzdGk=');
// 实现base64解码UTF-8字符串的函数
export function base64DecodeUtf8(str) {
    const binary = atob(str);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder('utf-8').decode(bytes);
}
// 订阅链接
export function buildApiUrl(rawUrl, BASE_API, ua) {
    const params = new URLSearchParams({
        target: ua,
        url: rawUrl,
        emoji: 'true',
        list: 'true',
        new_name: 'true',
    });
    return `${BASE_API}/sub?${params}`;
}
// 处理请求
export async function fetchResponse(url, userAgent) {
    if (!userAgent) {
        userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3';
    }
    let response;
    try {
        response = await fetch(url, {
            method: 'GET',
            headers: {
                'User-Agent': userAgent,
            },
        });
    } catch {
        return true;
    }
    const headers = {};
    const subInfo = response.headers.get('subscription-userinfo');
    if (subInfo) {
        headers['subscription-userinfo'] = subInfo;
    }
    const fixedCD = sanitizeContentDisposition(response.headers);
    if (fixedCD) {
        headers['content-disposition'] = fixedCD;
    }
    const textData = await response.text();
    let data;
    try {
        data = YAML.parse(textData, { maxAliasCount: -1, merge: true });
    } catch {
        try {
            data = JSON.parse(textData);
        } catch {
            data = textData;
        }
    }

    return {
        status: response.status,
        headers,
        data,
    };
}
// 将订阅链接和代理地址分离
export function splitUrlsAndProxies(urls) {
    const result = [];
    let proxyText = '';

    for (const url of urls) {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            result.push(url);
        } else {
            if (proxyText) {
                proxyText += ',';
            }
            proxyText += url;
        }
    }
    if (proxyText) {
        result.push(proxyText);
    }
    return result;
}

function sanitizeContentDisposition(headers) {
    const raw = headers.get('content-disposition');
    if (!raw) return null;
    let filename = null;
    const filenameStarMatch = raw.match(/filename\*\s*=\s*UTF-8''([^;]+)/i);
    if (filenameStarMatch) {
        try {
            filename = decodeURIComponent(filenameStarMatch[1]);
        } catch {
            filename = filenameStarMatch[1];
        }
    }
    if (!filename) {
        const filenameMatch = raw.match(/filename\s*=\s*"?([^"]+)"?/i);
        if (filenameMatch) {
            filename = filenameMatch[1];
        }
    }
    if (!filename) return raw;
    const isNonAscii = /[^\x00-\x7F]/.test(filename);
    if (!isNonAscii) return raw;
    const extMatch = filename.match(/\.[a-zA-Z0-9]+$/);
    const fallback = `download${extMatch ? extMatch[0] : ''}`;
    const encoded = encodeURIComponent(filename);
    return `attachment; filename="${fallback}"; filename*=UTF-8''${encoded}`;
}
/**
 * 获取应用包名列表
 * @returns {Promise<Object>} - 返回配置数据对象
 */
export async function fetchpackExtract() {
    const processNames = new Set();

    const urls = [
        'https://github.com/mnixry/direct-android-ruleset/raw/refs/heads/rules/@Merged/GAME.mutated.yaml',
        'https://github.com/mnixry/direct-android-ruleset/raw/refs/heads/rules/@Merged/APP.mutated.yaml',
    ];

    const excludeCommentKeywords = ['浏览器'];
    const excludeNames = new Set(['com.android.chrome', 'mark.via']);

    for (const url of urls) {
        const res = await fetchResponse(url);

        if (!res || res === true || res.status !== 200) {
            console.error(`❌ 请求失败: ${url}`);
            continue;
        }

        // fetchResponse 可能返回对象或字符串
        const text = typeof res.data === 'string' ? res.data : JSON.stringify(res.data);

        for (const line of text.split('\n')) {
            const match = line.match(/PROCESS-NAME\s*,\s*([^\s,]+)/);

            if (match) {
                const processName = match[1];

                const hasExcludedComment = excludeCommentKeywords.some((keyword) => line.includes(keyword));

                if (!hasExcludedComment && !excludeNames.has(processName)) {
                    processNames.add(processName);
                }
            }
        }
    }

    return [...processNames];
}
/**
 * 获取IPCIDR列表
 * @returns {Promise<Object>} - 返回配置数据对象
 */
export async function fetchipExtract() {
    const urls = ['https://raw.githubusercontent.com/Kwisma/clash-rules/release/cncidr.yaml'];

    const ipcidrs = [];

    for (const url of urls) {
        const res = await fetchResponse(url);

        if (!res || res.status !== 200) {
            console.error(`❌ 请求失败: ${url} - ${res?.status}`);
            continue;
        }

        const jsondata = res.data;

        if (jsondata && Array.isArray(jsondata.payload)) {
            ipcidrs.push(...jsondata.payload);
        }
    }

    return ipcidrs;
}
