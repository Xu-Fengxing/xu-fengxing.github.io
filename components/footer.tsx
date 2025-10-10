import { Github, Twitter, Mail, Rss } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="lg:ml-64 border-t border-border/40 bg-sidebar/30 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide">关于</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              风行Justin的个人空间，专注于设计与开发，分享创作灵感与技术实践。
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide">导航</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  首页
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  文章
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  项目
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  关于我
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide">社交</h3>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Mail className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Rss className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide">订阅</h3>
            <p className="text-sm text-muted-foreground">获取最新文章更新</p>
            <div className="flex gap-2">
              <Input type="email" placeholder="邮箱地址" className="h-9 bg-background" />
              <Button size="sm" className="shrink-0">
                订阅
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2025 风行Justin. 保留所有权利.</p>
            <p className="font-mono text-xs">用心设计 · 用爱编码</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
