import testList from '~/data/tests';

Page({
  data: {
    scrollHeight: 0,
    swiperList: [],
    cardInfo: [],
    focusCardInfo: [],
  },

  onReady() {
    this.loadData();
    this.updateScrollHeight();
  },

  onShow() {
    this.updateScrollHeight();
  },

  onTabChange() {
    wx.nextTick(() => {
      this.updateScrollHeight();
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
          const tabsHeaderHeight = rpx2px(96);
          const safeBottom = safeArea ? windowHeight - safeArea.bottom : 0;
          const tabBarHeight = rpx2px(112) + safeBottom + 16;
          const scrollHeight = windowHeight - navHeight - tabsHeaderHeight - tabBarHeight;

          this.setData({
            scrollHeight: Math.max(Math.floor(scrollHeight), 200),
          });
        });
    });
  },

  loadData() {
    this.setData({
      swiperList: testList.map((item) => item.url),
      cardInfo: testList,
      focusCardInfo: testList.slice(0, 3),
    });
  },

  onSwiperClick(e) {
    const { index } = e.detail;
    const item = testList[index];
    if (!item?.link) return;
    wx.navigateTo({
      url: `/pages/webview/index?url=${encodeURIComponent(item.link)}`,
    });
  },
});
