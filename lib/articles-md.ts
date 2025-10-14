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
  category: string
  title: string
  excerpt: string
  date: string
  readTime: string
  slug: string
}

// 生成文章链接的哈希值（保持原有逻辑）
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

// 计算阅读时间（基于中文字符数）
const calculateReadTime = (content: string): string => {
  const chineseCharCount = (content.match(/[\u4e00-\u9fff]/g) || []).length
  const englishWordCount = content.split(/\s+/).length
  const totalWords = chineseCharCount + englishWordCount
  const minutes = Math.ceil(totalWords / 200) // 假设每分钟阅读200个词
  return `${minutes} 分钟`
}

// 获取基础URL
const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  return 'http://localhost:3000'
}

// 客户端API调用函数
async function fetchArticles(): Promise<Article[]> {
  try {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}/api/articles`)
    if (!response.ok) {
      throw new Error('Failed to fetch articles')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

async function fetchArticleById(id: string): Promise<Article | null> {
  try {
    const baseUrl = getBaseUrl()
    const response = await fetch(`${baseUrl}/api/articles/${id}`)
    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Failed to fetch article')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}

// 获取所有文章
export async function getAllArticles(): Promise<Article[]> {
  return await fetchArticles()
}

// 根据ID获取单篇文章
export async function getArticleById(id: string): Promise<Article | null> {
  return await fetchArticleById(id)
}

// 根据slug获取单篇文章
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getAllArticles()
  return articles.find(article => article.slug === slug) || null
}

// 将文章转换为博客文章格式（用于首页显示）
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const articles = await getAllArticles()
  return articles.map(article => ({
    id: article.id,
    category: article.category,
    title: article.title,
    excerpt: article.excerpt,
    date: article.date,
    readTime: calculateReadTime(article.content),
    slug: article.slug
  }))
}

// 获取最新文章（按日期排序）
export const getLatestArticles = async (count: number = 6): Promise<BlogPost[]> => {
  const blogPosts = await getBlogPosts()
  return blogPosts.slice(0, count)
}

// 根据分类获取文章
export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const articles = await getAllArticles()
  return articles.filter(article => article.category === category)
}

// 根据标签获取文章
export async function getArticlesByTag(tag: string): Promise<Article[]> {
  const articles = await getAllArticles()
  return articles.filter(article => article.tags.includes(tag))
}

// 搜索文章
export async function searchArticles(query: string): Promise<Article[]> {
  const articles = await getAllArticles()
  const lowercaseQuery = query.toLowerCase()
  
  return articles.filter(article => 
    article.title.toLowerCase().includes(lowercaseQuery) ||
    article.category.toLowerCase().includes(lowercaseQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    article.content.toLowerCase().includes(lowercaseQuery) ||
    article.excerpt.toLowerCase().includes(lowercaseQuery)
  )
}

// 获取所有分类
export async function getAllCategories(): Promise<string[]> {
  const articles = await getAllArticles()
  const categories = new Set(articles.map(article => article.category))
  return Array.from(categories).sort()
}

// 获取所有标签
export async function getAllTags(): Promise<string[]> {
  const articles = await getAllArticles()
  const tags = new Set(articles.flatMap(article => article.tags))
  return Array.from(tags).sort()
}

// 预设的分类列表
const PRESET_CATEGORIES = [
  "科技", "人文", "社会", "经济", "政治", "教育", "艺术", "体育", 
  "健康", "环境", "历史", "哲学", "心理学", "法律", "军事", 
  "娱乐", "旅游", "美食", "时尚", "建筑", "音乐", "文学", "电影", "其他"
]

// 获取文章统计信息
export async function getArticleStats() {
  const articles = await getAllArticles()
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
