import { Sidebar } from "@/components/sidebar"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PortfolioPage() {
  const projects = [
    {
      title: "企业品牌设计系统",
      description: "为某科技公司打造的完整品牌视觉系统",
      image: "/modern-brand-design-system.jpg",
      tags: ["品牌设计", "UI/UX", "设计系统"],
    },
    {
      title: "移动应用界面设计",
      description: "简洁优雅的移动端应用界面设计",
      image: "/mobile-app-interface.png",
      tags: ["移动设计", "UI设计", "iOS"],
    },
    {
      title: "电商平台重设计",
      description: "提升用户体验的电商平台界面优化",
      image: "/ecommerce-platform-redesign.jpg",
      tags: ["Web设计", "UX优化", "电商"],
    },
  ]

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

          <h1 className="text-4xl md:text-5xl font-bold mb-4">作品集</h1>
          <p className="text-lg text-muted-foreground mb-12">精选设计作品展示</p>

          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project, index) => (
              <article
                key={index}
                className="group rounded-2xl border border-border bg-card overflow-hidden transition-all hover:border-accent hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1"
              >
                <div className="aspect-video overflow-hidden bg-secondary">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h2>
                  <p className="text-muted-foreground mb-4 text-pretty">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
