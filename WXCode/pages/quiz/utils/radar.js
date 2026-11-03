/**
 * 生成雷达图绘制数据（供 canvas 使用）
 */
export function buildRadarPoints(dimensions, scores, size = 300) {
  const center = size / 2;
  const count = dimensions.length;
  const radius = count >= 8 ? size * 0.28 : size * 0.3;
  const labelRadius = count >= 8 ? size * 0.4 : size * 0.39;

  const pointAt = (index, r) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / count;
    return {
      x: center + Math.cos(angle) * r,
      y: center + Math.sin(angle) * r,
    };
  };

  const rings = [0.25, 0.5, 0.75, 1].map((level) =>
    dimensions.map((_, index) => pointAt(index, radius * level)),
  );

  const axes = dimensions.map((_, index) => ({
    from: { x: center, y: center },
    to: pointAt(index, radius),
  }));

  const shape = dimensions.map((item, index) =>
    pointAt(index, (radius * (scores[item.key] || 0)) / 100),
  );

  const labels = dimensions.map((item, index) => {
    const pos = pointAt(index, labelRadius);
    return {
      ...pos,
      label: item.label,
      value: `${scores[item.key] || 0}%`,
      align: pos.x < center - 8 ? 'right' : pos.x > center + 8 ? 'left' : 'center',
    };
  });

  return { size, center, rings, axes, shape, labels };
}

const RADAR_THEMES = {
  light: {
    ring: '#E8E4F8',
    fill: 'rgba(123, 97, 255, 0.22)',
    stroke: '#7B61FF',
    label: '#1A1A1A',
    value: '#7B61FF',
  },
  dark: {
    ring: 'rgba(255, 255, 255, 0.08)',
    fill: 'rgba(138, 184, 238, 0.22)',
    stroke: '#8ab8ee',
    label: '#f4f1e9',
    value: '#b9d6fb',
  },
};

export function paintRadar(ctx, radarData, offsetX = 0, offsetY = 0, theme = 'light') {
  const { rings, axes, shape, labels } = radarData;
  const colors = RADAR_THEMES[theme] || RADAR_THEMES.light;

  ctx.save();
  ctx.translate(offsetX, offsetY);

  rings.forEach((ring) => {
    ctx.beginPath();
    ring.forEach((point, index) => {
      if (index === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.closePath();
    ctx.setStrokeStyle(colors.ring);
    ctx.setLineWidth(1);
    ctx.stroke();
  });

  axes.forEach((axis) => {
    ctx.beginPath();
    ctx.moveTo(axis.from.x, axis.from.y);
    ctx.lineTo(axis.to.x, axis.to.y);
    ctx.setStrokeStyle(colors.ring);
    ctx.setLineWidth(1);
    ctx.stroke();
  });

  ctx.beginPath();
  shape.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.closePath();
  ctx.setFillStyle(colors.fill);
  ctx.setStrokeStyle(colors.stroke);
  ctx.setLineWidth(2);
  ctx.fill();
  ctx.stroke();

  shape.forEach((point) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 3.5, 0, Math.PI * 2);
    ctx.setFillStyle(colors.stroke);
    ctx.fill();
  });

  labels.forEach((item) => {
    ctx.setFillStyle(colors.label);
    ctx.setFontSize(11);
    ctx.setTextAlign(item.align);
    ctx.fillText(item.label, item.x, item.y - 6);
    ctx.setFillStyle(colors.value);
    ctx.setFontSize(10);
    ctx.fillText(item.value, item.x, item.y + 10);
  });

  ctx.restore();
}

export function drawRadar(ctx, radarData, theme = 'light') {
  const { size } = radarData;
  ctx.clearRect(0, 0, size, size);
  paintRadar(ctx, radarData, 0, 0, theme);
  ctx.draw();
}

export default {
  buildRadarPoints,
  paintRadar,
  drawRadar,
};
