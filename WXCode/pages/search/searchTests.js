import { fetchTestList } from '~/utils/api';

/** 按关键词搜索心理测试（基于接口列表） */
export async function searchTests(keyword) {
  if (!keyword || !keyword.trim()) return [];
  const kw = keyword.trim();
  return fetchTestList({ keyword: kw });
}
