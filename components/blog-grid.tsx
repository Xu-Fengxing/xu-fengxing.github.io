import { Card } from "@/components/ui/card"
import { ChevronDown, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const blogPosts = [
  {
    id: 1,
    category: "设计思考",
    title: "极简主义在现代设计中的应用",
    excerpt: "探讨如何通过减少不必要的元素，创造更加专注和优雅的用户体验。",
    date: "2024-01-15",
    readTime: "5 分钟",
  },
  {
    id: 2,
    category: "前端开发",
    title: "React 性能优化最佳实践",
    excerpt: "深入了解 React 应用的性能瓶颈，以及如何通过各种技术手段进行优化。",
    date: "2024-01-12",
    readTime: "8 分钟",
  },
  {
    id: 3,
    category: "用户体验",
    title: "微交互设计的力量",
    excerpt: "小细节如何创造大影响，探索微交互在提升用户体验中的关键作用。",
    date: "2024-01-10",
    readTime: "6 分钟",
  },
  {
    id: 4,
    category: "设计系统",
    title: "构建可扩展的设计系统",
    excerpt: "从零开始建立一个灵活、一致且易于维护的设计系统框架。",
    date: "2024-01-08",
    readTime: "10 分钟",
  },
  {
    id: 5,
    category: "视觉设计",
    title: "色彩理论在界面设计中的应用",
    excerpt: "理解色彩心理学，创造更具情感共鸣的视觉体验。",
    date: "2024-01-05",
    readTime: "7 分钟",
  },
  {
    id: 6,
    category: "开发工具",
    title: "Next.js 15 新特性解析",
    excerpt: "探索 Next.js 最新版本带来的强大功能和性能提升。",
    date: "2024-01-03",
    readTime: "9 分钟",
  },
]

export function BlogGrid() {
  return (
    <section className="lg:ml-64 px-6 lg:px-12 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">全部文章</h2>
          <Button variant="ghost" size="sm" className="gap-2">
            <span className="text-sm text-muted-foreground">全部</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="group relative overflow-hidden border-border bg-card hover:bg-card/80 transition-all duration-300 cursor-pointer"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-primary uppercase tracking-wide">{post.category}</span>
                  <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="3" width="18" height="14" rx="2" />
                      <path d="M3 10h18" />
                      <path d="M9 21l3-4 3 4" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>
                </div>

                <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
