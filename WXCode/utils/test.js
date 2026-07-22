const TESTED_STORAGE_KEY = 'testedTestIds';
const BROWSE_HISTORY_KEY = 'browseHistoryIds';
const MAX_BROWSE_HISTORY = 10;

/** 获取已测试的测试 id 列表 */
export function getTestedIds() {
  return wx.getStorageSync(TESTED_STORAGE_KEY) || [];
}

/** 获取浏览记录 id 列表（最多 10 条，最新在前） */
export function getBrowseHistoryIds() {
  return wx.getStorageSync(BROWSE_HISTORY_KEY) || [];
}

/** 标记某个测试为已测试 */
export function markTestAsTested(id) {
  const ids = getTestedIds();
  if (!ids.includes(id)) {
    ids.push(id);
    wx.setStorageSync(TESTED_STORAGE_KEY, ids);
  }
}

/** 记录浏览历史，只保留最近 10 条 */
export function addBrowseRecord(id) {
  let ids = getBrowseHistoryIds().filter((item) => item !== id);
  ids.unshift(id);
  if (ids.length > MAX_BROWSE_HISTORY) {
    ids = ids.slice(0, MAX_BROWSE_HISTORY);
  }
  wx.setStorageSync(BROWSE_HISTORY_KEY, ids);
}

/** 按 id 顺序获取测试列表 */
export function getTestsByIds(ids, testList) {
  return ids
    .map((id) => testList.find((item) => item.id === id))
    .filter(Boolean);
}

/** 获取已测试列表 */
export function getTestedTests(testList) {
  return getTestsByIds(getTestedIds(), testList);
}

/** 获取浏览记录列表 */
export function getBrowseHistoryTests(testList) {
  return getTestsByIds(getBrowseHistoryIds(), testList);
}

/** 为测试列表附加 tested 状态 */
export function enrichTestsWithTested(tests) {
  const testedIds = getTestedIds();
  return tests.map((item) => ({
    ...item,
    tested: testedIds.includes(item.id),
  }));
}

/** 打开测试页并记录浏览/已测试 */
export function openTest(testId, link) {
  if (!link) return;

  addBrowseRecord(testId);
  markTestAsTested(testId);
  wx.navigateTo({
    url: `/pages/webview/index?url=${encodeURIComponent(link)}`,
  });
}
