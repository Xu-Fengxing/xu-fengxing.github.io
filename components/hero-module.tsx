"use client"

import { HeroSection } from "@/components/hero-section"
import { SocialLinks } from "@/components/social-links"

interface HeroModuleProps {
  onScrollDown: () => void
}

export function HeroModule({ onScrollDown }: HeroModuleProps) {
  return (
    <div className="h-full bg-background flex flex-col">
      <div className="flex-1 flex items-center">
        <HeroSection />
      </div>
      
      {/* 社交链接 */}
      <SocialLinks />
      
      {/* 下滑提示 */}
      <div className="flex items-center justify-center pb-8">
        <button
          onClick={onScrollDown}
          className="group flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <div className="flex flex-col items-center gap-1">
            <div className="h-8 w-px bg-current opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="h-2 w-px bg-current opacity-30 group-hover:opacity-70 transition-opacity" />
            <div className="h-1 w-px bg-current opacity-20 group-hover:opacity-50 transition-opacity" />
          </div>
          <span className="text-sm font-medium">向下滑动</span>
        </button>
      </div>
    </div>
  )
}
