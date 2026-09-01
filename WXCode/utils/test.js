const TESTED_STORAGE_KEY = 'testedTestIds';
const BROWSE_HISTORY_KEY = 'browseHistoryIds';
const FOLLOW_STORAGE_KEY = 'followTestIds';
const MAX_BROWSE_HISTORY = 10;

/** 获取关注 id 列表（最新在前） */
export function getFollowIds() {
  return wx.getStorageSync(FOLLOW_STORAGE_KEY) || [];
}

/** 添加关注 */
export function addFollow(id) {
  let ids = getFollowIds().filter((item) => item !== id);
  ids.unshift(id);
  wx.setStorageSync(FOLLOW_STORAGE_KEY, ids);
}

/** 取消关注 */
export function removeFollow(id) {
  const ids = getFollowIds().filter((item) => item !== id);
  wx.setStorageSync(FOLLOW_STORAGE_KEY, ids);
}

/** 获取关注列表 */
export function getFollowTests(testList) {
  return getTestsByIds(getFollowIds(), testList);
}

/** 为测试列表附加 followed 状态 */
export function enrichTestsWithFollowed(tests) {
  const followIds = getFollowIds();
  return tests.map((item) => ({
    ...item,
    followed: followIds.includes(item.id),
  }));
}

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

/** 清空浏览记录 */
export function clearBrowseHistory() {
  wx.removeStorageSync(BROWSE_HISTORY_KEY);
}

/** 清空已测试记录 */
export function clearTestedRecords() {
  wx.removeStorageSync(TESTED_STORAGE_KEY);
}

/** 清空关注列表 */
export function clearFollowList() {
  wx.removeStorageSync(FOLLOW_STORAGE_KEY);
}

/** 打开测试页并记录浏览（优先原生 quizKey，兼容旧 H5 link） */
export function openTest(testId, link, quizKey = '') {
  if (!quizKey && !link) return;

  addBrowseRecord(testId);

  if (quizKey) {
    wx.navigateTo({
      url: `/pages/quiz/intro/index?key=${encodeURIComponent(quizKey)}&testId=${testId}`,
    });
    return;
  }

  markTestAsTested(testId);
  wx.navigateTo({
    url: `/pages/webview/index?url=${encodeURIComponent(link)}`,
  });
}
