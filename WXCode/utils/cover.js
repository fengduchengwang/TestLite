import config from '~/config';

function getCoverBaseUrl() {
  return (config.coverBaseUrl || '').replace(/\/$/, '');
}

/** Banner 大图：{quizKey}.jpg */
export function getTestCoverUrl(quizKey = '') {
  if (!quizKey) return '';
  const base = getCoverBaseUrl();
  if (!base) return '';
  return `${base}/${quizKey}.jpg`;
}

/** 列表缩略图：{quizKey}_lite.jpg */
export function getTestListCoverUrl(quizKey = '') {
  if (!quizKey) return '';
  const base = getCoverBaseUrl();
  if (!base) return '';
  return `${base}/${quizKey}_lite.jpg`;
}

/** 用 quizKey 覆盖接口返回的封面地址 */
export function enrichTestsWithCover(tests = []) {
  if (!Array.isArray(tests)) return [];
  return tests.map((item) => ({
    ...item,
    bannerLink: getTestCoverUrl(item.quizKey),
    imageLink: getTestListCoverUrl(item.quizKey),
  }));
}

export default {
  getTestCoverUrl,
  getTestListCoverUrl,
  enrichTestsWithCover,
};
