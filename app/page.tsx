"use client"

import { Sidebar } from "@/components/sidebar"
import { Hero } from "@/components/hero"
import { MBTISection } from "@/components/mbti-section"
import { useEffect, useState } from "react"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollPhase, setScrollPhase] = useState<"initial" | "locked" | "unlocked">("initial")
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024)
    }
    
    const handleScroll = () => {
      const currentScroll = window.scrollY
      setScrollY(currentScroll)

      if (currentScroll <= 50) {
        setScrollPhase("initial")
      } else if (currentScroll > 50 && currentScroll <= 600) {
        setScrollPhase("locked")
      } else {
        setScrollPhase("unlocked")
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 800

  const heroOpacity =
    scrollPhase === "initial" ? 1 : scrollPhase === "locked" ? Math.max(0, 1 - (scrollY - 50) / 550) : 0


  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-64 relative">
        <div
          className="fixed inset-0 lg:left-64 transition-opacity duration-300 ease-out z-0 pointer-events-none"
          style={{ opacity: heroOpacity }}
        >
          <Hero />
        </div>

        <div
          className="relative z-10 bg-background transition-all duration-700 ease-in-out"
          style={{
            transform: scrollPhase === "initial" ? `translateY(${viewportHeight}px)` : 
                      scrollPhase === "locked" ? "translateY(0)" : "translateY(0)",
            position: scrollPhase === "unlocked" ? "relative" : "fixed",
            top: scrollPhase === "unlocked" ? "auto" : 0,
            left: scrollPhase === "unlocked" ? "auto" : (isLargeScreen ? "256px" : "0"),
            right: scrollPhase === "unlocked" ? "auto" : 0,
            width: scrollPhase === "unlocked" ? "auto" : (isLargeScreen ? "calc(100% - 256px)" : "100%"),
            minHeight: "100vh",
          }}
        >
          <MBTISection />
        </div>

        <div style={{ height: `${viewportHeight + 500}px` }} />
      </main>
    </div>
  )
}
