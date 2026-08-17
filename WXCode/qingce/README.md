# 轻测项目开发说明

项目只包含公共测试模板、运行逻辑和测试数据，不包含小程序、首页、后台或数据库。

## 1. 目录结构

```text
qingce/
├── templates/
│   ├── light.html              # 轻量：12–16题，5–6维
│   ├── standard.html           # 标准：18–22题，6–7维
│   └── deep.html               # 深度：24–28题，8–9维
├── common/
│   ├── scripts/
│   │   ├── runtime.js          # 全局对象和公共工具
│   │   ├── loader.js           # 根据 key 加载对应数据包
│   │   ├── quiz-engine.js      # 开始页、答题、结果页流程
│   │   ├── score-engine.js     # 各维度独立计算 0–100%
│   │   ├── result-engine.js    # 画像、组合、证据和决策结果
│   │   ├── report-renderer.js  # 按配置渲染结果模块
│   │   └── radar-chart.js      # 雷达图
│   └── styles/
│       ├── tokens.css          # 颜色、圆角、阴影变量
│       ├── base.css            # 公共样式
│       └── light/standard/deep.css
├── data/
│   ├── catalog.js              # key → 模板、数据包、标题
│   └── packs/                  # 分类数据包
│       ├── featured-01.js
│       ├── fun-01.js
│       ├── love-01.js
│       └── work-01.js
├── tools/
│   ├── validate-data.mjs       # 数据结构和维度覆盖校验
│   └── test-paths.mjs          # 结果路径校验
└── docs/                       # 详细数据与内容规范
```

## 2. 加载流程

```text
template.html?key=xxx
→ catalog.js 查模板和数据包
→ loader.js 加载数据
→ quiz-engine.js 答题
→ score-engine.js 计分
→ result-engine.js 生成报告数据
→ report-renderer.js 渲染结果页
```

访问错模板会自动跳转到正确模板。

## 3. 统一数据结构

三种模板使用同一个 Schema。未使用字段不能删除：数组填 `[]`，对象填 `{}`，独立功能填 `null`。

| 字段 | 类型 | 用途 |
|---|---|---|
| `schemaVersion` | `number` | 固定为 `2` |
| `meta` | `object` | 标题、分类、等级、时长、声明 |
| `display` | `object` | 模板、结果标题、模块和顺序 |
| `dimensions` | `Dimension[]` | 维度及高/中/低解释 |
| `questions` | `Question[]` | 题目、选项和分数 |
| `profiles` | `Record<string, Profile>` | 每个维度的结果画像 |
| `combinations` | `Record<string, Combination>` | 两个突出维度的专属解析 |
| `insightRules` | `InsightRule[]` | 满足分数条件时的提醒 |
| `report.decision` | `DecisionConfig \| null` | 决策型测试配置 |

核心类型：

```js
meta: {
  key: string,                // 如 work_001
  category: string,           // featured/work/love/fun
  categoryLabel: string,
  level: string,              // light/standard/deep
  levelLabel: string,
  title: string,
  subtitle: string,           // 开始页钩子，不超过100字
  duration: string,
  disclaimer: string
}

display: {
  template: string,
  heroLabel: string,
  dimensionTitle: string,
  radarTitle: string,
  deepAnalysisTitle: string,
  modules: string[]
}

Dimension: {
  key: string,
  label: string,
  bands: { low: string, medium: string, high: string }
}

Question: {
  scene: string,
  dimension: string,          // 本题主测维度
  q: string,
  options: [{                 // 固定4个
    text: string,
    score: Record<string, number>
  }]
}

Profile: {
  name: string,
  verdict: string,
  core: string,
  combo: string,
  secondary: string,
  trigger: string,
  reaction: string,
  benefit: string,
  cost: string,
  strengths: string[],
  costs: string[],
  actions: [{ time: string, text: string }],
  share: string
}

Combination: {
  title: string,
  summary: string,
  tension: string
}

InsightRule: {
  when: {
    all: [{ dimension: string, operator: string, value: number }]
  },
  title: string,
  content: string
}
```

`operator` 支持 `>=`、`<=`、`>`、`<`、`=`。

结果模块可用值：

```text
hero, decision, radar, dimensions, deepAnalysis,
evidence, pattern, strengths, insight, actions, share
```

`display.modules` 同时控制模块是否显示和显示顺序。

## 4. 命名规则

| 内容 | 规则 | 示例 |
|---|---|---|
| 测试 key | `分类_三位编号` | `featured_004` |
| 数据包 | `分类-两位批次.js` | `featured-02.js` |
| 组合 key | `维度A+维度B` | `exhaustion+readiness` |

一个数据包建议放 20–30 套测试，超过后新增下一批数据包，不新增 HTML。

## 5. 新增测试

1. 选择 `light`、`standard` 或 `deep`。
2. 在对应 `data/packs/*.js` 中加入完整测试对象。
3. 在 `data/catalog.js` 登记 key、模板、数据包和标题。
4. 每个维度至少有 3 道主测题，并存在同 key 的 `profile`。
5. 运行校验：

```bash
node tools/validate-data.mjs
node tools/test-paths.mjs
```

## 6. 本地运行

```bash
python3 -m http.server 8768
```

```text
http://localhost:8768/templates/light.html?key=fun_001
http://localhost:8768/templates/standard.html?key=featured_002
http://localhost:8768/templates/deep.html?key=work_001
```

详细规范：`docs/data-schema.md`、`docs/content-standard.md`。
