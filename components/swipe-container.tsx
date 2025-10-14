"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { HeroModule } from "@/components/hero-module"
import HomeContentModuleWrapper from "./home-content-module-wrapper"
import { cn } from "@/lib/utils"

export function SwipeContainer() {
  const searchParams = useSearchParams()
  const showContent = searchParams.get('show') === 'content'
  const [currentModule, setCurrentModule] = useState<'hero' | 'content'>(showContent ? 'content' : 'hero')
  const containerRef = useRef<HTMLDivElement>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const handleScrollDown = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentModule('content')
    setTimeout(() => setIsTransitioning(false), 600) // 延长锁定时间匹配动画
  }, [isTransitioning])

  const handleScrollUp = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentModule('hero')
    setTimeout(() => setIsTransitioning(false), 600) // 延长锁定时间匹配动画
  }, [isTransitioning])

  // 处理触摸滑动
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  // 组件挂载后延迟启用交互
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true)
    }, 100) // 100ms延迟
    return () => clearTimeout(timer)
  }, [])

  const onTouchStart = (e: React.TouchEvent) => {
    if (!isMounted) return
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientY)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isMounted) return
    setTouchEnd(e.targetTouches[0].clientY)
  }

  const onTouchEnd = () => {
    if (!isMounted || !touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isUpSwipe = distance > minSwipeDistance
    const isDownSwipe = distance < -minSwipeDistance

    if (isUpSwipe && currentModule === 'hero') {
      handleScrollDown()
    }
    if (isDownSwipe && currentModule === 'content') {
      handleScrollUp()
    }
  }

  // 处理键盘事件和鼠标滚轮
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && currentModule === 'hero') {
        handleScrollDown()
      } else if (e.key === 'ArrowUp' && currentModule === 'content') {
        handleScrollUp()
      }
    }

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning) return
      
      // 检查是否在容器内
      const container = containerRef.current
      if (!container) return
      
      const rect = container.getBoundingClientRect()
      const isInContainer = e.clientX >= rect.left && e.clientX <= rect.right && 
                           e.clientY >= rect.top && e.clientY <= rect.bottom
      
      if (!isInContainer) return
      
      // 简化检测逻辑，减少累积器复杂度
      const threshold = 80 // 增加阈值，减少误触发
      
      // 向上滚动且当前在内容页
      if (e.deltaY < -threshold && currentModule === 'content') {
        // 只在明确的向上滚动意图时才阻止默认行为
        e.preventDefault()
        e.stopPropagation()
        handleScrollUp()
      }
      // 向下滚动且当前在首屏
      else if (e.deltaY > threshold && currentModule === 'hero') {
        // 只在明确的向下滚动意图时才阻止默认行为
        e.preventDefault()
        e.stopPropagation()
        handleScrollDown()
      }
      // 其他情况不阻止默认行为，允许正常滚动
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('wheel', handleWheel)
    }
  }, [currentModule, isTransitioning, handleScrollDown, handleScrollUp])

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden h-screen"
      style={{ 
        overscrollBehavior: 'none',
        willChange: 'transform',
        transform: 'translateZ(0)' // 强制GPU加速
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className={`absolute inset-0 transition-all duration-500 smooth-transition ${
          currentModule === 'hero' 
            ? 'translate-x-0 translate-y-0 opacity-100 pointer-events-auto' 
            : '-translate-x-4 -translate-y-4 opacity-0 pointer-events-none'
        }`}
        style={{ willChange: 'transform, opacity' }}
      >
        <HeroModule onScrollDown={handleScrollDown} />
      </div>
      
      <div
        className={`absolute inset-0 transition-all duration-500 smooth-transition ${
          currentModule === 'content' 
            ? 'translate-x-0 translate-y-0 opacity-100 pointer-events-auto' 
            : '-translate-x-4 translate-y-4 opacity-0 pointer-events-none'
        }`}
        style={{ willChange: 'transform, opacity' }}
      >
        <HomeContentModuleWrapper onScrollUp={handleScrollUp} />
      </div>
    </div>
  )
}
