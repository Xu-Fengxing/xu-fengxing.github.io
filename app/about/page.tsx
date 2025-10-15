"use client"

import { Sidebar } from "@/components/sidebar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  Hash, 
  Globe, 
  Brain, 
  Gamepad2, 
  Heart,
  Code,
  Palette,
  BookOpen,
  Coffee
} from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 lg:ml-64">
          <main className="px-6 lg:px-12 py-16 h-full flex flex-col justify-center">
            <div className="max-w-6xl mx-auto w-full">
              {/* 页面标题 */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-foreground">关于我</h1>
                <p className="text-muted-foreground mt-2">了解风行 Justin 的更多信息</p>
              </div>

              {/* 主要内容区域 */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* 个人简介 */}
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <User className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">个人简介</h2>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-medium text-foreground">风行 Justin</h3>
                      <p className="text-sm text-muted-foreground">全栈开发者 & 技术爱好者</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-muted-foreground">全网同名：风行 Justin</span>
                    </div>
                  </div>
                </Card>

                {/* 常用ID */}
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Hash className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">常用ID</h2>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="mr-2">Justin_Xu</Badge>
                    <Badge variant="secondary" className="mr-2">JustinXu</Badge>
                    <Badge variant="secondary" className="mr-2">XuFengxing</Badge>
                    <Badge variant="secondary" className="mr-2">Forthing</Badge>
                  </div>
                </Card>

                {/* 个人特质 */}
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Brain className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">MBTI</h2>
                  </div>
                  <div className="space-y-2">
                    <Badge variant="outline" className="text-lg px-3 py-1">ISTP</Badge>
                    <p className="text-sm text-muted-foreground">
                      实用主义者，善于分析和解决问题
                    </p>
                  </div>
                </Card>

                {/* 游戏偏好 */}
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Gamepad2 className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">游戏偏好</h2>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">王者荣耀</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">亚瑟</Badge>
                      <span className="text-sm text-muted-foreground">常用英雄</span>
                    </div>
                  </div>
                </Card>

                {/* 技能栈 */}
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Code className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">技能栈</h2>
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline">JavaScript</Badge>
                      <Badge variant="outline">TypeScript</Badge>
                      <Badge variant="outline">React</Badge>
                      <Badge variant="outline">Next.js</Badge>
                      <Badge variant="outline">Node.js</Badge>
                    </div>
                  </div>
                </Card>

                {/* 兴趣爱好 */}
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Palette className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-semibold">兴趣爱好</h2>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">技术学习</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Coffee className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">咖啡文化</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gamepad2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">游戏娱乐</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* 联系方式 */}
              <Card className="mt-8 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold">联系方式</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-medium mb-2">网站</h3>
                    <p className="text-sm text-muted-foreground">forthing.top</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">GitHub</h3>
                    <p className="text-sm text-muted-foreground">@Xu-Fengxing</p>
                  </div>
                </div>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

