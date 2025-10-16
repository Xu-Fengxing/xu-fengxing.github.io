"use client"

import { HomeContentModule } from "./home-content-module"

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

interface HomeContentModuleWrapperProps {
  onScrollUp?: () => void
  blogPosts: BlogPost[]
}

export default function HomeContentModuleWrapper({ onScrollUp, blogPosts }: HomeContentModuleWrapperProps) {
  return <HomeContentModule onScrollUp={onScrollUp} blogPosts={blogPosts} />
}
