import { backimg, subapi, beiantext, beiandizi, configs, modes } from './utils/index.js';
export function buildConfig(request, env, isNode = false) {
    const url = isNode ? new URL(request.url, `http://${request.headers.host}`) : new URL(request.url);

    const userAgent = isNode ? request.headers['user-agent'] : request.headers.get('User-Agent');

    const getParam = (key) => {
        return url.searchParams.get(key);
    };

    const getParamBool = (key) => getParam(key) === 'true';
    const data = {
        url,
        urls: url.searchParams.getAll('url'),
        userAgent,
        target: getParam('target') || 'v2ray',
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
        configs: configs(),
    };
    data.rule = url.origin + '/template/' + data.target + getParam('template');
    data.modes = modes(data.sub, data.userAgent);
    processUrls(data);
    return data;
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