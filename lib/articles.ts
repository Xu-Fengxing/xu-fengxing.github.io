// 重新导出新的Markdown文章系统
export * from './articles-md'

// 为了保持向后兼容，提供旧的接口
import { 
  getAllArticles, 
  getArticleById, 
  getBlogPosts, 
  getLatestArticles,
  generateArticleHash,
  type Article,
  type BlogPost
} from './articles-md'

// 兼容性导出
export const articles = getAllArticles()
