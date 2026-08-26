import { exportSharePoster, preloadMiniprogramQrcode } from './sharePoster';

function canUseShareImageMenu() {
  return typeof wx.showShareImageMenu === 'function';
}

export function createShareImageController(page) {
  return {
    async ensureShareImage(payload) {
      if (page.shareImagePath) {
        return page.shareImagePath;
      }

      wx.showLoading({ title: '生成图片中', mask: true });
      try {
        const path = await exportSharePoster(page, payload, page.qrcodeDataUrl || '');
        page.shareImagePath = path;
        return path;
      } finally {
        wx.hideLoading();
      }
    },

    async shareResult(payload, entrancePath = '') {
      if (!canUseShareImageMenu()) {
        wx.showToast({ title: '当前微信版本过低', icon: 'none' });
        return;
      }

      try {
        const path = await this.ensureShareImage(payload);
        wx.showShareImageMenu({
          path,
          needShowEntrance: true,
          entrancePath,
        });
      } catch (error) {
        wx.showToast({ title: error?.message || '分享失败', icon: 'none' });
      }
    },
  };
}

export default {
  createShareImageController,
};
