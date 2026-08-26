import { TEST_CATEGORIES, filterTestsByCategory } from '~/data/tests';
import useFollowCard from '~/behaviors/useFollowCard';
import {
  enrichTestsWithFollowed,
  enrichTestsWithTested,
  openTest,
} from '~/utils/test';
import { fetchTestList } from '~/utils/api';

const BANNER_MAX_COUNT = 5;

function pickRandomItems(list, max = BANNER_MAX_COUNT) {
  if (!Array.isArray(list) || !list.length) return [];
  const shuffled = [...list];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(max, shuffled.length));
}

Page({
  behaviors: [useFollowCard],
  data: {
    scrollHeight: 0,
    categories: TEST_CATEGORIES,
    activeCategory: 'all',
    swiperList: [],
    cardInfo: [],
    allTests: [],
  },

  onLoad() {
    this.refreshBanner = true;
    this.bannerTests = [];
  },

  onReady() {
    this.loadData();
    this.updateScrollHeight();
  },

  onShow() {
    this.loadData();
    this.updateScrollHeight();
  },

  async loadData() {
    try {
      const list = await fetchTestList({ category: 'all' });
      if (!Array.isArray(list)) {
        throw new Error('列表数据格式错误');
      }
      if (this.refreshBanner) {
        this.bannerTests = pickRandomItems(list);
        this.refreshBanner = false;
      }
      const filtered = filterTestsByCategory(this.data.activeCategory, list);
      this.setData({
        allTests: list,
        swiperList: this.bannerTests.map((item) => item.bannerLink || item.imageLink || ''),
        cardInfo: enrichTestsWithFollowed(enrichTestsWithTested(filtered)),
      });
    } catch (error) {
      const message = error?.message || '列表加载失败';
      console.error('load test list failed', message, error?.raw || error);
      wx.showToast({ title: message.slice(0, 20), icon: 'none' });
    }
  },

  updateScrollHeight() {
    wx.nextTick(() => {
      const { windowHeight, windowWidth, safeArea, statusBarHeight } = wx.getWindowInfo();
      const rpx2px = (rpx) => (rpx * windowWidth) / 750;

      this.createSelectorQuery()
        .select('.home-navbar')
        .boundingClientRect()
        .exec((res) => {
          const navHeight = res[0]?.height || statusBarHeight + 44;
          const safeBottom = safeArea ? windowHeight - safeArea.bottom : 0;
          const tabBarHeight = rpx2px(112) + safeBottom + 16;
          const scrollHeight = windowHeight - navHeight - tabBarHeight;

          this.setData({
            scrollHeight: Math.max(Math.floor(scrollHeight), 200),
          });
        });
    });
  },

  onCategoryTap(e) {
    const { value } = e.currentTarget.dataset;
    if (value === this.data.activeCategory) return;

    const filtered = filterTestsByCategory(value, this.data.allTests);
    this.setData({
      activeCategory: value,
      cardInfo: enrichTestsWithFollowed(enrichTestsWithTested(filtered)),
    });
  },

  onSwiperClick(e) {
    const { index } = e.detail;
    const item = this.bannerTests[index];
    if (!item?.quizKey && !item?.testLink) return;
    openTest(item.id, item.testLink, item.quizKey);
  },

  onTested(e) {
    const { id } = e.detail;
    const cardInfo = this.data.cardInfo.map((item) =>
      item.id === id ? { ...item, tested: true } : item,
    );
    this.setData({ cardInfo });
  },
});
