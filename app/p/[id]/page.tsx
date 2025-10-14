import { Suspense } from "react"
import ArticleContent from "./ArticleContent"

// 生成静态参数供静态导出使用
export async function generateStaticParams() {
  try {
    // 直接导入文章数据（静态构建时）
    const { getAllArticles } = await import('@/lib/articles')
    const articles = await getAllArticles()
    return articles.map((article) => ({
      id: article.id,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <ArticleContent articleId={id} />
    </Suspense>
  )
}
