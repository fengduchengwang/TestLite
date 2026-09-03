import { getTestCoverUrl } from './cover';

export const HOME_SHARE = {
  title: '轻测 - 发现有趣的心理测试',
  path: '/pages/home/index',
};

/** 开始测试页路径（含参数） */
export function buildQuizIntroPath(key, testId = 0) {
  if (!key) return HOME_SHARE.path;
  let path = `/pages/quiz/intro/index?key=${encodeURIComponent(key)}`;
  if (testId) {
    path += `&testId=${testId}`;
  }
  return path;
}

/** 朋友圈分享 query（不含 ?） */
export function buildQuizIntroQuery(key, testId = 0) {
  if (!key) return '';
  let query = `key=${encodeURIComponent(key)}`;
  if (testId) {
    query += `&testId=${testId}`;
  }
  return query;
}

export function buildQuizShareImage(key) {
  return getTestCoverUrl(key) || '';
}
