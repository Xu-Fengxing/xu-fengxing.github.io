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

          <div className="text-center flex flex-col items-center justify-center min-h-[60vh]">
            {/* 404 数字显示 */}
            <div className="mb-6">
              <h1 className="text-6xl md:text-7xl font-bold text-accent animate-pulse">
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
              <p className="text-base text-muted-foreground max-w-lg mx-auto mb-6">
                看起来您访问的页面不存在，或者已经被移动到了其他地方。
              </p>
              <button
                onClick={() => {
                  const gameContainer = document.getElementById('mini-game');
                  if (gameContainer) {
                    gameContainer.style.display = 'flex';
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-all duration-200 font-medium text-sm"
              >
                🎮 玩个小游戏
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 小游戏界面 */}
      <div 
        id="mini-game" 
        className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 hidden items-center justify-center"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            e.currentTarget.style.display = 'none';
          }
        }}
      >
        <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">小恐龙游戏</h3>
            <button
              onClick={() => {
                const gameContainer = document.getElementById('mini-game');
                if (gameContainer) {
                  gameContainer.style.display = 'none';
                }
              }}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="bg-muted rounded-lg p-4 mb-4 text-center">
            <div className="text-4xl mb-2">🦕</div>
            <p className="text-sm text-muted-foreground mb-4">
              按空格键或点击屏幕让小恐龙跳跃！
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  // 简单的跳跃动画
                  const dino = document.getElementById('dino');
                  if (dino) {
                    dino.style.transform = 'translateY(-20px)';
                    setTimeout(() => {
                      dino.style.transform = 'translateY(0)';
                    }, 200);
                  }
                }}
                className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors text-sm"
              >
                跳跃
              </button>
              <button
                onClick={() => {
                  // 重置游戏
                  const dino = document.getElementById('dino');
                  if (dino) {
                    dino.style.transform = 'translateY(0)';
                  }
                }}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm"
              >
                重新开始
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <div 
              id="dino"
              className="text-6xl transition-transform duration-200 ease-in-out"
            >
              🦕
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              得分: <span className="font-mono">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
