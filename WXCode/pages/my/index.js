import useToastBehavior from '~/behaviors/useToast';

const DEFAULT_NICKNAME = '微信用户';

const SERVICE_LIST = [
  { image: '/static/icon_wx.png', name: '推广1', type: 'promotion1', url: '' },
  { image: '/static/icon_wx.png', name: '推广2', type: 'promotion2', url: '' },
  { image: '/static/icon_wx.png', name: '推广3', type: 'promotion3', url: '' },
  { image: '/static/icon_wx.png', name: '推广4', type: 'promotion4', url: '' },
];

Page({
  behaviors: [useToastBehavior],

  data: {
    isLoad: false,
    service: SERVICE_LIST,
    personalInfo: {},
    gridList: [
      { name: '我的测试', icon: 'file-copy', type: 'tests', url: '' },
      { name: '我的关注', icon: 'heart', type: 'follow', url: '' },
      { name: '浏览记录', icon: 'time', type: 'history', url: '' },
    ],
    settingList: [
      { name: '联系客服', icon: 'service', type: 'service', url: '' },
      { name: '设置', icon: 'setting', type: 'setting', url: '/pages/setting/index' },
    ],
  },

  onShow() {
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo?.avatarUrl) {
      this.setData({
        isLoad: true,
        personalInfo: {
          name: userInfo.nickName || DEFAULT_NICKNAME,
          image: userInfo.avatarUrl,
        },
      });
    } else {
      this.setData({
        isLoad: false,
        personalInfo: {},
      });
    }
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail;
    if (!avatarUrl) return;

    wx.login({
      success: (res) => {
        if (res.code) {
          wx.setStorageSync('access_token', res.code);
        }
        const userInfo = { nickName: DEFAULT_NICKNAME, avatarUrl };
        wx.setStorageSync('userInfo', userInfo);
        this.setData({
          isLoad: true,
          personalInfo: {
            name: DEFAULT_NICKNAME,
            image: avatarUrl,
          },
        });
      },
    });
  },

  onProfileTap() {
    wx.navigateTo({
      url: '/pages/my/info-edit/index',
    });
  },

  onEleClick(e) {
    const { type, name, url } = e.currentTarget.dataset.data;
    if (url) return;

    if (type === 'tests') {
      wx.navigateTo({ url: '/pages/my-tests/index' });
      return;
    }
    if (type === 'follow') {
      wx.switchTab({ url: '/pages/follow/index' });
      return;
    }
    if (type === 'history') {
      wx.navigateTo({ url: '/pages/my-history/index' });
      return;
    }

    this.onShowToast('#t-toast', name);
  },
});
