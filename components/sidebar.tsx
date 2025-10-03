"use client"

import Link from "next/link"
import { Home, BookOpen, Briefcase, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "首页", href: "/", icon: Home },
    { name: "博客", href: "/blog", icon: BookOpen },
    { name: "作品集", href: "/portfolio", icon: Briefcase },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

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
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group"
                >
                  <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-sidebar-border p-6">
            <p className="text-xs text-muted-foreground text-center">© 2025 fengxing.site</p>
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
