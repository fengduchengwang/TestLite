// app.js
import iconFontBase64 from './assets/tdesign-icon-font';

function loadIconFont() {
  wx.loadFontFace({
    family: 't',
    source: `url("data:font/woff;base64,${iconFontBase64}")`,
    global: true,
  });
}

App({
  onLaunch() {
    loadIconFont();

    const updateManager = wx.getUpdateManager();

    updateManager.onCheckForUpdate(() => {});

    updateManager.onUpdateReady(() => {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            updateManager.applyUpdate();
          }
        },
      });
    });
  },

  globalData: {
    userInfo: null,
  },
});
