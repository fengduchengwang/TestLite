# TestLite Quiz API

心理测试列表与详情接口，独立于微信小程序目录 `WXCode/`。

目录结构建议：

```text
TestLite/
├── WXCode/       # 微信小程序
└── quiz-api/     # 本服务（不要命名为 server，避免和其他项目冲突）
```

## 启动

```bash
cd /path/to/TestLite/quiz-api
npm install
npm start
```

默认地址：`http://127.0.0.1:3001`

## 接口

统一返回：

```json
{ "code": 0, "message": "ok", "data": ... }
```

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/health` | 健康检查 |
| GET | `/api/categories` | 分类 |
| GET | `/api/tests` | 测试列表 |
| GET | `/api/tests/:key` | 完整测试 JSON |

### 列表参数

- `category`：`all` / `性格` / `关系` / `生活` / `知识`
- `keyword`：标题或副标题关键词

示例：

```bash
curl 'http://127.0.0.1:3001/api/tests'
curl 'http://127.0.0.1:3001/api/tests?category=生活'
curl 'http://127.0.0.1:3001/api/tests/fun_001'
```

## 数据

题库在 `data/quizzes/*.json`。新增测试放入同结构 JSON 后重启服务即可。

## 部署到阿里云

```bash
# 上传本目录到服务器，例如：
# /opt/testlite-quiz-api

cd /opt/testlite-quiz-api
npm install --registry=https://registry.npmmirror.com
pm2 start server.js --name testlite-quiz-api
```

正式环境请用域名 + HTTPS，并在小程序后台配置 request 合法域名。
小程序侧在 `WXCode/config.js` 里改 `apiBaseUrl`。
