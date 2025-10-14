import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// 配置为动态路由
export const dynamic = 'force-dynamic'

// 预设的分类列表
const PRESET_CATEGORIES = [
  "科技", "人文", "社会", "经济", "政治", "教育", "艺术", "体育", 
  "健康", "环境", "历史", "哲学", "心理学", "法律", "军事", 
  "娱乐", "旅游", "美食", "时尚", "建筑", "音乐", "文学", "电影", "其他"
]

// 文章接口定义
export interface Article {
  id: string
  title: string
  category: string
  tags: string[]
  date: string
  excerpt: string
  content: string
  slug: string
}

// 生成文章链接的哈希值
export const generateArticleHash = (title: string) => {
  let hash = 0
  for (let i = 0; i < title.length; i++) {
    const char = title.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // 转换为32位整数
  }
  
  // 36进制字符集：26个小写字母 + 10个数字
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  let num = Math.abs(hash)
  
  // 转换为4位36进制字符串
  for (let i = 0; i < 4; i++) {
    result = chars[num % 36] + result
    num = Math.floor(num / 36)
  }
  
  return result
}

// 从文件内容中提取摘要
const extractExcerpt = (content: string, maxLength: number = 100): string => {
  // 清理Markdown格式，转换为纯文本
  const cleaned = content
    .replace(/^#{1,6}\s+/gm, '') // 移除标题标记
    .replace(/\*\*(.*?)\*\*/g, '$1') // 移除粗体标记
    .replace(/\*(.*?)\*/g, '$1') // 移除斜体标记
    .replace(/`(.*?)`/g, '$1') // 移除代码标记
    .replace(/^\s*[-*+]\s+/gm, '• ') // 转换列表标记
    .replace(/^\s*\d+\.\s+/gm, '') // 移除有序列表标记
    .replace(/\n+/g, ' ') // 将多个换行符替换为空格
    .trim()
  
  return cleaned.length > maxLength ? cleaned.substring(0, maxLength) + '...' : cleaned
}

// 获取所有文章
function getAllArticles(): Article[] {
  try {
    const articlesDirectory = path.join(process.cwd(), 'content/articles')
    
    // 检查目录是否存在
    if (!fs.existsSync(articlesDirectory)) {
      console.warn('Articles directory not found:', articlesDirectory)
      return []
    }
    
    const filenames = fs.readdirSync(articlesDirectory)
    const markdownFiles = filenames.filter(name => name.endsWith('.md'))
    
    if (markdownFiles.length === 0) {
      console.warn('No markdown files found in articles directory')
      return []
    }
    
    const articles = markdownFiles.map(filename => {
      const filePath = path.join(articlesDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)
      
      // 验证必需的元数据
      if (!data.title || !data.category || !data.date) {
        console.warn(`Missing required metadata in ${filename}`)
        return null
      }
      
      // 验证分类是否为预设分类
      if (!PRESET_CATEGORIES.includes(data.category)) {
        console.warn(`Invalid category "${data.category}" in ${filename}. Must be one of: ${PRESET_CATEGORIES.join(', ')}`)
        return null
      }
      
      const slug = filename.replace('.md', '')
      const id = generateArticleHash(data.title)
      
      return {
        id,
        title: data.title,
        category: data.category,
        tags: data.tags || [],
        date: data.date,
        excerpt: data.excerpt || extractExcerpt(content),
        content: content,
        slug
      }
    }).filter(Boolean) as Article[]
    
    // 按日期排序（最新的在前）
    return articles.sort((a, b) => {
      try {
        const dateA = new Date(a.date.replace('年', '-').replace('月', '-').replace('日', ''))
        const dateB = new Date(b.date.replace('年', '-').replace('月', '-').replace('日', ''))
        return dateB.getTime() - dateA.getTime()
      } catch (error) {
        console.warn('Error parsing dates:', error)
        return 0
      }
    })
    
  } catch (error) {
    console.error('Error reading articles:', error)
    return []
  }
}

// GET /api/articles - 获取所有文章
export async function GET() {
  try {
    const articles = getAllArticles()
    console.log('Found articles:', articles.length)
    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error in articles API:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch articles',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
