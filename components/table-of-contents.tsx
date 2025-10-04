"use client"

import { useEffect, useState } from "react"

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  // 生成目录项
  useEffect(() => {
    const lines = content.split('\n')
    const items: TocItem[] = []
    
    lines.forEach((line, index) => {
      if (line.startsWith('## ')) {
        const text = line.slice(3).trim()
        const id = `heading-${index}`
        items.push({
          id,
          text,
          level: 2
        })
      } else if (line.startsWith('### ')) {
        const text = line.slice(4).trim()
        const id = `heading-${index}`
        items.push({
          id,
          text,
          level: 3
        })
      } else if (line.startsWith('#### ')) {
        const text = line.slice(5).trim()
        const id = `heading-${index}`
        items.push({
          id,
          text,
          level: 4
        })
      }
    })
    
    setTocItems(items)
  }, [content])

  // 监听滚动，更新当前活跃的标题
  useEffect(() => {
    const handleScroll = () => {
      const headings = tocItems.map(item => document.getElementById(item.id)).filter(Boolean)
      
      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i]
        if (heading && heading.getBoundingClientRect().top <= 100) {
          setActiveId(tocItems[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [tocItems])

  // 滚动到指定标题
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (tocItems.length === 0) {
    return null
  }

  return (
    <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto">
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">目录</h3>
        <nav className="space-y-1">
          {tocItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToHeading(item.id)}
              className={`block w-full text-left text-sm transition-colors hover:text-accent ${
                activeId === item.id
                  ? 'text-accent font-medium'
                  : 'text-muted-foreground'
              } ${
                item.level === 2 ? 'pl-0' :
                item.level === 3 ? 'pl-3' :
                item.level === 4 ? 'pl-6' : 'pl-0'
              }`}
            >
              {item.text}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
