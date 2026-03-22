import { backimg, subapi, beiantext, beiandizi, configs } from './utils/index.js';
export function buildConfig(request, env, isNode = false) {
    const url = isNode
        ? new URL(request.url, `http://${request.headers.host}`)
        : new URL(request.url);

    const userAgent = isNode
        ? request.headers['user-agent']
        : request.headers.get('User-Agent');

    const getParam = (key) => {
        if (isNode) {
            return url.searchParams.get(key);
        }
        return url.searchParams.get(key);
    };

    const getParamBool = (key) => getParam(key) === 'true';

    return {
        url,
        urls: url.searchParams.getAll('url'),
        userAgent,
        rule: getParam('template'),
        singbox: getParamBool('singbox'),
        mihomo: getParamBool('mihomo'),
        v2ray: getParamBool('v2ray'),
        udp: getParamBool('udp'),
        udp_fragment: getParamBool('udp_frag'),
        tls_fragment: getParamBool('tls_frag'),
        exclude_package: getParamBool('ep'),
        exclude_address: getParamBool('ea'),
        tailscale: getParamBool('tailscale'),
        adgdns: getParamBool('adgdns'),
        tun: getParamBool('tun'),
        IMG: env?.IMG || backimg,
        sub: env?.SUB || subapi,
        beian: env?.BEIAN || beiantext,
        beianurl: env?.BEIANURL || beiandizi,
        configs: configs(env?.MIHOMO, env?.SINGBOX),
    };
}

// 处理 URL 列表的函数
export function processUrls(e) {
    if (e.urls.length === 1 && e.urls[0].includes(',')) {
        e.urls = e.urls[0].split(',').map((u) => u.trim());
    }
    return e;
}

// 检查是否为空请求
export function isEmptyRequest(e) {
    return e.urls.length === 0 || e.urls[0] === '';
}

// 获取响应类型
export function getResponseType(e) {
    if (e.singbox) return 'singbox';
    if (e.mihomo) return 'mihomo';
    if (e.v2ray) return 'v2ray';
    return null;
}