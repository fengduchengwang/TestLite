const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { test } = require('node:test');

const scope = 'scope.writePhotosAlbum';
const source = fs.readFileSync(
  path.join(__dirname, '../WXCode/pages/quiz/utils/shareImage.js'),
  'utf8',
).replace(/^import[^\n]+\n/gm, '')
  .replace('export function createShareImageController', 'function createShareImageController')
  .replace(/export default[\s\S]*$/, 'globalThis.createController = createShareImageController;');

function createRuntime(options = {}) {
  const state = {
    album: options.album,
    systemAlbum: options.systemAlbum || 'authorized',
    menuCalls: [],
    saveCalls: [],
    settingsCalls: 0,
    systemSettingsCalls: 0,
    authorizeCalls: 0,
    getSettingCalls: 0,
    exports: 0,
    loading: 0,
    modals: [],
    toasts: [],
    warnings: [],
  };
  const finish = (callback) => queueMicrotask(callback);
  const wx = {
    showLoading: () => { state.loading += 1; },
    hideLoading: () => { state.loading -= 1; },
    showToast: (value) => state.toasts.push(value),
    showShareImageMenu(value) {
      state.menuCalls.push(value);
      finish(() => {
        if (options.menuPending) {
          state.resolveMenu = () => value.success({ errMsg: 'showShareImageMenu:ok' });
        } else if (options.menuError) {
          value.fail(options.menuError);
        } else {
          value.success({ errMsg: 'showShareImageMenu:ok' });
        }
      });
    },
    getAppAuthorizeSetting: () => ({ albumAuthorized: state.systemAlbum }),
    getSetting(value) {
      state.getSettingCalls += 1;
      finish(() => value.success({ authSetting: { [scope]: state.album } }));
    },
    authorize(value) {
      state.authorizeCalls += 1;
      assert.equal(value.scope, scope);
      finish(() => {
        if (options.authorizeError) {
          state.album = false;
          value.fail(options.authorizeError);
        } else {
          state.album = true;
          value.success({});
        }
      });
    },
    showModal(value) {
      state.modals.push(value);
      finish(() => value.success({ confirm: options.confirm !== false }));
    },
    openSetting(value) {
      state.settingsCalls += 1;
      finish(() => {
        if (options.settingsError) {
          value.fail(options.settingsError);
        } else {
          state.album = options.settingsAllowed !== false;
          value.success({ authSetting: { [scope]: state.album } });
        }
      });
    },
    openAppAuthorizeSetting(value) {
      state.systemSettingsCalls += 1;
      finish(() => {
        if (options.systemSettingsError) value.fail(options.systemSettingsError);
        else value.success({});
      });
    },
    saveImageToPhotosAlbum(value) {
      state.saveCalls.push(value);
      finish(() => {
        if (options.saveError) value.fail(options.saveError);
        else value.success({});
      });
    },
  };
  if (options.noSystemSettings) delete wx.openAppAuthorizeSetting;
  if (options.noSystemStatus) delete wx.getAppAuthorizeSetting;
  if (options.noShareMenu) delete wx.showShareImageMenu;
  const page = { qrcodeDataUrl: 'existing-qrcode' };
  const context = {
    wx,
    console: { warn: (...args) => state.warnings.push(args) },
    async exportSharePoster(receivedPage, payload, qrcode) {
      state.exports += 1;
      assert.equal(receivedPage, page);
      assert.equal(qrcode, page.qrcodeDataUrl);
      if (options.exportError) throw options.exportError;
      return '/tmp/result-poster.png';
    },
  };
  vm.runInNewContext(source, context);
  return { state, controller: context.createController(page) };
}

const denied = { errMsg: 'showShareImageMenu:fail auth deny' };

test('normal sharing preserves the target page and does not request album permission', async () => {
  const { state, controller } = createRuntime({ album: false, systemAlbum: 'denied' });
  const entrance = '/pages/quiz/intro/index?key=fun_001&testId=1';
  await controller.shareResult({}, entrance);
  assert.equal(state.menuCalls[0].entrancePath, entrance);
  assert.equal(state.menuCalls[0].needShowEntrance, true);
  assert.equal(state.getSettingCalls, 0);
  assert.equal(state.authorizeCalls, 0);
  assert.equal(state.modals.length, 0);
  assert.equal(state.saveCalls.length, 0);
  assert.equal(state.loading, 0);
  assert.equal(controller.sharing, false);
});

test('denied mini program permission opens settings after confirmation and retries the same image', async () => {
  const { state, controller } = createRuntime({ menuError: denied, album: false });
  await controller.shareResult({});
  assert.equal(state.modals.length, 1);
  assert.equal(state.settingsCalls, 1);
  assert.equal(state.systemSettingsCalls, 0);
  assert.equal(state.saveCalls.length, 1);
  assert.equal(state.saveCalls[0].filePath, state.menuCalls[0].path);
  assert.equal(state.exports, 1);
  assert.equal(state.toasts.at(-1).title, '已保存到相册');
});

test('declining the settings prompt never opens settings or saves a file', async () => {
  const { state, controller } = createRuntime({ menuError: denied, album: false, confirm: false });
  await controller.shareResult({});
  assert.equal(state.settingsCalls, 0);
  assert.equal(state.saveCalls.length, 0);
  assert.equal(controller.sharing, false);
});

test('returning from settings without enabling permission does not report a successful save', async () => {
  const { state, controller } = createRuntime({ menuError: denied, album: false, settingsAllowed: false });
  await controller.shareResult({});
  assert.equal(state.saveCalls.length, 0);
  assert.ok(state.toasts.every((toast) => toast.icon !== 'success'));
});

test('previously unrequested permission is requested and then the image is saved', async () => {
  const { state, controller } = createRuntime({ menuError: denied });
  await controller.shareResult({});
  assert.equal(state.authorizeCalls, 1);
  assert.equal(state.settingsCalls, 0);
  assert.equal(state.saveCalls.length, 1);
});

test('declining initial authorization stops without repeatedly prompting', async () => {
  const { state, controller } = createRuntime({
    menuError: denied,
    authorizeError: { errMsg: 'authorize:fail auth deny' },
  });
  await controller.shareResult({});
  assert.equal(state.authorizeCalls, 1);
  assert.equal(state.modals.length, 0);
  assert.equal(state.saveCalls.length, 0);
});

test('system album denial opens system settings and never treats opening settings as authorization', async () => {
  const { state, controller } = createRuntime({ menuError: denied, album: true, systemAlbum: 'denied' });
  await controller.shareResult({});
  assert.equal(state.systemSettingsCalls, 1);
  assert.equal(state.settingsCalls, 0);
  assert.equal(state.authorizeCalls, 0);
  assert.equal(state.saveCalls.length, 0);
  assert.ok(state.toasts.every((toast) => toast.icon !== 'success'));
  assert.equal(controller.sharing, false);
});

test('Android system permission failure is handled even without an album status API', async () => {
  const { state, controller } = createRuntime({
    menuError: denied,
    album: true,
    noSystemStatus: true,
    saveError: { errMsg: 'saveImageToPhotosAlbum:fail system permission denied' },
  });
  await controller.shareResult({});
  assert.equal(state.saveCalls.length, 1);
  assert.equal(state.systemSettingsCalls, 1);
  assert.ok(state.toasts.every((toast) => toast.icon !== 'success'));
});

test('older clients get manual settings guidance when system settings cannot be opened', async () => {
  const { state, controller } = createRuntime({
    menuError: denied,
    systemAlbum: 'denied',
    noSystemSettings: true,
  });
  await controller.shareResult({});
  assert.equal(state.modals[0].showCancel, false);
  assert.equal(state.systemSettingsCalls, 0);
  assert.equal(state.saveCalls.length, 0);
});

test('cancelling the native share menu is silent', async () => {
  const { state, controller } = createRuntime({ menuError: { errMsg: 'showShareImageMenu:fail cancel' } });
  await controller.shareResult({});
  assert.equal(state.toasts.length, 0);
  assert.equal(state.modals.length, 0);
  assert.equal(state.getSettingCalls, 0);
});

test('unrelated file errors and privacy configuration errors do not request album permission', async () => {
  for (const menuError of [
    { errMsg: 'showShareImageMenu:fail file not found' },
    { errMsg: 'showShareImageMenu:fail api scope is not declared in the privacy agreement', errno: 112 },
  ]) {
    const { state, controller } = createRuntime({ menuError });
    await controller.shareResult({});
    assert.equal(state.modals.length, 0);
    assert.equal(state.authorizeCalls, 0);
    assert.equal(state.saveCalls.length, 0);
    assert.equal(state.warnings.length, 1);
    assert.equal(state.toasts.at(-1).icon, 'none');
  }
});

test('save and settings failures are caught and release the sharing lock', async () => {
  for (const options of [
    { album: true, saveError: { errMsg: 'saveImageToPhotosAlbum:fail storage full' } },
    { album: false, settingsError: { errMsg: 'openSetting:fail unavailable' } },
  ]) {
    const { state, controller } = createRuntime({ menuError: denied, ...options });
    await controller.shareResult({});
    assert.equal(controller.sharing, false);
    assert.equal(state.toasts.at(-1).title, '保存失败，请稍后重试');
    assert.equal(state.warnings.length, 1);
  }
});

test('rapid taps share one generated image and open only one native menu', async () => {
  const { state, controller } = createRuntime({ menuPending: true });
  const first = controller.shareResult({});
  await controller.shareResult({});
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(state.exports, 1);
  assert.equal(state.menuCalls.length, 1);
  state.resolveMenu();
  await first;
  assert.equal(controller.sharing, false);
});

test('poster generation failures hide loading and allow a subsequent attempt', async () => {
  const { state, controller } = createRuntime({ exportError: new Error('图片生成失败') });
  await controller.shareResult({});
  assert.equal(state.loading, 0);
  assert.equal(controller.sharing, false);
  assert.equal(state.menuCalls.length, 0);
  assert.equal(state.toasts.at(-1).title, '图片生成失败');
});
