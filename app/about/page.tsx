"use client"

import { Sidebar } from "@/components/sidebar"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 lg:ml-64">
          <main className="px-6 lg:px-12 py-16 h-full flex flex-col justify-center">
            <div className="max-w-6xl mx-auto w-full">
              {/* 页面标题 */}
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-foreground">关于</h1>
              </div>

              {/* 主要内容区域 */}
              <div className="space-y-6">
                {/* 页面建设中 */}
                <div className="bg-card border border-border rounded-lg p-12 text-center">
                  <div className="space-y-4">
                    <div className="text-6xl">🚧</div>
                    <h2 className="text-2xl font-semibold text-foreground">页面建设中</h2>
                    <p className="text-muted-foreground">
                      正在努力完善这个页面，敬请期待...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

