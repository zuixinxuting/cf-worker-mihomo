import assert from 'assert'
// 修改后的正则表达式（移除(?i)，使用RegExp构造函数添加i标志）
const netherlandsRegex = new RegExp(
  '(?:🇳🇱|(?:^|[\\s_-])(NL)(?:(?=$|[\\s_-])|(?:[-_0-9]+(?=$|[\\s_-])))|(?:^|[\\s_-])[-_0-9]*NL(?=$|[\\s_-])|荷兰|Netherlands|(?:(?:^|[\\s_-])AN(?=$|[\\s_-]))|安的列斯|Netherlands Antilles)',
  'i' // 忽略大小写标志
);

/**
 * 测试函数
 * @param {string} testString - 要测试的字符串
 * @param {boolean} expected - 期望的匹配结果
 * @param {string} description - 测试描述
 */
function testRegex(testString, expected, description) {
  const result = netherlandsRegex.test(testString);
  const match = netherlandsRegex.exec(testString);
  
  console.log(`测试: ${description}`);
  console.log(`输入: "${testString}"`);
  console.log(`期望: ${expected}, 实际: ${result}`);
  if (match) {
    console.log(`匹配内容: "${match[0]}"`);
    console.log(`匹配位置: ${match.index}`);
    if (match[1]) {
      console.log(`捕获组: "${match[1]}"`);
    }
  } else {
    console.log(`匹配内容: 无`);
  }
  console.log(`状态: ${result === expected ? '✓ 通过' : '✗ 失败'}`);
  console.log('---');
  
  try {
    assert.strictEqual(result, expected, `测试失败: ${description}`);
  } catch (error) {
    console.error(error.message);
  }
  
  return result === expected;
}

// 运行测试用例
console.log('=== 开始测试荷兰正则表达式 ===\n');

let passed = 0;
let total = 0;

// 应该匹配的用例（True Positive）
const positiveTests = [
  { string: 'NL', expected: true, desc: '纯NL缩写' },
  { string: 'nl', expected: true, desc: '小写nl缩写' },
  { string: ' Netherlands ', expected: true, desc: 'Netherlands前后空格' },
  { string: 'netherlands', expected: true, desc: '小写netherlands' },
  { string: 'proxy-NL', expected: true, desc: '连字符加NL' },
  { string: 'server_NL', expected: true, desc: '下划线加NL' },
  { string: 'NL123', expected: true, desc: 'NL后接数字' },
  { string: 'test-NL-server', expected: true, desc: 'NL在中间' },
  { string: '荷兰', expected: true, desc: '中文"荷兰"' },
  { string: '🇳🇱', expected: true, desc: '荷兰国旗emoji' },
  { string: 'AN', expected: true, desc: '安的列斯缩写' },
  { string: 'an', expected: true, desc: '小写an缩写' },
  { string: 'Netherlands Antilles', expected: true, desc: '安的列斯全称' },
  { string: '安的列斯', expected: true, desc: '中文"安的列斯"' },
  { string: '123NL', expected: true, desc: '数字后接NL' },
  { string: '-NL-', expected: true, desc: 'NL被连字符包围' },
];

// 不应该匹配的用例（False Positive - 特别是之前误匹配的）
const negativeTests = [
  { string: 'trojan-美国', expected: false, desc: 'trojan-美国（原误匹配）' },
  { string: 'trojan-新加坡', expected: false, desc: 'trojan-新加坡（原误匹配）' },
  { string: 'january', expected: false, desc: '包含an但不是AN缩写' },
  { string: 'channel', expected: false, desc: '包含nl但不是NL缩写' },
  { string: 'USA', expected: false, desc: '其他国家缩写' },
  { string: '中国', expected: false, desc: '其他国家中文' },
  { string: 'american', expected: false, desc: '包含an的单词' },
  { string: 'normal', expected: false, desc: '包含nl的单词' },
  { string: 'server-UK', expected: false, desc: '其他国家的节点' },
  { string: 'proxy-JP', expected: false, desc: '其他国家的节点' },
  { string: 'test-美国-node', expected: false, desc: '包含中文的节点名' },
  { string: 'random-text', expected: false, desc: '普通文本' },
  { string: '123456', expected: false, desc: '纯数字' },
  { string: '', expected: false, desc: '空字符串' },
  { string: 'analytics', expected: false, desc: '包含an的较长单词' },
  { string: 'channeling', expected: false, desc: '包含nl的较长单词' },
];

// 运行正向测试
console.log('🧪 应该匹配的用例：');
positiveTests.forEach(test => {
  if (testRegex(test.string, test.expected, test.desc)) passed++;
  total++;
});

console.log('\n🚫 不应该匹配的用例：');
negativeTests.forEach(test => {
  if (testRegex(test.string, test.expected, test.desc)) passed++;
  total++;
});

// 统计结果
console.log('=== 测试结果汇总 ===');
console.log(`总测试数: ${total}`);
console.log(`通过数: ${passed}`);
console.log(`失败数: ${total - passed}`);
console.log(`通过率: ${((passed / total) * 100).toFixed(2)}%`);

if (passed === total) {
  console.log('🎉 所有测试通过！正则表达式修改成功。');
} else {
  console.log('❌ 有测试未通过，需要进一步调整正则表达式。');
}

// 显示正则表达式详情（用于调试）
console.log('\n🔍 正则表达式详情:');
console.log(`模式: ${netherlandsRegex.source}`);
console.log(`标志: ${netherlandsRegex.flags}`);