"use client"

import { Sidebar } from "@/components/sidebar"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"

export default function NotFound() {

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-64">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center flex flex-col items-center justify-center min-h-[80vh]">
              {/* 404 数字显示 */}
              <div className="mb-6">
                <h1 className="text-8xl md:text-9xl font-bold text-accent" style={{
                  animation: 'breathe 3s ease-in-out infinite'
                }}>
                  404
                </h1>
              </div>

              {/* GIF元素 - 回到原来的位置 */}
              <div className="mb-6">
                <img 
                  src="/404.gif" 
                  alt="404动画" 
                  className="w-32 h-32 object-cover rounded-lg"
                  onError={(e) => {
                    // 如果GIF加载失败，显示备用图标
                    e.currentTarget.style.display = 'none';
                    const fallbackElement = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallbackElement) fallbackElement.style.display = 'flex';
                  }}
                />
                <div className="w-32 h-32 rounded-lg bg-accent/20 flex items-center justify-center hidden">
                  <Home className="w-12 h-12 text-accent" />
                </div>
              </div>

              {/* 主标题和描述 */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
                  页面走丢了
                </h2>
                <p className="text-base text-muted-foreground max-w-lg mx-auto">
                  看起来您访问的页面不存在，或者已经被移动到了其他地方。
                </p>
              </div>

              {/* 返回首页按钮 */}
              <div className="mt-8">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-3xl hover:bg-accent/90 transition-colors font-medium shadow-lg hover:shadow-xl"
                >
                  <Home className="w-4 h-4" />
                  返回首页
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
