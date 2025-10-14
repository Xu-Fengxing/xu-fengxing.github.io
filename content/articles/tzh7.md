---
title: "Markdown博客系统实现"
category: "科技"
tags: ["技术", "博客", "Markdown"]
date: "2025年10月14日"
excerpt: "介绍如何将硬编码的文章系统改造为基于Markdown的灵活博客框架。"
---
## 为什么需要Markdown？
传统的硬编码文章系统存在以下问题：
### 硬编码的局限性
1. **维护困难**：每次添加文章都需要修改代码
2. **版本控制复杂**：文章内容与代码混合在一起
3. **编辑门槛高**：需要开发者才能添加内容
4. **格式限制**：难以支持复杂的文档格式

## Markdown的优势
1. **简单易学**：Markdown语法简洁直观
2. **版本控制友好**：纯文本文件，易于追踪变更
3. **跨平台兼容**：任何文本编辑器都能编辑
4. **格式丰富**：支持标题、列表、代码块等
## 系统架构设计
### 文件结构
```
content/
  articles/
    7w5i.md
    tzh7.md
  README.md
```
### 代码示例
```typescript
// 生成文章链接的哈希值
export const generateArticleHash = (title: string) => {
  let hash = 0
  for (let i = 0; i < title.length; i++) {
    const char = title.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  let num = Math.abs(hash)
  for (let i = 0; i < 4; i++) {
    result = chars[num % 36] + result
    num = Math.floor(num / 36)
  }
  return result
}
```
### 元数据格式
每篇文章使用Front Matter格式：
```yaml
---
title: "文章标题"
category: "分类"
tags: ["标签1", "标签2"]
date: "2025年10月14日"
excerpt: "文章摘要"
---
```
## 实现步骤
### 1. 创建文章目录
首先创建 `content/articles/` 目录来存放所有Markdown文件。
### 2. 解析Markdown文件
使用Node.js的文件系统API读取所有 `.md` 文件，并解析Front Matter。
### 3. 生成文章列表
从所有Markdown文件中提取元数据，生成文章列表。
### 4. 动态路由
根据文章标题生成唯一的哈希ID，创建动态路由。
## 技术实现
### 文件读取
```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export function getAllArticles() {
  const articlesDirectory = path.join(process.cwd(), 'content/articles')
  const filenames = fs.readdirSync(articlesDirectory)
  
  return filenames.map(filename => {
    const filePath = path.join(articlesDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      id: generateArticleHash(data.title),
      title: data.title,
      category: data.category,
      tags: data.tags || [],
      date: data.date,
      excerpt: data.excerpt || extractExcerpt(content),
      content: content,
      slug: filename.replace('.md', '')
    }
  })
}
```
### 接口定义
```typescript
interface Article {
  id: string
  title: string
  category: string
  tags: string[]
  date: string
  excerpt: string
  content: string
  slug: string
}
```
## 文件结构
```
content/
  articles/
    7w5i.md
    tzh7.md
  README.md
```
## 使用说明
1. 在`content/articles/`目录下创建Markdown文件
2. 文件名使用文章哈希值（4位36进制）
3. 文件内容包含Front Matter和Markdown正文
4. 系统自动解析并生成静态页面
## 优势
- **静态生成**：构建时生成所有页面，访问速度快
- **SEO友好**：每个文章都有独立的URL和元数据
- **易于维护**：只需编辑Markdown文件即可更新内容
- **版本控制**：Markdown文件可以纳入Git版本控制
