#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 开始构建静态网站...');

try {
  // 清理之前的构建
  if (fs.existsSync('dist')) {
    console.log('🧹 清理之前的构建文件...');
    fs.rmSync('dist', { recursive: true, force: true });
  }

  // 构建静态网站
  console.log('📦 构建静态文件...');
  execSync('npm run build', { stdio: 'inherit' });

  // 检查构建结果
  if (fs.existsSync('dist')) {
    console.log('✅ 静态网站构建成功！');
    console.log('📁 输出目录: ./dist');
    console.log('🌐 你可以使用以下命令预览:');
    console.log('   npm run serve');
    console.log('   或者直接打开 dist/index.html');
  } else {
    console.error('❌ 构建失败，未找到 dist 目录');
    process.exit(1);
  }

} catch (error) {
  console.error('❌ 构建过程中出现错误:', error.message);
  process.exit(1);
}
