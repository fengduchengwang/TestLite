(function () {
  const root = window.PsyTest;
  const app = document.getElementById('app');
  const template = document.body.dataset.template;
  const key = new URLSearchParams(location.search).get('key');

  function fail(message) {
    app.innerHTML = `<div class="error"><h2>测试无法打开</h2><p class="lead">${root.utils.escape(message)}</p></div>`;
  }

  if (!key) {
    fail('链接缺少测试 key，例如：?key=fun_001');
    return;
  }
  const entry = root.catalog[key];
  if (!entry) {
    fail(`没有找到测试：${key}`);
    return;
  }
  if (entry.template !== template) {
    location.replace(`${entry.template}.html?key=${encodeURIComponent(key)}`);
    return;
  }

  const script = document.createElement('script');
  script.src = entry.pack;
  script.onload = () => {
    const test = root.data[key];
    if (!test) {
      fail(`数据包已加载，但没有找到测试：${key}`);
      return;
    }
    root.mount(test, template);
  };
  script.onerror = () => fail(`数据包加载失败：${entry.pack}`);
  document.head.appendChild(script);
}());
