import { Suspense } from "react"
import { Sidebar } from "@/components/sidebar"
import { SwipeContainer } from "@/components/swipe-container"
import { getLatestArticles } from '@/lib/articles'

export default async function Home() {
  const blogPosts = await getLatestArticles(6)
  
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 lg:ml-64">
          <Suspense fallback={<div>加载中...</div>}>
            <SwipeContainer blogPosts={blogPosts} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
