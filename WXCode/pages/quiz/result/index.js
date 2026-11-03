import { fetchQuizDetail } from '~/utils/api';
import {
  buildQuizIntroPath,
  buildQuizIntroQuery,
  buildQuizShareImage,
} from '~/utils/share';
import { scoreQuiz } from '../utils/score';
import { buildQuizResult } from '../utils/result';
import { buildRadarPoints, drawRadar } from '../utils/radar';
import { createShareImageController } from '../utils/shareImage';
import { preloadMiniprogramQrcode } from '../utils/sharePoster';
import { returnToQuizIntro } from '../utils/navigation';

const SESSION_KEY = 'quizSession';
// 结果卡渐变色 [起, 终]，按主维度序号轮换，结果页与分享海报共用 identity.deep / identity.end。
const CARD_COLORS = [
  ['#152844', '#4e8fbd'],
  ['#2a1b4d', '#7a5cc4'],
  ['#0f3a3f', '#3f9a96'],
  ['#4a1f33', '#b5587a'],
  ['#4a2f14', '#b8813f'],
  ['#16372a', '#4f9a70'],
  ['#1d2457', '#5a6fd0'],
  ['#4a1a22', '#b04a55'],
];
const DIMENSION_COLORS = ['#e96f94', '#e3a75e', '#a987f4', '#72aee6', '#6bc8a0'];

function pad2(value) {
  return String(value).padStart(2, '0');
}

function buildIdentity(quiz, model) {
  const dimensions = quiz.dimensions || [];
  const primaryIndex = Math.max(
    0,
    dimensions.findIndex((item) => item.key === model.primary.key),
  );
  const number = pad2(primaryIndex + 1);
  const [deep, end] = CARD_COLORS[primaryIndex % CARD_COLORS.length];
  return {
    deep,
    end,
    code: String(model.primary.key || 'TYPE')
      .replace(/_/g, '')
      .slice(0, 8)
      .toUpperCase(),
    rank: `${number} / ${pad2(dimensions.length || 1)}`,
    number,
    footLeft: quiz.meta?.categoryLabel || 'SPECTRUM',
    footRight: `${quiz.questions.length} QUESTIONS · ${dimensions.length} DIMENSIONS`,
  };
}

function buildPortraitText(model) {
  const primaryLabel = model.primary?.label;
  const secondaryLabel = model.secondary?.label;
  if (!primaryLabel) return '';
  if (!secondaryLabel || secondaryLabel === primaryLabel) {
    return `你本次最突出的维度是${primaryLabel}。这也是你与其他人最不同的地方。`;
  }
  return `你最突出的两项是${primaryLabel}和${secondaryLabel}。这也是你与同一类结果里其他人最不同的地方。`;
}

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
    this.setData({ key, testId });
    this.shareImagePath = '';
    this.qrcodeDataUrl = '';
    this.shareImageController = createShareImageController(this);
    this.entrancePath = `/pages/quiz/intro/index?key=${encodeURIComponent(key)}&testId=${testId}`;
    const session = wx.getStorageSync(SESSION_KEY) || {};

    if (session.key !== key || !Array.isArray(session.answers)) {
      returnToQuizIntro(key, testId);
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

      const dimensionBars = (model.dimensionBars || []).map((item, index) => ({
        ...item,
        color: DIMENSION_COLORS[index % DIMENSION_COLORS.length],
      }));

      this.quiz = quiz;
      this.setData({
        key,
        testId,
        loading: false,
        meta: quiz.meta,
        display: quiz.display,
        model: {
          ...model,
          dimensionBars,
        },
        modules,
        identity: buildIdentity(quiz, model),
        portraitText: buildPortraitText(model),
        declarationSignature: `— ${quiz.meta.title} · ${model.primaryProfile?.name || ''}`,
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

      preloadMiniprogramQrcode().then((dataUrl) => {
        this.qrcodeDataUrl = dataUrl;
      });
    } catch (error) {
      this.setData({ loading: false, key, testId });
      wx.showToast({ title: error.message || '结果加载失败', icon: 'none' });
    }
  },

  drawRadarChart(quiz, model) {
    const radarData = buildRadarPoints(quiz.dimensions, model.scores, 300);
    const ctx = wx.createCanvasContext('radarCanvas', this);
    drawRadar(ctx, radarData, 'dark');
  },

  onBack() {
    const { key, testId } = this.data;
    returnToQuizIntro(key, testId);
  },

  onRestart() {
    const { key, testId } = this.data;
    wx.removeStorageSync(SESSION_KEY);
    returnToQuizIntro(key, testId);
  },

  getSharePayload() {
    const { meta, model, display, modules, identity } = this.data;
    return {
      meta,
      model,
      display,
      modules,
      identity,
    };
  },

  onShareResult() {
    if (!this.data.model) return;
    this.shareImageController.shareResult(this.getSharePayload(), this.entrancePath);
  },

  buildShareTitle() {
    const { meta, model } = this.data;
    const resultName = model?.primaryProfile?.name;
    if (meta?.title && resultName) {
      return `「${meta.title}」我的结果：${resultName}`;
    }
    if (meta?.title) {
      return `我刚完成了「${meta.title}」`;
    }
    return '我刚完成一个心理测试';
  },

  onShareAppMessage() {
    const { key, testId } = this.data;
    return {
      title: this.buildShareTitle(),
      path: buildQuizIntroPath(key, testId),
      imageUrl: buildQuizShareImage(key),
    };
  },

  onShareTimeline() {
    const { key, testId } = this.data;
    return {
      title: this.buildShareTitle(),
      query: buildQuizIntroQuery(key, testId),
      imageUrl: buildQuizShareImage(key),
    };
  },
});
