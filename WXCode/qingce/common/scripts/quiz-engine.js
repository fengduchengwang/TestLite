(function () {
  const root = window.PsyTest;
  const e = root.utils.escape;

  function mount(test, template) {
    const app = document.getElementById('app');
    let state = { page: 'home', index: 0, answers: Array(test.questions.length).fill(null) };
    document.title = test.meta.title;

    function renderHome() {
      app.innerHTML = `<main class="screen"><div class="shell"><div class="hero-mark">${template === 'deep' ? '深' : template === 'standard' ? '析' : '测'}</div><p class="eyebrow">${e(test.meta.categoryLabel)} · ${e(test.meta.levelLabel)}</p><h1>${e(test.meta.title)}</h1><p class="lead">${e(test.meta.subtitle)}</p><div class="meta-strip"><div class="meta-item"><strong>${test.questions.length}题</strong><span>具体情境</span></div><div class="meta-item"><strong>${test.dimensions.length}维</strong><span>独立计分</span></div><div class="meta-item"><strong>${e(test.meta.duration)}</strong><span>完成时间</span></div></div><button class="primary-btn full-btn" id="start">开始测试</button><p class="notice">${e(test.meta.disclaimer)}</p></div></main>`;
      document.getElementById('start').onclick = () => { state.page = 'quiz'; render(); };
    }

    function renderQuestion() {
      const question = test.questions[state.index];
      const selected = state.answers[state.index];
      app.innerHTML = `<header class="quiz-head"><div class="quiz-nav"><button class="icon-btn" id="quit" title="返回测试首页" aria-label="返回测试首页">←</button><span>${state.index + 1} / ${test.questions.length}</span></div><div class="progress"><i style="width:${(state.index + 1) / test.questions.length * 100}%"></i></div></header><main class="question-shell"><p class="eyebrow">${e(question.scene)}</p><h1>${e(question.q)}</h1><div class="options">${question.options.map((option, index) => `<button class="option ${selected === index ? 'selected' : ''}" data-index="${index}"><span class="letter">${String.fromCharCode(65 + index)}</span><span>${e(option.text)}</span></button>`).join('')}</div><div class="question-actions"><button class="text-btn" id="previous" ${state.index === 0 ? 'disabled' : ''}>上一题</button><span class="notice" style="margin:0">选择后自动进入下一题</span></div></main>`;
      document.getElementById('quit').onclick = () => { state.page = 'home'; render(); };
      document.getElementById('previous').onclick = () => { if (state.index > 0) { state.index -= 1; render(); } };
      document.querySelectorAll('.option').forEach(button => {
        button.onclick = () => {
          state.answers[state.index] = Number(button.dataset.index);
          button.classList.add('selected');
          setTimeout(() => {
            if (state.index < test.questions.length - 1) {
              state.index += 1;
              render();
            } else {
              state.page = 'loading';
              render();
              setTimeout(() => { state.page = 'result'; render(); }, 700);
            }
          }, 130);
        };
      });
    }

    function renderLoading() {
      app.innerHTML = `<main class="screen loading-screen"><div><div class="loader"></div><h2>正在整理你的回答</h2><p class="lead" style="margin-top:10px">正在生成结果轮廓、深度解析和具体建议...</p></div></main>`;
    }

    function renderResult() {
      const scoreData = root.score(test, state.answers);
      const model = root.result(test, state.answers, scoreData);
      app.innerHTML = root.renderReport(test, model, template);
      document.getElementById('restart').onclick = () => {
        state = { page: 'home', index: 0, answers: Array(test.questions.length).fill(null) };
        window.scrollTo(0, 0);
        render();
      };
      document.getElementById('save-result').onclick = () => {
        const signals = model.highlights.map(item => `${item.label} ${item.score}%`).join(' · ');
        const text = `${test.meta.title}\n${model.primaryProfile.name}\n${signals}\n${model.primaryProfile.verdict}\n${model.primaryProfile.share}`;
        navigator.clipboard?.writeText(text).then(() => {
          document.getElementById('save-result').textContent = '结果摘要已复制';
        }).catch(() => {
          document.getElementById('save-result').textContent = '请截图保存结果';
        });
      };
      window.scrollTo(0, 0);
    }

    function render() {
      if (state.page === 'home') renderHome();
      if (state.page === 'quiz') renderQuestion();
      if (state.page === 'loading') renderLoading();
      if (state.page === 'result') renderResult();
    }

    render();
  }

  root.mount = mount;
}());
