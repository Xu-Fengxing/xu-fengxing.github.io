import { Apple, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Apple className="h-6 w-6" />
          <span className="text-lg font-semibold tracking-tight">博客</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            首页
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            文章
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            关于
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Search className="h-4 w-4" />
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            订阅
          </Button>
        </div>
      </div>
    </header>
  )
}
