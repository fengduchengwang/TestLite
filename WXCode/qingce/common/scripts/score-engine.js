(function () {
  const root = window.PsyTest;

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
      });
      const selected = question.options[answers[index]];
      if (!selected) return;
      keys.forEach(key => { raw[key] += Number(selected.score[key] || 0); });
    });

    const percentages = Object.fromEntries(keys.map(key => {
      const range = max[key] - min[key];
      const value = range ? ((raw[key] - min[key]) / range) * 100 : 0;
      return [key, Math.round(root.utils.clamp(value, 0, 100))];
    }));

    const ranked = [...test.dimensions].sort((a, b) => percentages[b.key] - percentages[a.key]);
    return { raw, min, max, percentages, ranked };
  }

  root.score = score;
}());
