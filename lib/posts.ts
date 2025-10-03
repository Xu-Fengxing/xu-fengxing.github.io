export interface Post {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  content: string
}

export const posts: Post[] = [
  {
    id: "test-article",
    title: "个人网站开发日志",
    excerpt: "记录使用v0.dev生成框架、Cursor精修和GitHub Pages部署的完整开发流程。",
    date: "2025-10-02",
    category: "开发",
    content: `# 个人网站开发日志

从 v0.dev 快速搭建基础框架，到 Cursor 精修细节功能，逐步形成了一套完整的个人网站开发解决方案。

## 2025年10月2日

### v0.dev框架搭建

使用v0.dev快速生成Next.js项目基础框架，包含：
- 现代化的React组件结构
- Tailwind CSS样式系统
- 响应式布局设计
- 基础路由配置
- 侧边栏导航组件
- Hero首页组件
- 博客文章页面

## 2025年10月3日

### Cursor精修优化

通过Cursor AI助手进行代码优化和功能完善：

#### 首页优化
- Hero部分添加动态效果和社交链接
- MBTI性格分析模块集成
- 平滑过渡动画效果
- 响应式设计完善

#### 博客系统
- 文章列表页面设计
- 文章详情页面优化
- 自定义Markdown渲染
- 返回顶部功能
- 文章样式统一

#### 友链页面
- 友链展示卡片设计
- 申请友链功能
- 响应式网格布局
- 占位符设计

#### 侧边栏功能
- 导航菜单优化
- 友链模块集成
- ICP备案信息
- 主题切换支持

### GitHub Pages部署

利用GitHub Pages进行免费静态托管：
- 配置Next.js静态导出
- 设置GitHub Actions自动部署
- 绑定自定义域名fengxing.site
- 优化SEO和性能

---

*返回顶部*`
  }
]
