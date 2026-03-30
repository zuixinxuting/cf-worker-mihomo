import { splitUrlsAndProxies, fetchResponse } from '../../utils/index.js';
import getOutbounds_Data from './outbounds.js';
import Config111 from '../../config/singbox_1.11.X.js';
import Config112 from '../../config/singbox_1.12.X.js';
import Config112Alpha from '../../config/singbox_1.12.X_alpha.js';
import Config113 from '../../config/singbox_1.13.X.js';
import Config114 from '../../config/singbox_1.14.X.js';
export async function getsingbox_config(e) {
    const config = structuredClone(Verbose(e));
    e.urls = splitUrlsAndProxies(e.urls);

    // 并行执行所有异步操作，每个操作独立处理成功或失败
    const [outboundsResult, ruleResult, excludePackageResult, excludeAddressResult] = await Promise.allSettled([
        getOutbounds_Data(e), // 获取节点数据
        fetchResponse(e.rule), // 获取规则数据
        e.exclude_package ? fetchpackExtract() : Promise.resolve(null), // 可选：排除包
        e.exclude_address ? fetchipExtract() : Promise.resolve(null), // 可选：排除地址
    ]);

    // 处理节点数据（必需）
    if (outboundsResult.status === 'rejected') {
        throw new Error(`获取节点数据失败: ${outboundsResult.reason}`);
    }

    const Outbounds_Data = outboundsResult.value;
    if (!Outbounds_Data?.data?.outbounds || Outbounds_Data?.data?.outbounds?.length === 0) {
        throw new Error(`节点为空，请使用有效订阅`);
    }

    // 处理规则数据（必需）
    if (ruleResult.status === 'rejected') {
        throw new Error(`获取规则数据失败: ${ruleResult.reason}`);
    }
    const Rule_Data = structuredClone(ruleResult.value);

    // 处理可选的排除数据（失败时只警告，不中断流程）
    if (e.exclude_package && excludePackageResult.status === 'fulfilled') {
        e.Exclude_Package = excludePackageResult.value;
    } else if (e.exclude_package && excludePackageResult.status === 'rejected') {
        console.warn(`获取排除包数据失败: ${excludePackageResult.reason}`);
    }

    if (e.exclude_address && excludeAddressResult.status === 'fulfilled') {
        e.Exclude_Address = excludeAddressResult.value;
    } else if (e.exclude_address && excludeAddressResult.status === 'rejected') {
        console.warn(`获取排除地址数据失败: ${excludeAddressResult.reason}`);
    }

    // 处理节点数据
    Outbounds_Data.data.outbounds = outboundArrs(Outbounds_Data.data);
    const ApiUrlname = Outbounds_Data.data.outbounds.map((res) => res.tag);

    // 策略组处理
    Rule_Data.data.outbounds = loadAndSetOutbounds(Rule_Data.data.outbounds, ApiUrlname, e);

    // 合并节点
    Rule_Data.data.outbounds.push(...Outbounds_Data.data.outbounds);
    applyTemplate(config, Rule_Data.data, e);
    return {
        status: Outbounds_Data.status,
        headers: Outbounds_Data.headers,
        data: JSON.stringify(config, null, 4),
    };
}
export function Verbose(e) {
    let top,
        matched = false;
    const v112alphaMatch = e.userAgent.match(/1\.12\.0\-alpha\.(\d{1,2})\b/);
    const v112betaMatch = e.userAgent.match(/1\.12\.0\-beta\.(\d{1,2})\b/);
    const v111Match = e.userAgent.match(/1\.11\.(\d+)/);
    const v112Match = e.userAgent.match(/1\.12\.(\d+)/);
    const v113Match = e.userAgent.match(/1\.13\.(\d+)/);
    const v114Match = e.userAgent.match(/1\.14\.(\d+)/);
    if (!/singbox|sing-box|sfa|sfm/i.test(e.userAgent)) throw new Error('不支持的客户端');
    // 匹配 1.12 alpha 版本
    if (v112alphaMatch && !matched) {
        const num = parseInt(v112alphaMatch[1], 10);
        if (num >= 0 && num <= 23) {
            top = Config112Alpha;
            matched = true;
        }
    }
    // 匹配 1.11 中的 1.12 beta 版本
    if (v112betaMatch && !matched) {
        const num = parseInt(v112betaMatch[1], 10);
        if (num >= 0 && num <= 9) {
            top = Config111;
            e.tailscale = false;
            e.tls_fragment = false;
            matched = true;
        }
    }
    // 匹配 1.11.x 版本
    if (v111Match && !matched) {
        top = Config111;
        e.tailscale = false;
        e.tls_fragment = false;
        matched = true;
    }
    // 匹配 1.12.x 版本
    if (v112Match && !matched) {
        top = Config112;
        matched = true;
    }
    // 匹配 1.13.x 版本
    if (v113Match && !matched) {
        top = Config113;
        matched = true;
    }
    // 匹配 1.14.x 版本
    if (v114Match && !matched) {
        top = Config114;
        matched = true;
    }
    if (!matched) {
        throw new Error(`不支持的 Singbox 版本：${e.userAgent}`);
    }
    return top;
}

/**
 * 处理配置文件中的 outbounds 数组：
 * 1. 先排除特定类型（如 direct、dns 等）；
 * 2. 根据参数决定是否为 tag 添加序号后缀；
 *
 * @param {Object} data - 包含 outbounds 数组的配置对象
 * @returns {Array<Object>} 处理后的 outbounds 数组
 */
export function outboundArrs(data) {
    const excludedTypes = ['direct', 'block', 'dns', 'selector', 'urltest'];
    if (data && Array.isArray(data.outbounds)) {
        const filteredOutbounds = data.outbounds.filter((outbound) => {
            if (excludedTypes.includes(outbound.type)) return false;
            if (outbound?.server === '') return false;
            if (outbound?.server_port < 1) return false;
            if (outbound?.password === '') return false;
            return true;
        });
        return filteredOutbounds;
    }
}
// 策略组处理
export function loadAndSetOutbounds(Outbounds, ApiUrlname, e) {
    // 处理每个 outbound 的过滤器
    const processOutboundFilters = (outbound) => {
        let matchedOutbounds = [];
        let hasValidAction = false;

        outbound.filter?.forEach((filter) => {
            if (filter.action !== 'all') {
                // 检查 keywords 是否存在且有效
                if (!filter.keywords || typeof filter.keywords !== 'string') {
                    return;
                }
            }

            let currentMatched = [];

            if (filter.action === 'all') {
                currentMatched = ApiUrlname;
                hasValidAction = true;
            } else {
                // 处理正则表达式模式
                const { pattern, ignoreCase } = parseRegexPattern(filter.keywords);
                const regex = new RegExp(pattern, ignoreCase ? 'i' : '');

                // 根据不同的 action 类型处理匹配
                currentMatched = applyFilterAction(ApiUrlname, regex, filter.action);
                hasValidAction = true;
            }

            if (currentMatched.length > 0) {
                matchedOutbounds = [...matchedOutbounds, ...currentMatched];
            }
        });

        return { matchedOutbounds: [...new Set(matchedOutbounds)], hasValidAction };
    };

    // 解析正则表达式模式
    const parseRegexPattern = (keywords) => {
        if (!keywords || typeof keywords !== 'string') {
            return { pattern: '^$', ignoreCase: false }; // 返回不匹配任何内容的模式
        }

        const ignoreCase = /\(\?i\)/i.test(keywords);
        const pattern = keywords.replace(/\(\?i\)/gi, '');
        return { pattern, ignoreCase };
    };

    // 应用过滤器操作
    const applyFilterAction = (items, regex, action) => {
        switch (action) {
            case 'include':
                return items.filter((name) => regex.test(name));
            case 'exclude':
                return items.filter((name) => !regex.test(name));
            default:
                return [];
        }
    };

    // 更新 outbounds 数组
    const updateOutboundsArray = (outbound, matchedOutbounds, hasValidAction) => {
        if (matchedOutbounds.length > 0) {
            outbound.outbounds = outbound.outbounds ? [...new Set([...outbound.outbounds, ...matchedOutbounds])] : matchedOutbounds;
        } else if (outbound.outbounds && outbound.outbounds.length > 0) {
            // 保留原有的 outbounds（没有匹配到但原本有内容）
        } else {
            delete outbound.outbounds;
        }

        // 删除 filter 字段
        delete outbound.filter;
        return outbound;
    };

    // 清理被删除的 tags
    const cleanRemovedTags = (outbounds) => {
        // 找出所有 outbounds 为空的项（将被删除的 tags）
        const removedTags = outbounds
            .filter((item) => !item.outbounds || (Array.isArray(item.outbounds) && item.outbounds.length === 0))
            .map((item) => item.tag)
            .filter((tag) => tag !== undefined);

        // 从所有 outbounds 数组中删除这些 tags
        const cleanedOutbounds = outbounds.map((item) => {
            if (item.outbounds && Array.isArray(item.outbounds)) {
                // 严格匹配 tag 名称（完全相等）
                item.outbounds = item.outbounds.filter((tag) => !removedTags.includes(tag));
            }
            return item;
        });

        // 过滤掉 outbounds 数组为空或不存在的策略组
        return cleanedOutbounds.filter((item) => {
            return item.outbounds && Array.isArray(item.outbounds) && item.outbounds.length > 0;
        });
    };

    // 主处理流程
    const processedOutbounds = Outbounds.map((outbound) => {
        const { matchedOutbounds, hasValidAction } = processOutboundFilters(outbound);
        return updateOutboundsArray(outbound, matchedOutbounds, hasValidAction);
    });
    if (e.relay && e.proxyname) {
        processedOutbounds.splice(2, 0, {
            tag: '🔗链式代理',
            type: 'selector',
            interrupt_exist_connections: true,
            outbounds: e.proxyname,
        });
    }
    return cleanRemovedTags(processedOutbounds);
}

export function applyTemplate(top, rule, e) {
    const existingSet = Array.isArray(top.route.rule_set) ? top.route.rule_set : [];
    const newSet = Array.isArray(rule.route.rule_set) ? rule.route.rule_set : [];
    const mergedMap = new Map();
    for (const item of existingSet) {
        if (item?.tag) mergedMap.set(item.tag, item);
    }
    for (const item of newSet) {
        if (item?.tag) mergedMap.set(item.tag, item);
    }
    top.inbounds = rule?.inbounds || top.inbounds;
    top.outbounds = [...(Array.isArray(top.outbounds) ? top.outbounds : []), ...(Array.isArray(rule?.outbounds) ? rule.outbounds : [])];
    top.route.final = rule?.route?.final || top.route.final;
    top.route.rules = [...(Array.isArray(top.route.rules) ? top.route.rules : []), ...(Array.isArray(rule?.route?.rules) ? rule.route.rules : [])];
    top.route.rule_set = Array.from(mergedMap.values());

    // 添加排除包和排除地址配置
    if (e.tun) {
        top.inbounds = top.inbounds.filter((p) => p.type !== 'tun');
    } else {
        if (e.exclude_package) addExcludePackage(top, e.Exclude_Package);
        if (e.exclude_address) addExcludeAddress(top, e.Exclude_Address);
    }
    // 添加 tailscale 相关配置
    if (e.tailscale) {
        top.dns.servers.push({
            type: 'tailscale',
            endpoint: 'ts-ep',
            accept_default_resolvers: true,
        });
        top.endpoints = top.endpoints || [];
        top.endpoints.push({
            type: 'tailscale',
            tag: 'ts-ep',
            auth_key: '',
            hostname: 'singbox-tailscale',
            udp_timeout: '5m',
        });
    }

    if (/ref1nd/i.test(e.userAgent)) {
        for (const item of top.route.rules) {
            if (item.action === 'resolve') {
                item.match_only = true;
            }
        }
    }
    // 处理 route-options 规则
    top.route.rules = top.route.rules.flatMap((p) => {
        if (p.action === 'route-options') {
            if (e.udp) {
                p.udp_disable_domain_unmapping = true;
                p.udp_connect = true;
                p.udp_timeout = '5m';
            }
            if (e.tls_fragment) {
                p.tls_fragment = true;
                p.tls_fragment_fallback_delay = '5m';
            }
            // 如果既没有 udp 也没有 tls_fragment 参数，则过滤掉该规则
            return e.udp || e.tls_fragment ? p : [];
        }
        return p;
    });
    const isV112 = /1\.(1[2-9]|[2-9]\d)/i.test(e.userAgent);
    if (e.adgdns) {
        top.dns.servers = top.dns.servers.map((p) => {
            if (p.tag === 'DIRECT-DNS') {
                return isV112
                    ? {
                          type: 'https',
                          tag: 'DIRECT-DNS',
                          detour: '🎯 全球直连',
                          server_port: 443,
                          server: 'doh.18bit.cn',
                          path: '/dns-query',
                          domain_resolver: 'local',
                      }
                    : {
                          tag: 'DIRECT-DNS',
                          address_resolver: 'local',
                          address: 'https://doh.18bit.cn/dns-query',
                          detour: '🎯 全球直连',
                      };
            }
            if (p.tag === 'PROXY-DNS') {
                return isV112
                    ? {
                          type: 'https',
                          tag: 'PROXY-DNS',
                          detour: '🚀 节点选择',
                          server_port: 443,
                          server: 'dns.adguard-dns.com',
                          path: '/dns-query',
                          domain_resolver: 'local',
                      }
                    : {
                          tag: 'DIRECT-DNS',
                          address_resolver: 'local',
                          address: 'https://dns.adguard-dns.com/dns-query',
                          detour: '🎯 全球直连',
                      };
            }
            return p;
        });
    }
    return top;
}

export function addExcludePackage(singboxTopData, newPackages) {
    for (const inbound of singboxTopData.inbounds) {
        if (inbound.type === 'tun') {
            if (!Array.isArray(inbound['exclude_package'])) {
                inbound['exclude_package'] = [];
            }
            inbound['exclude_package'] = Array.from(new Set([...(inbound['exclude_package'] || []), ...newPackages]));
        }
    }
}

export function addExcludeAddress(singboxTopData, newddress) {
    for (const inbound of singboxTopData.inbounds) {
        if (inbound.type === 'tun') {
            inbound['route_address'] = ['0.0.0.0/1', '128.0.0.0/1', '::/1', '8000::/1'];
            if (!Array.isArray(inbound['route_exclude_address'])) {
                inbound['route_exclude_address'] = [];
            }
            inbound['route_exclude_address'] = Array.from(new Set([...(inbound['route_exclude_address'] || []), ...newddress]));
        }
    }
}
