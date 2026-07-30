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

const TAG_THEME_MAP = {
  性格: 'primary',
  关系: 'warning',
  生活: 'success',
  知识: 'default',
};

/** 根据分类生成 tags */
export function createTags(category) {
  return [{ text: category, theme: TAG_THEME_MAP[category] || 'primary' }];
}

/** 心理测试数据 */
const testList = [
  {
    id: 1,
    title: '城市气质',
    subtitle: '你该留大城市卷还是回老家躺？',
    questionCount: 10,
    duration: '约3分钟',
    category: '生活',
    link: 'https://test.shisanquan.top/goHome.html',
    url: 'https://alypic.kingdaisy.cn/testlite/cityor.jpg',
    tags: createTags('生活'),
  },
  {
    id: 2,
    title: '职场去留',
    subtitle: '你该辞职，还是再撑一年？',
    questionCount: 8,
    duration: '约2分钟',
    category: '关系',
    link: 'https://test.shisanquan.top/work01.html',
    url: 'https://alypic.kingdaisy.cn/testlite/hatework.jpg',
    tags: createTags('关系'),
  },
  {
    id: 3,
    title: '猫咪亲密度',
    subtitle: '养猫 4 年，亲密度只有 80 分，我哭了😭',
    questionCount: 12,
    duration: '约3分钟',
    category: '知识',
    link: 'https://t.previewhub.top/cat-test',
    url: 'https://alypic.kingdaisy.cn/testlite/catclose.jpg',
    tags: createTags('知识'),
  },
  {
    id: 4,
    title: '魅力值测试',
    subtitle: '5道题：你的魅力值有多高？',
    questionCount: 5,
    duration: '约1分钟',
    category: '性格',
    link: 'https://test.shisanquan.top/female-attraction.html',
    url: 'https://alyimg.kingdaisy.cn/testlite/personality.jpg',
    tags: createTags('性格'),
  },
  {
    id: 5,
    title: '自我边界',
    subtitle: '我沉默了，原来我一直在用「懂事」绑架自己',
    questionCount: 15,
    duration: '约4分钟',
    category: '性格',
    link: 'https://test.shisanquan.top/personality.html',
    url: 'https://alypic.kingdaisy.cn/testlite/slefcare.jpg',
    tags: createTags('性格'),
  },
];

/** 按分类筛选测试 */
export function filterTestsByCategory(category) {
  if (!category || category === 'all') return testList;
  return testList.filter((item) => item.category === category);
}

export default testList;
