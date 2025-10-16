"use client"

import { Sidebar } from "@/components/sidebar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Code, 
  Palette, 
  Globe, 
  Heart, 
  Coffee, 
  Gamepad2, 
  BookOpen,
  ExternalLink
} from "lucide-react"

// 自定义图标组件 - 与首页保持一致
const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

const BilibiliIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/>
  </svg>
)

const SteamIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012h-.001zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z"/>
  </svg>
)

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const WeiboIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="100 100 800 800" fill="currentColor">
    <path d="M457.3 543c-68.1-17.7-145 16.2-174.6 76.2-30.1 61.2-1 129.1 67.8 151.3 71.2 23 155.2-12.2 184.4-78.3 28.7-64.6-7.2-131-77.6-149.2z m-52 156.2c-13.8 22.1-43.5 31.7-65.8 21.6-22-10-28.5-35.7-14.6-57.2 13.7-21.4 42.3-31 64.4-21.7 22.4 9.5 29.6 35 16 57.3z m45.5-58.5c-5 8.6-16.1 12.7-24.7 9.1-8.5-3.5-11.2-13.1-6.4-21.5 5-8.4 15.6-12.4 24.1-9.1 8.7 3.2 11.8 12.9 7 21.5zM785.3 443.5c15 4.8 31-3.4 35.9-18.3 11.8-36.6 4.4-78.4-23.2-109-27.6-30.6-68.4-42.3-106-34.3-15.4 3.3-25.2 18.4-21.9 33.8 3.3 15.3 18.4 25.2 33.8 21.8 18.4-3.9 38.3 1.8 51.9 16.7 13.5 15 17.2 35.4 11.3 53.3-4.9 15.1 3.2 31.1 18.2 36z"/>
    <path d="M885.1 237.5c-56.7-62.9-140.4-86.9-217.7-70.5-17.9 3.8-29.3 21.4-25.4 39.3 3.8 17.9 21.4 29.3 39.3 25.5 55-11.7 114.4 5.4 154.8 50.1 40.3 44.7 51.2 105.7 34 159.1-5.6 17.4 3.9 36 21.3 41.7 17.4 5.6 36-3.9 41.6-21.2v-0.1c24.1-75.4 8.9-161.1-47.9-223.9zM729 499c-12.2-3.6-20.5-6.1-14.1-22.1 13.8-34.7 15.2-64.7 0.3-86-28-40.1-104.8-37.9-192.8-1.1 0 0-27.6 12.1-20.6-9.8 13.5-43.5 11.5-79.9-9.6-101-47.7-47.8-174.6 1.8-283.5 110.6C127.3 471.1 80 557.5 80 632.2 80 775.1 263.2 862 442.5 862c235 0 391.3-136.5 391.3-245 0-65.5-55.2-102.6-104.8-118zM443 810.8c-143 14.1-266.5-50.5-275.8-144.5-9.3-93.9 99.2-181.5 242.2-195.6 143-14.2 266.5 50.5 275.8 144.4C694.4 709 586 796.6 443 810.8z"/>
  </svg>
)

const ZhihuIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="100 100 800 800" fill="currentColor">
    <path d="M564.7 230.1V803h60l25.2 71.4L756.3 803h131.5V230.1H564.7z m247.7 497h-59.9l-75.1 50.4-17.8-50.4h-18V308.3h170.7v418.8zM526.1 486.9H393.3c2.1-44.9 4.3-104.3 6.6-172.9h130.9l-0.1-8.1c0-0.6-0.2-14.7-2.3-29.1-2.1-15-6.6-34.9-21-34.9H287.8c4.4-20.6 15.7-69.7 29.4-93.8l6.4-11.2-12.9-0.7c-0.8 0-19.6-0.9-41.4 10.6-35.7 19-51.7 56.4-58.7 84.4-18.4 73.1-44.6 123.9-55.7 145.6-3.3 6.4-5.3 10.2-6.2 12.8-1.8 4.9-0.8 9.8 2.8 13 10.5 9.5 38.2-2.9 38.5-3 0.6-0.3 1.3-0.6 2.2-1 13.9-6.3 55.1-25 69.8-84.5h56.7c0.7 32.2 3.1 138.4 2.9 172.9h-141l-2.1 1.5c-23.1 16.9-30.5 63.2-30.8 65.2l-1.4 9.2h167c-12.3 78.3-26.5 113.4-34 127.4-3.7 7-7.3 14-10.7 20.8-21.3 42.2-43.4 85.8-126.3 153.6-3.6 2.8-7 8-4.8 13.7 2.4 6.3 9.3 9.1 24.6 9.1 5.4 0 11.8-0.3 19.4-1 49.9-4.4 100.8-18 135.1-87.6 17-35.1 31.7-71.7 43.9-108.9L497 850l5-12c0.8-1.9 19-46.3 5.1-95.9l-0.5-1.8-108.1-123-22 16.6c6.4-26.1 10.6-49.9 12.5-71.1h158.7v-8c0-40.1-18.5-63.9-19.2-64.9l-2.4-3z"/>
  </svg>
)

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 lg:ml-64">
          <main className="px-6 lg:px-12 py-16 h-full flex flex-col justify-center">
            <div className="max-w-6xl mx-auto w-full space-y-8">
              {/* 页面标题 */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-foreground">关于</h1>
              </div>

              {/* 主要内容区域 */}
              <div className="space-y-8">
                {/* 个人信息和技能兴趣卡片 */}
                <Card className="p-8 rounded-2xl shadow-lg border-border bg-card">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* 左侧 - 个人信息（保持原来的垂直布局） */}
                    <div className="space-y-6">
                      {/* 头像 */}
                      <div className="flex justify-center">
                        <div className="h-40 w-40 rounded-2xl overflow-hidden shadow-lg bg-muted">
                          <img 
                            src="/avatar.jpg" 
                            alt="头像" 
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const fallback = target.nextElementSibling as HTMLElement;
                              if (fallback) fallback.style.display = 'flex';
                            }}
                          />
                          <div className="h-full w-full flex items-center justify-center text-4xl font-semibold bg-muted" style={{display: 'none'}}>
                            JX
                          </div>
                        </div>
                      </div>
                      
                      {/* 个人信息 */}
                      <div className="text-center space-y-4">
                        <div>
                          <h2 className="text-2xl font-bold text-foreground mb-1">风行Justin</h2>
                          <p className="text-muted-foreground">一个兴趣使然的设计爱好者</p>
                        </div>
                        
                        {/* 个人标识 */}
                        <div className="bg-muted/50 rounded-lg p-3">
                          <div className="h-4 w-20 bg-muted rounded animate-pulse"></div>
                          <div className="h-3 w-24 bg-muted rounded mt-1 animate-pulse"></div>
                        </div>
                        
                        {/* 联系方式图标按钮 */}
                        <div className="flex justify-center gap-2 flex-wrap">
                          <Button 
                            size="sm"
                            variant="outline" 
                            className="h-10 w-10 p-0 hover:scale-110 transition-all duration-200"
                            onClick={() => window.open('https://github.com/Xu-Fengxing', '_blank')}
                          >
                            <GitHubIcon className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm"
                            variant="outline" 
                            className="h-10 w-10 p-0 hover:scale-110 transition-all duration-200"
                            onClick={() => window.open('https://weibo.com/forthing', '_blank')}
                          >
                            <WeiboIcon className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm"
                            variant="outline" 
                            className="h-10 w-10 p-0 hover:scale-110 transition-all duration-200"
                            onClick={() => {}}
                            disabled
                          >
                            <ZhihuIcon className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm"
                            variant="outline" 
                            className="h-10 w-10 p-0 hover:scale-110 transition-all duration-200"
                            onClick={() => window.open('https://space.bilibili.com/1525408234', '_blank')}
                          >
                            <BilibiliIcon className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm"
                            variant="outline" 
                            className="h-10 w-10 p-0 hover:scale-110 transition-all duration-200"
                            onClick={() => window.open('https://steamcommunity.com/id/Justin_Xu/', '_blank')}
                          >
                            <SteamIcon className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm"
                            variant="outline" 
                            className="h-10 w-10 p-0 hover:scale-110 transition-all duration-200"
                            onClick={() => window.open('https://x.com/Justin___Xu', '_blank')}
                          >
                            <XIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* 中间 - 技能栈 */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-5 w-5 bg-muted rounded animate-pulse"></div>
                        <div className="h-6 w-20 bg-muted rounded animate-pulse"></div>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-3">
                        <div className="h-8 bg-muted rounded-md animate-pulse"></div>
                        <div className="h-8 bg-muted rounded-md animate-pulse"></div>
                        <div className="h-8 bg-muted rounded-md animate-pulse"></div>
                        <div className="h-8 bg-muted rounded-md animate-pulse"></div>
                        <div className="h-8 bg-muted rounded-md animate-pulse"></div>
                        <div className="h-8 bg-muted rounded-md animate-pulse"></div>
                      </div>
                    </div>

                    {/* 右侧 - 兴趣爱好和联系方式 */}
                    <div className="space-y-6">
                      {/* 兴趣爱好 */}
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="h-5 w-5 bg-muted rounded animate-pulse"></div>
                          <div className="h-6 w-24 bg-muted rounded animate-pulse"></div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="w-12 h-12 bg-muted rounded-xl mx-auto mb-2 animate-pulse"></div>
                            <div className="h-4 w-16 bg-muted rounded mx-auto animate-pulse"></div>
                          </div>
                          <div className="text-center">
                            <div className="w-12 h-12 bg-muted rounded-xl mx-auto mb-2 animate-pulse"></div>
                            <div className="h-4 w-16 bg-muted rounded mx-auto animate-pulse"></div>
                          </div>
                          <div className="text-center">
                            <div className="w-12 h-12 bg-muted rounded-xl mx-auto mb-2 animate-pulse"></div>
                            <div className="h-4 w-16 bg-muted rounded mx-auto animate-pulse"></div>
                          </div>
                          <div className="text-center">
                            <div className="w-12 h-12 bg-muted rounded-xl mx-auto mb-2 animate-pulse"></div>
                            <div className="h-4 w-16 bg-muted rounded mx-auto animate-pulse"></div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

