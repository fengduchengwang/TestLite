/** 测试分类 */
export const TEST_CATEGORIES = [
  { label: '推荐', value: 'all' },
  { label: '性格', value: '性格' },
  { label: '关系', value: '关系' },
  { label: '生活', value: '生活' },
  { label: '知识', value: '知识' },
];

/** 分类与 tags 的映射 */
const CATEGORY_TAG_MAP = {
  性格: ['性格'],
  关系: ['情感'],
  生活: ['职场', '城市', '人生选择', '创业', '辞职'],
  知识: ['宠物', '猫咪', 'AI', '玄学', '趣味'],
};

/** 搜索页热门关键词（首页分类 tab，不含「推荐」） */
export const HOT_SEARCH_TAGS = TEST_CATEGORIES.filter((item) => item.value !== 'all').map(
  (item) => item.label,
);

/** 格式化测试时长（秒 → 约X分钟） */
export function formatDuration(seconds) {
  const minutes = Math.max(1, Math.round(seconds / 60));
  return `约${minutes}分钟`;
}

/** 心理测试数据 */
const testList = [
  {
    id: 1,
    testLink: 'https://pindou.shisanquan.top/html/AIWork',
    bannerLink: 'https://alypic.kingdaisy.cn/testlite/hatework.jpg',
    imageLink: 'https://alypic.kingdaisy.cn/testlite/hatework.jpg',
    title: 'AI时代职场护城河测试',
    subtitle:
      '不是预测你会不会失业，而是拆出你的工作里哪些环节正在被压缩、哪些价值仍然必须由你负责，以及下一步该先改哪一条工作流。',
    tags: ['职场', 'AI', '能力'],
    duration: 360,
    questionCount: 24,
  },
  {
    id: 2,
    testLink: 'https://pindou.shisanquan.top/html/cat-test',
    bannerLink: 'https://alypic.kingdaisy.cn/testlite/catclose.jpg',
    imageLink: 'https://alypic.kingdaisy.cn/testlite/catclose.jpg',
    title: '猫咪亲密度测试',
    subtitle:
      '你以为猫咪翻肚皮是在叫你摸？你以为呼噜声就代表它开心？你可能比自己想象的更不了解它。',
    tags: ['宠物', '猫咪', '趣味'],
    duration: 300,
    questionCount: 25,
  },
  {
    id: 3,
    testLink: 'https://pindou.shisanquan.top/html/cityHometown',
    bannerLink: 'https://alypic.kingdaisy.cn/testlite/cityor.jpg',
    imageLink: 'https://alypic.kingdaisy.cn/testlite/cityor.jpg',
    title: '测测你适合哪座城？',
    subtitle: '根据生辰八字与性格测验为你匹配最适合居住的城市',
    tags: ['城市', '趣味', '玄学'],
    duration: 420,
    questionCount: 35,
  },
  {
    id: 4,
    testLink: 'https://pindou.shisanquan.top/html/darkness',
    bannerLink: 'https://alyimg.kingdaisy.cn/testlite/personality.jpg',
    imageLink: 'https://alyimg.kingdaisy.cn/testlite/personality.jpg',
    title: '人格阴暗面测试',
    subtitle: '凭第一反应选择你更可能做出的行为。趣味自我观察，不用于心理诊断。',
    tags: ['性格', '阴暗面', '趣味'],
    duration: 300,
    questionCount: 24,
  },
  {
    id: 5,
    testLink: 'https://pindou.shisanquan.top/html/female-attraction',
    bannerLink: 'https://alyimg.kingdaisy.cn/testlite/personality.jpg',
    imageLink: 'https://alyimg.kingdaisy.cn/testlite/personality.jpg',
    title: '魅力值测试（女生版）',
    subtitle:
      '这不是颜值打分，也不是情感诊断。它会从外在呈现、社交舒适度、情绪稳定、亲密表达、自我价值和生活状态，生成你的女性版吸引力画像。',
    tags: ['情感', '魅力', '性格'],
    duration: 300,
    questionCount: 50,
  },
  {
    id: 6,
    testLink: 'https://pindou.shisanquan.top/html/goHome',
    bannerLink: 'https://alypic.kingdaisy.cn/testlite/cityor.jpg',
    imageLink: 'https://alypic.kingdaisy.cn/testlite/cityor.jpg',
    title: '留大城市卷，还是回老家躺？',
    subtitle:
      '这不是替你决定人生。它只做一件事：把「想逃」「想稳」「还想赢」「被家里拉着走」这些混在一起的东西拆开。',
    tags: ['职场', '城市', '人生选择'],
    duration: 480,
    questionCount: 33,
  },
  {
    id: 7,
    testLink: 'https://pindou.shisanquan.top/html/iQuit',
    bannerLink: 'https://alypic.kingdaisy.cn/testlite/hatework.jpg',
    imageLink: 'https://alypic.kingdaisy.cn/testlite/hatework.jpg',
    title: '你该辞职，还是再撑一年？',
    subtitle: '不是替你做决定，是帮你看清楚你自己到底在纠结什么。',
    tags: ['职场', '辞职', '人生选择'],
    duration: 480,
    questionCount: 32,
  },
  {
    id: 8,
    testLink: 'https://pindou.shisanquan.top/html/personality',
    bannerLink: 'https://alypic.kingdaisy.cn/testlite/slefcare.jpg',
    imageLink: 'https://alypic.kingdaisy.cn/testlite/slefcare.jpg',
    title: '讨好型人格测试',
    subtitle: '不是给你贴标签，是帮你看清楚你的「懂事」到底消耗了你多少。',
    tags: ['性格', '讨好型人格', '情感'],
    duration: 360,
    questionCount: 30,
  },
  {
    id: 9,
    testLink: 'https://pindou.shisanquan.top/html/work01',
    bannerLink: 'https://alypic.kingdaisy.cn/testlite/hatework.jpg',
    imageLink: 'https://alypic.kingdaisy.cn/testlite/hatework.jpg',
    title: '你适合继续上班，还是自己打拼？',
    subtitle:
      '不是劝你辞职，也不是劝你忍。它只做一件事：把「被安排很烦」「想自己干」「又怕没收入」这些东西拆开。',
    tags: ['职场', '创业', '人生选择'],
    duration: 480,
    questionCount: 32,
  },
];

/** 按分类筛选测试 */
export function filterTestsByCategory(category) {
  if (!category || category === 'all') return testList;
  const matchTags = CATEGORY_TAG_MAP[category] || [category];
  return testList.filter((item) => item.tags.some((tag) => matchTags.includes(tag)));
}

export default testList;
