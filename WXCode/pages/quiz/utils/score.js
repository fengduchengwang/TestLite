function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * 各维度独立归一化到 0–100
 * @param {object} test Schema v2 测试数据
 * @param {number[]} answers 每题选中的选项下标
 */
export function scoreQuiz(test, answers) {
  const keys = test.dimensions.map((item) => item.key);
  const raw = Object.fromEntries(keys.map((key) => [key, 0]));
  const min = Object.fromEntries(keys.map((key) => [key, 0]));
  const max = Object.fromEntries(keys.map((key) => [key, 0]));

  test.questions.forEach((question, index) => {
    keys.forEach((key) => {
      const values = question.options.map((option) => Number(option.score[key] || 0));
      min[key] += Math.min(...values);
      max[key] += Math.max(...values);
    });

    const selected = question.options[answers[index]];
    if (!selected) return;

    keys.forEach((key) => {
      raw[key] += Number(selected.score[key] || 0);
    });
  });

  const percentages = Object.fromEntries(
    keys.map((key) => {
      const range = max[key] - min[key];
      const value = range ? ((raw[key] - min[key]) / range) * 100 : 0;
      return [key, Math.round(clamp(value, 0, 100))];
    }),
  );

  const ranked = [...test.dimensions].sort((a, b) => percentages[b.key] - percentages[a.key]);

  return { raw, min, max, percentages, ranked };
}

export function scoreBand(value) {
  if (value >= 67) return 'high';
  if (value <= 33) return 'low';
  return 'medium';
}

export default {
  scoreQuiz,
  scoreBand,
};
