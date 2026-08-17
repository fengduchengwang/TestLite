import config from '~/config';

function toError(err, fallback = '网络异常') {
  if (err instanceof Error) return err;
  if (typeof err === 'string') return new Error(err);
  if (err && typeof err === 'object') {
    const message = err.errMsg || err.message || fallback;
    const error = new Error(message);
    error.raw = err;
    return error;
  }
  return new Error(fallback);
}

/**
 * 统一请求封装（对齐 HappyWrite 风格的 { code, message, data }）
 */
export function request({ url, method = 'GET', data = {}, header = {} }) {
  const baseUrl = (config.apiBaseUrl || '').replace(/\/$/, '');
  const fullUrl = /^https?:\/\//.test(url) ? url : `${baseUrl}${url}`;

  return new Promise((resolve, reject) => {
    wx.request({
      url: fullUrl,
      method,
      data,
      header: {
        ...header,
      },
      success: (res) => {
        const body = res.data || {};
        if (res.statusCode >= 200 && res.statusCode < 300 && body.code === 0) {
          resolve(body.data);
          return;
        }
        reject(
          toError(
            body.message || `请求失败(${res.statusCode})`,
            `请求失败(${res.statusCode || 'unknown'})`,
          ),
        );
      },
      fail: (err) => {
        reject(toError(err, '网络异常，请检查域名配置或网络'));
      },
    });
  });
}

export default {
  request,
};
