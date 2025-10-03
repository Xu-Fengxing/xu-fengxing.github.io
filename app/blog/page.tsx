import { Sidebar } from "@/components/sidebar"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { posts } from "@/lib/posts"

export default function BlogPage() {

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-64">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">博客</h1>
            <p className="text-muted-foreground text-base">分享设计思考与技术心得</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {posts.map((post, index) => (
                <Link
                  key={index}
                  href={`/blog/${post.id}`}
                  className="block group rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                      {post.category}
                    </span>
                    <time className="text-sm text-muted-foreground">{post.date}</time>
                  </div>
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">{post.title}</h2>
                  <p className="text-muted-foreground text-pretty">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
