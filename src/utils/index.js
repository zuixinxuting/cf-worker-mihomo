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

    const headersObj = Object.fromEntries(response.headers.entries());

    const sanitizedCD = sanitizeContentDisposition(response.headers);
    if (sanitizedCD) {
        headersObj['content-disposition'] = sanitizedCD;
    }

    const textData = await response.text();

    let jsonData;
    try {
        jsonData = YAML.parse(textData, { maxAliasCount: -1, merge: true });
    } catch {
        try {
            jsonData = JSON.parse(textData);
        } catch {
            jsonData = textData;
        }
    }

    return {
        status: response.status,
        headers: headersObj,
        data: jsonData,
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

export function configs() {
    const data = {
        mihomo: [
            {
                label: '通用',
                options: [
                    {
                        label: '默认(ACL4SSR_Online_Full) (与Github同步)',
                        value: '/ACL4SSR_Online_Full.yaml',
                    },
                    {
                        label: '默认(全分组) (与Github同步) ',
                        value: '/default_full.yaml',
                    },
                    {
                        label: '默认(精简版) (仅国内外分流) (与Github同步) ',
                        value: '/default.yaml',
                    },
                ],
            },
            {
                label: 'Lanlan13-14',
                options: [
                    {
                        label: 'configfull 全分组版 (秋风去广告) (与Github同步)',
                        value: '/Lanlan13-14/configfull.yaml',
                    },
                    {
                        label: 'configfull_NoAd 全分组版 (无去广告) (与Github同步)',
                        value: '/Lanlan13-14/configfull_NoAd.yaml',
                    },
                    {
                        label: 'configfull_NoAd_lite 全分组版 (无去广告) (精简版) (与Github同步)',
                        value: '/Lanlan13-14/configfull_NoAd_lite.yaml',
                    },
                    {
                        label: 'configfull_lite 全分组版 (精简版) (与Github同步)',
                        value: '/Lanlan13-14/configfull_lite.yaml',
                    },
                    {
                        label: 'configfull_beta 全分组版 (beta版) (与Github同步)',
                        value: '/Lanlan13-14/configfull_beta.yaml',
                    },
                ],
            },
            {
                label: 'zhuqq2020',
                options: [
                    {
                        label: 'ACL4SSR_Online_Full 全包重度用户使用(与Github同步)',
                        value: '/zhuqq2020/ACL4SSR_Online_Full.yaml',
                    },
                    {
                        label: 'ACL4SSR_Online_Full_AdblockPlus 全包重度用户使用更多去广告(与Github同步)',
                        value: '/zhuqq2020/ACL4SSR_Online_Full_AdblockPlus.yaml',
                    },
                    {
                        label: 'ACL4SSR_Online_Full_Tiktok 全包重度用户使用抖音全量(与Github同步)',
                        value: '/zhuqq2020/ACL4SSR_Online_Full_Tiktok.yaml',
                    },
                    {
                        label: 'ACL4SSR_Online_Full_WithIcon 全包重度用户使用(与Github同步)(无图标)',
                        value: '/zhuqq2020/ACL4SSR_Online_Full_WithIcon.yaml',
                    },
                    {
                        label: 'ACL4SSR_Online_Mini_MultiMode 专业版自动测速、故障转移、负载均衡(与Github同步)',
                        value: '/zhuqq2020/ACL4SSR_Online_Mini_MultiMode.yaml',
                    },
                    {
                        label: '极简分流规则',
                        value: '/zhuqq2020/极简分流规则.yaml',
                    },
                ],
            },
            {
                label: 'mihomo-party-org',
                options: [
                    {
                        label: '布丁狗的订阅转换 (与Github同步)',
                        value: '/mihomo-party-org/布丁狗的订阅转换.yaml',
                    },
                    {
                        label: 'ACL4SSR_Online_Full (与Github同步)',
                        value: '/mihomo-party-org/ACL4SSR_Online_Full.yaml',
                    },
                    {
                        label: 'ACL4SSR_Online_Full_WithIcon (与Github同步)',
                        value: '/mihomo-party-org/ACL4SSR_Online_Full_WithIcon.yaml',
                    },
                ],
            },
        ],
        singbox: [
            {
                label: '通用',
                options: [
                    {
                        label: '默认(ACL4SSR_Online_Full) (与Github同步)',
                        value: '/ACL4SSR_Online_Full.yaml',
                    },
                    {
                        label: '默认(全分组) (与Github同步) ',
                        value: '/default_full.yaml',
                    },
                    {
                        label: '默认(精简版) (仅国内外分流) (与Github同步) ',
                        value: '/default.yaml',
                    },
                ],
            },
        ],
    };
    return JSON.stringify(data);
}
export function modes(sub, userAgent) {
    const modes = {
        mihomo: {
            name: 'Clash (mihomo)',
            placeholder: '请输入clash订阅地址url，支持各种订阅或单节点链接',
            tipText: `
## mihomo 使用提示：

- 支持各种订阅或单节点链接，自动合并生成配置
- 面板地址: http://127.0.0.1:9090/ui/xd
- mixed(http/socks) 端口: 7890
- 使用 sub-store 后端转换
- 适用于 mihomo 客户端
- 去广告使用 [秋风广告规则](https://github.com/TG-Twilight/AWAvenue-Ads-Rule.git)
- 防止 DNS 泄漏(安全DNS/DoH)
- 屏蔽 WebRTC 泄漏(防止真实IP暴露)
- 关闭所有覆写功能(不是关闭功能，是关闭覆写)以确保配置正常生效

## 附加参数说明

- UDP : 启用 UDP 代理流量 [查看详情](https://wiki.metacubex.one/config/proxies/#udp)
- 分应用代理: 排除 CN 应用(仅包含android应用)不入代理工具 [查看详情](https://wiki.metacubex.one/config/inbound/tun/#exclude-package)
- 分IPCIDR代理: 排除 CN IP 不进入代理工具 [查看详情](https://wiki.metacubex.one/config/inbound/tun/#route-exclude-address)
- 去广告dns: 直连使用 [dns.18bit.cn](https://www.18bit.cn), 代理使用 [dns.adguard-dns.com](https://adguard-dns.io/)
- 仅代理: 关闭 VPN 代理，使用 mixed(http/socks) 端口进行代理。实际就是关闭了 tun 入站

## 配置信息

**userAgent** ${userAgent}

**转换后端** ${sub}
                `,
            protocolOptions: [
                { value: 'udp', label: '启用 UDP' },
                { value: 'ep', label: '启用 分应用代理(仅Android)' },
                { value: 'ea', label: '启用 分IPCIDR代理(ios/macOS/windows/linux 推荐)' },
                { value: 'adgdns', label: '启用 去广告dns' },
                { value: 'tun', label: '启用 仅代理' },
            ],
        },
        singbox: {
            name: 'Singbox',
            placeholder: '请输入singbox订阅地址url，支持各种订阅或单节点链接',
            tipText: `
## singbox 使用提示：

- 支持各种订阅或单节点链接，自动合并生成配置
- 面板地址: http://127.0.0.1:20123
- mixed(http/socks) 端口: 20120
- 使用 sub-store 后端转换
- 适用于 sing-box 客户端
- 支持 1.11.x
- 支持 1.12.x
- 支持 1.13.x
- 支持 1.14.x
- 去广告使用 [秋风广告规则](https://github.com/TG-Twilight/AWAvenue-Ads-Rule.git)
- 防止 DNS 泄漏(安全DNS/DoH)
- 屏蔽 WebRTC 泄漏(防止真实IP暴露)
- 关闭所有覆写功能(不是关闭功能，是关闭覆写)以确保配置正常生效

## 附加参数说明

- UDP: 启用 UDP 代理流量 [查看详情](https://sing-box.sagernet.org/zh/configuration/route/rule_action/#udp_disable_domain_unmapping)
- UDP 分段: [查看详情](https://sing-box.sagernet.org/zh/configuration/shared/dial/#udp_fragment)
- TLS 分段: 绕过被防火墙拦截的域名 [查看详情](https://sing-box.sagernet.org/zh/configuration/route/rule_action/#tls_fragment)
- 分应用代理: 排除 CN 应用(仅包含android应用)不入代理工具 [查看详情](https://sing-box.sagernet.org/zh/configuration/inbound/tun/#exclude_package)
- 分IPCIDR代理: 排除 CN IP 不进入代理工具 [查看详情](https://sing-box.sagernet.org/zh/configuration/inbound/tun/#route_exclude_address)
- tailscale: [查看详情](https://sing-box.sagernet.org/zh/configuration/endpoint/tailscale)
- 去广告dns: 直连使用 [dns.18bit.cn](https://www.18bit.cn), 代理使用 [dns.adguard-dns.com](https://adguard-dns.io/)
- 仅代理: 关闭 VPN 代理，使用 mixed(http/socks) 端口进行代理。实际就是关闭了 tun 入站

## 配置信息

**userAgent** ${userAgent}

**转换后端** ${sub}
                `,
            protocolOptions: [
                { value: 'udp', label: '启用 UDP' },
                { value: 'udp_frag', label: '启用 UDP 分段' },
                { value: 'tls_frag', label: '启用 TLS 分段' },
                { value: 'ep', label: '启用 分应用代理(仅Android)' },
                { value: 'ea', label: '启用 分IPCIDR代理(ios/macOS/windows/linux 推荐)' },
                { value: 'tailscale', label: '启用 tailscale' },
                { value: 'adgdns', label: '启用 去广告dns' },
                { value: 'tun', label: '启用 仅代理' },
            ],
        },
        v2ray: {
            name: 'V2Ray',
            placeholder: '请输入V2Ray订阅地址url, 支持各种订阅或单节点链接',
            tipText: `
**转换后端** ${sub}
                `,
            protocolOptions: [],
            noTemplate: true, // 添加此标志表示不需要 protocolOptions 和 模板
        },
    };
    return JSON.stringify(modes);
}

function sanitizeContentDisposition(headers) {
    const contentDisposition = headers.get('Content-Disposition') || headers.get('content-disposition');

    if (!contentDisposition) return null;

    const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);

    if (!filenameMatch) return null;

    const originalFilename = filenameMatch[1];

    // 检查是否含中文(或非 ASCII)
    const isNonAscii = /[^\x00-\x7F]/.test(originalFilename);
    if (!isNonAscii) return contentDisposition; // 不含中文，保持原样

    // 使用 fallback ASCII 名 + filename*=UTF-8''xxx 形式替换
    const fallback = 'download.json';
    const encoded = encodeURIComponent(originalFilename);

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
    const urls = ['/Kwisma/clash-rules/release/cncidr.yaml'];

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
