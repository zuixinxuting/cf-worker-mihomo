import { backimg, subapi, beiantext, beiandizi } from './utils/index.js';
export function buildConfig(request, env, isNode = false) {
    const url = isNode ? new URL(request.url, `http://${request.headers.host}`) : new URL(request.url);

    const userAgent = isNode ? request.headers['user-agent'] : request.headers.get('User-Agent');

    const getParam = (key) => {
        return url.searchParams.get(key);
    };

    const getParamBool = (key) => getParam(key) === 'true';
    const data = {
        url,
        urls: getParam('url')
            ?.split(',')
            .map((u) => u.trim()),
        userAgent,
        target: getParam('target'),
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
    };
    data.rule = `${url.origin}${isNode ? '/template' : ''}/${data.target}${getParam('template') ? getParam('template') : ''}`;
    return data;
}
