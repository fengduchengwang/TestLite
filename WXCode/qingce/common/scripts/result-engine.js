(function () {
  const root = window.PsyTest;

  function compare(value, operator, target) {
    if (operator === '>=') return value >= target;
    if (operator === '<=') return value <= target;
    if (operator === '>') return value > target;
    if (operator === '<') return value < target;
    return value === target;
  }

  function conditionMatches(condition, scores) {
    const rules = condition.all || [];
    return rules.every(rule => compare(scores[rule.dimension], rule.operator, rule.value));
  }

  function buildEvidence(test, answers, ranked) {
    const focusKeys = ranked.slice(0, 3).map(item => item.key);
    const candidates = test.questions.map((question, index) => {
      const option = question.options[answers[index]];
      if (!option) return null;
      const relevance = focusKeys.reduce((total, key, focusIndex) => (
        total + Number(option.score[key] || 0) * (3 - focusIndex)
      ), 0) + (focusKeys.includes(question.dimension) ? 2 : 0);
      return { question: question.q, answer: option.text, scene: question.scene, relevance, index };
    }).filter(Boolean);

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
    const signals = side => (config.signals?.[side] || [])
      .filter(item => compare(scores[item.dimension], item.operator, item.value))
      .map(item => item.text)
      .slice(0, 4);
    return {
      value,
      state,
      label: config.states[state],
      leftLabel: config.leftLabel,
      rightLabel: config.rightLabel,
      leftSignals: signals('left'),
      rightSignals: signals('right')
    };
  }

  function buildDeepAnalysis(test, primary, secondary, primaryProfile, secondaryProfile) {
    const pairKey = `${primary.key}+${secondary.key}`;
    const reversePairKey = `${secondary.key}+${primary.key}`;
    const explicit = test.combinations[pairKey] || test.combinations[reversePairKey];
    if (explicit) return explicit;
    return {
      title: test.display.deepAnalysisTitle,
      summary: `${primaryProfile.core}${secondaryProfile.secondary ? ` ${secondaryProfile.secondary}` : ''}`,
      tension: ''
    };
  }

  function result(test, answers, scoreData) {
    const scores = scoreData.percentages;
    const ranked = scoreData.ranked;
    const primary = ranked[0];
    const secondary = ranked[1];
    const primaryProfile = test.profiles[primary.key];
    const secondaryProfile = test.profiles[secondary.key];
    const primaryDimension = test.dimensions.find(item => item.key === primary.key);
    const highlights = ranked.slice(0, test.meta.level === 'light' ? 2 : 3).map(item => ({
      key: item.key,
      label: item.label,
      score: scores[item.key]
    }));
    const insight = test.insightRules.find(rule => conditionMatches(rule.when, scores));

    return {
      scores,
      ranked,
      primary,
      secondary,
      highlights,
      primaryProfile,
      secondaryProfile,
      primaryBand: primaryDimension?.bands?.[root.utils.band(scores[primary.key])] || '',
      deepAnalysis: buildDeepAnalysis(test, primary, secondary, primaryProfile, secondaryProfile),
      insight,
      evidence: buildEvidence(test, answers, ranked),
      decision: buildDecision(test.report.decision, scores)
    };
  }

  root.result = result;
}());
