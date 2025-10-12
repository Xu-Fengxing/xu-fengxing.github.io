import { Suspense } from "react"
import { articles, generateArticleHash } from "@/lib/articles"
import ArticleContent from "./ArticleContent"

// 生成静态参数供静态导出使用
export async function generateStaticParams() {
  return articles.map((article) => ({
    id: generateArticleHash(article.title),
  }))
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <ArticleContent articleId={params.id} />
    </Suspense>
  )
}
