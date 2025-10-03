import { Sidebar } from "@/components/sidebar"
import { ArrowLeft, Calendar, Tag } from "lucide-react"
import Link from "next/link"
import { posts } from "@/lib/posts"

// 生成静态参数
export async function generateStaticParams() {
  return posts.map((post) => ({
    id: post.id,
  }))
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = posts.find(p => p.id === params.id)

  if (!post) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 lg:ml-64">
          <div className="max-w-4xl mx-auto px-6 py-20">
            <h1 className="text-4xl font-bold mb-4">文章未找到</h1>
            <p className="text-muted-foreground mb-8">抱歉，您访问的文章不存在。</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              返回博客列表
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main id="top" className="flex-1 lg:ml-64">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            返回博客列表
          </Link>

          <article className="prose prose-gray dark:prose-invert max-w-none">
            <header className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
                  <Tag className="h-3 w-3" />
                  {post.category}
                </span>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>
            </header>


            <div className="prose prose-gray dark:prose-invert max-w-none">
              {post.content.split('\n').map((line, index) => {
                if (line.startsWith('# ')) {
                  // 跳过h1标题，因为已经在header中显示了
                  return null
                } else if (line.startsWith('## ')) {
                  return (
                    <div key={index} className="mb-1">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-0">{line.slice(3)}</h2>
                      <hr className="border-0 h-[0.5px] bg-gray-300 dark:bg-gray-600 mt-1" />
                    </div>
                  )
                } else if (line.startsWith('### ')) {
                  return (
                    <div key={index} className="mb-1">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-0">
                        {line.slice(4)}
                      </h3>
                    </div>
                  )
                } else if (line.startsWith('#### ')) {
                  return (
                    <div key={index} className="mb-1">
                      <h4 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        {line.slice(5)}
                      </h4>
                    </div>
                  )
                } else if (line.startsWith('- **')) {
                  const match = line.match(/- \*\*(.*?)\*\*：(.*)/)
                  if (match) {
                    return (
                      <div key={index} className="mb-2 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-l-4 border-gray-300 dark:border-gray-600">
                        <div className="flex items-start">
                          <span className="font-semibold text-gray-900 dark:text-white mr-2 min-w-0 flex-shrink-0">{match[1]}：</span>
                          <span className="text-black dark:text-white">{match[2]}</span>
                        </div>
                      </div>
                    )
                  }
                } else if (line.startsWith('- ')) {
                  return (
                    <div key={index} className="mb-2 ml-4 flex items-baseline">
                      <span className="text-gray-500 dark:text-gray-400 mr-2">•</span>
                      <span className="text-black dark:text-white">{line.slice(2)}</span>
                    </div>
                  )
                } else if (line.startsWith('1. ')) {
                  return (
                    <div key={index} className="mb-3 ml-4 flex items-baseline">
                      <span className="text-gray-500 dark:text-gray-400 mr-2 font-semibold">{line.match(/^\d+\./)?.[0]}</span>
                      <span className="text-black dark:text-white">{line.replace(/^\d+\.\s*/, '')}</span>
                    </div>
                  )
                } else if (line === '---') {
                  return null
                } else if (line.startsWith('*') && line.endsWith('*')) {
                  return (
                    <div key={index} className="mt-8 text-center">
                      <a 
                        href="#top" 
                        className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-full hover:bg-accent/90 transition-colors text-sm font-medium"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m18 15-6-6-6 6"/>
                        </svg>
                        返回顶部
                      </a>
                    </div>
                  )
                } else if (line.trim() === '') {
                  return <div key={index} className="h-1"></div>
                } else {
                  // 处理粗体文本
                  const processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 dark:text-white font-semibold">$1</strong>')
                  return (
                    <p key={index} className="mb-2 leading-6 text-black dark:text-white" dangerouslySetInnerHTML={{ __html: processedLine }}></p>
                  )
                }
              })}
            </div>
          </article>
        </div>
      </main>
    </div>
  )
}
