(function () {
  const root = window.PsyTest;
  const e = root.utils.escape;

  function point(index, count, radius, center) {
    const angle = -Math.PI / 2 + index * Math.PI * 2 / count;
    return [center + Math.cos(angle) * radius, center + Math.sin(angle) * radius];
  }

  function points(values, radius, center) {
    return values.map((value, index) => point(index, values.length, radius * value / 100, center).join(',')).join(' ');
  }

  function radar(dimensions, scores) {
    const center = 210;
    const radius = dimensions.length >= 8 ? 116 : 126;
    const labelRadius = dimensions.length >= 8 ? 166 : 164;
    const values = dimensions.map(item => scores[item.key]);
    const rings = [25, 50, 75, 100].map(level =>
      `<polygon class="radar-grid" points="${points(dimensions.map(() => level), radius, center)}"></polygon>`
    ).join('');
    const axes = dimensions.map((item, index) => {
      const [x, y] = point(index, dimensions.length, radius, center);
      return `<line class="radar-axis" x1="${center}" y1="${center}" x2="${x}" y2="${y}"></line>`;
    }).join('');
    const dots = values.map((value, index) => {
      const [x, y] = point(index, dimensions.length, radius * value / 100, center);
      return `<circle class="radar-dot" cx="${x}" cy="${y}" r="3.5"></circle>`;
    }).join('');
    const labels = dimensions.map((item, index) => {
      const [x, y] = point(index, dimensions.length, labelRadius, center);
      const anchor = x < center - 8 ? 'end' : x > center + 8 ? 'start' : 'middle';
      return `<text text-anchor="${anchor}"><tspan class="radar-label" x="${x}" y="${y - 6}">${e(item.label)}</tspan><tspan class="radar-value" x="${x}" y="${y + 10}">${scores[item.key]}%</tspan></text>`;
    }).join('');
    return `<svg class="radar" viewBox="0 0 420 420" role="img" aria-label="${dimensions.length}维结果雷达图">${rings}${axes}<polygon class="radar-shape" points="${points(values, radius, center)}"></polygon>${dots}${labels}</svg>`;
  }

  root.radar = radar;
}());
