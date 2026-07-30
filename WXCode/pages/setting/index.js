import useToastBehavior from '~/behaviors/useToast';
import {
  clearBrowseHistory,
  clearFollowList,
  clearTestedRecords,
} from '~/utils/test';

const SEARCH_HISTORY_KEY = 'search_history';

Page({
  behaviors: [useToastBehavior],

  data: {
    menuData: [
      [
        {
          title: '个人信息',
          icon: 'user',
          url: '/pages/my/info-edit/index',
        },
      ],
      [
        {
          title: '清空浏览记录',
          icon: 'delete',
          type: 'clearHistory',
        },
        {
          title: '清空已测试记录',
          icon: 'delete',
          type: 'clearTested',
        },
        {
          title: '清空关注列表',
          icon: 'delete',
          type: 'clearFollow',
        },
        {
          title: '清空搜索历史',
          icon: 'delete',
          type: 'clearSearch',
        },
      ],
      [
        {
          title: '退出登录',
          icon: 'logout',
          type: 'logout',
        },
      ],
    ],
  },

  onEleClick(e) {
    const { title, url, type } = e.currentTarget.dataset.data;
    if (url) return;

    if (type === 'clearHistory') {
      this.confirmAction('确认清空浏览记录？', () => {
        clearBrowseHistory();
        this.onShowToast('#t-toast', '浏览记录已清空');
      });
      return;
    }

    if (type === 'clearTested') {
      this.confirmAction('确认清空已测试记录？', () => {
        clearTestedRecords();
        this.onShowToast('#t-toast', '已测试记录已清空');
      });
      return;
    }

    if (type === 'clearFollow') {
      this.confirmAction('确认清空关注列表？', () => {
        clearFollowList();
        this.onShowToast('#t-toast', '关注列表已清空');
      });
      return;
    }

    if (type === 'clearSearch') {
      this.confirmAction('确认清空搜索历史？', () => {
        wx.removeStorageSync(SEARCH_HISTORY_KEY);
        this.onShowToast('#t-toast', '搜索历史已清空');
      });
      return;
    }

    if (type === 'logout') {
      this.confirmAction('确认退出登录？', () => {
        wx.removeStorageSync('userInfo');
        wx.removeStorageSync('access_token');
        this.onShowToast('#t-toast', '已退出登录');
        setTimeout(() => {
          wx.navigateBack();
        }, 500);
      });
      return;
    }

    this.onShowToast('#t-toast', title);
  },

  confirmAction(content, onConfirm) {
    wx.showModal({
      title: '提示',
      content,
      confirmText: '确定',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          onConfirm();
        }
      },
    });
  },
});
