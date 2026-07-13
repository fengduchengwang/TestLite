import testList from '~/data/tests';

/** 按关键词搜索心理测试 */
export function searchTests(keyword) {
  if (!keyword || !keyword.trim()) return [];
  const kw = keyword.trim().toLowerCase();
  return testList.filter((item) => item.desc.toLowerCase().includes(kw));
}
