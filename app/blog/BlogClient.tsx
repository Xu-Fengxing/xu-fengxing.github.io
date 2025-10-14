"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { ChevronDown, Search, X } from "lucide-react"
// 移除不需要的导入

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
    }
  }, [searchParams])

  // 处理分类点击
  const handleCategoryClick = (category: string) => {
    setSelectedTag(category)
    setSelectedYear(null)
    router.push(`/blog?category=${encodeURIComponent(category)}`)
  }

  // 处理标签点击
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag)
    setSelectedYear(null)
    router.push(`/blog?tag=${encodeURIComponent(tag)}`)
  }

  // 处理年份点击
  const handleYearClick = (year: number) => {
    setSelectedYear(year)
    setSelectedTag(null)
    router.push(`/blog?year=${year}`)
  }

  // 清除筛选
  const clearFilters = () => {
    setSelectedTag(null)
    setSelectedYear(null)
    setSearchQuery("")
    router.push('/blog')
  }

  // 处理文章点击
  const handleArticleClick = (article: any) => {
    const from = searchParams.get('from') || 'blog'
    router.push(`/p/${article.id}?from=${from}`)
  }

  // 筛选文章
  const filteredArticles = articles.filter(article => {
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesTag = !selectedTag || 
      article.category === selectedTag || 
      article.tags.includes(selectedTag)
    
    const matchesYear = !selectedYear || 
      article.date.includes(selectedYear.toString())
    
    return matchesSearch && matchesTag && matchesYear
  })

  // 按年份分组文章
  const articlesByYear = filteredArticles.reduce((acc, article) => {
    const year = new Date(article.date.replace('年', '-').replace('月', '-').replace('日', '')).getFullYear()
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(article)
    return acc
  }, {} as Record<number, any[]>)

  // 获取所有标签
  const allTags = Array.from(new Set(articles.flatMap(article => article.tags))).sort()

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 lg:ml-64">
          <main className="px-6 lg:px-12 py-16">
            <div className="max-w-6xl mx-auto w-full">
              {/* 页面标题 */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">博客</h1>
                <p className="text-muted-foreground">分享思考与见解</p>
              </div>

              {/* 搜索和筛选 */}
              <div className="mb-8 space-y-4">
                {/* 搜索框 */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="搜索文章..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>

                {/* 筛选标签 */}
                <div className="flex flex-wrap gap-2">
                  {allTags.slice(0, showAllTags ? allTags.length : 10).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                        selectedTag === tag
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-card text-foreground border-border hover:bg-muted'
                      }`}
                    >
                      #{tag}
                    </button>
                  ))}
                  {allTags.length > 10 && (
                    <button
                      onClick={() => setShowAllTags(!showAllTags)}
                      className="px-3 py-1 text-sm rounded-full border border-border bg-card text-foreground hover:bg-muted transition-colors"
                    >
                      {showAllTags ? '收起' : `更多 (${allTags.length - 10})`}
                    </button>
                  )}
                </div>

                {/* 清除筛选 */}
                {(selectedTag || selectedYear || searchQuery) && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                    清除筛选
                  </button>
                )}
              </div>

              {/* 文章列表 */}
              <div className="space-y-8">
                {Object.keys(articlesByYear).length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">没有找到符合条件的文章</p>
                  </div>
                ) : (
                  Object.entries(articlesByYear)
                    .sort(([a], [b]) => parseInt(b) - parseInt(a))
                    .map(([year, yearArticles]) => (
                      <div key={year} className="space-y-4">
                        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                          <button
                            onClick={() => handleYearClick(parseInt(year))}
                            className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                              selectedYear === parseInt(year)
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-card text-foreground border-border hover:bg-muted'
                            }`}
                          >
                            {year}
                          </button>
                          <span className="text-muted-foreground">({(yearArticles as any[]).length} 篇)</span>
                        </h2>
                        
                        <div className="grid gap-4">
                          {yearArticles.map((article) => (
                            <article
                              key={article.id}
                              onClick={() => handleArticleClick(article)}
                              className="bg-card border border-border rounded-lg p-6 cursor-pointer hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-start justify-between mb-3">
                                <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                                  {article.title}
                                </h3>
                                <span className="text-sm text-muted-foreground ml-4 flex-shrink-0">
                                  {article.date}
                                </span>
                              </div>
                              
                              <p className="text-muted-foreground mb-4 line-clamp-2">
                                {article.excerpt}
                              </p>
                              
                              <div className="flex items-center gap-4 text-sm">
                                <span 
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleCategoryClick(article.category)
                                  }}
                                  className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs cursor-pointer hover:bg-muted/80 transition-colors"
                                >
                                  {article.category}
                                </span>
                                
                                <div className="flex gap-2">
                                  {article.tags.slice(0, 3).map((tag: string) => (
                                    <span
                                      key={tag}
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleTagClick(tag)
                                      }}
                                      className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                                    >
                                      #{tag}
                                    </span>
                                  ))}
                                  {article.tags.length > 3 && (
                                    <span className="text-muted-foreground">
                                      +{article.tags.length - 3}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </article>
                          ))}
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
