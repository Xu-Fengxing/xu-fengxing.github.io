"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ChevronDown, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
// BlogPost interface
interface BlogPost {
  id: string
  title: string
  category: string
  tags: string[]
  date: string
  excerpt: string
  slug: string
}

interface BlogGridClientProps {
  blogPosts: BlogPost[]
}

type PlaceholderItem = {
  id: string
  isPlaceholder: true
}

type DisplayItem = BlogPost | PlaceholderItem

export default function BlogGridClient({ blogPosts }: BlogGridClientProps) {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // 预设的分类列表
  const allCategories = [
    "科技", "人文", "社会", "经济", "政治", "教育", "艺术", "体育", 
    "健康", "环境", "历史", "哲学", "心理学", "法律", "军事", 
    "娱乐", "旅游", "美食", "时尚", "建筑", "音乐", "文学", "电影", "其他"
  ]

  // 筛选文章
  const filteredPosts = selectedCategory 
    ? blogPosts.filter(post => post.category === selectedCategory)
    : blogPosts

  // 填充占位符到6个
  const displayItems: DisplayItem[] = [...filteredPosts]
  while (displayItems.length < 6) {
    displayItems.push({ id: `placeholder-${displayItems.length}`, isPlaceholder: true })
  }

  const handleArticleClick = (post: BlogPost) => {
    router.push(`/p/${post.id}?from=home`)
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category)
  }

  return (
    <div className="space-y-6">
      {/* 分类筛选 */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">分类：</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8">
              {selectedCategory || "全部"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => handleCategoryClick("")}>
              全部
            </DropdownMenuItem>
            {allCategories.map((category) => (
              <DropdownMenuItem 
                key={category} 
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 文章网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayItems.map((item) => {
          if ('isPlaceholder' in item) {
            return (
              <Card key={item.id} className="p-6 border-dashed border-2 border-muted-foreground/20">
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                  <div className="flex items-center gap-2 mt-4">
                    <div className="h-6 bg-muted rounded w-16"></div>
                    <div className="h-6 bg-muted rounded w-12"></div>
                  </div>
                </div>
              </Card>
            )
          }

          const post = item as BlogPost
          return (
            <Card 
              key={post.id} 
              className="p-6 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
              onClick={() => handleArticleClick(post)}
            >
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>3 分钟</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 pt-2">
                  <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                    {post.category}
                  </span>
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs text-muted-foreground">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
