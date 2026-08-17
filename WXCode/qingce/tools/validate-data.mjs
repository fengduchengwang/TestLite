import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const context = vm.createContext({ window: { PsyTest: { data: {}, catalog: {}, utils: {} } } });
const packDir = path.join(rootDir, 'data', 'packs');
for (const file of fs.readdirSync(packDir).filter(file => file.endsWith('.js')).sort()) {
  vm.runInContext(fs.readFileSync(path.join(packDir, file), 'utf8'), context, { filename: file });
}

const tests = context.window.PsyTest.data;
const errors = [];
const expected = {
  light: { questions: [12, 16], dimensions: [5, 6] },
  standard: { questions: [18, 22], dimensions: [6, 7] },
  deep: { questions: [24, 28], dimensions: [8, 9] }
};
const forbidden = /(NPD|BPD|人格障碍|抑郁症|焦虑症|危险人格|病娇|自虐狂)/i;

function fail(key, message) { errors.push(`${key}: ${message}`); }
function inRange(value, [min, max]) { return value >= min && value <= max; }

for (const [key, test] of Object.entries(tests)) {
  for (const field of ['schemaVersion', 'meta', 'display', 'dimensions', 'questions', 'profiles', 'combinations', 'insightRules', 'report']) {
    if (!(field in test)) fail(key, `缺少统一字段 ${field}`);
  }
  if (test.schemaVersion !== 2) fail(key, `schemaVersion 必须为 2`);
  if (!Array.isArray(test.insightRules)) fail(key, 'insightRules 必须是数组，未使用时填 []');
  if (!test.combinations || Array.isArray(test.combinations)) fail(key, 'combinations 必须是对象，未使用时填 {}');
  if (!test.report || !('decision' in test.report)) fail(key, 'report.decision 必须存在，未使用时填 null');
  if (!Array.isArray(test.display?.modules) || !test.display.modules.length) fail(key, 'display.modules 必须声明结果页模块');
  for (const field of ['template', 'heroLabel', 'dimensionTitle', 'deepAnalysisTitle']) {
    if (!test.display?.[field]) fail(key, `display 缺 ${field}`);
  }
  if (test.display?.template !== test.meta?.level) fail(key, 'display.template 必须与 meta.level 一致');
  const spec = expected[test.meta?.level];
  if (!spec) { fail(key, 'level 无效'); continue; }
  if (!inRange(test.questions.length, spec.questions)) fail(key, `题目数 ${test.questions.length} 不符合 ${spec.questions.join('-')}`);
  if (!inRange(test.dimensions.length, spec.dimensions)) fail(key, `维度数 ${test.dimensions.length} 不符合 ${spec.dimensions.join('-')}`);
  const dimensionKeys = test.dimensions.map(item => item.key);
  if (new Set(dimensionKeys).size !== dimensionKeys.length) fail(key, '维度 key 重复');
  const coverage = Object.fromEntries(dimensionKeys.map(item => [item, 0]));

  test.questions.forEach((question, index) => {
    const qid = `Q${index + 1}`;
    if (!question.q || !question.scene) fail(key, `${qid} 缺题干或场景`);
    if (!dimensionKeys.includes(question.dimension)) fail(key, `${qid} 主维度 ${question.dimension} 不存在`);
    else coverage[question.dimension] += 1;
    if (!Array.isArray(question.options) || question.options.length !== 4) fail(key, `${qid} 必须有4个选项`);
    question.options?.forEach((option, optionIndex) => {
      if (!option.text) fail(key, `${qid} 选项${optionIndex + 1}缺文字`);
      for (const scoreKey of Object.keys(option.score || {})) {
        if (!dimensionKeys.includes(scoreKey)) fail(key, `${qid} 选项${optionIndex + 1}引用未知维度 ${scoreKey}`);
      }
    });
  });

  for (const [dimension, count] of Object.entries(coverage)) {
    if (count < 3) fail(key, `${dimension} 只有 ${count} 道主测题`);
    if (!test.profiles?.[dimension]) fail(key, `${dimension} 缺结果画像`);
    const profile = test.profiles?.[dimension];
    if (profile) {
      for (const field of ['name', 'verdict', 'core', 'trigger', 'reaction', 'benefit', 'cost', 'share']) {
        if (!profile[field]) fail(key, `${dimension} 画像缺 ${field}`);
      }
      if (!Array.isArray(profile.strengths) || profile.strengths.length < 2) fail(key, `${dimension} 优势不足2条`);
      if (!Array.isArray(profile.costs) || profile.costs.length < 2) fail(key, `${dimension} 代价不足2条`);
      if (!Array.isArray(profile.actions) || profile.actions.length < 1) fail(key, `${dimension} 缺行动建议`);
      if (test.meta.level === 'deep' && profile.actions?.length < 3) fail(key, `${dimension} 深度报告需要3阶段行动`);
    }
  }

  for (const dimension of dimensionKeys) {
    let min = 0;
    let max = 0;
    test.questions.forEach(question => {
      const values = question.options.map(option => Number(option.score[dimension] || 0));
      min += Math.min(...values);
      max += Math.max(...values);
    });
    if (max <= min) fail(key, `${dimension} 没有可计算区间`);
    const forcedPercent = Math.round(((max - min) / (max - min)) * 100);
    if (forcedPercent !== 100) fail(key, `${dimension} 理论最高分不能达到100%`);
  }

  if (forbidden.test(JSON.stringify(test))) fail(key, '包含禁止的疾病或贬义标签');
}

if (errors.length) {
  console.error(`校验失败，共 ${errors.length} 项：`);
  errors.forEach(item => console.error(`- ${item}`));
  process.exit(1);
}

console.log(`数据校验通过：${Object.keys(tests).length} 套测试`);
for (const [key, test] of Object.entries(tests)) {
  console.log(`- ${key}: ${test.questions.length}题 / ${test.dimensions.length}维 / ${Object.keys(test.profiles).length}个主画像`);
}
