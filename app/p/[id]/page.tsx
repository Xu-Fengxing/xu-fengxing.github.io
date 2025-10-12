"use client"

import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { Sidebar } from "@/components/sidebar"
import { articles, generateArticleHash } from "@/lib/articles"

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const articleId = params.id
  const [readingProgress, setReadingProgress] = useState(0)
  const [activeHeadings, setActiveHeadings] = useState<string[]>([])
  const tocContainerRef = useRef<HTMLDivElement>(null)

  // 根据ID获取文章内容
  const getArticleContent = (id: string) => {
    // 遍历所有文章，找到匹配的文章
    for (const article of articles) {
      const articleHash = generateArticleHash(article.title)
      if (id === articleHash) {
        return article
      }
    }
    return null
  }

  // 渲染内联Markdown（移除粗体标记）
  const renderInlineMarkdown = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '$1')
  }

  const article = getArticleContent(articleId as string)

  // 阅读进度计算和标题高亮
  useEffect(() => {
    if (!article) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollPosition = window.scrollY
          const viewportHeight = window.innerHeight
          const documentHeight = document.documentElement.scrollHeight
          const scrollProgress = currentScrollPosition / (documentHeight - viewportHeight)
          
          // 计算阅读进度 (0-100)
          const progress = Math.min(Math.max(scrollProgress * 100, 0), 100)
          setReadingProgress(progress)
          
          // 检测可见的标题
          const activeIds: string[] = []
          let centerHeadingIndex = -1
          let minDistanceToCenter = Infinity
          
          article.content.split('\n').forEach((line, index) => {
            if (line.startsWith('## ') || line.startsWith('### ')) {
              const element = document.getElementById(`heading-${index}`)
              if (element) {
                const rect = element.getBoundingClientRect()
                // 标题在视窗内（上方100px到下方50px的范围）
                if (rect.top <= viewportHeight - 50 && rect.bottom >= 100) {
                  activeIds.push(`heading-${index}`)
                  
                  // 找到最接近视窗中心的标题
                  const distanceToCenter = Math.abs(rect.top - viewportHeight / 2)
                  if (distanceToCenter < minDistanceToCenter) {
                    minDistanceToCenter = distanceToCenter
                    centerHeadingIndex = index
                  }
                }
              }
            }
          })
          
          setActiveHeadings(activeIds)
          
          // 自动滚动目录到中心标题
          if (centerHeadingIndex !== -1 && tocContainerRef.current) {
            const tocLink = tocContainerRef.current.querySelector(`a[href="#heading-${centerHeadingIndex}"]`)
            if (tocLink) {
              const container = tocContainerRef.current
              const linkRect = tocLink.getBoundingClientRect()
              const containerRect = container.getBoundingClientRect()
              
              // 计算链接相对于容器的位置
              const linkTop = linkRect.top - containerRect.top + container.scrollTop
              const containerCenter = container.clientHeight / 2
              const linkCenter = linkTop + linkRect.height / 2
              
              // 滚动让链接在容器中心
              const targetScroll = linkCenter - containerCenter
              container.scrollTo({
                top: Math.max(0, targetScroll),
                behavior: 'smooth'
              })
            }
          }
          
          ticking = false
        })
        ticking = true
      }
    }

    // 初始检查
    handleScroll()
    
    // 添加滚动监听
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [article])

  // 处理分类点击
  const handleCategoryClick = (category: string) => {
    router.push(`/blog?category=${encodeURIComponent(category)}`)
  }

  // 处理标签点击
  const handleTagClick = (tag: string) => {
    router.push(`/blog?tag=${encodeURIComponent(tag)}`)
  }

  // 智能返回逻辑
  const handleBack = () => {
    const from = searchParams.get('from')
    
    if (from === 'home') {
      // 从首页来的，返回到首页的内容部分
      router.push('/?show=content')
    } else if (from === 'blog') {
      // 从博客页面来的，返回到博客页面
      router.push('/blog')
    } else {
      // 没有来源信息，使用浏览器历史记录
      router.back()
    }
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 lg:ml-64">
            <main className="px-6 lg:px-12 py-16 h-full flex flex-col justify-center">
              <div className="max-w-6xl mx-auto w-full">
                <div className="text-center">
                  <h1 className="text-3xl font-bold text-foreground mb-6">文章未找到</h1>
                  <p className="text-muted-foreground">抱歉，找不到对应的文章内容。</p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 lg:ml-64">
          <main className="px-6 lg:px-12 py-16 min-h-screen">
            <div className="max-w-6xl mx-auto w-full">
              {/* 返回按钮 */}
              <div className="mb-6">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  返回
                </button>
              </div>
              
              {/* 文章标题和时间标签 */}
              <article className="prose prose-invert max-w-none">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-foreground mb-3 ml-1">{article.title}</h1>
                  <div className="flex items-center gap-4 text-[13px] text-muted-foreground ml-1">
                    <span>{article.date}</span>
                    <div className="flex items-center gap-3">
                      <span 
                        onClick={() => handleCategoryClick(article.category)}
                        className="px-1.5 py-1 text-xs font-normal leading-none text-muted-foreground rounded-sm cursor-pointer hover:text-foreground transition-colors"
                        style={{
                          background: 'rgba(107, 114, 128, 0.3)',
                          transform: 'translateY(-1px)'
                        }}
                      >
                        {article.category}
                      </span>
                      <div className="flex gap-3">
                        {article.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            onClick={() => handleTagClick(tag)}
                            className="text-[13px] text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* 主要内容区域 */}
              <div className="flex gap-4">
                {/* 文章正文内容 */}
                <div className="flex-1">
                  <div className="bg-card border border-border rounded-lg px-8 pt-2 pb-3">
                  <div className="prose prose-invert max-w-none text-[15px]">
                    {article.content.split('\n').map((line, index, array) => {
                      if (line.startsWith('# ')) {
                        return <h1 key={index} id={`heading-${index}`} className="text-2xl font-bold text-foreground mb-4 mt-6">{line.substring(2)}</h1>
                      } else if (line.startsWith('## ')) {
                        return <h2 key={index} id={`heading-${index}`} className="text-xl font-semibold text-foreground mb-5 mt-6">{line.substring(3)}</h2>
                      } else if (line.startsWith('### ')) {
                        return <h3 key={index} id={`heading-${index}`} className="text-lg font-medium text-foreground mb-4 mt-5">{line.substring(4)}</h3>
                      } else if (line.startsWith('- ')) {
                        // 检查下一行是否是列表项，如果不是则增加下边距
                        const nextLine = array[index + 1]
                        const isNextLineListItem = nextLine && (nextLine.startsWith('- ') || /^\d+\.\s/.test(nextLine))
                        return <li key={index} className={`text-foreground ml-8 ${isNextLineListItem ? 'mb-1' : 'mb-3'}`}>{renderInlineMarkdown(line.substring(2))}</li>
                      } else if (/^\d+\.\s/.test(line)) {
                        const content = line.replace(/^\d+\.\s/, '')
                        // 检查下一行是否是列表项，如果不是则增加下边距
                        const nextLine = array[index + 1]
                        const isNextLineListItem = nextLine && (nextLine.startsWith('- ') || /^\d+\.\s/.test(nextLine))
                        return <li key={index} className={`text-foreground ml-8 ${isNextLineListItem ? 'mb-1' : 'mb-3'}`}>{renderInlineMarkdown(content)}</li>
                      } else if (line.includes('`') && line.includes('`')) {
                        const parts = line.split('`')
                        return (
                          <p key={index} className="text-foreground mb-3 pl-4">
                            {parts.map((part, partIndex) => 
                              partIndex % 2 === 1 ? (
                                <code key={partIndex} className="bg-muted px-1 py-0.5 rounded text-sm font-mono">{part}</code>
                              ) : (
                                part
                              )
                            )}
                          </p>
                        )
                      } else if (line.trim() === '') {
                        return <br key={index} />
                      } else {
                        // 检查下一行是否是标题，如果是则增加底部间距
                        const nextLine = array[index + 1]
                        const isNextLineTitle = nextLine && (nextLine.startsWith('# ') || nextLine.startsWith('## ') || nextLine.startsWith('### '))
                        return <p key={index} className={`text-foreground pl-4 ${isNextLineTitle ? 'mb-4' : 'mb-3'}`}>{renderInlineMarkdown(line)}</p>
                      }
                    })}
                  </div>
                  </div>
                </div>

                {/* 右侧目录 */}
                <div className="w-80 space-y-4">
                  <div className="bg-card border border-border rounded-lg p-4 sticky top-16 relative" style={{ maxHeight: 'calc(100vh - 106px)' }}>
                    {/* 环形进度条 - 绝对定位在右上角 */}
                    <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center">
                      <svg className="w-10 h-10 transform -rotate-90">
                        <circle
                          cx="20"
                          cy="20"
                          r="16"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          fill="none"
                          className="text-muted opacity-20"
                        />
                        <circle
                          cx="20"
                          cy="20"
                          r="16"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 16}`}
                          strokeDashoffset={`${2 * Math.PI * 16 * (1 - readingProgress / 100)}`}
                          className="text-primary transition-all duration-300"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-[10px] font-medium">{Math.round(readingProgress)}%</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-4 ml-1">目录</h3>
                    <div 
                      ref={tocContainerRef}
                      className="space-y-2 ml-1 overflow-y-auto scrollbar-hide pr-2" 
                      style={{ maxHeight: 'calc(100vh - 206px)', paddingTop: '10px' }}
                    >
                      {article.content.split('\n').map((line, index) => {
                        if (line.startsWith('## ')) {
                          const isActive = activeHeadings.includes(`heading-${index}`)
                          return (
                            <a
                              key={index}
                              href={`#heading-${index}`}
                              onClick={(e) => {
                                e.preventDefault()
                                const element = document.getElementById(`heading-${index}`)
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                }
                              }}
                              className={`block text-sm transition-colors py-1 ${
                                isActive 
                                  ? 'text-primary font-medium' 
                                  : 'text-muted-foreground hover:text-primary'
                              }`}
                            >
                              {line.substring(3)}
                            </a>
                          )
                        } else if (line.startsWith('### ')) {
                          const isActive = activeHeadings.includes(`heading-${index}`)
                          return (
                            <a
                              key={index}
                              href={`#heading-${index}`}
                              onClick={(e) => {
                                e.preventDefault()
                                const element = document.getElementById(`heading-${index}`)
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                }
                              }}
                              className={`block text-sm transition-colors py-1 ml-4 ${
                                isActive 
                                  ? 'text-primary font-medium' 
                                  : 'text-muted-foreground hover:text-primary'
                              }`}
                            >
                              {line.substring(4)}
                            </a>
                          )
                        }
                        return null
                      }).filter(Boolean)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
