import fs from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';
import { stringify } from 'yaml';

/** @type {string[]} */
const RULE_URLS = [
  'https://cdn.jsdelivr.net/gh/antn0000/fenliu@main/4GTV.list',
];

const CWD = process.cwd();
const MIHOMO_DIR = path.join(CWD, 'rules/mihomo/4GTV');
const SINGBOX_DIR = path.join(CWD, 'rules/singbox/4GTV');

/**
 * 获取单个规则文件内容
 * @param {string} url 
 * @returns {Promise<string[]>}
 */
async function fetchRules(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const text = await res.text();
    return text
      .split('\n')
      .map(l => l.trim())
      .filter(line => line && !line.startsWith('#'));
  } catch (err) {
    console.error(`❌ Failed to fetch ${url}:`, err.message);
    return [];
  }
}

/**
 * 获取所有规则
 * @returns {Promise<string[]>}
 */
async function fetchAllRules() {
  const fetchPromises = RULE_URLS.map(url => fetchRules(url));
  const results = await Promise.all(fetchPromises);
  return results.flat();
}

/**
 * 处理规则行并分类
 * @param {string[]} lines 
 * @returns {{
 *   domain_suffix: string[],
 *   domain: string[],
 *   yamlDomains: string[]
 * }}
 */
function processRules(lines) {
  const domain_suffix = [];
  const domain = [];
  const yamlDomains = [];

  for (const line of lines) {
    const [type, valueRaw] = line.split(',');
    const value = valueRaw?.trim();
    if (!value) continue;

    if (type === 'DOMAIN-SUFFIX') {
      domain_suffix.push(value);
      yamlDomains.push(`+.${value}`);
    } else if (type === 'DOMAIN') {
      domain.push(value);
      yamlDomains.push(value);
    }
  }

  return { domain_suffix, domain, yamlDomains };
}

/**
 * 生成规则文件
 * @param {object} params 
 * @param {string[]} params.domain_suffix 
 * @param {string[]} params.domain 
 * @param {string[]} params.yamlDomains 
 */
async function generateRuleFiles({ domain_suffix, domain, yamlDomains }) {
  try {
    await Promise.all([
      fs.mkdir(MIHOMO_DIR, { recursive: true }),
      fs.mkdir(SINGBOX_DIR, { recursive: true })
    ]);

    const jsonContent = {
      version: 3,
      rules: [{ domain_suffix, domain }],
    };

    const yamlContent = { payload: yamlDomains };

    await Promise.all([
      fs.writeFile(
        path.join(SINGBOX_DIR, '4GTV.json'),
        JSON.stringify(jsonContent, null, 2),
        'utf8'
      ),
      fs.writeFile(
        path.join(MIHOMO_DIR, '4GTV_Domain.yaml'),
        stringify(yamlContent),
        'utf8'
      )
    ]);
  } catch (err) {
    console.error('❌ Failed to generate rule files:', err);
    throw err;
  }
}

async function generate4gtv() {
  try {
    const cleanedLines = await fetchAllRules();
    const ruleData = processRules(cleanedLines);
    await generateRuleFiles(ruleData);
    console.log('✅ Rules generated successfully');
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
}

generate4gtv();