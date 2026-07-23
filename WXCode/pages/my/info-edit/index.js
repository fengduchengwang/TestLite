const DEFAULT_NICKNAME = '微信用户';

Page({
  data: {
    nickName: DEFAULT_NICKNAME,
  },

  onLoad() {
    const userInfo = wx.getStorageSync('userInfo') || {};
    this.setData({
      nickName: userInfo.nickName || DEFAULT_NICKNAME,
    });
  },

  onNicknameInput(e) {
    this.setData({ nickName: e.detail.value || '' });
  },

  onSave() {
    const nickName = (this.data.nickName || '').trim() || DEFAULT_NICKNAME;

    wx.setStorageSync('userInfo', { nickName });
    wx.showToast({ title: '保存成功', icon: 'success' });
    setTimeout(() => {
      wx.navigateBack();
    }, 500);
  },
});
