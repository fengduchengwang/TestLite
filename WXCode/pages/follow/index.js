import { fetchTestList } from '~/utils/api';
import { enrichTestsWithFollowed, enrichTestsWithTested, getFollowTests, removeFollow } from '~/utils/test';

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

  async loadData() {
    try {
      const list = await fetchTestList();
      this.setData({
        cardInfo: enrichTestsWithFollowed(enrichTestsWithTested(getFollowTests(list))),
      });
    } catch (error) {
      console.error(error);
      wx.showToast({ title: '加载失败', icon: 'none' });
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

  onTested(e) {
    const { id } = e.detail;
    const cardInfo = this.data.cardInfo.map((item) =>
      item.id === id ? { ...item, tested: true } : item,
    );
    this.setData({ cardInfo });
  },

  onUnfollow(e) {
    const { id } = e.detail;
    removeFollow(id);
    this.setData({
      cardInfo: this.data.cardInfo.filter((item) => item.id !== id),
    });
    wx.showToast({ title: '已取消关注', icon: 'none' });
  },
});
