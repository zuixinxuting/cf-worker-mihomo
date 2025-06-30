import fs from 'fs/promises';
import fetch from 'node-fetch';
import { URL } from 'url';
import path from 'path';

const RULES_DIR = process.cwd();
const MIHOMO_DIR = path.join(RULES_DIR, 'rules/mihomo/Tracker');
const SINGBOX_DIR = path.join(RULES_DIR, 'rules/singbox/Tracker');

const ipv4Regex = /^(25[0-5]|2[0-4]\d|1?\d{1,2})(\.(25[0-5]|2[0-4]\d|1?\d{1,2})){3}$/;
const ipv6Regex = /^([a-fA-F0-9:]+:+)+[a-fA-F0-9]+$/;

const urlList = [
    'https://raw.githubusercontent.com/ngosang/trackerslist/master/trackers_all.txt',
    'https://raw.githubusercontent.com/ngosang/trackerslist/master/trackers_all_http.txt',
    'https://raw.githubusercontent.com/ngosang/trackerslist/master/trackers_all_https.txt',
    'https://raw.githubusercontent.com/ngosang/trackerslist/master/trackers_all_i2p.txt',
    'https://raw.githubusercontent.com/ngosang/trackerslist/master/trackers_all_ip.txt',
    'https://raw.githubusercontent.com/ngosang/trackerslist/master/trackers_all_udp.txt',
    'https://raw.githubusercontent.com/ngosang/trackerslist/master/trackers_all_ws.txt',
    'https://raw.githubusercontent.com/ngosang/trackerslist/master/trackers_best.txt',
    'https://raw.githubusercontent.com/ngosang/trackerslist/master/trackers_best_ip.txt',
    'https://raw.githubusercontent.com/XIU2/TrackersListCollection/master/all.txt',
    'https://raw.githubusercontent.com/XIU2/TrackersListCollection/master/best.txt',
    'https://raw.githubusercontent.com/XIU2/TrackersListCollection/master/http.txt',
    'https://raw.githubusercontent.com/XIU2/TrackersListCollection/master/nohttp.txt',
    'https://raw.githubusercontent.com/XIU2/TrackersListCollection/master/other.txt',
    'https://raw.githubusercontent.com/DeSireFire/animeTrackerList/master/AT_best.txt',
    'https://raw.githubusercontent.com/DeSireFire/animeTrackerList/master/AT_all.txt',
    'https://raw.githubusercontent.com/DeSireFire/animeTrackerList/master/AT_all_udp.txt',
    'https://raw.githubusercontent.com/DeSireFire/animeTrackerList/master/ATline_all_http.txt',
    'https://raw.githubusercontent.com/DeSireFire/animeTrackerList/master/ATline_all_https.txt',
    'https://raw.githubusercontent.com/DeSireFire/animeTrackerList/master/ATline_all_ws.txt',
    'https://raw.githubusercontent.com/DeSireFire/animeTrackerList/master/ATline_best_ip.txt',
    'https://raw.githubusercontent.com/DeSireFire/animeTrackerList/master/ATline_all_ip.txt',
    'https://raw.githubusercontent.com/DeSireFire/animeTrackerList/master/ATline_bad.txt',
    'https://raw.githubusercontent.com/hezhijie0327/Trackerslist/refs/heads/main/trackerslist_combine.txt',
    'https://raw.githubusercontent.com/hezhijie0327/Trackerslist/refs/heads/main/trackerslist_exclude.txt',
    'https://raw.githubusercontent.com/hezhijie0327/Trackerslist/refs/heads/main/trackerslist_tracker.txt',
    'https://newtrackon.com/api/stable',
    'https://newtrackon.com/api/live',
    'https://newtrackon.com/api/udp',
    'https://newtrackon.com/api/http',
    'https://newtrackon.com/api/all',
    'https://trackers.run/s/wp_ws_up_hp_hs_v4_v6.txt',
    'https://raw.githubusercontent.com/1265578519/OpenTracker/refs/heads/master/tracker.txt',
];

const domainSet = new Set();
const ipSet = new Set();
const urlSet = new Set();

const shortenDomain = (domain) => {
    const parts = domain.split('.');
    return parts.length > 2 ? `+.${parts.slice(-2).join('.')}` : `+.${domain}`;
};

const handleLine = (line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;

    if (/^- *(DOMAIN(-SUFFIX)?),/.test(trimmed)) {
        const domain = trimmed.split(',')[1]?.trim();
        if (domain) domainSet.add(shortenDomain(domain));
        return;
    }

    if (/^- *IP-CIDR,/.test(trimmed)) {
        const cidr = trimmed.split(',')[1]?.trim();
        const ip = cidr?.split('/')[0];
        if (ip) ipSet.add(`${ip}/32`);
        return;
    }

    try {
        const parsed = new URL(trimmed.replace(/^payload:/, ''));
        urlSet.add(`${parsed}\n\n`);

        const host = parsed.hostname.replace(/^\[|\]$/g, '');
        if (ipv4Regex.test(host)) {
            ipSet.add(`${host}/32`);
        } else if (ipv6Regex.test(host)) {
            ipSet.add(`${host}/128`);
        } else {
            domainSet.add(shortenDomain(host));
        }
    } catch {
        console.warn(`Warning: Failed to parse line: ${trimmed}`);
    }
};

async function fetchAndProcess(url) {
    try {
        console.log(`Fetching ${url}...`);
        const res = await fetch(url);
        if (!res.ok) {
            console.warn(`Warning: Fetch failed for ${url} with status ${res.status}`);
            return;
        }
        const text = await res.text();
        text.split(/[\r\n,]+/)
            .map((line) => line.trim())
            .filter(Boolean)
            .forEach(handleLine);
    } catch (err) {
        console.error(`Error fetching ${url}:`, err);
    }
}

async function saveMihomoFiles() {
    const domainContent = [
        'payload:',
        ...Array.from(domainSet)
            .sort()
            .map((item) => `  - ${item}`),
    ].join('\n');

    const ipContent = [
        'payload:',
        ...Array.from(ipSet)
            .sort()
            .map((item) => `  - ${item}`),
    ].join('\n');

    await Promise.all([
        fs.writeFile(path.join(MIHOMO_DIR, 'Tracker_Domain.yaml'), domainContent, 'utf-8'),
        fs.writeFile(path.join(MIHOMO_DIR, 'Tracker_IP.yaml'), ipContent, 'utf-8'),
        fs.writeFile(path.join(MIHOMO_DIR, 'Tracker.list'), Array.from(urlSet).sort().join(''), 'utf-8')
    ]);
}

async function saveSingboxFiles() {
    const domainRules = {
        domain_suffix: Array.from(domainSet)
            .map(domain => domain.replace(/^\+\./, ''))
            .filter(domain => domain)
    };
    const ipRules = {
        ip_cidr: Array.from(ipSet)
            .filter(ip => ip) // 过滤空值
    };

    const singboxConfig = {
        version: 3,
        rules: [{
            ...domainRules,
            ...ipRules
        }]
    };

    await fs.writeFile(
        path.join(SINGBOX_DIR, 'Tracker.json'),
        JSON.stringify(singboxConfig, null, 2),
        'utf-8'
    );
}

async function ensureDirectories() {
    await Promise.all([
        fs.mkdir(MIHOMO_DIR, { recursive: true }),
        fs.mkdir(SINGBOX_DIR, { recursive: true })
    ]);
}

async function main() {
    try {
        await ensureDirectories();

        // 并行获取所有tracker列表
        await Promise.all(urlList.map(url => fetchAndProcess(url)));

        // 并行保存两种格式的文件
        await Promise.all([
            saveMihomoFiles(),
            saveSingboxFiles()
        ]);
    } catch (err) {
        console.error('Fatal error:', err);
        process.exit(1);
    }
}

main();