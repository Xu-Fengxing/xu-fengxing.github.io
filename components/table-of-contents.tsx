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
  const [activeIds, setActiveIds] = useState<string[]>([])
  const [readingProgress, setReadingProgress] = useState<number>(0)
  const [currentActiveIndex, setCurrentActiveIndex] = useState<number>(0)

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

  // 监听滚动，更新当前活跃的标题和阅读进度
  useEffect(() => {
    const handleScroll = () => {
      const headings = tocItems.map(item => document.getElementById(item.id)).filter(Boolean)
      const activeHeadingIds: string[] = []
      let primaryActiveIndex = 0
      
      // 检查哪些标题在当前视口中（扩大检测范围）
      headings.forEach((heading, index) => {
        if (heading) {
          const rect = heading.getBoundingClientRect()
          // 扩大可见范围：标题顶部在屏幕80%以内，底部在屏幕20%以上
          const isVisible = rect.top <= window.innerHeight * 0.8 && rect.bottom >= window.innerHeight * 0.2
          if (isVisible) {
            activeHeadingIds.push(tocItems[index].id)
            // 找到最接近屏幕顶部的标题作为主要活跃项
            if (rect.top <= window.innerHeight * 0.5) {
              primaryActiveIndex = index
            }
          }
        }
      })
      
      // 如果没有标题在视口中，选择最接近的标题
      if (activeHeadingIds.length === 0 && headings.length > 0) {
        for (let i = headings.length - 1; i >= 0; i--) {
          const heading = headings[i]
          if (heading && heading.getBoundingClientRect().top <= 150) {
            activeHeadingIds.push(tocItems[i].id)
            primaryActiveIndex = i
            break
          }
        }
      }
      
      setActiveIds(activeHeadingIds)
      setCurrentActiveIndex(primaryActiveIndex)
      
      // 计算阅读进度
      const article = document.querySelector('article')
      if (article) {
        const articleTop = article.offsetTop
        const articleHeight = article.offsetHeight
        const windowHeight = window.innerHeight
        const scrollTop = window.scrollY
        
        const progress = Math.min(
          Math.max((scrollTop - articleTop + windowHeight) / articleHeight, 0),
          1
        )
        setReadingProgress(Math.round(progress * 100))
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
      <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          目录
        </h3>
        
        {/* 阅读进度 */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>阅读进度</span>
            <span>{readingProgress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div 
              className="bg-accent h-1.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${readingProgress}%` }}
            ></div>
          </div>
        </div>
        <nav className="space-y-0">
          {tocItems.map((item, index) => {
            const isActive = activeIds.includes(item.id)
            const prevItem = index > 0 ? tocItems[index - 1] : null
            const nextItem = index < tocItems.length - 1 ? tocItems[index + 1] : null
            const prevActive = prevItem ? activeIds.includes(prevItem.id) : false
            const nextActive = nextItem ? activeIds.includes(nextItem.id) : false
            
            // 确定圆角样式
            let roundedClass = ''
            if (isActive) {
              if (!prevActive && !nextActive) {
                // 单独高亮
                roundedClass = 'rounded-lg'
              } else if (!prevActive && nextActive) {
                // 开始连续高亮
                roundedClass = 'rounded-t-lg'
              } else if (prevActive && !nextActive) {
                // 结束连续高亮
                roundedClass = 'rounded-b-lg'
              } else {
                // 中间连续高亮
                roundedClass = ''
              }
            }
            
            return (
              <button
                key={item.id}
                onClick={() => scrollToHeading(item.id)}
                className={`block w-full text-left text-sm transition-all duration-200 hover:text-accent hover:bg-accent/5 px-3 py-2 ${
                  isActive
                    ? 'text-accent font-medium bg-accent/10'
                    : 'text-muted-foreground hover:text-foreground'
                } ${
                  item.level === 2 ? 'pl-0 font-medium' :
                  item.level === 3 ? 'pl-4' :
                  item.level === 4 ? 'pl-8' : 'pl-0'
                } ${roundedClass}`}
              >
                {item.text}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
