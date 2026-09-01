import { request } from '~/utils/request';
import { enrichTestsWithCover } from '~/utils/cover';

/** 拉取测试列表 */
export function fetchTestList(params = {}) {
  return request({
    url: '/api/tests',
    data: params,
  }).then((list) => enrichTestsWithCover(list));
}

/** 拉取完整测试详情 */
export function fetchQuizDetail(key) {
  return request({
    url: `/api/tests/${encodeURIComponent(key)}`,
  });
}

export default {
  fetchTestList,
  fetchQuizDetail,
};
