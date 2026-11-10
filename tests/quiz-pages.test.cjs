const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const root = path.resolve(__dirname, '..');
const wxRoot = path.join(root, 'WXCode');
const quizRoot = path.join(root, 'quiz-api/data/quizzes');
const quizzes = Object.fromEntries(
  fs.readdirSync(quizRoot)
    .filter((name) => name.endsWith('.json'))
    .map((name) => [name.slice(0, -5), JSON.parse(fs.readFileSync(path.join(quizRoot, name), 'utf8'))]),
);
const sampleKey = Object.keys(quizzes).find((key) => quizzes[key].questions.length >= 6);
const clone = (value) => JSON.parse(JSON.stringify(value));

function createRuntime(fixtures = quizzes, savedStorage = new Map()) {
  const storage = new Map([...savedStorage].map(([key, value]) => [key, clone(value)]));
  const runtime = {
    storage,
    stack: [{ route: 'pages/home/index', data: {} }],
    pending: [],
    timers: new Map(),
    events: [],
    toasts: [],
    fetches: 0,
    maxDepth: 1,
    failNavigation: '',
    failStorage: '',
  };
  let timerId = 0;
  const navigate = (type, options) => {
    runtime.events.push({ type, url: options.url, delta: options.delta });
    if (runtime.failNavigation === type) {
      runtime.failNavigation = '';
      options.fail?.({ errMsg: `${type}:fail` });
      return;
    }
    runtime.pending.push({ type, options });
  };
  const wx = {
    getStorageSync: (key) => storage.has(key) ? clone(storage.get(key)) : '',
    setStorageSync(key, value) {
      if (runtime.failStorage === key) throw new Error('Storage unavailable');
      storage.set(key, clone(value));
    },
    removeStorageSync: (key) => storage.delete(key),
    setNavigationBarTitle: () => {},
    showToast: (options) => runtime.toasts.push(options.title),
    navigateTo: (options) => navigate('navigateTo', options),
    redirectTo: (options) => navigate('redirectTo', options),
    navigateBack: (options) => navigate('navigateBack', options),
  };
  const globals = {
    wx,
    getCurrentPages: () => runtime.stack,
    setTimeout(callback) {
      runtime.timers.set(++timerId, callback);
      return timerId;
    },
    clearTimeout: (id) => runtime.timers.delete(id),
    async fetchQuizDetail(key) {
      runtime.fetches += 1;
      if (runtime.fetchOverride) return runtime.fetchOverride(key);
      return fixtures[key] ? clone(fixtures[key]) : null;
    },
  };
  function evaluate(file, bindings, exports = []) {
    const source = fs.readFileSync(path.join(wxRoot, file), 'utf8')
      .replace(/^import\s[\s\S]*?from\s+['"][^'"]+['"];\s*/gm, '')
      .replace(/^export\s+/gm, '');
    const context = { ...globals, ...bindings };
    vm.runInNewContext(`${source}\n;globalThis.result = {${exports.join(',')}};`, context, { filename: file });
    return context.result;
  }
  const navigation = evaluate('pages/quiz/utils/navigation.js', {}, ['returnToQuizIntro']);
  const session = evaluate('pages/quiz/utils/playSession.js', {}, [
    'buildQuestionPath', 'startQuizSession', 'loadQuizSession', 'saveQuizAnswers', 'finishQuizSession',
  ]);
  const factory = evaluate('pages/quiz/utils/playPage.js', { ...navigation, ...session }, ['createQuizPlayPage']);
  runtime.current = () => runtime.stack.at(-1);
  runtime.mount = async (url) => {
    const parsed = new URL(url, 'https://local.invalid');
    const route = parsed.pathname.slice(1);
    let definition;
    if (route === 'pages/quiz/analyzing/index') {
      definition = { data: {} };
    } else {
      evaluate(`${route}.js`, {
        ...factory,
        ...session,
        markTestAsTested: () => {},
        Page: (value) => { definition = value; },
      });
    }
    const page = {
      ...definition,
      route,
      data: clone(definition.data),
      setData(update) { Object.assign(this.data, clone(update)); },
    };
    runtime.stack.push(page);
    runtime.maxDepth = Math.max(runtime.maxDepth, runtime.stack.length);
    const loaded = page.onLoad?.(Object.fromEntries(parsed.searchParams));
    page.onShow?.();
    await loaded;
    return page;
  };
  runtime.flush = async () => {
    for (let count = 0; runtime.pending.length; count += 1) {
      assert.ok(count < 40, 'navigation must settle');
      const { type, options } = runtime.pending.shift();
      const current = runtime.current();
      current.onHide?.();
      if (type === 'navigateBack') {
        for (let index = 0; index < options.delta; index += 1) runtime.stack.pop().onUnload?.();
        runtime.current().onShow?.();
      } else {
        if (type === 'redirectTo') runtime.stack.pop().onUnload?.();
        await runtime.mount(options.url);
      }
      options.success?.();
    }
  };
  runtime.start = async (key = sampleKey, testId = 73) => {
    await runtime.mount(`/pages/quiz/intro/index?key=${key}&testId=${testId}`);
    runtime.current().onStart();
    await runtime.flush();
  };
  runtime.select = (index) => runtime.current().onSelect({ currentTarget: { dataset: { index } } });
  runtime.tick = async () => {
    const callbacks = [...runtime.timers.values()];
    runtime.timers.clear();
    callbacks.forEach((callback) => callback());
    await runtime.flush();
  };
  runtime.answer = async (index) => {
    runtime.select(index);
    await runtime.tick();
  };
  runtime.previous = async () => {
    runtime.current().onPrevious();
    await runtime.flush();
  };
  return runtime;
}

test('registers 30 independent question pages with matching view and dark configuration', () => {
  const app = JSON.parse(fs.readFileSync(path.join(wxRoot, 'app.json'), 'utf8'));
  const routes = app.subpackages.find((pkg) => pkg.name === 'quiz').pages;
  const template = fs.readFileSync(path.join(wxRoot, 'pages/quiz/play/index.wxml'), 'utf8');
  const numbered = routes.filter((route) => /^play\/index\d{2}$/.test(route));
  assert.equal(numbered.length, 30);
  assert.equal(new Set(numbered).size, 30);
  for (const route of numbered) {
    for (const extension of ['js', 'json', 'less', 'wxml']) {
      assert.ok(fs.existsSync(path.join(wxRoot, 'pages/quiz', `${route}.${extension}`)));
    }
    assert.equal(fs.readFileSync(path.join(wxRoot, 'pages/quiz', `${route}.wxml`), 'utf8'), template);
    const config = JSON.parse(fs.readFileSync(path.join(wxRoot, 'pages/quiz', `${route}.json`), 'utf8'));
    assert.equal(config.backgroundColorContent, '#0b0e16');
  }
});

test('completes every real quiz through distinct pages, preserving answers and bounded history', async () => {
  for (const [key, quiz] of Object.entries(quizzes)) {
    const runtime = createRuntime();
    await runtime.start(key);
    const expected = [];
    for (let index = 0; index < quiz.questions.length; index += 1) {
      const page = runtime.current();
      assert.equal(page.route, `pages/quiz/play/index${String(index + 1).padStart(2, '0')}`);
      assert.equal(page.data.question.q, quiz.questions[index].q);
      assert.equal(page.data.index, index);
      const answer = index % quiz.questions[index].options.length;
      expected.push(answer);
      runtime.select(answer);
      runtime.select((answer + 1) % quiz.questions[index].options.length);
      assert.equal(runtime.timers.size, 1);
      await runtime.tick();
    }
    assert.equal(runtime.current().route, 'pages/quiz/analyzing/index');
    assert.deepEqual(runtime.storage.get('quizSession'), { key, testId: 73, answers: expected });
    assert.equal(runtime.fetches, 1);
    assert.equal(runtime.maxDepth, 4);
  }
});

test('reaches question 30 without exceeding page stack limits', async () => {
  const quiz = clone(quizzes[sampleKey]);
  quiz.questions = Array.from({ length: 30 }, (_, index) => ({ ...clone(quiz.questions[0]), q: `Question ${index + 1}` }));
  const runtime = createRuntime({ thirty: quiz });
  await runtime.start('thirty');
  for (let index = 0; index < 30; index += 1) {
    assert.equal(runtime.current().data.question.q, `Question ${index + 1}`);
    await runtime.answer(0);
  }
  assert.equal(runtime.storage.get('quizSession').answers.length, 30);
  assert.equal(runtime.maxDepth, 4);
});

test('previous pages restore selections, changes persist, and a fresh start clears old answers', async () => {
  const runtime = createRuntime();
  await runtime.start();
  await runtime.previous();
  assert.equal(runtime.current().data.index, 0);
  await runtime.answer(0);
  await runtime.answer(1);
  await runtime.previous();
  assert.equal(runtime.current().data.selected, 1);
  await runtime.previous();
  assert.equal(runtime.current().data.selected, 0);
  await runtime.answer(2);
  assert.equal(runtime.current().data.selected, 1);
  assert.deepEqual(runtime.storage.get('quizDraft').answers.slice(0, 2), [2, 1]);
  runtime.current().onBack();
  await runtime.flush();
  assert.equal(runtime.current().route, 'pages/quiz/intro/index');
  runtime.storage.set('quizSession', { key: sampleKey, answers: [2, 1] });
  runtime.current().onStart();
  await runtime.flush();
  assert.equal(runtime.current().data.selected, null);
  assert.ok(runtime.storage.get('quizDraft').answers.every((answer) => answer === null));
  assert.equal(runtime.storage.has('quizSession'), false);
});

test('restores a draft after runtime recreation and prevents skipping unanswered questions', async () => {
  const original = createRuntime();
  await original.start();
  await original.answer(0);
  await original.answer(1);
  const restored = createRuntime(quizzes, original.storage);
  await restored.mount(`/pages/quiz/play/index03?key=${sampleKey}&testId=73`);
  assert.equal(restored.current().data.index, 2);
  assert.deepEqual(restored.current().answers.slice(0, 2), [0, 1]);
  assert.equal(restored.fetches, 1);
  const skipped = createRuntime(quizzes, original.storage);
  await skipped.mount(`/pages/quiz/play/index30?key=${sampleKey}&testId=73`);
  await skipped.flush();
  assert.equal(skipped.current().route, 'pages/quiz/play/index03');
  const differentTest = createRuntime(quizzes, original.storage);
  await differentTest.mount(`/pages/quiz/play/index03?key=${sampleKey}&testId=74`);
  await differentTest.flush();
  assert.equal(differentTest.current().route, 'pages/quiz/play/index01');
  assert.equal(differentTest.current().data.selected, null);
});

test('failed navigation can retry without losing or duplicating answers', async () => {
  const runtime = createRuntime();
  await runtime.start();
  runtime.failNavigation = 'redirectTo';
  await runtime.answer(1);
  assert.equal(runtime.current().route, 'pages/quiz/play/index01');
  assert.equal(runtime.current().data.selected, 1);
  assert.equal(runtime.current().selecting, false);
  await runtime.answer(2);
  assert.equal(runtime.current().route, 'pages/quiz/play/index02');
  assert.equal(runtime.storage.get('quizDraft').answers[0], 2);
  runtime.failNavigation = 'redirectTo';
  await runtime.previous();
  assert.equal(runtime.current().route, 'pages/quiz/play/index02');
  await runtime.previous();
  assert.equal(runtime.current().data.selected, 2);
});

test('storage failure preserves the current question and allows retry', async () => {
  const runtime = createRuntime();
  await runtime.start();
  runtime.failStorage = 'quizDraft';
  await runtime.answer(1);
  assert.equal(runtime.current().data.index, 0);
  assert.equal(runtime.current().data.selected, null);
  assert.equal(runtime.timers.size, 0);
  runtime.failStorage = '';
  await runtime.answer(1);
  assert.equal(runtime.current().data.index, 1);
});

test('completion storage and analysis navigation failures remain retryable', async () => {
  const quiz = clone(quizzes[sampleKey]);
  quiz.questions = [quiz.questions[0]];
  const runtime = createRuntime({ one: quiz });
  await runtime.start('one');
  runtime.failStorage = 'quizSession';
  await runtime.answer(0);
  assert.equal(runtime.current().route, 'pages/quiz/play/index01');
  runtime.failStorage = '';
  runtime.failNavigation = 'navigateTo';
  await runtime.answer(1);
  assert.equal(runtime.current().route, 'pages/quiz/play/index01');
  await runtime.answer(2);
  assert.equal(runtime.current().route, 'pages/quiz/analyzing/index');
  assert.deepEqual(runtime.storage.get('quizSession').answers, [2]);
});

test('hiding a page cancels delayed navigation while retaining the selected answer', async () => {
  const runtime = createRuntime();
  await runtime.start();
  runtime.select(2);
  const page = runtime.current();
  page.onHide();
  assert.equal(runtime.timers.size, 0);
  await runtime.tick();
  assert.equal(runtime.current(), page);
  assert.equal(runtime.storage.get('quizDraft').answers[0], 2);
  page.onShow();
  await runtime.answer(2);
  assert.equal(runtime.current().data.index, 1);
});

test('unloaded pages do not render a late network response', async () => {
  const runtime = createRuntime();
  let resolve;
  runtime.fetchOverride = () => new Promise((done) => { resolve = done; });
  const loading = runtime.mount(`/pages/quiz/play/index01?key=${sampleKey}&testId=73`);
  runtime.current().onUnload();
  const newerDraft = { key: 'another-quiz', testId: 80, answers: [1, 2, null] };
  runtime.storage.set('quizDraft', newerDraft);
  runtime.storage.set('quizSession', { key: 'another-quiz', testId: 80, answers: [1, 2] });
  resolve(clone(quizzes[sampleKey]));
  await loading;
  assert.equal(runtime.current().data.question, null);
  assert.equal(runtime.pending.length, 0);
  assert.deepEqual(runtime.storage.get('quizDraft'), newerDraft);
  assert.equal(runtime.storage.get('quizSession').key, 'another-quiz');
});

test('unsupported quizzes fail before starting and legacy answer links still work', async () => {
  const quiz = clone(quizzes[sampleKey]);
  quiz.questions = Array.from({ length: 31 }, () => clone(quiz.questions[0]));
  const runtime = createRuntime({ long: quiz });
  await runtime.start('long');
  assert.equal(runtime.current().route, 'pages/quiz/intro/index');
  assert.equal(runtime.current().starting, false);
  assert.equal(runtime.storage.has('quizDraft'), false);
  const legacy = createRuntime();
  await legacy.mount(`/pages/quiz/play/index?key=${sampleKey}&testId=73`);
  await legacy.answer(0);
  assert.equal(legacy.current().route, 'pages/quiz/play/index02');
});
