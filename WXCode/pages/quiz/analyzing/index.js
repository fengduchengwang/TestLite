import { returnToQuizIntro } from '../utils/navigation';

const MESSAGES = ['计算各观察维度...', '对比你的结果分布...', '生成专属结果页...'];
const MESSAGE_INTERVAL = 520;
const TOTAL_DURATION = 1650;

Page({
  data: {
    key: '',
    testId: 0,
    message: MESSAGES[0],
    retry: false,
  },

  timers: [],

  onLoad(query) {
    const key = decodeURIComponent(query.key || '');
    const testId = Number(query.testId || 0);
    this.setData({ key, testId });
    this.resultOpened = false;
    this.navigating = false;
  },

  onShow() {
    // 从结果页返回时直接回到开始页，避免停留在已完成的分析页或再次打开结果。
    if (this.resultOpened) {
      returnToQuizIntro(this.data.key, this.data.testId);
      return;
    }
    this.startAnalyze();
  },

  onHide() {
    this.clearTimers();
  },

  onUnload() {
    this.clearTimers();
  },

  clearTimers() {
    (this.timers || []).forEach((timer) => clearTimeout(timer));
    this.timers = [];
  },

  startAnalyze() {
    this.clearTimers();
    this.setData({ retry: false, message: MESSAGES[0] });

    MESSAGES.forEach((message, index) => {
      const timer = setTimeout(() => {
        this.setData({ message });
      }, index * MESSAGE_INTERVAL);
      this.timers.push(timer);
    });

    const finishTimer = setTimeout(() => {
      this.goResult();
    }, TOTAL_DURATION);
    this.timers.push(finishTimer);
  },

  goResult() {
    if (this.navigating) return;
    this.navigating = true;
    const { key, testId } = this.data;
    wx.navigateTo({
      url: `/pages/quiz/result/index?key=${encodeURIComponent(key)}&testId=${testId}`,
      success: () => {
        this.resultOpened = true;
      },
      fail: () => {
        this.navigating = false;
        this.setData({ retry: true, message: '结果暂时未能打开，请重试' });
      },
    });
  },
});
