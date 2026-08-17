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

export function drawRadar(ctx, radarData) {
  const { size, rings, axes, shape, labels } = radarData;
  ctx.clearRect(0, 0, size, size);

  rings.forEach((ring) => {
    ctx.beginPath();
    ring.forEach((point, index) => {
      if (index === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.closePath();
    ctx.setStrokeStyle('#E8E4F8');
    ctx.setLineWidth(1);
    ctx.stroke();
  });

  axes.forEach((axis) => {
    ctx.beginPath();
    ctx.moveTo(axis.from.x, axis.from.y);
    ctx.lineTo(axis.to.x, axis.to.y);
    ctx.setStrokeStyle('#E8E4F8');
    ctx.setLineWidth(1);
    ctx.stroke();
  });

  ctx.beginPath();
  shape.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.closePath();
  ctx.setFillStyle('rgba(123, 97, 255, 0.22)');
  ctx.setStrokeStyle('#7B61FF');
  ctx.setLineWidth(2);
  ctx.fill();
  ctx.stroke();

  shape.forEach((point) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 3.5, 0, Math.PI * 2);
    ctx.setFillStyle('#7B61FF');
    ctx.fill();
  });

  labels.forEach((item) => {
    ctx.setFillStyle('#1A1A1A');
    ctx.setFontSize(11);
    ctx.setTextAlign(item.align);
    ctx.fillText(item.label, item.x, item.y - 6);
    ctx.setFillStyle('#7B61FF');
    ctx.setFontSize(10);
    ctx.fillText(item.value, item.x, item.y + 10);
  });

  ctx.draw();
}

export default {
  buildRadarPoints,
  drawRadar,
};
