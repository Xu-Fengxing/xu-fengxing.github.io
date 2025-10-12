"use client"

import { Home, FileText, ExternalLink, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter, usePathname } from "next/navigation"

const navItems = [
  { icon: Home, label: "首页", active: true },
  { icon: FileText, label: "博客", active: false },
  { icon: ExternalLink, label: "链接", active: false },
  { icon: Info, label: "关于", active: false },
]

export function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  // 根据当前路径直接计算活动状态，不使用useState
  const getActiveItem = () => {
    switch (pathname) {
      case "/":
        return "首页"
      case "/blog":
        return "博客"
      case "/links":
        return "链接"
      case "/about":
        return "关于"
      default:
        // 如果是文章页面（/p/xxxx），不显示任何高亮
        if (pathname.startsWith("/p/")) {
          return null
        }
        return "首页"
    }
  }

  const activeItem = getActiveItem()

  const handleNavigation = (label: string) => {
    switch (label) {
      case "首页":
        router.push("/")
        break
      case "博客":
        router.push("/blog")
        break
      case "链接":
        router.push("/links")
        break
      case "关于":
        router.push("/about")
        break
      default:
        break
    }
  }

  return (
    <aside className="hidden lg:flex w-64 h-screen fixed left-0 top-0 flex-col border-r border-border/40 bg-sidebar p-6">
      {/* 品牌区域 - 左对齐优化 */}
      <div className="mb-6">
        {/* 左对齐布局 */}
        <div className="flex items-center gap-4">
          {/* Logo 容器 */}
          <div className="h-10 w-10 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-white fill-current">
              <rect x="2" y="2" width="9" height="9" fill="currentColor"/>
              <rect x="13" y="2" width="9" height="9" fill="currentColor"/>
              <rect x="2" y="13" width="9" height="9" fill="currentColor"/>
              <rect x="13" y="13" width="9" height="9" fill="currentColor"/>
            </svg>
          </div>
          
          {/* 品牌信息 */}
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground leading-tight">forthing.top</h1>
          </div>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.label

          return (
            <button
              key={item.label}
              onClick={() => handleNavigation(item.label)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="mt-auto pt-6 space-y-1 text-center">
        <p className="text-xs text-muted-foreground">© 2025 forthing.top</p>
        <p className="text-xs text-muted-foreground">
          <a 
            href="https://icp.gov.moe/?keyword=20250119" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors duration-200"
          >
            萌ICP备20250119号
          </a>
        </p>
      </div>
    </aside>
  )
}

