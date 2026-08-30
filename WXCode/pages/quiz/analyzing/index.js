const STEP_DURATION = 1500;
const STEPS = [
  { title: '正在整理你的作答', desc: '梳理选项与情境线索' },
  { title: '正在匹配维度画像', desc: '计算各维度偏好分布' },
  { title: '正在生成专属报告', desc: '汇总画像、解析与建议' },
];

Page({
  data: {
    key: '',
    testId: 0,
    steps: STEPS.map((item, index) => ({
      ...item,
      status: index === 0 ? 'active' : 'pending',
    })),
    activeIndex: 0,
    progress: 0,
  },

  timers: [],

  onLoad(query) {
    const key = decodeURIComponent(query.key || '');
    const testId = Number(query.testId || 0);
    this.setData({ key, testId });
    this.startAnalyze();
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
    const total = STEPS.length;

    STEPS.forEach((_, index) => {
      const timer = setTimeout(() => {
        const steps = STEPS.map((item, stepIndex) => {
          if (stepIndex < index) return { ...item, status: 'done' };
          if (stepIndex === index) return { ...item, status: 'active' };
          return { ...item, status: 'pending' };
        });

        this.setData({
          steps,
          activeIndex: index,
          progress: Math.round(((index + 1) / total) * 100),
        });

        if (index === total - 1) {
          const finishTimer = setTimeout(() => {
            this.goResult();
          }, STEP_DURATION);
          this.timers.push(finishTimer);
        }
      }, index * STEP_DURATION);

      this.timers.push(timer);
    });
  },

  goResult() {
    const { key, testId } = this.data;
    wx.redirectTo({
      url: `/pages/quiz/result/index?key=${encodeURIComponent(key)}&testId=${testId}`,
    });
  },
});
