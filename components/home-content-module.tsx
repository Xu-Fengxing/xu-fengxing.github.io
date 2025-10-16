"use client"

import BlogGridClient from "./blog-grid-client"
import { Footer } from "@/components/footer"

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

interface HomeContentModuleProps {
  onScrollUp?: () => void
  blogPosts: BlogPost[]
}

export function HomeContentModule({ onScrollUp, blogPosts }: HomeContentModuleProps) {
  return (
    <div id="content" className="h-full bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <BlogGridClient blogPosts={blogPosts} />
      </div>
    </div>
  )
}
