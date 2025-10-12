import { Suspense } from "react"
import BlogContent from "./BlogContent"

export default function BlogPage() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <BlogContent />
    </Suspense>
  )
}
