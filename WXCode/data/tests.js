/** 测试分类 */
export const TEST_CATEGORIES = [
  { label: '推荐', value: 'all' },
  { label: '性格', value: '性格' },
  { label: '关系', value: '关系' },
  { label: '生活', value: '生活' },
  { label: '知识', value: '知识' },
];

/** 搜索页热门关键词（首页分类 tab，不含「推荐」） */
export const HOT_SEARCH_TAGS = TEST_CATEGORIES.filter((item) => item.value !== 'all').map(
  (item) => item.label,
);

/** 格式化测试时长（秒 → 约X分钟） */
export function formatDuration(seconds) {
  const minutes = Math.max(1, Math.round(seconds / 60));
  return `约${minutes}分钟`;
}

/** 按分类筛选测试（传入接口返回的 list） */
export function filterTestsByCategory(category, sourceList = []) {
  if (!category || category === 'all') return sourceList;
  return sourceList.filter((item) => item.category === category || item.tags.includes(category));
}
