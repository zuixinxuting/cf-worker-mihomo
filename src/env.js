import { backimg, subapi, beiantext, beiandizi } from './utils/index.js';
export function buildConfig(request, env, isNode = false) {
    const url = isNode ? new URL(request.url, `http://${request.headers.host}`) : new URL(request.url);

    const getHeader = (key) => {
        if (isNode) {
            return request.headers[key.toLowerCase()];
        }
        return request.headers.get(key);
    };

    const getParam = (key) => url.searchParams.get(key);

    const getParamBool = (key) => getParam(key) === 'true';
    const getEnv = (key, fallback) => {
        if (isNode) {
            return process.env[key] ?? fallback;
        }
        return env?.[key] ?? fallback;
    };
    const data = {
        url,
        urls: getParam('url')
            ?.split(',')
            .map((u) => u.trim()),
        userAgent: getHeader('User-Agent'),
        target: getParam('target'),
        udp: getParamBool('udp'),
        udp_fragment: getParamBool('udp_frag'),
        tls_fragment: getParamBool('tls_frag'),
        exclude_package: getParamBool('ep'),
        exclude_address: getParamBool('ea'),
        tailscale: getParamBool('tailscale'),
        adgdns: getParamBool('adgdns'),
        tun: getParamBool('tun'),
        ech: getParamBool('ech'),
        relay: getParamBool('relay'),
        IMG: getEnv('IMG', backimg),
        sub: getEnv('SUB', subapi),
        beian: getEnv('BEIAN', beiantext),
        beianurl: getEnv('BEIANURL', beiandizi),
    };
    data.rule = `${url.origin}${isNode ? '/template' : ''}/${data.target}${getParam('template') ? getParam('template') : ''}`;
    return data;
}
