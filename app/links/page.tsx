"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ExternalLink, Heart, Plus, Copy, Mail, ChevronDown } from "lucide-react"

const friendsLinks = [
  {
    id: 1,
    name: "Gerrit1999", 
    url: "https://gerrit1999.github.io/",
    description: "星轨时光机",
    avatar: "https://avatars.githubusercontent.com/u/71630591",
  },
  {
    id: 2,
    name: "ChaM&log",
    url: "https://champhoon.xyz/", 
    description: "澄沨的漫游茶记",
    avatar: "https://api.champhoon.xyz/favicon/personal.ico",
  },
  {
    id: 3,
    name: "ZyPlj",
    url: "https://blog.pljzy.top/", 
    description: "一个热爱编程的全栈开发者",
    avatar: "https://avatars.githubusercontent.com/u/103929231",
  },
  {
    id: 4,
    name: "张洪Heo",
    url: "https://blog.zhheo.com/", 
    description: "分享设计与科技生活",
    avatar: "https://zhheo.com/img/%E5%8D%9A%E5%AE%A2.webp",
  },
]

export default function LinksPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isBlogOpen, setIsBlogOpen] = useState(true)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const openEmail = () => {
    const template = "主题：友链交换申请\n\n网站名称：我的个人博客\n网站地址：https://example.com\n网站头像：https://example.com/avatar.jpg\n网站描述：分享技术心得与生活感悟"
    window.open(`mailto:justin@forthing.top?subject=友链交换申请&body=${encodeURIComponent(template)}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 lg:ml-64">
          <main className="px-6 lg:px-12 py-16 h-full flex flex-col justify-center">
            <div className="max-w-6xl mx-auto w-full">
              {/* 页面标题 */}
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-foreground">链接</h1>
              </div>

              {/* 博客友链部分 */}
              <Collapsible open={isBlogOpen} onOpenChange={setIsBlogOpen}>
                <div className="mb-8">
                  <CollapsibleTrigger asChild>
                    <button className="border-none bg-transparent cursor-pointer w-full text-left">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <h2 className="text-2xl font-bold text-foreground hover:bg-transparent ml-1">
                            博客
                          </h2>
                          <span className="text-muted-foreground">{friendsLinks.length}</span>
                        </div>
                        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 mr-1 ${isBlogOpen ? 'rotate-180' : ''}`} />
                      </div>
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="transition-all duration-300 ease-out">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      {friendsLinks.map((link, index) => (
                        <Card
                          key={link.id}
                          className="group relative overflow-hidden border-border bg-card hover:bg-card/80 transition-all duration-300 ease-out cursor-pointer h-20"
                          style={{
                            animationDelay: `${index * 30}ms`,
                            animation: isBlogOpen ? 'slideInUp 0.3s ease-out forwards' : 'slideOutDown 0.2s ease-in forwards'
                          }}
                          onClick={() => window.open(link.url, '_blank')}
                        >
                          <div className="px-4 py-0 h-full">
                            <div className="flex items-center gap-4 h-full">
                              {/* 头像 */}
                              <div className="flex-shrink-0">
                                <div className="h-12 w-12 rounded-full overflow-hidden bg-muted">
                                  <img
                                    src={link.avatar}
                                    alt={link.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              </div>
                              {/* 内容 */}
                              <div className="flex-1 min-w-0">
                                <div className="mb-1">
                                  <h3
                                    className="text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate"
                                    title={link.name}
                                  >
                                    {link.name}
                                  </h3>
                                </div>
                                <p
                                  className="text-sm text-muted-foreground leading-tight line-clamp-1"
                                  title={link.description}
                                >
                                  {link.description}
                                </p>
                              </div>
                              {/* 外部链接图标 */}
                              <div className="flex-shrink-0">
                                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}

                      {/* 申请友链卡片 */}
                      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Card
                            className="group relative overflow-hidden border-border bg-card hover:bg-card/80 transition-all duration-300 ease-out cursor-pointer h-20"
                            style={{
                              animationDelay: `${friendsLinks.length * 30}ms`,
                              animation: isBlogOpen ? 'slideInUp 0.3s ease-out forwards' : 'slideOutDown 0.2s ease-in forwards'
                            }}
                          >
                            <div className="px-4 py-0 h-full">
                              <div className="flex items-center gap-4 h-full">
                                {/* 头像 */}
                                <div className="flex-shrink-0">
                                  <div className="h-12 w-12 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                                    <Plus className="h-6 w-6 text-muted-foreground" />
                                  </div>
                                </div>
                                {/* 内容 */}
                                <div className="flex-1 min-w-0">
                                  <div className="mb-1">
                                    <h3
                                      className="text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate"
                                      title="申请友链"
                                    >
                                      申请友链
                                    </h3>
                                  </div>
                                  <p
                                    className="text-sm text-muted-foreground leading-tight line-clamp-1"
                                    title="期待与您的友链交换！"
                                  >
                                    期待与您的友链交换！
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Card>
                        </DialogTrigger>
                        
                        <DialogContent className="max-w-6xl lg:left-[calc(50%+8rem)]" style={{width: '85%', maxWidth: 'calc(42rem * 0.85)'}}>
                          <DialogHeader className="py-0">
                            <DialogTitle className="flex items-center gap-2">
                              <Heart className="h-5 w-5 text-primary" />
                              申请友链
                            </DialogTitle>
                          </DialogHeader>
                          
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium mb-2 ml-1">联系方式</h4>
                              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm ml-1">justin@forthing.top</span>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => copyToClipboard('justin@forthing.top')}
                                  className="ml-auto h-6 w-6 p-0"
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2 ml-1">申请模板</h4>
                              
                              {/* 主题框 */}
                              <div className="mb-3">
                                <span className="text-sm text-muted-foreground ml-1 block mb-2">主题</span>
                                <div className="p-3 bg-muted rounded-lg">
                                  <span className="text-sm">友链交换申请</span>
                                </div>
                              </div>

                              {/* 内容框 */}
                              <div className="mb-3">
                                <span className="text-sm text-muted-foreground ml-1 block mb-2">内容</span>
                                <div className="p-3 bg-muted rounded-lg space-y-2">
                                  <div className="text-sm">
                                    <span className="text-muted-foreground">网站名称：</span>
                                    <span>我的个人博客</span>
                                  </div>
                                  <div className="text-sm">
                                    <span className="text-muted-foreground">网站地址：</span>
                                    <span>https://example.com</span>
                                  </div>
                                  <div className="text-sm">
                                    <span className="text-muted-foreground">网站头像：</span>
                                    <span>https://example.com/avatar.jpg</span>
                                  </div>
                                  <div className="text-sm">
                                    <span className="text-muted-foreground">网站描述：</span>
                                    <span>分享技术心得与生活感悟</span>
                                  </div>
                                </div>
                              </div>

                              {/* 操作按钮 */}
                              <div className="flex gap-2">
                                <Button
                                  onClick={openEmail}
                                  className="flex-1"
                                >
                                  <Mail className="h-4 w-4 mr-2" />
                                  发送邮件
                                </Button>
                                <Button
                                  variant="outline"
                                  onClick={() => copyToClipboard("主题：友链交换申请\n\n网站名称：我的个人博客\n网站地址：https://example.com\n网站头像：https://example.com/avatar.jpg\n网站描述：分享技术心得与生活感悟")}
                                >
                                  <Copy className="h-4 w-4 mr-2" />
                                  复制模板
                                </Button>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
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
