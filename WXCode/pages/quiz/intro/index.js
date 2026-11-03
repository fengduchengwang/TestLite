import { fetchQuizDetail } from '~/utils/api';
import { markTestAsTested } from '~/utils/test';
import {
  buildQuizIntroPath,
  buildQuizIntroQuery,
  buildQuizShareImage,
} from '~/utils/share';

function splitHeroTitle(title = '') {
  const trimmed = String(title).trim();
  if (!trimmed) return { main: '', accent: '' };
  const punct = trimmed.search(/[，,：:；;]/);
  if (punct > 1 && punct < trimmed.length - 2) {
    return {
      main: trimmed.slice(0, punct),
      accent: trimmed.slice(punct + 1).trim(),
    };
  }
  if (trimmed.length <= 8) return { main: '', accent: trimmed };
  const take = Math.min(8, Math.max(4, Math.ceil(trimmed.length * 0.42)));
  return {
    main: trimmed.slice(0, -take),
    accent: trimmed.slice(-take),
  };
}

function parseDuration(duration = '') {
  const match = String(duration).match(/(\d+)/);
  if (match) {
    return { value: match[1], label: '分钟左右' };
  }
  return { value: duration || '—', label: '完成时间' };
}

Page({
  data: {
    key: '',
    testId: 0,
    loading: true,
    error: '',
    meta: {},
    questionCount: 0,
    dimensionCount: 0,
    titleMain: '',
    titleAccent: '',
    durationValue: '',
    durationLabel: '完成时间',
  },

  async onLoad(query) {
    const key = decodeURIComponent(query.key || '');
    const testId = Number(query.testId || 0);

    try {
      const quiz = await fetchQuizDetail(key);
      if (!quiz) {
        this.setData({
          key,
          testId,
          loading: false,
          error: `没有找到测试：${key || '缺少 key'}`,
        });
        return;
      }

      const heroTitle = splitHeroTitle(quiz.meta.title);
      const duration = parseDuration(quiz.meta.duration);
      this.setData({
        key,
        testId,
        loading: false,
        meta: quiz.meta,
        questionCount: quiz.questions.length,
        dimensionCount: quiz.dimensions.length,
        titleMain: heroTitle.main,
        titleAccent: heroTitle.accent,
        durationValue: duration.value,
        durationLabel: duration.label,
      });
      wx.setNavigationBarTitle({ title: quiz.meta.title });
    } catch (error) {
      this.setData({
        key,
        testId,
        loading: false,
        error: error.message || '加载失败',
      });
    }
  },

  onShow() {
    this.starting = false;
  },

  onStart() {
    const { key, testId } = this.data;
    if (!key || this.starting) return;
    this.starting = true;
    if (testId) {
      markTestAsTested(testId);
    }
    // 整个测试流程保留上一张深色页面，重测时统一返回这里并清理流程页面。
    wx.navigateTo({
      url: `/pages/quiz/play/index?key=${encodeURIComponent(key)}&testId=${testId}`,
      fail: () => {
        this.starting = false;
        wx.showToast({ title: '打开测试失败，请重试', icon: 'none' });
      },
    });
  },

  onShareAppMessage() {
    const { key, testId, meta } = this.data;
    return {
      title: meta.title ? `来测测：${meta.title}` : '来测一个有趣的心理测试',
      path: buildQuizIntroPath(key, testId),
      imageUrl: buildQuizShareImage(key),
    };
  },

  onShareTimeline() {
    const { key, testId, meta } = this.data;
    return {
      title: meta.title ? `来测测：${meta.title}` : '来测一个有趣的心理测试',
      query: buildQuizIntroQuery(key, testId),
      imageUrl: buildQuizShareImage(key),
    };
  },
});
