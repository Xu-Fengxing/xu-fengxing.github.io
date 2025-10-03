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
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>

          <div className="text-center">
            {/* 404 数字显示 */}
            <div className="mb-8">
              <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent/60 to-accent/30 mb-4">
                404
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-accent via-accent/60 to-transparent mx-auto"></div>
            </div>

            {/* 主标题和描述 */}
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                页面走丢了
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                看起来您访问的页面不存在，或者已经被移动到了其他地方。
                <br />
                让我们帮您找到正确的方向。
              </p>
            </div>

            {/* GIF装饰元素 */}
            <div className="relative mb-12">
              <div className="w-64 h-64 mx-auto relative">
                {/* 背景装饰圆 */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/10 via-accent/5 to-transparent animate-pulse"></div>
                <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-accent/5 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute inset-8 rounded-full bg-gradient-to-bl from-accent/3 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
                
                {/* GIF元素 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full overflow-hidden bg-gradient-to-br from-accent/20 to-accent/10 backdrop-blur-sm flex items-center justify-center">
                    <img 
                      src="/404.gif" 
                      alt="404动画" 
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        // 如果GIF加载失败，显示备用图标
                        e.currentTarget.style.display = 'none';
                        const fallbackElement = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallbackElement) fallbackElement.style.display = 'flex';
                      }}
                    />
                    <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center backdrop-blur-sm hidden">
                      <Home className="w-8 h-8 text-accent" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Home className="w-5 h-5" />
                回到首页
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-all duration-200 font-medium"
              >
                浏览博客
              </Link>
            </div>

            {/* 底部提示 */}
            <div className="mt-16 text-center">
              <p className="text-sm text-muted-foreground/70">
                如果您认为这是一个错误，请
                <a 
                  href="mailto:justin_xu@qq.com" 
                  className="text-accent hover:text-accent/80 transition-colors mx-1"
                >
                  联系我们
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
