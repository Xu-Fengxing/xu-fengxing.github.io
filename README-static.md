# 静态网站构建指南

这个项目已经配置为支持静态导出，可以部署到任何静态网站托管服务。

## 🚀 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 开发模式
```bash
npm run dev
```

### 3. 构建静态网站
```bash
npm run build
```

### 4. 预览静态网站
```bash
npm run serve
```

## 📁 输出文件

构建完成后，所有静态文件将输出到 `out/` 目录中，包括：
- `index.html` - 主页
- `blog/index.html` - 博客页面
- `portfolio/index.html` - 作品集页面
- `_next/` - 静态资源文件
- `public/` - 公共资源文件

## 🌐 部署选项

### GitHub Pages
1. 将 `out/` 目录的内容推送到 `gh-pages` 分支
2. 在 GitHub 仓库设置中启用 Pages

### Netlify
1. 将 `out/` 目录拖拽到 Netlify 部署界面
2. 或者连接 GitHub 仓库，设置构建命令为 `npm run build`

### Vercel
1. 连接 GitHub 仓库
2. 框架预设选择 "Next.js"
3. 构建命令会自动识别

### 其他静态托管
- 任何支持静态文件的托管服务都可以使用
- 只需要上传 `out/` 目录的内容

## ⚙️ 配置说明

### Next.js 配置
- `output: 'export'` - 启用静态导出
- `trailingSlash: true` - 添加尾部斜杠
- `images: { unoptimized: true }` - 禁用图片优化（静态导出需要）

### 构建脚本
- `npm run build` - 构建静态文件
- `npm run serve` - 本地预览静态网站

## 🔧 注意事项

1. **客户端功能**: 项目使用了 React hooks 和客户端交互，这些在静态导出中正常工作
2. **图片优化**: 已禁用 Next.js 图片优化，使用标准 HTML img 标签
3. **路由**: 使用 Next.js App Router，静态导出后路由正常工作
4. **样式**: Tailwind CSS 样式会正确打包到静态文件中

## 📝 自定义

如需修改构建配置，请编辑 `next.config.mjs` 文件。

## 🆘 问题排查

如果构建失败，请检查：
1. 所有依赖是否正确安装
2. 是否有 TypeScript 错误
3. 是否有 ESLint 错误（已配置忽略构建时错误）

构建成功后，`out/` 目录包含完整的静态网站，可以直接部署到任何静态托管服务。
