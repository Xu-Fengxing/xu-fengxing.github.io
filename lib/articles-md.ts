import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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

export interface BlogPost {
  id: string
  title: string
  category: string
  tags: string[]
  date: string
  excerpt: string
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

// 计算阅读时间
export const calculateReadTime = (content: string): string => {
  // 计算中文字符数
  const chineseCharCount = (content.match(/[\u4e00-\u9fa5]/g) || []).length
  // 计算英文单词数
  const englishWordCount = (content.match(/[a-zA-Z]+/g) || []).length
  const totalWords = chineseCharCount + englishWordCount
  const minutes = Math.ceil(totalWords / 200) // 假设每分钟阅读200个词
  return `${minutes} 分钟`
}

// 清理Markdown内容（移除Front Matter）
const cleanMarkdown = (content: string): string => {
  return content.replace(/^---[\s\S]*?---\n/, '')
}

// 提取文章摘要
const extractExcerpt = (content: string, maxLength: number = 150): string => {
  const cleanContent = cleanMarkdown(content)
  const text = cleanContent.replace(/[#*`\[\]()]/g, '').trim()
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

// 预设的分类列表
const PRESET_CATEGORIES = [
  "科技", "人文", "社会", "经济", "政治", "教育", "艺术", "体育", 
  "健康", "环境", "历史", "哲学", "心理学", "法律", "军事", 
  "娱乐", "旅游", "美食", "时尚", "建筑", "音乐", "文学", "电影", "其他"
]

// 获取所有文章（服务端函数）
function getAllArticlesSync(): Article[] {
  try {
    const articlesDirectory = path.join(process.cwd(), 'content/articles')
    
    if (!fs.existsSync(articlesDirectory)) {
      console.warn('Articles directory does not exist:', articlesDirectory)
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
    }).filter(article => article !== null) as Article[]
    
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

// 获取所有文章
export async function getAllArticles(): Promise<Article[]> {
  return getAllArticlesSync()
}

// 根据ID获取单篇文章
export async function getArticleById(id: string): Promise<Article | null> {
  const articles = getAllArticlesSync()
  return articles.find(article => article.id === id) || null
}

// 根据slug获取单篇文章
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = getAllArticlesSync()
  return articles.find(article => article.slug === slug) || null
}

// 将文章转换为博客文章格式（用于首页显示）
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const articles = getAllArticlesSync()
  return articles.map(article => ({
    id: article.id,
    title: article.title,
    category: article.category,
    tags: article.tags,
    date: article.date,
    excerpt: article.excerpt,
    slug: article.slug
  }))
}

// 获取最新文章
export const getLatestArticles = async (limit: number = 6): Promise<BlogPost[]> => {
  const articles = await getBlogPosts()
  return articles.slice(0, limit)
}

// 根据分类获取文章
export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const articles = getAllArticlesSync()
  return articles.filter(article => article.category === category)
}

// 根据标签获取文章
export async function getArticlesByTag(tag: string): Promise<Article[]> {
  const articles = getAllArticlesSync()
  return articles.filter(article => article.tags.includes(tag))
}

// 搜索文章
export async function searchArticles(query: string): Promise<Article[]> {
  const articles = getAllArticlesSync()
  const lowercaseQuery = query.toLowerCase()
  
  return articles.filter(article => 
    article.title.toLowerCase().includes(lowercaseQuery) ||
    article.content.toLowerCase().includes(lowercaseQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

// 获取所有分类
export async function getAllCategories(): Promise<string[]> {
  const articles = getAllArticlesSync()
  const categories = new Set(articles.map(article => article.category))
  return Array.from(categories).sort()
}

// 获取所有标签
export async function getAllTags(): Promise<string[]> {
  const articles = getAllArticlesSync()
  const tags = new Set(articles.flatMap(article => article.tags))
  return Array.from(tags).sort()
}

// 获取文章统计信息
export async function getArticleStats() {
  const articles = getAllArticlesSync()
  const existingCategories = await getAllCategories()
  const tags = await getAllTags()
  
  return {
    totalArticles: articles.length,
    totalCategories: existingCategories.length,
    totalTags: tags.length,
    categories: PRESET_CATEGORIES.map(category => ({
      name: category,
      count: articles.filter(article => article.category === category).length
    })),
    tags: tags.map(tag => ({
      name: tag,
      count: articles.filter(article => article.tags.includes(tag)).length
    }))
  }
}