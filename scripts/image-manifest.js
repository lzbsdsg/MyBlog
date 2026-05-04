/**
 * 构建时自动扫描 source/images/ 生成图片清单
 * 前端 JS 读取 /images/manifest.json 实现随机轮换
 */

const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'source', 'images');
const outputFile = path.join(imagesDir, 'manifest.json');

const exts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

const files = fs.readdirSync(imagesDir)
  .filter(f => exts.includes(path.extname(f).toLowerCase()))
  .filter(f => f !== 'manifest.json');

fs.writeFileSync(outputFile, JSON.stringify(files, null, 2), 'utf8');
console.log(`[image-manifest] 已生成清单，共 ${files.length} 张图片`);
