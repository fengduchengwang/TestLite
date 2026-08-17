import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const context = vm.createContext({ window: { PsyTest: { data: {}, catalog: {}, utils: { clamp: (v, min, max) => Math.max(min, Math.min(max, v)) } } } });
const packDir = path.join(rootDir, 'data', 'packs');
for (const file of fs.readdirSync(packDir).filter(file => file.endsWith('.js')).sort()) {
  vm.runInContext(fs.readFileSync(path.join(packDir, file), 'utf8'), context, { filename: file });
}

const tests = context.window.PsyTest.data;

function score(test, answers) {
  const keys = test.dimensions.map(item => item.key);
  const raw = Object.fromEntries(keys.map(key => [key, 0]));
  const min = Object.fromEntries(keys.map(key => [key, 0]));
  const max = Object.fromEntries(keys.map(key => [key, 0]));
  test.questions.forEach((question, index) => {
    keys.forEach(key => {
      const values = question.options.map(option => Number(option.score[key] || 0));
      min[key] += Math.min(...values);
      max[key] += Math.max(...values);
      raw[key] += Number(question.options[answers[index]].score[key] || 0);
    });
  });
  return Object.fromEntries(keys.map(key => [key, Math.round(((raw[key] - min[key]) / (max[key] - min[key])) * 100)]));
}

for (const [key, test] of Object.entries(tests)) {
  const paths = [
    test.questions.map(() => 0),
    test.questions.map(() => 1),
    test.questions.map(() => 2),
    test.questions.map(() => 3),
    test.questions.map((_, index) => index % 4)
  ];
  const signatures = new Set(paths.map(answers => {
    const scores = score(test, answers);
    return Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([dim, value]) => `${dim}:${value}`).join('|');
  }));
  if (signatures.size < 3) {
    console.error(`${key}: 5条基础答题路径只产生 ${signatures.size} 种突出维度组合`);
    process.exitCode = 1;
  } else {
    console.log(`${key}: ${signatures.size}/5 种突出维度组合，正常`);
  }
}
