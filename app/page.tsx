"use client"

import { Sidebar } from "@/components/sidebar"
import { Hero } from "@/components/hero"
import { MBTISection } from "@/components/mbti-section"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollPhase, setScrollPhase] = useState<"initial" | "locked" | "unlocked">("initial")

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      setScrollY(currentScroll)

      if (currentScroll <= 50) {
        setScrollPhase("initial")
      } else if (currentScroll > 50 && currentScroll <= 500) {
        setScrollPhase("locked")
      } else {
        setScrollPhase("unlocked")
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 800

  const heroOpacity =
    scrollPhase === "initial" ? 1 : scrollPhase === "locked" ? Math.max(0, 1 - (scrollY - 50) / 450) : 0

  const portfolioProjects = [
    {
      title: "企业品牌设计系统",
      description: "为某科技公司打造的完整品牌视觉系统",
      image: "/modern-brand-design-system.jpg",
      tags: ["品牌设计", "UI/UX"],
    },
    {
      title: "移动应用界面设计",
      description: "简洁优雅的移动端应用界面设计",
      image: "/mobile-app-interface.png",
      tags: ["移动设计", "UI设计"],
    },
  ]

  const blogPosts = [
    {
      title: "设计系统的构建之道",
      excerpt: "探索如何从零开始构建一个完整的设计系统...",
      date: "2025-01-15",
    },
    {
      title: "Apple设计语言解析",
      excerpt: "深入分析Apple的设计哲学...",
      date: "2025-01-10",
    },
  ]

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-64 relative">
        <div
          className="fixed inset-0 lg:left-64 transition-opacity duration-300 ease-out z-0 pointer-events-none"
          style={{ opacity: heroOpacity }}
        >
          <Hero />
        </div>

        <div
          className="relative z-10 bg-background transition-all duration-500 ease-out"
          style={{
            transform: scrollPhase === "initial" ? `translateY(${viewportHeight}px)` : "translateY(0)",
            position: scrollPhase === "locked" ? "fixed" : "relative",
            top: scrollPhase === "locked" ? 0 : "auto",
            left: scrollPhase === "locked" ? 0 : "auto",
            right: scrollPhase === "locked" ? 0 : "auto",
            minHeight: "100vh",
          }}
        >
          <div className="min-h-screen">
            <MBTISection />
          </div>

          <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">作品集</h2>
                  <p className="text-muted-foreground">精选设计作品展示</p>
                </div>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all"
                >
                  查看全部
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {portfolioProjects.map((project, index) => (
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
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 text-pretty">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-medium"
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
          </section>

          <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">博客</h2>
                  <p className="text-muted-foreground">分享设计思考与技术心得</p>
                </div>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all"
                >
                  查看全部
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="space-y-6">
                {blogPosts.map((post, index) => (
                  <article
                    key={index}
                    className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/10"
                  >
                    <time className="text-sm text-muted-foreground mb-2 block">{post.date}</time>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-pretty">{post.excerpt}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <footer className="border-t border-border py-8 px-6">
            <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
              <p>© 2025 Justin Xu. All rights reserved.</p>
            </div>
          </footer>
        </div>

        <div style={{ height: `${viewportHeight + 500}px` }} />
      </main>
    </div>
  )
}
