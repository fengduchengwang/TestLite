(function () {
  const root = window.PsyTest;
  const e = root.utils.escape;

  function hero(test, model) {
    return `<header class="result-hero-card">
      <p class="result-eyebrow">${e(test.display.heroLabel)}</p>
      <h1>${e(model.primaryProfile.name)}</h1>
      <p class="result-verdict">${e(model.primaryProfile.verdict)}</p>
      <div class="hero-tags">${model.highlights.map(item => `<span>${e(item.label)} · ${item.score}%</span>`).join('')}</div>
      <div class="hero-quote">“${e(model.primaryProfile.share)}”</div>
    </header>`;
  }

  function bars(test, model) {
    return `<div class="dimension-bars">${test.dimensions.map(dimension => {
      const active = dimension.key === model.primary.key ? ' is-strongest' : '';
      return `<div class="dimension-row${active}">
        <div class="dimension-head"><span>${e(dimension.label)}</span><strong>${model.scores[dimension.key]}%</strong></div>
        <div class="dimension-track"><i style="width:${model.scores[dimension.key]}%"></i></div>
      </div>`;
    }).join('')}</div>`;
  }

  function dimensionCard(test, model, title) {
    return `<section class="report-card score-card"><p class="card-kicker">结果分布</p><h2>${e(title)}</h2>${bars(test, model)}
      <p class="card-note">百分比只表示你在本次题目中的呈现程度。每个维度独立计算，不代表人群排名或专业诊断。</p></section>`;
  }

  function radarCard(test, model) {
    return `<section class="report-card radar-card"><p class="card-kicker">整体轮廓</p><h2>${e(test.display.radarTitle)}</h2>${root.radar(test.dimensions, model.scores)}</section>`;
  }

  function analysisCard(model) {
    return `<section class="report-card analysis-card"><p class="card-kicker">深度解析</p><h2>${e(model.deepAnalysis.title)}</h2>
      <div class="rich-copy"><p>${e(model.deepAnalysis.summary)}</p>${model.deepAnalysis.tension ? `<p>${e(model.deepAnalysis.tension)}</p>` : ''}</div></section>`;
  }

  function evidenceCard(model) {
    return `<section class="report-card"><p class="card-kicker">真实作答</p><h2>答案里反复出现的信号</h2><div class="evidence-list">${model.evidence.map(item => `
      <div class="evidence"><span>${e(item.scene)}</span><b>${e(item.question)}</b><p>你选择了“${e(item.answer)}”</p></div>`).join('')}</div></section>`;
  }

  function loopCard(model) {
    const profile = model.primaryProfile;
    const steps = [
      ['01', '事情通常从这里开始', profile.trigger],
      ['02', '你会下意识这样做', profile.reaction],
      ['03', '它短期帮了你什么', profile.benefit],
      ['04', '久了以后会发生什么', profile.cost]
    ];
    return `<section class="report-card"><p class="card-kicker">现实表现</p><h2>这套模式是怎么一步步发生的</h2><div class="pattern-list">${steps.map(item => `
      <div class="pattern-step"><i>${item[0]}</i><div><b>${e(item[1])}</b><p>${e(item[2])}</p></div></div>`).join('')}</div></section>`;
  }

  function strengthsCard(model, light) {
    return `<section class="report-card"><p class="card-kicker">${light ? '更像你的地方' : '两面都值得看见'}</p><h2>${light ? '你的方式有它的好，也有它的代价' : '你正在保护什么，又付出了什么'}</h2><div class="insight-grid">
      <div class="insight-box strength"><h3>值得留下的能力</h3><ul>${model.primaryProfile.strengths.map(item => `<li>${e(item)}</li>`).join('')}</ul></div>
      <div class="insight-box cost"><h3>容易付出的代价</h3><ul>${model.primaryProfile.costs.map(item => `<li>${e(item)}</li>`).join('')}</ul></div>
    </div></section>`;
  }

  function actionCard(model, deep) {
    const actions = model.primaryProfile.actions || [];
    const visible = deep ? actions : actions.slice(0, 1);
    return `<section class="report-card action-card"><p class="card-kicker">接下来</p><h2>${deep ? '把改变拆成三步，不必一次解决全部' : '可以先从这一件小事开始'}</h2><div class="action-plan">${visible.map(item => `
      <div class="action-item"><span>${e(item.time)}</span><p>${e(item.text)}</p></div>`).join('')}</div></section>`;
  }

  function decisionCard(model) {
    if (!model.decision) return '';
    const position = root.utils.clamp(model.decision.value, 5, 95);
    const leftSignals = model.decision.leftSignals.length ? model.decision.leftSignals : ['目前还没有形成足够明确的支持信号。'];
    const rightSignals = model.decision.rightSignals.length ? model.decision.rightSignals : ['目前还没有形成足够明确的支持信号。'];
    return `<section class="report-card decision-card"><p class="card-kicker">当前判断</p><h2>你现在更接近哪一步</h2><p class="decision-verdict">${e(model.decision.label)}</p>
      <div class="decision-line"><i style="left:${position}%"></i></div><div class="decision-labels"><span>${e(model.decision.leftLabel)}</span><span>${e(model.decision.rightLabel)}</span></div>
      <div class="signal-grid"><div><h3>支持先调整的信号</h3><ul>${leftSignals.map(item => `<li>${e(item)}</li>`).join('')}</ul></div><div><h3>支持改变方向的信号</h3><ul>${rightSignals.map(item => `<li>${e(item)}</li>`).join('')}</ul></div></div></section>`;
  }

  function insightCard(model) {
    if (!model.insight) return '';
    return `<section class="report-card special-insight"><p class="card-kicker">特别提醒</p><h2>${e(model.insight.title)}</h2><p>${e(model.insight.content)}</p></section>`;
  }

  function closing(test, model) {
    return `<section class="closing-card"><p>“${e(model.primaryProfile.share)}”</p></section>
      <p class="result-disclaimer">${e(test.meta.disclaimer)}</p>
      <div class="result-actions"><button class="secondary-btn" id="restart">重新测试</button><button class="primary-btn" id="save-result">保存结果摘要</button></div>`;
  }

  function render(test, model, template) {
    const modules = {
      hero: () => hero(test, model),
      decision: () => decisionCard(model),
      radar: () => radarCard(test, model),
      dimensions: () => dimensionCard(test, model, test.display.dimensionTitle),
      deepAnalysis: () => analysisCard(model),
      evidence: () => evidenceCard(model),
      pattern: () => loopCard(model),
      strengths: () => strengthsCard(model, template === 'light'),
      insight: () => insightCard(model),
      actions: () => actionCard(model, template === 'deep'),
      share: () => closing(test, model)
    };
    const configured = Array.isArray(test.display.modules) ? test.display.modules : [];
    const content = configured.map(name => modules[name]?.() || '').join('');
    return `<main class="screen result-screen"><div class="result-shell">${content}</div></main>`;
  }

  root.renderReport = render;
}());
