import { returnToQuizIntro } from './navigation';
import {
  buildQuestionPath,
  finishQuizSession,
  loadQuizSession,
  saveQuizAnswers,
} from './playSession';

function progressHint(index, total) {
  const progress = (index + 1) / Math.max(total, 1);
  if (progress < 0.25) return '刚起步，凭第一反应';
  if (progress < 0.55) return '轮廓正在变清楚';
  if (progress < 0.85) return '你的倾向开始显形';
  return '最后几步，别改答案';
}

export function createQuizPlayPage(questionIndex) {
  return {
    data: {
      key: '',
      testId: 0,
      index: questionIndex,
      total: 0,
      progress: 0,
      progressHint: '',
      question: null,
      selected: null,
      letters: ['A', 'B', 'C', 'D', 'E', 'F'],
    },

    async onLoad(query) {
      const key = decodeURIComponent(query.key || '');
      const testId = Number(query.testId || 0);
      this.unloaded = false;
      this.setData({ key, testId });

      try {
        const { quiz, answers } = await loadQuizSession(key, testId);
        if (this.unloaded) return;
        this.quiz = quiz;
        this.answers = answers;
        const total = quiz.questions.length;
        const firstUnanswered = answers.findIndex((answer) => answer === null);
        const availableIndex = firstUnanswered < 0 ? total - 1 : firstUnanswered;
        if (questionIndex > availableIndex) {
          this.openQuestion(availableIndex);
          return;
        }

        this.setData({
          total,
          question: quiz.questions[questionIndex],
          selected: answers[questionIndex],
          progress: Math.round(((questionIndex + 1) / total) * 100),
          progressHint: progressHint(questionIndex, total),
        });
        wx.setNavigationBarTitle({ title: quiz.meta.title });
      } catch (error) {
        if (this.unloaded) return;
        wx.showToast({ title: error.message || '加载失败', icon: 'none' });
        this.returnTimer = setTimeout(() => this.onBack(), 500);
      }
    },

    onShow() {
      this.selecting = false;
      this.navigating = false;
    },

    onHide() {
      this.clearTimers();
    },

    onUnload() {
      this.unloaded = true;
      this.clearTimers();
    },

    clearTimers() {
      clearTimeout(this.selectionTimer);
      clearTimeout(this.returnTimer);
      this.selectionTimer = null;
      this.returnTimer = null;
    },

    onBack() {
      this.clearTimers();
      const { key, testId } = this.data;
      returnToQuizIntro(key, testId);
    },

    openQuestion(index) {
      if (this.navigating) return;
      this.navigating = true;
      const { key, testId } = this.data;
      wx.redirectTo({
        url: buildQuestionPath(key, testId, index),
        fail: () => {
          this.selecting = false;
          this.navigating = false;
          wx.showToast({ title: '打开题目失败，请重试', icon: 'none' });
          if (!this.data.question) this.onBack();
        },
      });
    },

    onSelect(e) {
      if (this.selecting || this.navigating || !this.data.question) return;
      const optionIndex = Number(e.currentTarget.dataset.index);
      if (
        !Number.isInteger(optionIndex) ||
        optionIndex < 0 ||
        optionIndex >= this.data.question.options.length
      ) {
        return;
      }

      const { key, testId, index } = this.data;
      const answers = [...this.answers];
      answers[index] = optionIndex;
      try {
        saveQuizAnswers(key, testId, answers);
      } catch (error) {
        wx.showToast({ title: '答案保存失败，请重试', icon: 'none' });
        return;
      }
      this.answers = answers;
      this.setData({ selected: optionIndex });
      this.selecting = true;

      this.selectionTimer = setTimeout(() => {
        this.selectionTimer = null;
        if (index < this.quiz.questions.length - 1) {
          this.openQuestion(index + 1);
          return;
        }

        try {
          finishQuizSession(key, testId, this.answers);
        } catch (error) {
          this.selecting = false;
          wx.showToast({ title: '答案保存失败，请重试', icon: 'none' });
          return;
        }
        this.navigating = true;
        wx.navigateTo({
          url: `/pages/quiz/analyzing/index?key=${encodeURIComponent(key)}&testId=${testId}`,
          fail: () => {
            this.selecting = false;
            this.navigating = false;
            wx.showToast({ title: '打开分析页失败，请重试', icon: 'none' });
          },
        });
      }, 300);
    },

    onPrevious() {
      if (this.selecting || this.navigating || !this.data.question || questionIndex <= 0) return;
      this.openQuestion(questionIndex - 1);
    },
  };
}
