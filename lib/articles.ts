// 在静态构建时，使用静态数据
export { 
  getAllArticles, 
  getArticleById, 
  getBlogPosts, 
  getLatestArticles,
  generateArticleHash,
  calculateReadTime,
  getArticlesByCategory,
  getArticlesByTag,
  searchArticles,
  getAllCategories,
  getAllTags,
  getArticleStats,
  type Article,
  type BlogPost
} from './articles-static'

// 为了保持向后兼容，提供空的articles数组
export const articles: any[] = []