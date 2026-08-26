import { buildRadarPoints, paintRadar } from './radar';

const POSTER_WIDTH = 750;
const HORIZONTAL_PADDING = 56;
const CONTENT_WIDTH = POSTER_WIDTH - HORIZONTAL_PADDING * 2;
const RADAR_SIZE = 320;
const SECTION_GAP = 40;
const BAR_ROW_HEIGHT = 56;
const TAG_HEIGHT = 32;
const TAG_PADDING_X = 18;
const TAG_GAP = 12;
const TAG_ROW_GAP = 12;
const TAG_FONT_SIZE = 22;
const FOOTER_TOP_GAP = 24;
const FOOTER_HEIGHT = 120;
const QR_CODE_SIZE = 96;
const QR_CODE_PATHS = ['/static/miniprogram-qrcode.png', '/static/miniprogram-qrcode.jpg'];
export const MINIPROGRAM_QR_CODE = QR_CODE_PATHS[0];
const FOOTER_TEXT = '来自「轻测」小程序';

let cachedQrcodePath = '';

function measureLines(ctx, text, maxWidth, fontSize) {
  ctx.setFontSize(fontSize);
  const chars = String(text || '').split('');
  const lines = [];
  let line = '';

  chars.forEach((char) => {
    const next = line + char;
    if (ctx.measureText(next).width > maxWidth && line) {
      lines.push(line);
      line = char;
    } else {
      line = next;
    }
  });

  if (line) lines.push(line);
  return lines.length ? lines : [''];
}

function fillLines(ctx, lines, x, startY, lineHeight, color, fontSize, align = 'left') {
  ctx.setFillStyle(color);
  ctx.setFontSize(fontSize);
  ctx.setTextAlign(align);
  lines.forEach((line, index) => {
    ctx.fillText(line, x, startY + index * lineHeight);
  });
  return startY + lines.length * lineHeight;
}

function drawRoundRect(ctx, x, y, width, height, radius, fillStyle) {
  if (width <= 0 || height <= 0) return;
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.arc(x + width - r, y + r, r, -Math.PI / 2, 0);
  ctx.lineTo(x + width, y + height - r);
  ctx.arc(x + width - r, y + height - r, r, 0, Math.PI / 2);
  ctx.lineTo(x + r, y + height);
  ctx.arc(x + r, y + height - r, r, Math.PI / 2, Math.PI);
  ctx.lineTo(x, y + r);
  ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
  ctx.closePath();
  ctx.setFillStyle(fillStyle);
  ctx.fill();
}

function drawSectionTitle(ctx, kicker, title, y) {
  fillLines(ctx, [kicker], HORIZONTAL_PADDING, y, 34, '#7B61FF', 24);
  y += 40;
  const titleLines = measureLines(ctx, title, CONTENT_WIDTH, 32);
  y = fillLines(ctx, titleLines, HORIZONTAL_PADDING, y, 44, '#1A1A1A', 32);
  return y + 20;
}

function measureTagRows(ctx, highlights) {
  if (!highlights.length) return 0;
  let tagX = HORIZONTAL_PADDING;
  let rows = 1;
  ctx.setFontSize(TAG_FONT_SIZE);
  highlights.forEach((item) => {
    const label = `${item.label} · ${item.score}%`;
    const tagWidth = Math.min(ctx.measureText(label).width + TAG_PADDING_X * 2, CONTENT_WIDTH);
    if (tagX + tagWidth > HORIZONTAL_PADDING + CONTENT_WIDTH) {
      tagX = HORIZONTAL_PADDING;
      rows += 1;
    }
    tagX += tagWidth + TAG_GAP;
  });
  return rows;
}

function measureTagBlockHeight(ctx, highlights) {
  const rows = measureTagRows(ctx, highlights);
  if (!rows) return 0;
  return rows * TAG_HEIGHT + (rows - 1) * TAG_ROW_GAP + 24;
}

function drawHeroTags(ctx, highlights, startY) {
  if (!highlights.length) return startY;

  let tagX = HORIZONTAL_PADDING;
  let tagRowTop = startY;
  ctx.setFontSize(TAG_FONT_SIZE);

  highlights.forEach((item) => {
    const label = `${item.label} · ${item.score}%`;
    const tagWidth = Math.min(ctx.measureText(label).width + TAG_PADDING_X * 2, CONTENT_WIDTH);
    if (tagX + tagWidth > HORIZONTAL_PADDING + CONTENT_WIDTH) {
      tagX = HORIZONTAL_PADDING;
      tagRowTop += TAG_HEIGHT + TAG_ROW_GAP;
    }

    drawRoundRect(ctx, tagX, tagRowTop, tagWidth, TAG_HEIGHT, TAG_HEIGHT / 2, '#F0ECFF');
    ctx.setFillStyle('#7B61FF');
    ctx.setFontSize(TAG_FONT_SIZE);
    ctx.setTextAlign('left');
    ctx.fillText(label, tagX + TAG_PADDING_X, tagRowTop + TAG_HEIGHT / 2 + 7);
    tagX += tagWidth + TAG_GAP;
  });

  return tagRowTop + TAG_HEIGHT + 24;
}

function measureSectionTitleHeight(ctx, title) {
  const titleLines = measureLines(ctx, title, CONTENT_WIDTH, 32);
  return 40 + titleLines.length * 44 + 20;
}

function measureHeroHeight(ctx, payload) {
  const { model = {} } = payload;
  const profile = model.primaryProfile || {};
  const highlights = (model.highlights || []).slice(0, 4);
  const quote = profile.share || '';

  let height = 72 + 48;
  height += measureLines(ctx, profile.name || '测试结果', CONTENT_WIDTH, 44).length * 58 + 12;
  height += measureLines(ctx, profile.verdict || '', CONTENT_WIDTH, 28).length * 40 + 24;
  if (highlights.length) {
    height += measureTagBlockHeight(ctx, highlights);
  }
  if (quote) {
    height += measureLines(ctx, `“${quote}”`, CONTENT_WIDTH - 48, 26).length * 38 + 48 + 28;
  }
  return height;
}

function measureRadarHeight(ctx, payload) {
  const title = payload.display?.radarTitle || '维度雷达';
  return SECTION_GAP + measureSectionTitleHeight(ctx, title) + RADAR_SIZE + 24;
}

function measureDimensionsHeight(ctx, bars, dimensionTitle) {
  if (!bars.length) return 0;
  return SECTION_GAP + measureSectionTitleHeight(ctx, dimensionTitle) + bars.length * BAR_ROW_HEIGHT + 12;
}

function measureFooterHeight() {
  return FOOTER_TOP_GAP + FOOTER_HEIGHT + 24;
}

function drawHeroSection(ctx, payload, startY) {
  const { model = {}, display = {} } = payload;
  const profile = model.primaryProfile || {};
  const highlights = (model.highlights || []).slice(0, 4);
  const quote = profile.share || '';
  const heroLabel = display.heroLabel || '测试结果';

  let y = startY;
  fillLines(ctx, [heroLabel], HORIZONTAL_PADDING, y, 34, '#7B61FF', 24);
  y += 48;
  y = fillLines(
    ctx,
    measureLines(ctx, profile.name || '测试结果', CONTENT_WIDTH, 44),
    HORIZONTAL_PADDING,
    y,
    58,
    '#1A1A1A',
    44,
  ) + 12;
  y = fillLines(
    ctx,
    measureLines(ctx, profile.verdict || '', CONTENT_WIDTH, 28),
    HORIZONTAL_PADDING,
    y,
    40,
    '#666666',
    28,
  ) + 24;

  if (highlights.length) {
    y = drawHeroTags(ctx, highlights, y);
  }

  if (quote) {
    const quoteLines = measureLines(ctx, `“${quote}”`, CONTENT_WIDTH - 48, 26);
    const quoteHeight = quoteLines.length * 38 + 48;
    drawRoundRect(ctx, HORIZONTAL_PADDING, y, CONTENT_WIDTH, quoteHeight, 20, '#F7F4FF');
    fillLines(ctx, quoteLines, HORIZONTAL_PADDING + 24, y + 44, 38, '#1A1A1A', 26);
    y += quoteHeight + 28;
  }

  return y;
}

function drawRadarSection(ctx, payload, startY) {
  const { display = {}, model = {}, dimensions = [] } = payload;
  if (!dimensions.length || !model.scores) return startY;

  let y = startY + SECTION_GAP;
  y = drawSectionTitle(ctx, '整体轮廓', display.radarTitle || '维度雷达', y);

  const radarX = (POSTER_WIDTH - RADAR_SIZE) / 2;
  const radarData = buildRadarPoints(dimensions, model.scores, RADAR_SIZE);
  paintRadar(ctx, radarData, radarX, y);
  return y + RADAR_SIZE + 24;
}

function drawDimensionsSection(ctx, payload, startY) {
  const { display = {}, model = {} } = payload;
  const bars = model.dimensionBars || [];
  if (!bars.length) return startY;

  let y = startY + SECTION_GAP;
  y = drawSectionTitle(ctx, '结果分布', display.dimensionTitle || '结果分布', y);

  bars.forEach((item) => {
    ctx.setFillStyle('#1A1A1A');
    ctx.setFontSize(24);
    ctx.setTextAlign('left');
    ctx.fillText(item.label, HORIZONTAL_PADDING, y + 22);

    ctx.setFillStyle('#7B61FF');
    ctx.setFontSize(24);
    ctx.setTextAlign('right');
    ctx.fillText(`${item.score}%`, HORIZONTAL_PADDING + CONTENT_WIDTH, y + 22);
    ctx.setTextAlign('left');

    const trackY = y + 34;
    drawRoundRect(ctx, HORIZONTAL_PADDING, trackY, CONTENT_WIDTH, 12, 6, '#ECE8FF');
    drawRoundRect(
      ctx,
      HORIZONTAL_PADDING,
      trackY,
      (CONTENT_WIDTH * item.score) / 100,
      12,
      6,
      item.isStrongest ? '#5B45D6' : '#7B61FF',
    );
    y += BAR_ROW_HEIGHT;
  });

  return y + 12;
}

function drawFooterText(ctx, startY) {
  const footerTop = startY + FOOTER_TOP_GAP;
  const textY = footerTop + QR_CODE_SIZE / 2 + 8;

  ctx.setFillStyle('#999999');
  ctx.setFontSize(22);
  ctx.setTextAlign('left');
  ctx.fillText(FOOTER_TEXT, HORIZONTAL_PADDING, textY);

  return {
    footerTop,
    endY: startY + measureFooterHeight(),
  };
}

function drawQrcodeOverlay(ctx, footerTop, qrcodePath) {
  if (!qrcodePath) return;
  const qrX = POSTER_WIDTH - HORIZONTAL_PADDING - QR_CODE_SIZE;
  ctx.drawImage(qrcodePath, qrX, footerTop, QR_CODE_SIZE, QR_CODE_SIZE);
}

function drawSharePosterContent(ctx, payload, width = POSTER_WIDTH) {
  const { modules = {} } = payload;
  const showRadar = modules.radar && (payload.dimensions || []).length > 0;
  const showDimensions = modules.dimensions && (payload.model?.dimensionBars || []).length > 0;

  const heroHeight = measureHeroHeight(ctx, payload);
  const radarHeight = showRadar ? measureRadarHeight(ctx, payload) : 0;
  const dimensionsHeight = showDimensions
    ? measureDimensionsHeight(ctx, payload.model.dimensionBars, payload.display?.dimensionTitle || '结果分布')
    : 0;
  const footerHeight = measureFooterHeight();
  const height = Math.max(heroHeight + radarHeight + dimensionsHeight + footerHeight + 80, 920);

  ctx.setFillStyle('#F2F2F7');
  ctx.fillRect(0, 0, width, height);
  drawRoundRect(ctx, 40, 40, width - 80, height - 80, 28, '#FFFFFF');

  let y = 112;
  y = drawHeroSection(ctx, payload, y);
  if (showRadar) {
    y = drawRadarSection(ctx, payload, y);
  }
  if (showDimensions) {
    y = drawDimensionsSection(ctx, payload, y);
  }

  const { footerTop } = drawFooterText(ctx, y);
  return { height, footerTop };
}

function getImageInfo(src) {
  return new Promise((resolve, reject) => {
    wx.getImageInfo({
      src,
      success: (res) => resolve(res.path || src),
      fail: reject,
    });
  });
}

export function preloadMiniprogramQrcode() {
  if (cachedQrcodePath) {
    return Promise.resolve(cachedQrcodePath);
  }

  const tryLoad = (index) => {
    if (index >= QR_CODE_PATHS.length) {
      return Promise.resolve('');
    }
    return getImageInfo(QR_CODE_PATHS[index])
      .then((path) => {
        cachedQrcodePath = path;
        return path;
      })
      .catch(() => tryLoad(index + 1));
  };

  return tryLoad(0);
}

function loadQrcodeImage(preloadedPath = '') {
  if (preloadedPath) {
    return Promise.resolve(preloadedPath);
  }
  return preloadMiniprogramQrcode();
}

function exportCanvasToFile(page, canvasId, height) {
  return new Promise((resolve, reject) => {
    wx.canvasToTempFilePath(
      {
        canvasId,
        x: 0,
        y: 0,
        width: POSTER_WIDTH,
        height,
        destWidth: POSTER_WIDTH,
        destHeight: height,
        fileType: 'png',
        success: (res) => resolve(res.tempFilePath),
        fail: reject,
      },
      page,
    );
  });
}

export function drawSharePoster(ctx, payload, qrcodePath = '', width = POSTER_WIDTH) {
  const layout = drawSharePosterContent(ctx, payload, width);
  drawQrcodeOverlay(ctx, layout.footerTop, qrcodePath);
  return layout.height;
}

export function exportSharePoster(page, canvasId, payload, preloadedQrcodePath = '') {
  return loadQrcodeImage(preloadedQrcodePath).then((qrcodePath) =>
    new Promise((resolve, reject) => {
      const ctx = wx.createCanvasContext(canvasId, page);
      const { height, footerTop } = drawSharePosterContent(ctx, payload);

      ctx.draw(false, () => {
        const finishExport = () => {
          wx.nextTick(() => {
            setTimeout(() => {
              exportCanvasToFile(page, canvasId, height).then(resolve).catch(reject);
            }, 300);
          });
        };

        if (!qrcodePath) {
          finishExport();
          return;
        }

        const qrCtx = wx.createCanvasContext(canvasId, page);
        drawQrcodeOverlay(qrCtx, footerTop, qrcodePath);
        qrCtx.draw(true, () => {
          finishExport();
        });
      });
    }),
  );
}

export default {
  drawSharePoster,
  exportSharePoster,
  preloadMiniprogramQrcode,
  MINIPROGRAM_QR_CODE,
};
