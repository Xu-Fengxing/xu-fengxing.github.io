"use client"

import Link from "next/link"
import { Home, BookOpen, Menu, X, ExternalLink, Compass } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "首页", href: "/", icon: Home },
    { name: "博客", href: "/blog", icon: BookOpen },
    { name: "探索", href: "/explore", icon: Compass },
    { name: "友链", href: "/friends", icon: ExternalLink },
  ]


  return (
    <>
      {/* Mobile menu button */}
      {!isOpen && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 lg:hidden bg-background/90 backdrop-blur-sm border border-border/50 shadow-lg hover:bg-background/95"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo/Name */}
          <div className="flex h-20 items-center px-6 border-b border-sidebar-border">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0 transition-transform group-hover:scale-105">
                <img
                  src="/avatar.jpg"
                  alt="风行Justin"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h1 className="font-semibold text-sidebar-foreground text-lg leading-tight">风行Justin</h1>
                <p className="text-xs text-muted-foreground">Justin Xu</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-6">
            {navigation.map((item) => {
              const Icon = item.icon
              // 判断是否为激活状态：精确匹配或子路径匹配
              const isActive = pathname === item.href || 
                (item.href !== "/" && pathname.startsWith(item.href + "/"))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors group ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                  {item.name}
                </Link>
              )
            })}
          </nav>


          {/* Footer */}
          <div className="border-t border-sidebar-border px-6 pt-4 pb-3">
            <p className="text-xs text-muted-foreground text-center mb-0.5">© 2025 fengxing.site</p>
            <a
              href="https://icp.gov.moe/?keyword=20250119"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground/70 hover:text-accent transition-colors text-center block"
            >
              萌ICP备20250119号
            </a>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden" onClick={() => setIsOpen(false)} />
      )}
    </>
  )
}

export default Sidebar
