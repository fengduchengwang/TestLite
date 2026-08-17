# 统一数据格式（Schema v2）

轻度、中度、深度测试使用完全相同的数据结构。区别只来自 `display.template`、题目数量、维度数量和实际填写的结果内容。

```js
{
  schemaVersion: 2,
  meta: {},
  display: {},
  dimensions: [],
  questions: [],
  profiles: {},
  combinations: {},
  insightRules: [],
  report: { decision: null }
}
```

## 固定字段

- `meta`：测试 key、分类、等级、标题、钩子、时长和免责声明。
- `display`：模板类型、结果首屏文案、维度标题、深度解析标题和启用模块。
- `dimensions`：维度 key、显示名称和高/中/低区间解释。
- `questions`：场景、主测维度、题干、四个选项及分数。
- `profiles`：每个维度对应的结果名称、核心解释、现实循环、优势代价和行动。
- `combinations`：重要维度组合的专属深度解析；没有时填 `{}`。
- `insightRules`：满足特定高低分条件时出现的特别提醒；没有时填 `[]`。
- `report.decision`：决策型测试的方向权重和双向信号；没有时填 `null`。

不允许因为模板较轻就删除字段。空数组、空对象和 `null` 可以让网页与后续小程序共用同一种读取方式。

## 分类数据包

一个数据包可以容纳约20–30套完整测试。测试继续增加时只新增下一个编号：

```text
data/packs/
├── featured-01.js
├── featured-02.js
├── work-01.js
├── love-01.js
└── fun-01.js
```

`catalog.js` 记录测试 key、使用模板及所在数据包。页面只加载当前测试所在的数据包。
