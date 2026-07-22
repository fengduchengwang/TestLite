import testList, { followTestIds } from '~/data/tests';
import { enrichTestsWithTested } from '~/utils/test';

Page({
  data: {
    scrollHeight: 0,
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
    const followList = testList.filter((item) => followTestIds.includes(item.id));
    this.setData({
      cardInfo: enrichTestsWithTested(followList),
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

  onTested(e) {
    const { id } = e.detail;
    const cardInfo = this.data.cardInfo.map((item) =>
      item.id === id ? { ...item, tested: true } : item,
    );
    this.setData({ cardInfo });
  },
});
