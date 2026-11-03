import { fetchQuizDetail } from '~/utils/api';
import { returnToQuizIntro } from '../utils/navigation';

const SESSION_KEY = 'quizSession';

function progressHint(index, total) {
  const progress = (index + 1) / Math.max(total, 1);
  if (progress < 0.25) return '刚起步，凭第一反应';
  if (progress < 0.55) return '轮廓正在变清楚';
  if (progress < 0.85) return '你的倾向开始显形';
  return '最后几步，别改答案';
}

Page({
  data: {
    key: '',
    testId: 0,
    index: 0,
    total: 0,
    progress: 0,
    progressHint: '',
    question: null,
    selected: null,
  },

  answers: [],

  async onLoad(query) {
    const key = decodeURIComponent(query.key || '');
    const testId = Number(query.testId || 0);

    try {
      const quiz = await fetchQuizDetail(key);
      if (!quiz) {
        wx.showToast({ title: '测试不存在', icon: 'none' });
        this.returnTimer = setTimeout(() => wx.navigateBack(), 500);
        return;
      }

      this.quiz = quiz;
      this.answers = Array(quiz.questions.length).fill(null);
      this.setData({
        key,
        testId,
        total: quiz.questions.length,
      });
      wx.setNavigationBarTitle({ title: quiz.meta.title });
      this.renderQuestion(0);
    } catch (error) {
      wx.showToast({ title: error.message || '加载失败', icon: 'none' });
      this.returnTimer = setTimeout(() => wx.navigateBack(), 500);
    }
  },

  onShow() {
    this.selecting = false;
  },

  onHide() {
    this.clearTimers();
  },

  onUnload() {
    this.clearTimers();
  },

  clearTimers() {
    clearTimeout(this.selectionTimer);
    clearTimeout(this.returnTimer);
    this.selectionTimer = null;
    this.returnTimer = null;
  },

  renderQuestion(index) {
    const total = this.quiz.questions.length;
    const question = this.quiz.questions[index];
    this.setData({
      index,
      question,
      selected: this.answers[index],
      progress: Math.round(((index + 1) / total) * 100),
      progressHint: progressHint(index, total),
    });
  },

  onBack() {
    const { key, testId } = this.data;
    returnToQuizIntro(key, testId);
  },

  onSelect(e) {
    if (this.selecting) return;
    const optionIndex = Number(e.currentTarget.dataset.index);
    this.answers[this.data.index] = optionIndex;
    this.setData({ selected: optionIndex });
    this.selecting = true;

    this.selectionTimer = setTimeout(() => {
      this.selectionTimer = null;
      if (this.data.index < this.quiz.questions.length - 1) {
        this.selecting = false;
        this.renderQuestion(this.data.index + 1);
        return;
      }

      wx.setStorageSync(SESSION_KEY, {
        key: this.data.key,
        testId: this.data.testId,
        answers: this.answers,
      });

      wx.navigateTo({
        url: `/pages/quiz/analyzing/index?key=${encodeURIComponent(this.data.key)}&testId=${this.data.testId}`,
        fail: () => {
          this.selecting = false;
          wx.showToast({ title: '打开分析页失败，请重试', icon: 'none' });
        },
      });
    }, 300);
  },

  onPrevious() {
    if (this.selecting || this.data.index <= 0) return;
    this.renderQuestion(this.data.index - 1);
  },
});
