import { getLatestArticles } from '@/lib/articles'
import BlogGridClient from './blog-grid-client'

export async function BlogGrid() {
  const blogPosts = await getLatestArticles(6)
  return <BlogGridClient blogPosts={blogPosts} />
}