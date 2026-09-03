import { fetchQuizDetail } from '~/utils/api';
import { markTestAsTested } from '~/utils/test';
import {
  buildQuizIntroPath,
  buildQuizIntroQuery,
  buildQuizShareImage,
} from '~/utils/share';

Page({
  data: {
    key: '',
    testId: 0,
    loading: true,
    error: '',
    meta: {},
    questionCount: 0,
    dimensionCount: 0,
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

      this.setData({
        key,
        testId,
        loading: false,
        meta: quiz.meta,
        questionCount: quiz.questions.length,
        dimensionCount: quiz.dimensions.length,
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

  onStart() {
    const { key, testId } = this.data;
    if (!key) return;
    if (testId) {
      markTestAsTested(testId);
    }
    wx.redirectTo({
      url: `/pages/quiz/play/index?key=${encodeURIComponent(key)}&testId=${testId}`,
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
