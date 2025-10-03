import { Sidebar } from "@/components/sidebar"
import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function FriendsPage() {
  const friends = [
    {
      name: "Gerrit1999",
      url: "https://gerrit1999.github.io/",
      description: "星轨时光机 - Gerrit1999的个人博客",
      avatar: "https://gerrit1999.github.io/avatar.jpg",
      tags: ["技术博客", "Java", "Spring"],
      icon: "fa-solid fa-blog"
    },
    // 可以在这里添加更多友链
  ]

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-64">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              返回首页
            </Link>

            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">友链</h1>
              <p className="text-muted-foreground text-base">发现更多优秀的博客和网站</p>
            </div>

            <div className="grid gap-6 grid-cols-2 lg:grid-cols-3 w-full">
            {friends.map((friend, index) => (
              <article
                key={index}
                className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1"
              >
                <div className="text-center">
                  {/* 首字母圆形标识 */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent/30 via-accent/20 to-accent/10 flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <span className="text-xl font-bold text-accent">
                      {friend.name.charAt(0)}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2">
                    {friend.name}
                  </h2>
                  
                  <p className="text-muted-foreground mb-4 text-pretty leading-relaxed text-sm">
                    {friend.description}
                  </p>
                  
                  <div className="hidden md:flex flex-wrap justify-center gap-2 mb-4">
                    {friend.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center rounded-full bg-gradient-to-r from-secondary to-secondary/80 px-3 py-1 text-xs font-medium text-secondary-foreground shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <a
                    href={friend.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-accent to-accent/90 text-accent-foreground rounded-lg hover:from-accent/90 hover:to-accent/80 transition-all duration-300 font-medium text-xs md:text-sm shadow-sm hover:shadow-md hover:scale-105 whitespace-nowrap"
                  >
                    访问网站
                    <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
                  </a>
                </div>
              </article>
            ))}
            
            {/* 占位符 - 确保每行都有3个元素 */}
            {Array.from({ length: (3 - (friends.length % 3)) % 3 }).map((_, index) => (
              <div key={`placeholder-${index}`} className="hidden lg:block">
                <div className="rounded-xl border border-dashed border-border/30 bg-card/30 p-5 h-full min-h-[240px] flex items-center justify-center">
                  <div className="text-center text-muted-foreground/50">
                    <div className="w-14 h-14 rounded-full bg-muted/30 flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl">+</span>
                    </div>
                    <p className="text-sm">期待更多友链</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 申请友链说明 - 紧凑布局 */}
          <div className="max-w-2xl mx-auto p-5 rounded-xl border border-border bg-card mt-8 mb-8">
            <h3 className="text-lg font-semibold mb-3 text-center">申请友链</h3>
            <p className="text-muted-foreground mb-4 text-center text-sm">
              如果你也想与我交换友链，欢迎通过以下方式联系我：
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="mailto:justin_xu@qq.com"
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors text-sm font-medium"
              >
                <i className="fa-solid fa-envelope text-sm"></i>
                发送邮件
              </a>
              <a
                href="https://github.com/Xu-Fengxing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium"
              >
                <i className="fa-brands fa-github text-sm"></i>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}