const INTRO_ROUTE = 'pages/quiz/intro/index';

// 复用保留的深色开始页，让返回和重测不会重复入栈或短暂露出首页。
export function returnToQuizIntro(key, testId = 0) {
  const pages = getCurrentPages();
  for (let index = pages.length - 2; index >= 0; index -= 1) {
    const page = pages[index];
    if (
      page.route === INTRO_ROUTE &&
      page.data.key === key &&
      Number(page.data.testId || 0) === Number(testId || 0)
    ) {
      wx.navigateBack({ delta: pages.length - 1 - index });
      return;
    }
  }

  // 兼容直接打开答题页/结果页、栈内没有开始页的情况。
  wx.redirectTo({
    url: `/${INTRO_ROUTE}?key=${encodeURIComponent(key)}&testId=${testId}`,
  });
}
