# 风行Justin - 个人作品集

这是一个使用 Next.js 构建的静态个人作品集网站，展示设计作品和技术项目。

## 功能特性

- 🎨 响应式设计，支持桌面和移动设备
- 🌙 深色/浅色主题切换
- 📱 移动端友好的侧边栏导航
- 🎯 MBTI 性格分析展示
- 📝 博客文章列表
- 💼 作品集展示

## 技术栈

- **框架**: Next.js 14
- **样式**: Tailwind CSS
- **组件**: Radix UI
- **图标**: Lucide React
- **字体**: Geist Sans & Geist Mono
- **主题**: next-themes

## 开发

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建静态网站

```bash
npm run build
```

### 本地预览静态网站

```bash
npm run serve
```

## 部署

这个项目配置为静态导出，可以部署到任何静态网站托管服务：

- **Vercel**: 直接连接 GitHub 仓库
- **Netlify**: 拖拽 `out` 文件夹
- **GitHub Pages**: 上传 `out` 文件夹内容
- **其他静态托管**: 使用 `out` 文件夹中的文件

## 项目结构

```
├── app/                    # Next.js App Router 页面
│   ├── page.tsx           # 首页 (MBTI 展示)
│   ├── blog/page.tsx      # 博客页面
│   ├── portfolio/page.tsx # 作品集页面
│   └── layout.tsx         # 根布局
├── components/            # React 组件
│   ├── sidebar.tsx        # 侧边栏导航
│   ├── mbti-section.tsx   # MBTI 展示组件
│   └── ui/               # UI 组件库
├── public/               # 静态资源
└── out/                  # 构建输出 (静态文件)
```

## 自定义

### 修改个人信息

编辑 `components/sidebar.tsx` 中的个人信息：
- 头像: 替换 `public/avatar.jpg`
- 姓名: 修改 "风行Justin" 和 "Justin Xu"
- 网站: 修改 "fengxing.site"

### 修改 MBTI 信息

编辑 `components/mbti-section.tsx` 中的 MBTI 数据：
- 性格类型: 修改 "鉴赏家" 和 "ISTP-T"
- 描述: 修改个人描述和特征标签
- 维度数据: 调整各个维度的百分比

### 添加博客文章

编辑 `app/blog/page.tsx` 中的 `posts` 数组。

### 添加作品集项目

编辑 `app/portfolio/page.tsx` 中的 `projects` 数组，并添加对应的图片到 `public/` 文件夹。

## 许可证

MIT License
