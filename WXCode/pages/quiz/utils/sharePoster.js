import { buildRadarPoints, paintRadar } from './radar';

const POSTER_WIDTH = 750;
const HORIZONTAL_PADDING = 56;
const CONTENT_WIDTH = POSTER_WIDTH - HORIZONTAL_PADDING * 2;
const CONTENT_TOP = 80;
const IDENTITY_PADDING = 40;
const IDENTITY_TITLE_SIZE = 56;
const IDENTITY_TITLE_LINE_HEIGHT = IDENTITY_TITLE_SIZE * 1.15;
const IDENTITY_VERDICT_LINE_HEIGHT = 28 * 1.65;
const RADAR_SIZE = 320;
const SECTION_GAP = 40;
const BAR_ROW_HEIGHT = 56;
const TAG_HEIGHT = 32;
const TAG_PADDING_X = 18;
const TAG_GAP = 12;
const TAG_ROW_GAP = 12;
const TAG_FONT_SIZE = 22;
const FOOTER_TOP_GAP = 24;
const FOOTER_HEIGHT = 192;
const QR_CODE_SIZE = 192;
const QR_CODE_PATHS = ['/static/miniprogram-qrcode.png'];
export const MINIPROGRAM_QR_CODE = QR_CODE_PATHS[0];
export const SHARE_POSTER_CANVAS_SELECTOR = '#sharePosterCanvas';
const FOOTER_TEXT = '来自「轻测」小程序';

// Canvas 无法直接引用 Less 变量，配色与 ../theme.less 的结果页主题保持一致。
const POSTER_THEME = {
  background: '#09090d',
  surface: '#121218',
  track: '#202029',
  text: '#f5f3f7',
  textStrong: '#eeeaf2',
  muted: '#9995a2',
  line: '#292731',
  accent: '#a083ff',
  accentLabel: '#aa98ff',
  accentSoft: 'rgba(155, 124, 255, 0.09)',
  accentBorder: 'rgba(155, 124, 255, 0.22)',
};

let cachedQrcodeDataUrl = '';

function adaptCtx(ctx) {
  return {
    setFillStyle(color) {
      ctx.fillStyle = color;
    },
    setStrokeStyle(color) {
      ctx.strokeStyle = color;
    },
    setLineWidth(width) {
      ctx.lineWidth = width;
    },
    setFontSize(size, weight = 'normal') {
      ctx.font = `${weight} ${size}px sans-serif`;
    },
    setTextAlign(align) {
      ctx.textAlign = align;
    },
    setTextBaseline(baseline) {
      ctx.textBaseline = baseline;
    },
    setShadow(offsetX, offsetY, blur, color) {
      ctx.shadowOffsetX = offsetX;
      ctx.shadowOffsetY = offsetY;
      ctx.shadowBlur = blur;
      ctx.shadowColor = color;
    },
    fillText(...args) {
      ctx.fillText(...args);
    },
    fillRect(...args) {
      ctx.fillRect(...args);
    },
    beginPath() {
      ctx.beginPath();
    },
    closePath() {
      ctx.closePath();
    },
    moveTo(...args) {
      ctx.moveTo(...args);
    },
    lineTo(...args) {
      ctx.lineTo(...args);
    },
    arc(...args) {
      ctx.arc(...args);
    },
    fill() {
      ctx.fill();
    },
    stroke() {
      ctx.stroke();
    },
    clip() {
      ctx.clip();
    },
    save() {
      ctx.save();
    },
    restore() {
      ctx.restore();
    },
    translate(...args) {
      ctx.translate(...args);
    },
    measureText(text) {
      return ctx.measureText(text);
    },
    createLinearGradient(...args) {
      return ctx.createLinearGradient(...args);
    },
    createRadialGradient(...args) {
      return ctx.createRadialGradient(...args);
    },
  };
}

function measureLines(ctx, text, maxWidth, fontSize, weight = 'normal', letterSpacing = 0) {
  ctx.setFontSize(fontSize, weight);
  const chars = String(text || '').split('');
  const lines = [];
  let line = '';

  chars.forEach((char) => {
    const next = line + char;
    if (ctx.measureText(next).width + (next.length - 1) * letterSpacing > maxWidth && line) {
      lines.push(line);
      line = char;
    } else {
      line = next;
    }
  });

  if (line) lines.push(line);
  return lines.length ? lines : [''];
}

function fillLines(ctx, lines, x, startY, lineHeight, color, fontSize, align = 'left', weight = 'normal') {
  ctx.setFillStyle(color);
  ctx.setFontSize(fontSize, weight);
  ctx.setTextAlign(align);
  lines.forEach((line, index) => {
    ctx.fillText(line, x, startY + index * lineHeight);
  });
  return startY + lines.length * lineHeight;
}

function drawRoundRect(ctx, x, y, width, height, radius, fillStyle, strokeStyle = '') {
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
  if (strokeStyle) {
    ctx.setStrokeStyle(strokeStyle);
    ctx.setLineWidth(1);
    ctx.stroke();
  }
}

function drawSectionTitle(ctx, kicker, title, y) {
  fillLines(ctx, [kicker], HORIZONTAL_PADDING, y, 34, POSTER_THEME.accentLabel, 24);
  y += 40;
  const titleLines = measureLines(ctx, title, CONTENT_WIDTH, 32);
  y = fillLines(ctx, titleLines, HORIZONTAL_PADDING, y, 44, POSTER_THEME.text, 32);
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

    drawRoundRect(
      ctx,
      tagX,
      tagRowTop,
      tagWidth,
      TAG_HEIGHT,
      TAG_HEIGHT / 2,
      POSTER_THEME.accentSoft,
      POSTER_THEME.accentBorder,
    );
    ctx.setFillStyle(POSTER_THEME.accentLabel);
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

  const label = payload.display?.heroLabel || '测试结果';
  let height = measureLines(ctx, label, CONTENT_WIDTH, 22, 800, 3.52).length * 30 + 28;
  height += measureIdentityCard(ctx, profile).height + 28;
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

function calcPosterLayout(ctx, payload) {
  const { modules = {} } = payload;
  const showRadar = modules.radar && (payload.dimensions || []).length > 0;
  const showDimensions = modules.dimensions && (payload.model?.dimensionBars || []).length > 0;
  const heroHeight = measureHeroHeight(ctx, payload);
  const radarHeight = showRadar ? measureRadarHeight(ctx, payload) : 0;
  const dimensionsHeight = showDimensions
    ? measureDimensionsHeight(ctx, payload.model.dimensionBars, payload.display?.dimensionTitle || '结果分布')
    : 0;
  const footerHeight = measureFooterHeight();
  const height = Math.ceil(Math.max(CONTENT_TOP + heroHeight + radarHeight + dimensionsHeight + footerHeight + 40, 920));
  const footerTop = CONTENT_TOP + heroHeight + radarHeight + dimensionsHeight + FOOTER_TOP_GAP;
  return { height, footerTop, showRadar, showDimensions };
}

function drawSpacedText(ctx, text, x, y, size, spacing, color, weight = 800, align = 'left') {
  const chars = Array.from(String(text || ''));
  ctx.setFontSize(size, weight);
  ctx.setFillStyle(color);
  ctx.setTextAlign('left');
  const width = chars.reduce((total, char) => total + ctx.measureText(char).width, 0)
    + Math.max(chars.length - 1, 0) * spacing;
  let cursor = x - (align === 'right' ? width : align === 'center' ? width / 2 : 0);
  chars.forEach((char) => {
    ctx.fillText(char, cursor, y);
    cursor += ctx.measureText(char).width + spacing;
  });
}

function measureIdentityCard(ctx, profile) {
  // 与结果页 identity-main 的宽度、字号和行高一致；长文案自动撑高卡片。
  const width = (CONTENT_WIDTH - IDENTITY_PADDING * 2) * 0.88;
  const titleLines = measureLines(ctx, profile.name || '测试结果', width, IDENTITY_TITLE_SIZE, 800);
  const verdictLines = measureLines(ctx, profile.verdict || '', width, 28);
  const mainHeight = 36 + 24 + 14 + titleLines.length * IDENTITY_TITLE_LINE_HEIGHT
    + 16 + verdictLines.length * IDENTITY_VERDICT_LINE_HEIGHT + 28;
  const contentHeight = Math.max(420, 27 + mainHeight + 24);
  return {
    titleLines,
    verdictLines,
    height: contentHeight + IDENTITY_PADDING * 2,
    gap: (contentHeight - 27 - mainHeight - 24) / 2,
  };
}

function drawIdentityCard(ctx, payload, top) {
  const { identity = {}, model = {} } = payload;
  const layout = measureIdentityCard(ctx, model.primaryProfile || {});
  const x = HORIZONTAL_PADDING;
  const width = CONTENT_WIDTH;
  const { height } = layout;
  const left = x + IDENTITY_PADDING;
  const right = x + width - IDENTITY_PADDING;

  // 对齐结果页的 125deg 紫—粉—橙渐变。
  const angle = (125 * Math.PI) / 180;
  const dx = Math.sin(angle);
  const dy = -Math.cos(angle);
  const length = width * dx + height * dy;
  const gradient = ctx.createLinearGradient(
    x + width / 2 - dx * length / 2,
    top + height / 2 - dy * length / 2,
    x + width / 2 + dx * length / 2,
    top + height / 2 + dy * length / 2,
  );
  gradient.addColorStop(0, '#5b3fd4');
  gradient.addColorStop(0.52, '#c94d8a');
  gradient.addColorStop(1, '#e06a4e');

  ctx.save();
  ctx.setShadow(0, 36, 100, 'rgba(0, 0, 0, 0.32)');
  drawRoundRect(ctx, x, top, width, height, 16, gradient);
  ctx.restore();

  ctx.save();
  ctx.clip();
  const glowX = x + width * 0.82;
  const glowY = top + height * 0.2;
  const glow = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, width * 0.28);
  glow.addColorStop(0, 'rgba(255, 255, 255, 0.077)');
  glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.setFillStyle(glow);
  ctx.fillRect(x, top, width, height);
  ctx.setFillStyle('rgba(255, 255, 255, 0.0121)');
  for (let offset = 0; offset < width; offset += 68) {
    ctx.fillRect(x + offset, top, 2, height);
  }
  for (let offset = 0; offset < height; offset += 68) {
    ctx.fillRect(x, top + offset, width, 2);
  }

  ctx.setTextBaseline('top');
  fillLines(ctx, [identity.number || ''], x + width + 16, top + 68, 220,
    'rgba(255, 255, 255, 0.075)', 220, 'right', 900);
  drawSpacedText(ctx, identity.code, left, top + IDENTITY_PADDING, 22, 2.64, '#fff');
  drawSpacedText(ctx, identity.rank, right, top + IDENTITY_PADDING, 22, 2.64,
    'rgba(255, 255, 255, 0.78)', 800, 'right');

  let y = top + IDENTITY_PADDING + 27 + layout.gap + 36;
  drawSpacedText(ctx, 'YOUR SPECTRUM PROFILE', left, y, 20, 2.8,
    'rgba(255, 255, 255, 0.72)', 750);
  y += 24 + 14;
  y = fillLines(ctx, layout.titleLines, left, y, IDENTITY_TITLE_LINE_HEIGHT,
    '#fff', IDENTITY_TITLE_SIZE, 'left', 800) + 16;
  fillLines(ctx, layout.verdictLines, left, y, IDENTITY_VERDICT_LINE_HEIGHT,
    'rgba(255, 255, 255, 0.86)', 28);

  const footerY = top + height - IDENTITY_PADDING - 24;
  drawSpacedText(ctx, identity.footLeft, left, footerY, 20, 1.6,
    'rgba(255, 255, 255, 0.72)', 'normal');
  drawSpacedText(ctx, identity.footRight, right, footerY, 20, 1.6,
    'rgba(255, 255, 255, 0.72)', 'normal', 'right');
  ctx.restore();
  drawRoundRect(ctx, x, top, width, height, 16, 'rgba(0, 0, 0, 0)', POSTER_THEME.accentBorder);
  return top + height;
}

function drawHeroSection(ctx, payload, startY) {
  const { model = {}, display = {} } = payload;
  const profile = model.primaryProfile || {};
  const highlights = (model.highlights || []).slice(0, 4);
  const quote = profile.share || '';
  const heroLabel = display.heroLabel || '测试结果';

  let y = startY;
  const labelLines = measureLines(ctx, heroLabel, CONTENT_WIDTH, 22, 800, 3.52);
  ctx.save();
  ctx.setTextBaseline('top');
  labelLines.forEach((line) => {
    drawSpacedText(ctx, line, POSTER_WIDTH / 2, y, 22, 3.52, POSTER_THEME.accentLabel, 800, 'center');
    y += 30;
  });
  ctx.restore();
  y = drawIdentityCard(ctx, payload, y + 28) + 28;

  if (highlights.length) {
    y = drawHeroTags(ctx, highlights, y);
  }

  if (quote) {
    const quoteLines = measureLines(ctx, `“${quote}”`, CONTENT_WIDTH - 48, 26);
    const quoteHeight = quoteLines.length * 38 + 48;
    const quoteGradient = ctx.createLinearGradient(
      HORIZONTAL_PADDING,
      y,
      HORIZONTAL_PADDING + CONTENT_WIDTH,
      y + quoteHeight,
    );
    quoteGradient.addColorStop(0, 'rgba(155, 124, 255, 0.12)');
    quoteGradient.addColorStop(1, 'rgba(241, 135, 100, 0.09)');
    drawRoundRect(
      ctx,
      HORIZONTAL_PADDING,
      y,
      CONTENT_WIDTH,
      quoteHeight,
      16,
      quoteGradient,
      POSTER_THEME.line,
    );
    fillLines(ctx, quoteLines, HORIZONTAL_PADDING + 24, y + 44, 38, POSTER_THEME.textStrong, 26);
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
  paintRadar(ctx, radarData, radarX, y, 'dark');
  return y + RADAR_SIZE + 24;
}

function drawDimensionsSection(ctx, payload, startY) {
  const { display = {}, model = {} } = payload;
  const bars = model.dimensionBars || [];
  if (!bars.length) return startY;

  let y = startY + SECTION_GAP;
  y = drawSectionTitle(ctx, '结果分布', display.dimensionTitle || '结果分布', y);

  bars.forEach((item) => {
    const color = item.color || POSTER_THEME.accent;
    ctx.setFillStyle(POSTER_THEME.textStrong);
    ctx.setFontSize(24);
    ctx.setTextAlign('left');
    ctx.fillText(item.label, HORIZONTAL_PADDING, y + 22);

    ctx.setFillStyle(color);
    ctx.setFontSize(24);
    ctx.setTextAlign('right');
    ctx.fillText(`${item.score}%`, HORIZONTAL_PADDING + CONTENT_WIDTH, y + 22);
    ctx.setTextAlign('left');

    const trackY = y + 34;
    drawRoundRect(ctx, HORIZONTAL_PADDING, trackY, CONTENT_WIDTH, 12, 6, POSTER_THEME.track);
    drawRoundRect(
      ctx,
      HORIZONTAL_PADDING,
      trackY,
      (CONTENT_WIDTH * item.score) / 100,
      12,
      6,
      color,
    );
    y += BAR_ROW_HEIGHT;
  });

  return y + 12;
}

function drawFooterText(ctx, footerTop) {
  const textY = footerTop + QR_CODE_SIZE / 2 + 8;
  ctx.setFillStyle(POSTER_THEME.muted);
  ctx.setFontSize(22);
  ctx.setTextAlign('left');
  ctx.fillText(FOOTER_TEXT, HORIZONTAL_PADDING, textY);
}

function renderPosterContent(ctx, payload, height) {
  const { showRadar, showDimensions } = calcPosterLayout(ctx, payload);

  ctx.setFillStyle(POSTER_THEME.background);
  ctx.fillRect(0, 0, POSTER_WIDTH, height);
  drawRoundRect(
    ctx,
    40,
    40,
    POSTER_WIDTH - 80,
    height - 80,
    16,
    POSTER_THEME.surface,
    POSTER_THEME.line,
  );

  let y = CONTENT_TOP;
  y = drawHeroSection(ctx, payload, y);
  if (showRadar) {
    y = drawRadarSection(ctx, payload, y);
  }
  if (showDimensions) {
    y = drawDimensionsSection(ctx, payload, y);
  }

  const footerTop = y + FOOTER_TOP_GAP;
  drawFooterText(ctx, footerTop);
  return footerTop;
}

function readQrcodeDataUrl(index = 0) {
  if (index >= QR_CODE_PATHS.length) {
    return Promise.reject(new Error('小程序码读取失败'));
  }

  const filePath = QR_CODE_PATHS[index];
  const mime = filePath.endsWith('.png') ? 'image/png' : 'image/jpeg';

  return new Promise((resolve, reject) => {
    wx.getFileSystemManager().readFile({
      filePath,
      encoding: 'base64',
      success: (res) => resolve(`data:${mime};base64,${res.data}`),
      fail: () => {
        readQrcodeDataUrl(index + 1).then(resolve).catch(reject);
      },
    });
  });
}

export function preloadMiniprogramQrcode() {
  if (cachedQrcodeDataUrl) {
    return Promise.resolve(cachedQrcodeDataUrl);
  }
  return readQrcodeDataUrl().then((dataUrl) => {
    cachedQrcodeDataUrl = dataUrl;
    return dataUrl;
  });
}

function loadQrcodeImage(canvas, dataUrl = '') {
  const source = dataUrl || cachedQrcodeDataUrl;
  if (!source) {
    return preloadMiniprogramQrcode().then((url) => loadQrcodeImage(canvas, url));
  }

  return new Promise((resolve, reject) => {
    const image = canvas.createImage();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = source;
  });
}

function getPosterCanvas(page) {
  return new Promise((resolve, reject) => {
    wx.createSelectorQuery()
      .in(page)
      .select(SHARE_POSTER_CANVAS_SELECTOR)
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res?.[0]?.node;
        if (!canvas) {
          reject(new Error('分享画布初始化失败'));
          return;
        }
        resolve(canvas);
      });
  });
}

function exportCanvasToFile(canvas, height, dpr) {
  return new Promise((resolve, reject) => {
    wx.canvasToTempFilePath({
      canvas,
      x: 0,
      y: 0,
      width: POSTER_WIDTH * dpr,
      height: height * dpr,
      destWidth: POSTER_WIDTH,
      destHeight: height,
      fileType: 'png',
      success: (res) => resolve(res.tempFilePath),
      fail: reject,
    });
  });
}

export function exportSharePoster(page, payload, preloadedQrcodeDataUrl = '') {
  return getPosterCanvas(page).then((canvas) => {
    const rawCtx = canvas.getContext('2d');
    const ctx = adaptCtx(rawCtx);
    const dpr = wx.getWindowInfo().pixelRatio || 2;
    const { height } = calcPosterLayout(ctx, payload);

    canvas.width = POSTER_WIDTH * dpr;
    canvas.height = height * dpr;
    rawCtx.scale(dpr, dpr);

    const footerTop = renderPosterContent(ctx, payload, height);

    return loadQrcodeImage(canvas, preloadedQrcodeDataUrl)
      .then((image) => {
        const qrX = POSTER_WIDTH - HORIZONTAL_PADDING - QR_CODE_SIZE;
        rawCtx.drawImage(image, qrX, footerTop, QR_CODE_SIZE, QR_CODE_SIZE);
      })
      .catch((error) => {
        console.warn('share poster qrcode skipped', error);
      })
      .then(() => exportCanvasToFile(canvas, height, dpr));
  });
}

export default {
  exportSharePoster,
  preloadMiniprogramQrcode,
  MINIPROGRAM_QR_CODE,
  SHARE_POSTER_CANVAS_SELECTOR,
};
