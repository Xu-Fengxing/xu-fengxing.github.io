"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ChevronDown, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { getLatestArticles, BlogPost } from "@/lib/articles"

type PlaceholderItem = {
  id: string
  isPlaceholder: true
}

type DisplayItem = BlogPost | PlaceholderItem

// 自动获取最新文章
const blogPosts: BlogPost[] = getLatestArticles()

export function BlogGrid() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // 生成文章链接的哈希值（与博客页面保持一致）
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

  const handleArticleClick = (post: any) => {
    const hash = generateArticleHash(post.title)
    router.push(`/p/${hash}?from=home`)
  }

  const handleViewMore = () => {
    router.push('/blog')
  }

  // 博客页面中的所有分类
  const allCategories = [
    "科技", "人文", "社会", "经济", "政治", "教育", "艺术", "体育", 
    "健康", "环境", "历史", "哲学", "心理学", "法律", "军事", 
    "娱乐", "旅游", "美食", "时尚", "建筑", "音乐", "文学", "电影", "其他"
  ]
  
  // 筛选文章
  const filteredPosts = selectedCategory 
    ? blogPosts.filter(post => post.category === selectedCategory)
    : blogPosts

  // 创建占位符来保持布局稳定
  const createPlaceholders = (count: number): PlaceholderItem[] => {
    return Array.from({ length: count }, (_, index) => ({
      id: `placeholder-${index}`,
      isPlaceholder: true
    }))
  }

  // 确保始终显示6个位置（文章 + 占位符）
  const displayItems: DisplayItem[] = (() => {
    const items = [...filteredPosts]
    const placeholdersNeeded = Math.max(0, 6 - items.length)
    const result = [...items, ...createPlaceholders(placeholdersNeeded)]
    console.log('筛选结果:', selectedCategory, '文章数量:', items.length, '占位符数量:', placeholdersNeeded, '总数量:', result.length)
    return result
  })()

  // 处理分类选择
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category)
  }

  // 阻止下拉菜单的滚轮事件冒泡
  const handleDropdownWheel = (e: React.WheelEvent) => {
    e.stopPropagation()
  }

  return (
    <section className="px-6 lg:px-12 py-8 h-full flex flex-col justify-center">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold ml-2">最新文章</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 hover:bg-muted hover:text-foreground">
                <span className="text-sm text-muted-foreground">
                  {selectedCategory || '全部'}
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              onWheel={handleDropdownWheel}
              className="max-h-80 overflow-y-auto scrollbar-hide min-w-fit p-1"
            >
              <DropdownMenuItem 
                onClick={() => handleCategorySelect(null)}
                className="rounded-md px-2 py-2 text-sm cursor-pointer hover:bg-muted/50 transition-colors"
              >
                全部
              </DropdownMenuItem>
              {allCategories.map((category) => (
                <DropdownMenuItem 
                  key={category} 
                  onClick={() => handleCategorySelect(category)}
                  className="rounded-md px-2 py-2 text-sm cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 relative">
          {filteredPosts.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="text-muted-foreground text-2xl mb-2">暂无文章</div>
                <div className="text-base text-muted-foreground">
                  {selectedCategory ? `当前分类"${selectedCategory}"下没有文章` : '还没有发布任何文章'}
                </div>
              </div>
            </div>
          )}
          {displayItems.map((item) => (
              'isPlaceholder' in item ? (
                <Card key={item.id} className="group relative overflow-hidden border-border bg-card opacity-0 min-h-[224px]">
                  <div className="px-6 py-4 space-y-3 h-full flex flex-col justify-center">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-medium text-primary uppercase tracking-wide">占位符</span>
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3 className="text-lg font-semibold leading-tight line-clamp-1">
                        这是一篇很长的文章标题，用来测试占位符卡片的宽度显示效果
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        这是一段很长的文章摘要内容，用来测试占位符卡片的内容填充效果。
                      </p>
                    </div>
                    <div className="flex items-center gap-4 pt-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        <span>2025-01-19</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        <span>5 分钟</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ) : (
                <Card
                  key={item.id}
                  className="group relative overflow-hidden border-border bg-card hover:bg-card/80 transition-all duration-300 cursor-pointer min-h-[224px]"
                  onClick={() => handleArticleClick(item)}
                >
                  <div className="px-6 py-4 space-y-3 h-full flex flex-col justify-center">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-medium text-primary uppercase tracking-wide">{item.category}</span>
                    </div>

                    <div className="space-y-2 flex-1">
                      <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{item.excerpt}</p>
                    </div>

                    <div className="flex items-center gap-4 pt-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        <span>{item.readTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Card>
              )
            ))}
        </div>

        {/* 跳转到博客页面的按钮 */}
        <div className="flex justify-center mt-6">
          <button 
            className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
            onClick={handleViewMore}
          >
            <span className="text-sm font-medium">查看更多文章</span>
          </button>
        </div>
      </div>
    </section>
  )
}
