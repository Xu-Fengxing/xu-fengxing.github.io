// 共享的文章数据
export interface Article {
  id: number
  title: string
  category: string
  tags: string[]
  date: string
  content: string
}

export interface BlogPost {
  id: number
  category: string
  title: string
  excerpt: string
  date: string
  readTime: string
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

// 文章数据
export const articles: Article[] = [
  {
    id: 1,
    title: "文章链接的生成原理",
    category: "科技",
    tags: ["技术", "算法", "哈希"],
    date: "2025年10月12日",
    content: `## 什么是文章链接？
每篇文章都有一个独特的链接，比如这篇文章的链接是：\`/p/${generateArticleHash("文章链接的生成原理")}\`
## 链接是怎么生成的？
### 第一步：把标题变成数字
就像给每个字母分配一个号码一样：
- 文 = 25991
- 章 = 31456
- 链 = 38142
- 接 = 25509
- 的 = 30340
- 生 = 29983
- 成 = 25104
- 原 = 21407
- 理 = 29702
### 第二步：计算哈希值
用一个特殊的数学公式把这些数字组合起来，得到一个很大的数字。这个公式确保：
- 相同的标题总是得到相同的数字
- 不同的标题得到不同的数字
### 第三步：转换成4位代码
把大数字转换成4位代码，只使用：
- 26个小写字母：a b c d e f g h i j k l m n o p q r s t u v w x y z
- 10个数字：0 1 2 3 4 5 6 7 8 9
就像把十进制数字转换成36进制一样！
## 为什么这样做？
1. **唯一性**：每篇文章都有独特的链接
2. **简洁性**：链接很短，只有4个字符
3. **友好性**：只包含字母和数字，适合在网址中使用
4. **一致性**：相同的标题总是生成相同的链接
## 实际例子
"文章链接的生成原理" → 哈希计算 → 36进制转换 → "${generateArticleHash("文章链接的生成原理")}"
所以这篇文章的完整链接就是：\`/p/${generateArticleHash("文章链接的生成原理")}\`
是不是很有趣？这就是现代网站生成文章链接的简单原理！`
  }
]

// 清理Markdown格式，转换为纯文本
const cleanMarkdown = (text: string): string => {
  return text
    .replace(/^#{1,6}\s+/gm, '') // 移除标题标记
    .replace(/\*\*(.*?)\*\*/g, '$1') // 移除粗体标记
    .replace(/\*(.*?)\*/g, '$1') // 移除斜体标记
    .replace(/`(.*?)`/g, '$1') // 移除代码标记
    .replace(/^\s*[-*+]\s+/gm, '• ') // 转换列表标记
    .replace(/^\s*\d+\.\s+/gm, '') // 移除有序列表标记
    .replace(/\n+/g, ' ') // 将多个换行符替换为空格
    .trim()
}

// 从文章内容中提取摘要
const extractExcerpt = (content: string, maxLength: number = 100): string => {
  const cleaned = cleanMarkdown(content)
  return cleaned.length > maxLength ? cleaned.substring(0, maxLength) + '...' : cleaned
}

// 将文章转换为博客文章格式（用于首页显示）
export const getBlogPosts = (): BlogPost[] => {
  return articles.map(article => ({
    id: article.id,
    category: article.category,
    title: article.title,
    excerpt: extractExcerpt(article.content),
    date: article.date,
    readTime: "3 分钟" // 可以根据内容长度计算
  }))
}

// 获取最新文章（按日期排序）
export const getLatestArticles = (count: number = 6): BlogPost[] => {
  const blogPosts = getBlogPosts()
  return blogPosts.slice(0, count)
}
