// 静态文章数据，用于构建时生成
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

// 静态文章数据
const staticArticles: Article[] = [
  {
    id: generateArticleHash("文章链接的生成原理"),
    title: "文章链接的生成原理",
    category: "科技",
    tags: ["技术", "算法", "哈希"],
    date: "2025年10月12日",
    excerpt: "每篇文章都有一个独特的链接，这篇文章将解释链接是如何生成的。",
    content: `## 什么是文章链接？
每篇文章都有一个独特的链接，比如这篇文章的链接是：\`/p/7w5i\`
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
用一个特殊的数学公式把这些数字组合起来，得到一个很大的数字。这个公式叫做**哈希函数**，具体算法如下：
#### 哈希算法详解
\`\`\`typescript
hash = 0
for i = 0 to title.length - 1:
    char = title.charCodeAt(i)  // 获取字符的Unicode编码
    hash = ((hash << 5) - hash) + char  // 左移5位并减去原值，再加上字符编码
    hash = hash & hash  // 转换为32位整数（防止溢出）
\`\`\`
#### 数学原理
1. **初始值**：\`hash = 0\`
2. **循环处理**：对每个字符执行以下操作：
   - 获取字符的Unicode编码值
   - 执行位运算：\`hash = ((hash << 5) - hash) + char\`
   - 其中 \`hash << 5\` 表示将hash左移5位（相当于乘以32）
   - \`(hash << 5) - hash\` 等价于 \`hash * 31\`
3. **溢出处理**：\`hash & hash\` 确保结果在32位整数范围内
#### 为什么这样设计？
- **相同输入→相同输出**：确定性算法，保证一致性
- **不同输入→不同输出**：减少碰撞概率
- **快速计算**：位运算比乘法运算更快
- **均匀分布**：31是质数，有助于均匀分布
### 第三步：转换成4位代码
把大数字转换成4位代码，只使用：
- 26个小写字母：a b c d e f g h i j k l m n o p q r s t u v w x y z
- 10个数字：0 1 2 3 4 5 6 7 8 9
就像把十进制数字转换成36进制一样！
#### 36进制转换算法
\`\`\`typescript
字符集 = "abcdefghijklmnopqrstuvwxyz0123456789"  // 36个字符
result = ""
num = Math.abs(hash)  // 取绝对值，确保为正数

for i = 0 to 3:  // 生成4位代码
    result = 字符集[num % 36] + result  // 取余数作为字符索引
    num = Math.floor(num / 36)  // 整除36，继续下一位
\`\`\`
#### 数学原理
1. **进制转换**：将十进制数字转换为36进制
2. **字符映射**：0-9对应数字，10-35对应字母a-z
3. **固定长度**：始终生成4位代码，不足时用0填充
4. **唯一性**：36^4 = 1,679,616种可能组合
#### 实际例子
假设哈希值是 \`1234567\`：
- 第1位：1234567 % 36 = 7 → "7"
- 第2位：Math.floor(1234567/36) % 36 = 34293 % 36 = 21 → "l"
- 第3位：Math.floor(34293/36) % 36 = 952 % 36 = 16 → "g"
- 第4位：Math.floor(952/36) % 36 = 26 % 36 = 26 → "q"
- 结果：\`7lgq\`
## 为什么这样做？
1. **唯一性**：每篇文章都有独特的链接
2. **简洁性**：链接很短，只有4个字符
3. **友好性**：只包含字母和数字，适合在网址中使用
4. **一致性**：相同的标题总是生成相同的链接`,
    slug: generateArticleHash("文章链接的生成原理")
  },
  {
    id: generateArticleHash("Markdown博客系统实现"),
    title: "Markdown博客系统实现",
    category: "科技",
    tags: ["技术", "博客", "Markdown"],
    date: "2025年10月14日",
    excerpt: "介绍如何将硬编码的文章系统改造为基于Markdown的灵活博客框架。",
    content: `## 系统概述
本博客系统采用Next.js + Markdown的技术栈，实现了从硬编码文章到动态Markdown文章的转换。
## 核心特性
### 1. Markdown支持
- 支持标准Markdown语法
- 代码块语法高亮
- 自动生成文章摘要
### 2. 分类系统
预设24个分类，确保内容组织有序：
- 科技、人文、社会、经济、政治
- 教育、艺术、体育、健康、环境
- 历史、哲学、心理学、法律、军事
- 娱乐、旅游、美食、时尚、建筑
- 音乐、文学、电影、其他
### 3. 标签系统
灵活的标签管理，支持多标签分类。
## 技术实现
\`\`\`typescript
// 文章接口定义
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
\`\`\`
## 文件结构
\`\`\`
       content/
         articles/
           7w5i.md    # 文章链接的生成原理
           tzh7.md    # Markdown博客系统实现
         README.md    # 使用说明
\`\`\`
## 使用说明
1. 在\`content/articles/\`目录下创建Markdown文件
2. 文件名使用文章哈希值（4位36进制）
3. 文件内容包含Front Matter和Markdown正文
4. 系统自动解析并生成静态页面
## 优势
- **静态生成**：构建时生成所有页面，访问速度快
- **SEO友好**：每个文章都有独立的URL和元数据
- **易于维护**：只需编辑Markdown文件即可更新内容
- **版本控制**：Markdown文件可以纳入Git版本控制`,
    slug: generateArticleHash("Markdown博客系统实现")
  }
]

// 获取所有文章
export async function getAllArticles(): Promise<Article[]> {
  return staticArticles
}

// 根据ID获取单篇文章
export async function getArticleById(id: string): Promise<Article | null> {
  return staticArticles.find(article => article.id === id) || null
}

// 根据slug获取单篇文章
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return staticArticles.find(article => article.slug === slug) || null
}

// 将文章转换为博客文章格式（用于首页显示）
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  return staticArticles.map(article => ({
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
  return staticArticles.filter(article => article.category === category)
}

// 根据标签获取文章
export async function getArticlesByTag(tag: string): Promise<Article[]> {
  return staticArticles.filter(article => article.tags.includes(tag))
}

// 搜索文章
export async function searchArticles(query: string): Promise<Article[]> {
  const lowercaseQuery = query.toLowerCase()
  
  return staticArticles.filter(article => 
    article.title.toLowerCase().includes(lowercaseQuery) ||
    article.content.toLowerCase().includes(lowercaseQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

// 获取所有分类
export async function getAllCategories(): Promise<string[]> {
  const categories = new Set(staticArticles.map(article => article.category))
  return Array.from(categories).sort()
}

// 获取所有标签
export async function getAllTags(): Promise<string[]> {
  const tags = new Set(staticArticles.flatMap(article => article.tags))
  return Array.from(tags).sort()
}

// 获取文章统计信息
export async function getArticleStats() {
  const existingCategories = await getAllCategories()
  const tags = await getAllTags()
  
  // 预设的分类列表
  const PRESET_CATEGORIES = [
    "科技", "人文", "社会", "经济", "政治", "教育", "艺术", "体育", 
    "健康", "环境", "历史", "哲学", "心理学", "法律", "军事", 
    "娱乐", "旅游", "美食", "时尚", "建筑", "音乐", "文学", "电影", "其他"
  ]
  
  return {
    totalArticles: staticArticles.length,
    totalCategories: existingCategories.length,
    totalTags: tags.length,
    categories: PRESET_CATEGORIES.map(category => ({
      name: category,
      count: staticArticles.filter(article => article.category === category).length
    })),
    tags: tags.map(tag => ({
      name: tag,
      count: staticArticles.filter(article => article.tags.includes(tag)).length
    }))
  }
}
