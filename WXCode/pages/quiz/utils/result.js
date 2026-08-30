import { scoreBand } from './score';

function compare(value, operator, target) {
  if (operator === '>=') return value >= target;
  if (operator === '<=') return value <= target;
  if (operator === '>') return value > target;
  if (operator === '<') return value < target;
  return value === target;
}

function conditionMatches(condition, scores) {
  const rules = condition?.all || [];
  return rules.every((rule) => compare(scores[rule.dimension], rule.operator, rule.value));
}

function buildEvidence(test, answers, ranked) {
  const focusKeys = ranked.slice(0, 3).map((item) => item.key);
  const candidates = test.questions
    .map((question, index) => {
      const option = question.options[answers[index]];
      if (!option) return null;
      const relevance =
        focusKeys.reduce(
          (total, key, focusIndex) => total + Number(option.score[key] || 0) * (3 - focusIndex),
          0,
        ) + (focusKeys.includes(question.dimension) ? 2 : 0);
      return {
        question: question.q,
        answer: option.text,
        scene: question.scene,
        relevance,
        index,
      };
    })
    .filter(Boolean);

  return candidates.sort((a, b) => b.relevance - a.relevance || a.index - b.index).slice(0, 3);
}

function buildDecision(config, scores) {
  if (!config) return null;

  let total = 0;
  let weightTotal = 0;
  Object.entries(config.weights || {}).forEach(([key, weight]) => {
    const direction = weight >= 0 ? scores[key] : 100 - scores[key];
    total += direction * Math.abs(weight);
    weightTotal += Math.abs(weight);
  });

  const value = Math.round(total / Math.max(weightTotal, 1));
  const state = value >= 62 ? 'right' : value <= 42 ? 'left' : 'middle';

  const signals = (side) =>
    (config.signals?.[side] || [])
      .filter((item) => compare(scores[item.dimension], item.operator, item.value))
      .map((item) => item.text)
      .slice(0, 4);

  return {
    value,
    state,
    label: config.states[state],
    leftLabel: config.leftLabel,
    rightLabel: config.rightLabel,
    leftSignals: signals('left'),
    rightSignals: signals('right'),
  };
}

function buildDeepAnalysis(test, primary, secondary, primaryProfile, secondaryProfile) {
  const pairKey = `${primary.key}+${secondary.key}`;
  const reversePairKey = `${secondary.key}+${primary.key}`;
  const explicit = test.combinations?.[pairKey] || test.combinations?.[reversePairKey];
  if (explicit) return explicit;
  return {
    title: test.display.deepAnalysisTitle,
    summary: `${primaryProfile.core}${secondaryProfile.secondary ? ` ${secondaryProfile.secondary}` : ''}`,
    tension: '',
  };
}

/**
 * 根据作答生成结果模型
 */
export function buildQuizResult(test, answers, scoreData) {
  const scores = scoreData.percentages;
  const ranked = scoreData.ranked;
  const primary = ranked[0];
  const secondary = ranked[1];
  const primaryProfile = test.profiles[primary.key];
  const secondaryProfile = test.profiles[secondary.key];
  const primaryDimension = test.dimensions.find((item) => item.key === primary.key);
  const highlightCount = test.meta.level === 'light' ? 2 : 3;

  const highlights = ranked.slice(0, highlightCount).map((item) => ({
    key: item.key,
    label: item.label,
    score: scores[item.key],
  }));

  const insight = (test.insightRules || []).find((rule) => conditionMatches(rule.when, scores)) || null;

  const dimensionBars = test.dimensions.map((dimension) => ({
    key: dimension.key,
    label: dimension.label,
    score: scores[dimension.key],
    isStrongest: dimension.key === primary.key,
  }));

  return {
    scores,
    ranked,
    primary,
    secondary,
    highlights,
    dimensionBars,
    primaryProfile,
    secondaryProfile,
    primaryBand: primaryDimension?.bands?.[scoreBand(scores[primary.key])] || '',
    deepAnalysis: buildDeepAnalysis(test, primary, secondary, primaryProfile, secondaryProfile),
    insight,
    evidence: buildEvidence(test, answers, ranked),
    decision: buildDecision(test.report?.decision, scores),
    patternSteps: [
      { no: '01', title: '事情通常从这里开始', text: primaryProfile.trigger },
      { no: '02', title: '你会下意识这样做', text: primaryProfile.reaction },
      { no: '03', title: '它短期帮了你什么', text: primaryProfile.benefit },
      { no: '04', title: '久了以后会发生什么', text: primaryProfile.cost },
    ],
    actions:
      test.meta.level === 'deep'
        ? primaryProfile.actions || []
        : (primaryProfile.actions || []).slice(0, 1),
    modules: Array.isArray(test.display.modules) ? test.display.modules : [],
    template: test.display.template || test.meta.level,
  };
}

export default {
  buildQuizResult,
};
