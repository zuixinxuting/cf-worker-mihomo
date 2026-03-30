import { splitUrlsAndProxies, fetchpackExtract, fetchipExtract, fetchResponse } from '../../utils/index.js';
import getProxies_Data from './proxies.js';
import clashConfig from '../../config/mihomo.js';

export async function getmihomo_config(e) {
    const config = structuredClone(clashConfig);
    // 客户端验证
    if (!/meta|clash.meta|clash|clashverge|mihomo/i.test(e.userAgent)) {
        throw new Error('不支持的客户端');
    }
    if (!e.rule) {
        throw new Error('缺少规则模板');
    }

    e.urls = splitUrlsAndProxies(e.urls);

    // 并行执行所有异步操作
    const [proxiesResult, ruleResult, excludePackageResult, excludeAddressResult] = await Promise.allSettled([
        getProxies_Data(e), // 获取代理数据
        fetchResponse(e.rule), // 获取规则数据
        e.exclude_package ? fetchpackExtract() : Promise.resolve(null), // 可选：排除包
        e.exclude_address ? fetchipExtract() : Promise.resolve(null), // 可选：排除地址
    ]);

    // 处理代理数据（必需）
    if (proxiesResult.status === 'rejected') {
        throw new Error(`获取节点数据失败: ${proxiesResult.reason}`);
    }

    const Proxies_Data = proxiesResult.value;
    if (Proxies_Data.data.proxies.length === 0) {
        throw new Error('节点为空，请使用有效订阅');
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

    // 合并代理数据
    Rule_Data.data.proxies = [...(Rule_Data?.data?.proxies || []), ...Proxies_Data.data.proxies];
    Rule_Data.data['proxy-groups'] = getProxies_Grouping(Proxies_Data.data, Rule_Data.data, e);
    Rule_Data.data['proxy-providers'] = Proxies_Data?.data?.providers;
    applyTemplate(config, Rule_Data.data, e);
    return {
        status: Proxies_Data.status,
        headers: Proxies_Data.headers,
        data: JSON.stringify(config, null, 4),
    };
}

/**
 * 将模板中的 proxies、proxy-groups、rules 等字段合并到目标配置对象
 * @param {Object} target - 目标配置对象（基础配置）
 * @param {Object} template - 模板配置对象
 */
export function applyTemplate(top, rule, e) {
    top['proxy-providers'] = rule['proxy-providers'] || {};
    top.proxies = rule.proxies || [];
    top['proxy-groups'] = rule['proxy-groups'] || [];
    top.rules = rule.rules || [];
    top['sub-rules'] = rule['sub-rules'] || {};
    top['rule-providers'] = { ...(top['rule-providers'] || {}), ...(rule['rule-providers'] || {}) };
    const proxyName = rule['proxy-groups'][0].name;
    if (top.dns.nameserver && rule['proxy-groups'][0].name) {
        top.dns.nameserver = top.dns.nameserver.map((ns) => {
            if (typeof ns === 'string') {
                return ns.replace(/#PROXY/g, `#${proxyName}`);
            }
            return ns;
        });
    }
    if (e.tun && top.tun) {
        top.tun.enable = false;
    } else if (top.tun) {
        if (e.exclude_address && e.Exclude_Address) {
            top.tun['route-address'] = ['0.0.0.0/1', '128.0.0.0/1', '::/1', '8000::/1'];
            top.tun['route-exclude-address'] = e.Exclude_Address || [];
        }
        if (e.exclude_package && e.Exclude_Package) {
            top.tun['include-package'] = [];
            top.tun['exclude-package'] = e.Exclude_Package || [];
        }
    }
    if (e.adgdns) {
        top.dns.nameserver = [`https://dns.adguard-dns.com/dns-query#${proxyName}`];
        top.dns['nameserver-policy']['dns.18bit.cn'] = ['223.5.5.5'];
        top.dns['nameserver-policy']['RULE-SET:cn_domain'] = ['https://doh.18bit.cn/dns-query#DIRECT'];
    }
    return top;
}

/**
 * 获取 Mihomo 代理分组信息
 * @param {Array} proxies - 代理列表
 * @param {Array} groups - 策略组
 * @returns {Object} 分组信息
 */
export function getProxies_Grouping(proxies, groups, e) {
    const deletedGroups = []; // 用于记录已删除的组名
    const updatedGroups = groups['proxy-groups'].filter((group) => {
        let matchFound = false;
        // 确保 filter 存在并且是一个字符串
        let filter = group.filter;
        if (typeof filter !== 'string') {
            return true; // 保留没有 filter 的组
        }

        // 移除所有 (?i)，但保留后续内容
        const hasIgnoreCase = /\(\?i\)/i.test(filter);
        const cleanedFilter = filter.replace(/\(\?i\)/gi, '');

        let regex;
        try {
            regex = new RegExp(cleanedFilter, hasIgnoreCase ? 'i' : '');
        } catch (e) {
            console.warn(`无效的正则表达式: ${filter}`, e);
            return true; // 遇到错误时保留该组
        }

        // 遍历每个代理，检查是否与当前组的正则匹配
        for (let proxy of proxies.proxies) {
            if (regex.test(proxy.name)) {
                matchFound = true;
                break;
            }
        }

        // 如果没有匹配，记录删除的组并返回 false (删除该组)
        if (!matchFound && (!group.proxies || group.proxies.length === 0)) {
            deletedGroups.push(group.name);
            return false;
        }

        return true;
    });
    if (e.relay && e.proxyname) {
        updatedGroups.splice(2, 0, {
            name: '🔗链式代理',
            type: 'select',
            proxies: e.proxyname,
        });
    }
    // 遍历所有策略组，删除 deletedGroups 中的代理
    updatedGroups.forEach((group) => {
        if (group.proxies) {
            group.proxies = group.proxies.filter((proxyName) => {
                // 只删除那些在 deletedGroups 中的代理
                return !deletedGroups.some((deletedGroup) => {
                    return deletedGroup.includes(proxyName); // 检查 deletedGroups 中是否包含该代理名称
                });
            });
        }
    });

    return updatedGroups;
}
