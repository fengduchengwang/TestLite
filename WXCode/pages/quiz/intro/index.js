import { fetchQuizDetail } from '~/utils/api';

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
    wx.redirectTo({
      url: `/pages/quiz/play/index?key=${encodeURIComponent(key)}&testId=${testId}`,
    });
  },
});
