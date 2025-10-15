"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Card } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

const tools = [
  {
    id: 1,
    name: "Markdown编辑器",
    description: "可视化编辑Markdown文档，实时预览，支持语法高亮和工具栏操作",
    icon: FileText,
    path: "/explore/markdown-editor",
    available: true,
  },
]

export default function ExplorePage() {
  const router = useRouter()
  const [isToolsOpen, setIsToolsOpen] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 lg:ml-64">
          <main className="px-6 lg:px-12 py-16 h-full flex flex-col justify-center">
            <div className="max-w-6xl mx-auto w-full">
              {/* 页面标题 */}
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-foreground">探索</h1>
              </div>

              {/* 工具部分 */}
              <Collapsible open={isToolsOpen} onOpenChange={setIsToolsOpen}>
                <div className="mb-8">
                  <CollapsibleTrigger asChild>
                    <button className="border-none bg-transparent cursor-pointer w-full text-left">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <h2 className="text-2xl font-bold text-foreground hover:bg-transparent ml-1">
                            工具
                          </h2>
                          <span className="text-muted-foreground">{tools.length}</span>
                        </div>
                        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 mr-1 ${isToolsOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="transition-all duration-300 ease-out">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      {tools.map((tool, index) => {
                        const Icon = tool.icon
                        return (
                          <Card
                            key={tool.id}
                            className={`group relative overflow-hidden border-border bg-card transition-all duration-300 ease-out cursor-pointer h-20 ${
                              tool.available 
                                ? 'hover:bg-card/80' 
                                : 'opacity-50 cursor-not-allowed'
                            }`}
                            style={{
                              animationDelay: `${index * 30}ms`,
                              animation: isToolsOpen ? 'slideInUp 0.3s ease-out forwards' : 'slideOutDown 0.2s ease-in forwards'
                            }}
                            onClick={() => tool.available && router.push(tool.path)}
                          >
                            <div className="px-4 py-0 h-full">
                              <div className="flex items-center gap-4 h-full">
                                {/* 图标 */}
                                <div className="flex-shrink-0">
                                  <div className="h-12 w-12 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                                    <Icon className="h-6 w-6 text-muted-foreground" />
                                  </div>
                                </div>
                                {/* 内容 */}
                                <div className="flex-1 min-w-0">
                                  <div className="mb-1">
                                    <h3
                                      className={`text-base font-semibold transition-colors truncate ${
                                        tool.available 
                                          ? 'text-foreground group-hover:text-primary' 
                                          : 'text-muted-foreground'
                                      }`}
                                      title={tool.name}
                                    >
                                      {tool.name}
                                    </h3>
                                  </div>
                                  <p
                                    className="text-sm text-muted-foreground leading-tight line-clamp-1"
                                    title={tool.description}
                                  >
                                    {tool.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Card>
                        )
                      })}
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
