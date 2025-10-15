import { Sidebar } from '@/components/sidebar'
import MarkdownEditor from './MarkdownEditor'

export default function MarkdownEditorPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 lg:ml-64">
          <main className="px-6 lg:px-12 py-16 h-full">
            <div className="max-w-7xl mx-auto w-full">
              {/* 返回按钮 */}
              <div className="mb-6">
                <a
                  href="/explore"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  返回
                </a>
              </div>

              {/* 页面标题 */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">Markdown编辑器</h1>
                <p className="text-muted-foreground">可视化编辑Markdown文档，实时预览，支持语法高亮</p>
              </div>
              
              {/* 编辑器组件 */}
              <MarkdownEditor />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
