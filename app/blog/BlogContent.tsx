import { getAllArticles, getArticleStats } from '@/lib/articles'
import BlogClient from './BlogClient'

export default async function BlogContent() {
  const [articles, stats] = await Promise.all([
    getAllArticles(),
    getArticleStats()
  ])

  return <BlogClient articles={articles} stats={stats} />
}