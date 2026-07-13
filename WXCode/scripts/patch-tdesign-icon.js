const fs = require('fs');
const path = require('path');

const iconWxss = path.join(__dirname, '../miniprogram_npm/tdesign-miniprogram/icon/icon.wxss');

if (!fs.existsSync(iconWxss)) {
  process.exit(0);
}

const content = fs.readFileSync(iconWxss, 'utf8');
const patched = content.replace(/@font-face\s*\{[\s\S]*?\}\s*/m, '');

if (patched !== content) {
  fs.writeFileSync(iconWxss, patched);
}
