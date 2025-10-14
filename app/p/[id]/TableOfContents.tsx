"use client"

import { useState, useEffect } from 'react'

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [activeHeading, setActiveHeading] = useState<string | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const headings = content.split('\n')
      .map((line, index) => {
        if (line.startsWith('## ') || line.startsWith('### ')) {
          return { id: `heading-${index}`, level: line.startsWith('## ') ? 2 : 3, text: line.substring(line.startsWith('## ') ? 3 : 4) }
        }
        return null
      })
      .filter(Boolean)

    const handleScroll = () => {
      // 计算滚动进度
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / scrollHeight) * 100
      setScrollProgress(Math.min(100, Math.max(0, progress)))

      // 高亮当前标题
      let currentHeading = null
      for (const heading of headings) {
        const element = document.getElementById(heading!.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) { // 距离顶部100px时激活
            currentHeading = heading!.id
          }
        }
      }
      setActiveHeading(currentHeading)
    }

    const handleClick = (headingId: string) => {
      const element = document.getElementById(headingId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // 初始调用

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [content])

  const headings = content.split('\n')
    .map((line, index) => {
      if (line.startsWith('## ') || line.startsWith('### ')) {
        return { id: `heading-${index}`, level: line.startsWith('## ') ? 2 : 3, text: line.substring(line.startsWith('## ') ? 3 : 4) }
      }
      return null
    })
    .filter(Boolean)

  return (
    <div className="w-80 space-y-4">
      <div className="bg-card border border-border rounded-lg p-4 sticky top-16 relative" style={{ maxHeight: 'calc(100vh - 106px)' }}>
        <h3 className="text-lg font-semibold mb-4 ml-1">目录</h3>
        
        {/* 进度条 */}
        <div className="mb-4">
          <div className="w-full bg-muted rounded-full h-1">
            <div 
              className="bg-primary h-1 rounded-full transition-all duration-300"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>

        <div 
          className="space-y-2 ml-1 overflow-y-auto scrollbar-hide pr-2" 
          style={{ maxHeight: 'calc(100vh - 206px)', paddingTop: '10px' }}
        >
          {headings.map((heading) => (
            <a
              key={heading!.id}
              href={`#${heading!.id}`}
              onClick={(e) => {
                e.preventDefault()
                const element = document.getElementById(heading!.id)
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
              className={`block text-sm transition-colors py-1 ${
                heading!.level === 3 ? 'ml-4' : ''
              } ${
                activeHeading === heading!.id
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {heading!.text}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
