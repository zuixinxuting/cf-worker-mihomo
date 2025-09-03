import fs from 'fs';
import YAML from 'yaml';

// 读取原始配置文件
const originalRaw = fs.readFileSync('./Config/country_mihomo.yaml', 'utf8');
const originalData = YAML.parse(originalRaw, { maxAliasCount: -1 });

// 读取正则表达式文件
const regexRaw = fs.readFileSync('./Config/regex_only.yaml', 'utf8');
const regexData = YAML.parse(regexRaw, { maxAliasCount: -1 });

// 遍历 data 数组，替换 filter 为正则字符串
for (const item of originalData.data) {
    if (item.name) {
        // 从 name 中提取国旗（第一个 emoji）
        const flagMatch = item.name.match(/[\p{Emoji_Presentation}\p{Emoji}\u200d]+/u);
        if (flagMatch) {
            const flag = flagMatch[0];
            const regex = regexData[flag];
            if (regex) {
                item.filter = regex;
                console.log(`✅ 已替换 ${item.name} 的 filter: ${regex}`);
            }
        }
    }
}

// 输出 YAML 时保持单行对象格式
const updatedYaml = YAML.stringify(originalData, { lineWidth: Infinity, singleQuote: true });

// 写入文件
fs.writeFileSync('updated_country.yaml', updatedYaml, 'utf8');
console.log('✅ 已生成 updated_country.yaml');
