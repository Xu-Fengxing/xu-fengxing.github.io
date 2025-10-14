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
