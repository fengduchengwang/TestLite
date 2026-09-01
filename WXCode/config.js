export default {
  isMock: true,
  /**
   * 测试 API 根地址（服务在 TestLite/quiz-api）
   * - 本地调试可临时改成 http://127.0.0.1:3001
   * - 真机/正式环境使用已部署域名
   */
  apiBaseUrl: 'https://quiz.kingdaisy.cn',
  /**
   * 测试封面 CDN 根路径（不含末尾斜杠）
   * 图片文件名与 quizKey 一致，如 featured_001.jpg
   */
  coverBaseUrl: 'https://alypic.kingdaisy.cn/testlite',
};
