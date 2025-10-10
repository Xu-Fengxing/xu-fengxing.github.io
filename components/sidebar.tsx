"use client"

import { Home, FileText, Bookmark, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

const navItems = [
  { icon: Home, label: "首页", active: true },
  { icon: FileText, label: "文章", active: false },
  { icon: Bookmark, label: "收藏", active: false },
  { icon: User, label: "关于", active: false },
]

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("首页")

  return (
    <aside className="hidden lg:flex fixed left-0 top-14 bottom-0 w-64 flex-col border-r border-border/40 bg-sidebar p-6">
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.label

          return (
            <button
              key={item.label}
              onClick={() => setActiveItem(item.label)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          )
        })}
      </nav>

      <div className="mt-auto pt-6">
        <div className="rounded-lg bg-card p-4 border border-border">
          <p className="text-xs text-muted-foreground leading-relaxed">用极简的视角，记录设计与思考</p>
        </div>
      </div>
    </aside>
  )
}
