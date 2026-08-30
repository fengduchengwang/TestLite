import { fetchQuizDetail } from '~/utils/api';

const SESSION_KEY = 'quizSession';

Page({
  data: {
    key: '',
    testId: 0,
    index: 0,
    total: 0,
    progress: 0,
    question: null,
    selected: null,
    letters: ['A', 'B', 'C', 'D'],
  },

  answers: [],

  async onLoad(query) {
    const key = decodeURIComponent(query.key || '');
    const testId = Number(query.testId || 0);

    try {
      const quiz = await fetchQuizDetail(key);
      if (!quiz) {
        wx.showToast({ title: '测试不存在', icon: 'none' });
        setTimeout(() => wx.navigateBack(), 500);
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
      setTimeout(() => wx.navigateBack(), 500);
    }
  },

  renderQuestion(index) {
    const question = this.quiz.questions[index];
    this.setData({
      index,
      question,
      selected: this.answers[index],
      progress: Math.round(((index + 1) / this.quiz.questions.length) * 100),
    });
  },

  onSelect(e) {
    if (this.selecting) return;
    const optionIndex = Number(e.currentTarget.dataset.index);
    this.answers[this.data.index] = optionIndex;
    this.setData({ selected: optionIndex });
    this.selecting = true;

    setTimeout(() => {
      this.selecting = false;
      if (this.data.index < this.quiz.questions.length - 1) {
        this.renderQuestion(this.data.index + 1);
        return;
      }

      wx.setStorageSync(SESSION_KEY, {
        key: this.data.key,
        testId: this.data.testId,
        answers: this.answers,
      });

      wx.redirectTo({
        url: `/pages/quiz/analyzing/index?key=${encodeURIComponent(this.data.key)}&testId=${this.data.testId}`,
      });
    }, 160);
  },

  onPrevious() {
    if (this.data.index <= 0) return;
    this.renderQuestion(this.data.index - 1);
  },
});
