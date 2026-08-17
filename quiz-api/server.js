const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.env.PORT || 3001);
const dataDir = path.join(__dirname, 'data', 'quizzes');

/** 分类映射到小程序首页 tab */
const CATEGORY_LABEL_MAP = {
  featured: '性格',
  love: '关系',
  work: '生活',
  fun: '知识',
};

const COVER_BY_CATEGORY = {
  featured: 'https://alyimg.kingdaisy.cn/testlite/personality.jpg',
  love: 'https://alypic.kingdaisy.cn/testlite/slefcare.jpg',
  work: 'https://alypic.kingdaisy.cn/testlite/hatework.jpg',
  fun: 'https://alypic.kingdaisy.cn/testlite/catclose.jpg',
};

function parseDurationSeconds(durationText = '') {
  const matched = String(durationText).match(/(\d+)/);
  const minutes = matched ? Number(matched[1]) : 3;
  return Math.max(1, minutes) * 60;
}

function loadQuizzes() {
  if (!fs.existsSync(dataDir)) {
    return [];
  }

  return fs
    .readdirSync(dataDir)
    .filter((name) => name.endsWith('.json'))
    .map((name) => {
      const fullPath = path.join(dataDir, name);
      const quiz = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      return quiz;
    })
    .sort((a, b) => String(a.meta.key).localeCompare(String(b.meta.key)));
}

const quizzes = loadQuizzes();
const quizMap = Object.fromEntries(quizzes.map((quiz) => [quiz.meta.key, quiz]));

function toListItem(quiz, index) {
  const { meta, questions } = quiz;
  const cover = COVER_BY_CATEGORY[meta.category] || COVER_BY_CATEGORY.featured;
  const categoryLabel = CATEGORY_LABEL_MAP[meta.category] || meta.categoryLabel;

  return {
    id: index + 1,
    quizKey: meta.key,
    title: meta.title,
    subtitle: meta.subtitle,
    tags: [categoryLabel, meta.levelLabel],
    category: categoryLabel,
    level: meta.level,
    duration: parseDurationSeconds(meta.duration),
    durationText: meta.duration,
    questionCount: questions.length,
    imageLink: cover,
    bannerLink: cover,
  };
}

function ok(res, data, message = 'ok') {
  res.json({ code: 0, message, data });
}

function fail(res, message, data = null) {
  res.json({ code: 1, message, data });
}

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  ok(res, {
    totalTests: quizzes.length,
    keys: quizzes.map((quiz) => quiz.meta.key),
  });
});

/** 分类列表 */
app.get('/api/categories', (_req, res) => {
  ok(res, [
    { label: '推荐', value: 'all' },
    { label: '性格', value: '性格' },
    { label: '关系', value: '关系' },
    { label: '生活', value: '生活' },
    { label: '知识', value: '知识' },
  ]);
});

/**
 * 测试列表
 * query:
 *  - category: all | 性格 | 关系 | 生活 | 知识
 *  - keyword: 标题/副标题关键词
 */
app.get('/api/tests', (req, res) => {
  const category = String(req.query.category || 'all').trim();
  const keyword = String(req.query.keyword || '').trim();

  let list = quizzes.map((quiz, index) => toListItem(quiz, index));

  if (category && category !== 'all') {
    list = list.filter((item) => item.category === category || item.tags.includes(category));
  }

  if (keyword) {
    list = list.filter(
      (item) => item.title.includes(keyword) || item.subtitle.includes(keyword),
    );
  }

  ok(res, list);
});

/**
 * 测试详情（完整 Schema v2 JSON，用于答题与出结果）
 * path: /api/tests/:key
 */
app.get('/api/tests/:key', (req, res) => {
  const key = String(req.params.key || '').trim();
  const quiz = quizMap[key];

  if (!quiz) {
    fail(res, `没有找到测试：${key}`, null);
    return;
  }

  ok(res, quiz);
});

app.listen(PORT, () => {
  console.log(`TestLite Quiz API running at http://127.0.0.1:${PORT}`);
  console.log(`Loaded ${quizzes.length} quizzes from data/quizzes`);
  console.log('Project path: TestLite/quiz-api');
});
