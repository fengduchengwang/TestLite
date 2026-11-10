import { fetchQuizDetail } from '~/utils/api';

const DRAFT_KEY = 'quizDraft';
const SESSION_KEY = 'quizSession';
const MAX_QUESTIONS = 30;

let cachedQuiz = null;

function validateQuiz(quiz) {
  if (!quiz || !Array.isArray(quiz.questions) || quiz.questions.length === 0) {
    throw new Error('测试不存在');
  }
  if (quiz.questions.length > MAX_QUESTIONS) {
    throw new Error('当前最多支持 30 道题');
  }
}

export function buildQuestionPath(key, testId, index) {
  const suffix = String(index + 1).padStart(2, '0');
  return `/pages/quiz/play/index${suffix}?key=${encodeURIComponent(key)}&testId=${testId}`;
}

export function saveQuizAnswers(key, testId, answers) {
  wx.setStorageSync(DRAFT_KEY, { key, testId, answers: [...answers] });
}

export function startQuizSession(key, testId, quiz) {
  validateQuiz(quiz);
  const answers = Array(quiz.questions.length).fill(null);
  saveQuizAnswers(key, testId, answers);
  wx.removeStorageSync(SESSION_KEY);
  cachedQuiz = { key, quiz };
  return { quiz, answers };
}

export async function loadQuizSession(key, testId) {
  const quiz = cachedQuiz?.key === key ? cachedQuiz.quiz : await fetchQuizDetail(key);
  validateQuiz(quiz);
  cachedQuiz = { key, quiz };
  const draft = wx.getStorageSync(DRAFT_KEY);
  if (
    !draft ||
    draft.key !== key ||
    Number(draft.testId) !== testId ||
    !Array.isArray(draft.answers) ||
    draft.answers.length !== quiz.questions.length
  ) {
    return { quiz, answers: Array(quiz.questions.length).fill(null) };
  }

  const answers = draft.answers.map((answer, index) =>
    Number.isInteger(answer) && answer >= 0 && answer < quiz.questions[index].options.length
      ? answer
      : null,
  );
  return { quiz, answers };
}

export function finishQuizSession(key, testId, answers) {
  wx.setStorageSync(SESSION_KEY, { key, testId, answers: [...answers] });
}
