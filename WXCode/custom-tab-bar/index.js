Component({
  data: {
    value: '',
    list: [
      {
        icon: 'home',
        value: 'home',
        label: '首页',
      },
      {
        icon: 'heart',
        value: 'follow',
        label: '关注',
      },
      {
        icon: 'user',
        value: 'my',
        label: '我的',
      },
    ],
  },
  lifetimes: {
    attached() {
      this.syncSelected();
    },
    ready() {
      this.syncSelected();
    },
  },
  pageLifetimes: {
    show() {
      this.syncSelected();
    },
  },
  methods: {
    syncSelected() {
      const pages = getCurrentPages();
      const curPage = pages[pages.length - 1];
      const current = this.data.list.find((item) => curPage?.route === `pages/${item.value}/index`);
      if (current && current.value !== this.data.value) {
        this.setData({ value: current.value });
      }
    },

    handleChange(e) {
      const { value } = e.detail;
      if (this.switching || !this.data.list.some((item) => item.value === value)) return;
      this.syncSelected();
      if (value === this.data.value) return;

      this.switching = true;
      wx.switchTab({
        url: `/pages/${value}/index`,
        fail: () => {
          this.syncSelected();
          wx.showToast({ title: '切换失败，请重试', icon: 'none' });
        },
        complete: () => {
          this.switching = false;
        },
      });
    },
  },
});
