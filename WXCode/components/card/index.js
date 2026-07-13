Component({
  properties: {
    url: String,
    desc: String,
    tags: Array,
    link: String,
  },
  methods: {
    onTap() {
      const { link } = this.properties;
      if (!link) return;
      wx.navigateTo({
        url: `/pages/webview/index?url=${encodeURIComponent(link)}`,
      });
    },
  },
});
