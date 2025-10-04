import { Sidebar } from "@/components/sidebar"
import { TableOfContents } from "@/components/table-of-contents"
import { BackToTop } from "@/components/back-to-top"
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
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex gap-12">
            {/* 文章内容区域 */}
            <div className="flex-1 max-w-4xl ml-8">
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
              <p className="text-lg text-muted-foreground mb-4">{post.excerpt}</p>
              
              {/* 字数统计和阅读时间 */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>{post.content.length} 字</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{Math.ceil(post.content.length / 300)} 分钟阅读</span>
                </div>
              </div>
            </header>


            <div className="prose prose-gray dark:prose-invert max-w-none">
              {post.content.split('\n').map((line, index) => {
                if (line.startsWith('# ')) {
                  // 跳过h1标题，因为已经在header中显示了
                  return null
                } else if (line.startsWith('## ')) {
                  return (
                    <div key={index} className="mb-1">
                      <h2 id={`heading-${index}`} className="text-2xl font-bold text-gray-900 dark:text-white mb-0">{line.slice(3)}</h2>
                      <hr className="border-0 h-[0.5px] bg-gray-300 dark:bg-gray-600 mt-1" />
                    </div>
                  )
                } else if (line.startsWith('### ')) {
                  return (
                    <div key={index} className="mb-1">
                      <h3 id={`heading-${index}`} className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-0">
                        {line.slice(4)}
                      </h3>
                    </div>
                  )
                } else if (line.startsWith('#### ')) {
                  return (
                    <div key={index} className="mb-1">
                      <h4 id={`heading-${index}`} className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">
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
                  // 跳过文章内容中的返回顶部按钮，因为页面底部已经有了
                  return null
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
            
            {/* 版权信息卡片 */}
            <div className="mt-12 p-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{post.title}</h3>
                  <a 
                    href={`https://forthing.top/blog/${post.id}`}
                    className="text-accent hover:text-accent/80 transition-colors text-sm mb-3 block"
                  >
                    https://forthing.top/blog/{post.id}
                  </a>
                  
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">作者</span>
                      <span className="text-foreground">风行Justin</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">发布于</span>
                      <span className="text-foreground">{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">许可协议</span>
                      <a 
                        href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-accent/80 transition-colors"
                      >
                        CC BY-NC-SA 4.0
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* CC 标志 */}
                <div className="ml-6 flex-shrink-0">
                  <div className="w-20 h-20 flex items-center justify-center bg-accent/10 rounded-lg">
                    <div className="text-3xl font-bold text-accent/60">CC</div>
                  </div>
                </div>
              </div>
            </div>
          </article>
            </div>
            
            {/* 目录区域 */}
            <div className="hidden lg:block w-72 flex-shrink-0">
              <TableOfContents content={post.content} />
            </div>
          </div>
          
          {/* 返回顶部按钮 */}
          <BackToTop />
        </div>
      </main>
    </div>
  )
}
