import { exportSharePoster } from './sharePoster';

const ALBUM_SCOPE = 'scope.writePhotosAlbum';

function errorMessage(error) {
  return String(error?.errMsg || error?.message || error || '');
}

function isCancelled(error) {
  return /cancel/i.test(errorMessage(error));
}

function isPermissionError(error) {
  if (/privacy|not declared/i.test(errorMessage(error))) return false;
  return /auth.*(?:deny|denied)|permission|system deny|无权限|没有权限/i.test(errorMessage(error));
}

function systemAlbumDenied() {
  try {
    return wx.getAppAuthorizeSetting?.().albumAuthorized === 'denied';
  } catch (error) {
    return false;
  }
}

function openAlbumSettings() {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '需要相册权限',
      content: '保存测试结果需要“添加到相册”权限，请在设置中开启。',
      confirmText: '去设置',
      cancelText: '暂不保存',
      success: ({ confirm }) => {
        if (!confirm) {
          resolve(false);
          return;
        }
        wx.openSetting({
          success: ({ authSetting }) => {
            const allowed = authSetting?.[ALBUM_SCOPE] === true;
            if (!allowed) wx.showToast({ title: '未开启相册权限，暂未保存', icon: 'none' });
            resolve(allowed);
          },
          fail: reject,
        });
      },
      fail: reject,
    });
  });
}

function openSystemAlbumSettings() {
  return new Promise((resolve, reject) => {
    const canOpen = typeof wx.openAppAuthorizeSetting === 'function';
    wx.showModal({
      title: '请开启微信相册权限',
      content: '请在手机设置中允许微信添加照片或访问照片与存储，返回后重新点击分享结果并保存。',
      confirmText: canOpen ? '去设置' : '我知道了',
      cancelText: '暂不保存',
      showCancel: canOpen,
      success: ({ confirm }) => {
        if (!confirm || !canOpen) {
          resolve(false);
          return;
        }
        wx.openAppAuthorizeSetting({
          success: () => resolve(false),
          fail: () => {
            wx.showToast({ title: '请在手机设置中开启微信相册权限', icon: 'none' });
            resolve(false);
          },
        });
      },
      fail: reject,
    });
  });
}

async function ensureAlbumPermission() {
  if (systemAlbumDenied()) return openSystemAlbumSettings();
  const { authSetting } = await new Promise((resolve, reject) => {
    wx.getSetting({ success: resolve, fail: reject });
  });
  if (authSetting?.[ALBUM_SCOPE] === true) return true;
  if (authSetting?.[ALBUM_SCOPE] === false) return openAlbumSettings();

  try {
    await new Promise((resolve, reject) => {
      wx.authorize({ scope: ALBUM_SCOPE, success: resolve, fail: reject });
    });
    return true;
  } catch (error) {
    if (systemAlbumDenied()) return openSystemAlbumSettings();
    if (isCancelled(error)) return false;
    if (!isPermissionError(error)) throw error;
    wx.showToast({ title: '未开启相册权限，暂未保存', icon: 'none' });
    return false;
  }
}

async function retryAlbumSave(filePath) {
  if (!(await ensureAlbumPermission())) return;
  try {
    await new Promise((resolve, reject) => {
      wx.saveImageToPhotosAlbum({ filePath, success: resolve, fail: reject });
    });
    wx.showToast({ title: '已保存到相册', icon: 'success' });
  } catch (error) {
    if (isCancelled(error)) return;
    if (!isPermissionError(error)) throw error;
    const { authSetting } = await new Promise((resolve, reject) => {
      wx.getSetting({ success: resolve, fail: reject });
    });
    if (systemAlbumDenied() || authSetting?.[ALBUM_SCOPE] === true) {
      await openSystemAlbumSettings();
    } else {
      wx.showToast({ title: '未开启相册权限，请重新保存并授权', icon: 'none' });
    }
  }
}

function canUseShareImageMenu() {
  return typeof wx.showShareImageMenu === 'function';
}

export function createShareImageController(page) {
  return {
    sharing: false,

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
      if (this.sharing) return;
      if (!canUseShareImageMenu()) {
        wx.showToast({ title: '当前微信版本过低', icon: 'none' });
        return;
      }

      this.sharing = true;
      let imagePath = '';
      try {
        imagePath = await this.ensureShareImage(payload);
        await new Promise((resolve, reject) => {
          wx.showShareImageMenu({
            path: imagePath,
            needShowEntrance: true,
            entrancePath,
            success: resolve,
            fail: reject,
          });
        });
      } catch (error) {
        if (isCancelled(error)) return;
        if (imagePath && isPermissionError(error)) {
          try {
            await retryAlbumSave(imagePath);
          } catch (saveError) {
            if (isCancelled(saveError)) return;
            console.warn('保存分享图片失败', saveError);
            wx.showToast({ title: '保存失败，请稍后重试', icon: 'none' });
          }
          return;
        }
        console.warn('分享图片失败', error);
        wx.showToast({ title: error?.message || '分享失败，请稍后重试', icon: 'none' });
      } finally {
        this.sharing = false;
      }
    },
  };
}

export default {
  createShareImageController,
};
