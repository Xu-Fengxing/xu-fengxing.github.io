import { Sidebar } from "@/components/sidebar"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function BlogPage() {
  const posts = [
    {
      title: "设计系统的构建之道",
      excerpt: "探索如何从零开始构建一个完整的设计系统，包括颜色、字体、组件等...",
      date: "2025-01-15",
      category: "设计",
    },
    {
      title: "Apple设计语言解析",
      excerpt: "深入分析Apple的设计哲学，学习如何打造简洁优雅的用户界面...",
      date: "2025-01-10",
      category: "设计",
    },
    {
      title: "现代Web开发最佳实践",
      excerpt: "分享在实际项目中总结的Web开发经验和技巧...",
      date: "2025-01-05",
      category: "开发",
    },
  ]

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-64">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">博客</h1>
          <p className="text-lg text-muted-foreground mb-12">分享设计思考与技术心得</p>

          <div className="space-y-6">
            {posts.map((post, index) => (
              <article
                key={index}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/10"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                    {post.category}
                  </span>
                  <time className="text-sm text-muted-foreground">{post.date}</time>
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">{post.title}</h2>
                <p className="text-muted-foreground text-pretty">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
