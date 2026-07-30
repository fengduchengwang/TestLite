import testList, { TEST_CATEGORIES, filterTestsByCategory } from '~/data/tests';
import useFollowCard from '~/behaviors/useFollowCard';
import {
  enrichTestsWithFollowed,
  enrichTestsWithTested,
  openTest,
} from '~/utils/test';

Page({
  behaviors: [useFollowCard],
  data: {
    scrollHeight: 0,
    categories: TEST_CATEGORIES,
    activeCategory: 'all',
    swiperList: [],
    cardInfo: [],
  },

  onReady() {
    this.loadData();
    this.updateScrollHeight();
  },

  onShow() {
    this.loadData();
    this.updateScrollHeight();
  },

  loadData() {
    const filtered = filterTestsByCategory(this.data.activeCategory);
    this.setData({
      swiperList: testList.map((item) => item.url),
      cardInfo: enrichTestsWithFollowed(enrichTestsWithTested(filtered)),
    });
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

    this.setData({ activeCategory: value }, () => {
      this.loadData();
    });
  },

  onSwiperClick(e) {
    const { index } = e.detail;
    const item = testList[index];
    if (!item?.link) return;
    openTest(item.id, item.link);
  },

  onTested(e) {
    const { id } = e.detail;
    const cardInfo = this.data.cardInfo.map((item) =>
      item.id === id ? { ...item, tested: true } : item,
    );
    this.setData({ cardInfo });
  },
});
