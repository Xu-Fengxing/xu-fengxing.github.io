import { Suspense } from "react"
import ArticleContent from "./ArticleContent"

// 生成静态参数供静态导出使用
export async function generateStaticParams() {
  try {
    // 在服务端获取文章列表
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/articles`)
    if (!response.ok) {
      return []
    }
    const articles = await response.json()
    return articles.map((article: any) => ({
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
