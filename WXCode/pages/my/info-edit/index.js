const DEFAULT_NICKNAME = '微信用户';

Page({
  data: {
    avatarUrl: '',
    nickName: DEFAULT_NICKNAME,
  },

  onLoad() {
    const userInfo = wx.getStorageSync('userInfo') || {};
    this.setData({
      avatarUrl: userInfo.avatarUrl || '',
      nickName: userInfo.nickName || DEFAULT_NICKNAME,
    });
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail;
    if (avatarUrl) {
      this.setData({ avatarUrl });
    }
  },

  onNicknameInput(e) {
    this.setData({ nickName: e.detail.value || '' });
  },

  onSave() {
    const nickName = (this.data.nickName || '').trim() || DEFAULT_NICKNAME;
    const { avatarUrl } = this.data;

    if (!avatarUrl) {
      wx.showToast({ title: '请选择头像', icon: 'none' });
      return;
    }

    wx.setStorageSync('userInfo', { nickName, avatarUrl });
    wx.showToast({ title: '保存成功', icon: 'success' });
    setTimeout(() => {
      wx.navigateBack();
    }, 500);
  },
});
