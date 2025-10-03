import { Sidebar } from "@/components/sidebar"
import { ArrowLeft, Home } from "lucide-react"
import Link from "next/link"

export default function NotFound() {

  return (
    <>
      <style jsx>{`
        @keyframes breathe {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
      `}</style>
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
              <h1 className="text-8xl md:text-9xl font-bold text-accent/80" style={{
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
          </div>
        </div>
      </main>

      </div>
    </>
  )
}
