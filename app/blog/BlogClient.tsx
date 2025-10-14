"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { ChevronDown } from "lucide-react"

interface BlogClientProps {
  articles: any[]
  stats: { categories: Array<{ name: string; count: number }> }
}

export default function BlogClient({ articles, stats }: BlogClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [showAllTags, setShowAllTags] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedYear, setSelectedYear] = useState<number | null>(null)

  // 从URL参数中获取筛选条件
  useEffect(() => {
    const category = searchParams.get('category')
    const tag = searchParams.get('tag')
    const year = searchParams.get('year')
    
    if (category) {
      setSelectedTag(category)
    } else if (tag) {
      setSelectedTag(tag)
    }
    
    if (year) {
      setSelectedYear(parseInt(year))
    } else {
      setSelectedYear(null)
    }
  }, [searchParams])

  const handleTagClick = (tagName: string) => {
    const newSelectedTag = selectedTag === tagName ? null : tagName
    setSelectedTag(newSelectedTag)
    
    // 更新URL参数，保持年份状态
    const params = new URLSearchParams()
    if (newSelectedTag) {
      // 判断是分类还是标签
      const isCategory = articles.some(article => article.category === newSelectedTag)
      if (isCategory) {
        params.set('category', newSelectedTag)
      } else {
        params.set('tag', newSelectedTag)
      }
    }
    
    // 保持年份筛选状态
    if (selectedYear) {
      params.set('year', selectedYear.toString())
    }
    
    const newUrl = params.toString() ? `/blog?${params.toString()}` : '/blog'
    router.push(newUrl)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // 如果有搜索内容，清除标签筛选
    if (query.trim()) {
      setSelectedTag(null)
    }
  }

  // 高亮搜索词
  const highlightSearchTerm = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <span key={index} className="text-blue-500 font-medium">
          {part}
        </span>
      ) : part
    )
  }

  // 清理Markdown语法
  const cleanMarkdown = (text: string) => {
    return text
      .replace(/#{1,6}\s+/g, '') // 移除标题标记 (### 等)，不限制行首
      .replace(/\*\*(.*?)\*\*/g, '$1') // 移除粗体标记
      .replace(/\*(.*?)\*/g, '$1') // 移除斜体标记
      .replace(/`(.*?)`/g, '$1') // 移除代码标记
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 移除链接标记，保留文本
      .replace(/^\s*[-*+]\s+/gm, '• ') // 转换列表标记
      .replace(/^\s*\d+\.\s+/gm, '') // 移除有序列表标记
      .trim()
  }

  // 获取包含搜索词的片段
  const getSearchSnippet = (content: string, searchTerm: string, maxLength: number = 100) => {
    if (!searchTerm.trim() || !content) return null
    
    const index = content.toLowerCase().indexOf(searchTerm.toLowerCase())
    if (index === -1) return null
    
    const start = Math.max(0, index - maxLength / 2)
    const end = Math.min(content.length, index + searchTerm.length + maxLength / 2)
    let snippet = content.substring(start, end)
    
    if (start > 0) snippet = '...' + snippet
    if (end < content.length) snippet = snippet + '...'
    
    return cleanMarkdown(snippet)
  }

  // 生成文章链接的哈希值
  const generateArticleHash = (title: string) => {
    let hash = 0
    for (let i = 0; i < title.length; i++) {
      const char = title.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // 转换为32位整数
    }
    
    // 36进制字符集：26个小写字母 + 10个数字
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    let num = Math.abs(hash)
    
    // 转换为4位36进制字符串
    for (let i = 0; i < 4; i++) {
      result = chars[num % 36] + result
      num = Math.floor(num / 36)
    }
    
    return result
  }

  const handleArticleClick = (article: any) => {
    const hash = generateArticleHash(article.title)
    console.log('文章链接:', `/p/${hash}`)
    router.push(`/p/${hash}?from=blog`)
  }

  const handleYearClick = (year: number) => {
    const newSelectedYear = selectedYear === year ? null : year
    setSelectedYear(newSelectedYear)
    
    // 更新URL参数，保持标签状态
    const params = new URLSearchParams()
    if (selectedTag) {
      // 判断是分类还是标签
      const isCategory = articles.some(article => article.category === selectedTag)
      if (isCategory) {
        params.set('category', selectedTag)
      } else {
        params.set('tag', selectedTag)
      }
    }
    
    // 设置年份筛选状态
    if (newSelectedYear) {
      params.set('year', newSelectedYear.toString())
    }
    
    const newUrl = params.toString() ? `/blog?${params.toString()}` : '/blog'
    router.push(newUrl)
  }

  // 使用新的统计系统
  const allTags = stats.categories
  const displayedTags = showAllTags ? allTags : allTags.slice(0, 9)

  // 根据选中的分类/标签、年份和搜索查询筛选文章
  const filteredArticles = articles.filter(article => {
    // 分类/标签筛选
    const filterMatch = !selectedTag || 
      article.category === selectedTag || 
      article.tags.includes(selectedTag)
    
    // 年份筛选
    const yearMatch = !selectedYear || (() => {
      const yearMatch = article.date.match(/(\d{4})年/)
      const articleYear = yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear()
      return articleYear === selectedYear
    })()
    
    // 搜索筛选
    const searchMatch = !searchQuery.trim() || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (article.content && article.content.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return filterMatch && yearMatch && searchMatch
  }).sort((a, b) => {
    // 按日期排序，最新的在前
    try {
      const dateA = new Date(a.date.replace('年', '-').replace('月', '-').replace('日', ''))
      const dateB = new Date(b.date.replace('年', '-').replace('月', '-').replace('日', ''))
      return dateB.getTime() - dateA.getTime()
    } catch (error) {
      console.warn('Error parsing dates:', error)
      return 0
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 lg:ml-64">
          <main className="px-6 lg:px-12 py-16 h-full flex flex-col justify-center">
            <div className="max-w-6xl mx-auto w-full">
              {/* 页面标题 */}
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-foreground">博客</h1>
              </div>

              {/* 主要内容区域 */}
              <div className="flex gap-4">
                {/* 博客文章列表 - 2/3宽度 */}
                <div className="flex-1 space-y-4">

                  {/* 文章列表 */}
                  {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => {
                      const searchSnippet = getSearchSnippet(article.content, searchQuery)
                      const isContentMatch = searchQuery.trim() && article.content && 
                        article.content.toLowerCase().includes(searchQuery.toLowerCase()) &&
                        !article.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                        !article.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
                      
                      return (
                        <article key={article.id} className="group cursor-pointer">
                          <div 
                            className={`bg-card border border-border rounded-lg hover:bg-card/80 transition-all duration-300 relative overflow-hidden ${
                              isContentMatch ? 'h-auto min-h-20' : 'h-20'
                            }`}
                            onClick={() => handleArticleClick(article)}
                          >
                            <div className={`pl-4 pr-6 ${isContentMatch ? 'pt-[16px] pb-[12px]' : 'pt-2 pb-1'} h-full flex items-center`}>
                              <div className="space-y-2 flex-1">
                                <h2 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
                                  {highlightSearchTerm(article.title, searchQuery)}
                                </h2>
                                
                                {/* 显示搜索片段 */}
                                {searchSnippet && isContentMatch && (
                                  <div className="text-sm text-muted-foreground ml-1 leading-relaxed translate-y-px pl-4">
                                    {highlightSearchTerm(searchSnippet, searchQuery)}
                                  </div>
                                )}
                                
                                <div className="flex items-center">
                                  <span className="text-[13px] text-muted-foreground w-28">
                                    {article.date}
                                  </span>
                                  <span 
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleTagClick(article.category)
                                    }}
                                    className={`px-1.5 py-1 text-xs font-normal leading-none rounded-sm transition-colors cursor-pointer relative ${
                                      selectedTag === article.category 
                                        ? 'text-primary' 
                                        : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                    style={{
                                      background: selectedTag === article.category ? 'rgba(59, 130, 246, 0.2)' : 'rgba(107, 114, 128, 0.3)',
                                      transform: 'translateY(-1px)'
                                    }}
                                  >
                                    {highlightSearchTerm(article.category, searchQuery)}
                                  </span>
                                  <div className="flex gap-2 ml-2">
                                    {article.tags.map((tag: string, index: number) => (
                                      <span 
                                        key={index}
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleTagClick(tag)
                                        }}
                                        className={`text-[13px] transition-colors cursor-pointer ${
                                          selectedTag === tag 
                                            ? 'text-primary font-medium' 
                                            : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                      >
                                        #{highlightSearchTerm(tag, searchQuery)}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                          </div>
                        </article>
                      )
                    })
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      没有找到相关文章
                    </div>
                  )}
                </div>

                {/* 右侧边栏 - 1/3宽度 */}
                <div className="w-80 space-y-4">
                  {/* 搜索功能 */}
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4 ml-1">搜索文章</h3>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="搜索文章标题或内容..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-md focus:outline-none focus:ring-0 focus:border-border"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        {searchQuery ? (
                          <button
                            onClick={() => handleSearch("")}
                            className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        ) : (
                          <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 所有分类 */}
                  <div className="bg-card border border-border rounded-lg p-4 pr-6 relative">
                    <h3 className="text-lg font-semibold mb-4 ml-1">所有分类</h3>
                    <div className="relative">
                      <div className="grid grid-cols-3 gap-x-4 gap-y-2 ml-1">
                        {displayedTags.map((tag, index) => (
                          <div 
                            key={index}
                            onClick={() => handleTagClick(tag.name)}
                            className={`flex items-center justify-between cursor-pointer transition-colors ${
                              selectedTag === tag.name 
                                ? 'text-primary' 
                                : 'text-foreground hover:text-primary'
                            }`}
                          >
                            <span className="text-sm truncate">
                              {tag.name}
                            </span>
                            <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                              {tag.count}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      {/* 虚化遮罩层 */}
                      {!showAllTags && (
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card to-transparent pointer-events-none"></div>
                      )}
                    </div>
                    
                    {allTags.length > 9 && (
                      <button
                        onClick={() => setShowAllTags(!showAllTags)}
                        className="flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mt-3 w-full py-2 bg-muted/50 rounded-md hover:bg-muted"
                      >
                        {showAllTags ? '收起' : '查看全部'}
                        <ChevronDown 
                          className={`h-4 w-4 transition-transform ${showAllTags ? 'rotate-180' : ''}`} 
                        />
                      </button>
                    )}
                  </div>

                  {/* 最新文章 */}
                  <div className="bg-card border border-border rounded-lg p-4 pr-6">
                    <h3 className="text-lg font-semibold mb-4 ml-1">最新文章</h3>
                    <div className="space-y-3 ml-1">
                      {articles.slice(0, 5).map((article: any, index: number) => (
                        <div key={index} className="group cursor-pointer" onClick={() => handleArticleClick(article)}>
                          <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">
                            {article.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">{article.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 归档 */}
                  <div className="bg-card border border-border rounded-lg p-4 pr-6">
                    <h3 className="text-lg font-semibold mb-4 ml-1">文章归档</h3>
                    <div className="space-y-2 ml-1">
                      {Object.entries(articles.reduce((acc, article) => {
                        // 解析中文日期格式 "2025年10月12日"
                        const yearMatch = article.date.match(/(\d{4})年/)
                        const year = yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear()
                        if (!acc[year]) {
                          acc[year] = []
                        }
                        acc[year].push(article)
                        return acc
                      }, {} as Record<number, typeof articles>))
                        .sort(([a], [b]) => Number(b) - Number(a))
                        .map(([year, yearArticles]) => {
                          const isSelected = selectedYear === Number(year)
                          return (
                            <div 
                              key={year} 
                              className={`flex justify-between items-center cursor-pointer transition-colors ${
                                isSelected 
                                  ? 'text-primary' 
                                  : 'hover:text-primary'
                              }`}
                              onClick={() => handleYearClick(Number(year))}
                            >
                              <span className="text-sm">{year}年</span>
                              <span className="text-xs text-muted-foreground">
                                {(yearArticles as any[]).length}
                              </span>
                            </div>
                          )
                        })}
                    </div>
                  </div>
                </div>
              </div>

              {/* 探索部分 */}
              <div className="mt-16 pt-8 border-t border-border">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-4">探索</h2>
                  <p className="text-muted-foreground">发现更多有趣的工具和功能</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Markdown编辑器工具 */}
                  <div 
                    className="bg-card border border-border rounded-lg p-6 hover:bg-card/80 transition-all duration-300 cursor-pointer group"
                    onClick={() => router.push('/explore/markdown-editor')}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">Markdown编辑器</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      可视化编辑Markdown文档，实时预览，支持语法高亮和工具栏操作
                    </p>
                    <div className="flex items-center text-sm text-primary">
                      <span>开始编辑</span>
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* 占位符工具卡片 */}
                  <div className="bg-card border border-border rounded-lg p-6 opacity-50">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-muted-foreground">更多工具</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      更多实用工具即将推出...
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>敬请期待</span>
                    </div>
                  </div>

                  {/* 另一个占位符工具卡片 */}
                  <div className="bg-card border border-border rounded-lg p-6 opacity-50">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-muted-foreground">更多工具</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      更多实用工具即将推出...
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>敬请期待</span>
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