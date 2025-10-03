"use client"

import { Sidebar } from "@/components/sidebar"
import { Hero } from "@/components/hero"
import { MBTISection } from "@/components/mbti-section"
import { useEffect, useState } from "react"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [showMBTI, setShowMBTI] = useState(false)

  const handleToggleMBTI = () => {
    setShowMBTI(!showMBTI)
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      setScrollY(currentScroll)
      
      // 当滚动超过30px时显示MBTI模块，增加一些缓冲
      if (currentScroll > 30 && !showMBTI) {
        setShowMBTI(true)
      } else if (currentScroll <= 10 && showMBTI) {
        setShowMBTI(false)
      }
    }

    // 添加wheel事件监听器来处理鼠标滚轮
    const handleWheel = (e: WheelEvent) => {
      if (!showMBTI && e.deltaY > 0) {
        // 向下滚动时显示MBTI
        setShowMBTI(true)
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (showMBTI && e.deltaY < 0) {
        // 向上滚动时隐藏MBTI
        setShowMBTI(false)
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (showMBTI && e.deltaY > 0) {
        // 在MBTI模块继续向下滚动时，跳转到博客页面（仅电脑端）
        if (window.innerWidth >= 1024) { // lg断点以上
          e.preventDefault()
          window.location.href = '/blog'
        }
      }
    }

    // 添加触摸事件监听器来处理移动端滑动
    let startY = 0
    let startX = 0
    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY
      startX = e.touches[0].clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return
      
      const currentY = e.touches[0].clientY
      const currentX = e.touches[0].clientX
      const deltaY = startY - currentY
      const deltaX = startX - currentX
      
      // 只处理垂直滑动，且滑动距离足够大
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0 && !showMBTI) {
          // 向上滑动时显示MBTI
          setShowMBTI(true)
          e.preventDefault()
        } else if (deltaY < 0 && showMBTI) {
          // 向下滑动时隐藏MBTI
          setShowMBTI(false)
          e.preventDefault()
        }
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      // 触摸结束时的处理
    }

    // 添加键盘事件监听器
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && !showMBTI) {
        setShowMBTI(true)
        e.preventDefault()
      } else if (e.key === 'ArrowUp' && showMBTI) {
        setShowMBTI(false)
        e.preventDefault()
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })
    window.addEventListener("keydown", handleKeyDown)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [showMBTI])

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-64 relative">
        {/* Hero组件 - 满屏板块 */}
        <div 
          className="fixed inset-0 lg:left-64 transition-all duration-700 ease-in-out"
          style={{ 
            opacity: showMBTI ? 0 : 1,
            transform: showMBTI ? 'translateY(-20px) scale(0.98)' : 'translateY(0) scale(1)',
            zIndex: showMBTI ? 1 : 2,
            filter: showMBTI ? 'blur(2px)' : 'blur(0px)',
            pointerEvents: showMBTI ? 'none' : 'auto'
          }}
        >
          <Hero onToggleMBTI={handleToggleMBTI} />
        </div>

        {/* MBTI模块 - 满屏板块 */}
        <div 
          className="fixed inset-0 lg:left-64 transition-all duration-700 ease-in-out"
          style={{ 
            opacity: showMBTI ? 1 : 0,
            transform: showMBTI ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)',
            zIndex: showMBTI ? 2 : 1,
            pointerEvents: showMBTI ? 'auto' : 'none',
            filter: showMBTI ? 'blur(0px)' : 'blur(2px)'
          }}
        >
          <MBTISection />
        </div>
      </main>
    </div>
  )
}
