/**
 * 从 source/_data/images.yml 读取图片配置
 * 自动同步到 _config.butterfly.yml
 *
 * 用法：node scripts/sync-images.js
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const root = path.resolve(__dirname, '..');
const imagesFile = path.join(root, 'source', '_data', 'images.yml');
const butterflyFile = path.join(root, '_config.butterfly.yml');

const images = yaml.load(fs.readFileSync(imagesFile, 'utf8'));
let config = fs.readFileSync(butterflyFile, 'utf8');

// 替换顶层 key 的值（只匹配顶层，即无缩进的 key）
function replaceTopLevel(content, key, value) {
  const regex = new RegExp(`^(${key}:\\s*)(.+)$`, 'm');
  return content.replace(regex, `$1${value}`);
}

// 替换指定行内的 key: value
function replaceLine(content, key, value) {
  const regex = new RegExp(`(${key}:\\s*).+`, 'g');
  return content.replace(regex, `$1${value}`);
}

// 同步顶层字段
// 全部图片已由 JS 动态随机轮换，这里只设 fallback 让主题创建必要 DOM 元素
config = replaceTopLevel(config, 'favicon', images.avatar);
config = replaceTopLevel(config, 'background', images.avatar);
config = replaceTopLevel(config, 'footer_img', images.avatar);
config = replaceTopLevel(config, 'default_top_img', images.avatar);
config = replaceTopLevel(config, 'index_img', images.avatar);
config = replaceTopLevel(config, 'archive_img', images.avatar);
config = replaceTopLevel(config, 'tag_img', images.avatar);
config = replaceTopLevel(config, 'category_img', images.avatar);

// avatar.img
config = config.replace(
  /(img:\s*).+/,
  `$1${images.avatar}`
);

// error_img fallback
config = config.replace(
  /(flink:\s*).+/,
  `$1${images.error_post}`
);
config = config.replace(
  /(post_page:\s*).+/,
  `$1${images.error_post}`
);

// error_404 background fallback
config = config.replace(
  /(error_404:[\s\S]*?background:\s*).+/,
  `$1${images.error_page}`
);

fs.writeFileSync(butterflyFile, config, 'utf8');

console.log('图片配置已同步到 _config.butterfly.yml');
console.log('  favicon/avatar:', images.avatar);
console.log('  (背景/大图/页脚已由 JS 动态轮换，跳过同步)');
