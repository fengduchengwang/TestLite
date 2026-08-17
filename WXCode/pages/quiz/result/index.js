import { fetchQuizDetail } from '~/utils/api';
import { scoreQuiz } from '~/utils/quiz/score';
import { buildQuizResult } from '~/utils/quiz/result';
import { buildRadarPoints, drawRadar } from '~/utils/quiz/radar';

const SESSION_KEY = 'quizSession';

Page({
  data: {
    key: '',
    testId: 0,
    loading: true,
    meta: {},
    display: {},
    model: null,
    showRadar: false,
    decisionPosition: 50,
  },

  async onLoad(query) {
    const key = decodeURIComponent(query.key || '');
    const testId = Number(query.testId || 0);
    const session = wx.getStorageSync(SESSION_KEY) || {};

    if (session.key !== key || !Array.isArray(session.answers)) {
      this.setData({ loading: false, key, testId });
      wx.showToast({ title: '请先完成答题', icon: 'none' });
      setTimeout(() => {
        wx.redirectTo({
          url: `/pages/quiz/intro/index?key=${encodeURIComponent(key)}&testId=${testId}`,
        });
      }, 400);
      return;
    }

    try {
      const quiz = await fetchQuizDetail(key);
      if (!quiz) {
        throw new Error('测试不存在');
      }

      const scoreData = scoreQuiz(quiz, session.answers);
      const model = buildQuizResult(quiz, session.answers, scoreData);
      const moduleSet = new Set(model.modules || []);
      const modules = {
        hero: moduleSet.has('hero'),
        decision: moduleSet.has('decision'),
        radar: moduleSet.has('radar'),
        dimensions: moduleSet.has('dimensions'),
        deepAnalysis: moduleSet.has('deepAnalysis'),
        evidence: moduleSet.has('evidence'),
        pattern: moduleSet.has('pattern'),
        strengths: moduleSet.has('strengths'),
        insight: moduleSet.has('insight'),
        actions: moduleSet.has('actions'),
        share: moduleSet.has('share'),
      };
      const decisionPosition = model.decision
        ? Math.max(5, Math.min(95, model.decision.value))
        : 50;
      const leftSignals =
        model.decision?.leftSignals?.length > 0
          ? model.decision.leftSignals
          : ['目前还没有形成足够明确的支持信号。'];
      const rightSignals =
        model.decision?.rightSignals?.length > 0
          ? model.decision.rightSignals
          : ['目前还没有形成足够明确的支持信号。'];

      this.quiz = quiz;
      this.setData({
        key,
        testId,
        loading: false,
        meta: quiz.meta,
        display: quiz.display,
        model,
        modules,
        leftSignals,
        rightSignals,
        showRadar: modules.radar,
        decisionPosition,
        isLight: model.template === 'light',
        isDeep: model.template === 'deep',
      });

      wx.setNavigationBarTitle({ title: '测试结果' });

      if (modules.radar) {
        wx.nextTick(() => this.drawRadarChart(quiz, model));
      }
    } catch (error) {
      this.setData({ loading: false, key, testId });
      wx.showToast({ title: error.message || '结果加载失败', icon: 'none' });
    }
  },

  drawRadarChart(quiz, model) {
    const radarData = buildRadarPoints(quiz.dimensions, model.scores, 300);
    const ctx = wx.createCanvasContext('radarCanvas', this);
    drawRadar(ctx, radarData);
  },

  onRestart() {
    const { key, testId } = this.data;
    wx.removeStorageSync(SESSION_KEY);
    wx.redirectTo({
      url: `/pages/quiz/intro/index?key=${encodeURIComponent(key)}&testId=${testId}`,
    });
  },

  onSave() {
    const { meta, model } = this.data;
    if (!model) return;
    const signals = model.highlights.map((item) => `${item.label} ${item.score}%`).join(' · ');
    const text = `${meta.title}\n${model.primaryProfile.name}\n${signals}\n${model.primaryProfile.verdict}\n${model.primaryProfile.share}`;
    wx.setClipboardData({
      data: text,
      success: () => wx.showToast({ title: '结果摘要已复制', icon: 'none' }),
    });
  },
});
