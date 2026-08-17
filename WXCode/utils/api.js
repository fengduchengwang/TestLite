import { request } from '~/utils/request';

/** 拉取测试列表 */
export function fetchTestList(params = {}) {
  return request({
    url: '/api/tests',
    data: params,
  });
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
