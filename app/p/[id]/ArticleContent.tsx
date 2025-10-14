import { getArticleById } from '@/lib/articles'
import { Sidebar } from '@/components/sidebar'
import { notFound } from 'next/navigation'
import CodeBlock from './CodeBlock'
import TableOfContents from './TableOfContents'

interface ArticleContentProps {
  articleId: string
}

// 渲染内联Markdown（处理粗体标记和内联代码）
const renderInlineMarkdown = (text: string) => {
  // 处理内联代码
  if (text.includes('`') && text.includes('`')) {
    const parts = text.split('`')
    return parts.map((part, index) => 
      index % 2 === 1 ? (
        <code key={index} className="bg-muted/20 px-1 py-0.5 rounded text-sm font-mono text-muted-foreground">{part}</code>
      ) : (
        part
      )
    )
  }
  // 处理粗体标记
  return text.replace(/\*\*(.*?)\*\*/g, '$1')
}

export default async function ArticleContent({ articleId }: ArticleContentProps) {
  const article = await getArticleById(articleId)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 lg:ml-64">
          <main className="px-6 lg:px-12 py-16 min-h-screen">
            <div className="max-w-6xl mx-auto w-full">
              {/* 返回按钮 */}
              <div className="mb-6">
                <a
                  href="/blog"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  返回
                </a>
              </div>
              
              {/* 文章标题和时间标签 */}
              <article className="prose prose-invert max-w-none">
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-foreground mb-3 ml-1">{article.title}</h1>
                  <div className="flex items-center gap-4 text-[13px] text-muted-foreground ml-1">
                    <span>{article.date}</span>
                    <div className="flex items-center gap-3">
                      <span 
                        className="px-1.5 py-1 text-xs font-normal leading-none text-muted-foreground rounded-sm"
                        style={{
                          background: 'rgba(107, 114, 128, 0.3)',
                          transform: 'translateY(-1px)'
                        }}
                      >
                        {article.category}
                      </span>
                      <div className="flex gap-3">
                        {article.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="text-[13px] text-muted-foreground"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* 主要内容区域 */}
              <div className="flex gap-4">
                {/* 文章正文内容 */}
                <div className="flex-1">
                  <div className="bg-card border border-border rounded-lg px-8 pt-2 pb-3">
                  <div className="prose prose-invert max-w-none text-[15px]">
                    {(() => {
                      const lines = article.content.split('\n')
                      const elements: JSX.Element[] = []
                      let i = 0
                      let codeBlockIndex = 0

                      while (i < lines.length) {
                        const line = lines[i]
                        
                        // 处理代码块开始
                        if (line.trim().startsWith('```')) {
                          const language = line.trim().replace('```', '').trim()
                          const codeLines: string[] = []
                          i++ // 跳过开始行
                          
                          // 收集代码行直到遇到结束标记
                          while (i < lines.length && !lines[i].trim().startsWith('```')) {
                            codeLines.push(lines[i])
                            i++
                          }
                          
                          // 创建代码块元素
                          const codeContent = codeLines.join('\n')
                          
                          elements.push(
                            <CodeBlock
                              key={`code-${codeBlockIndex}`}
                              language={language || 'code'}
                              code={codeContent}
                              codeBlockIndex={codeBlockIndex}
                            />
                          )
                          codeBlockIndex++
                          i++ // 跳过结束行
                          continue
                        }
                        
                        // 处理标题
                        if (line.startsWith('# ')) {
                          elements.push(<h1 key={i} id={`heading-${i}`} className="text-2xl font-bold text-foreground mb-4 mt-6">{line.substring(2)}</h1>)
                        } else if (line.startsWith('## ')) {
                          elements.push(<h2 key={i} id={`heading-${i}`} className="text-xl font-semibold text-foreground mb-5 mt-6">{line.substring(3)}</h2>)
                        } else if (line.startsWith('### ')) {
                          elements.push(<h3 key={i} id={`heading-${i}`} className="text-lg font-medium text-foreground mb-4 mt-5">{line.substring(4)}</h3>)
                        } else if (line.startsWith('#### ')) {
                          elements.push(<h4 key={i} id={`heading-${i}`} className="text-base font-medium text-foreground mb-3 mt-4">{line.substring(5)}</h4>)
                        } else if (line.startsWith('- ')) {
                          // 处理无序列表
                          const listItems: JSX.Element[] = []
                          while (i < lines.length && lines[i].startsWith('- ')) {
                            const nextLine = lines[i + 1]
                            const isNextLineListItem = nextLine && (nextLine.startsWith('- ') || /^\d+\.\s/.test(nextLine))
                            listItems.push(
                              <li key={i} className={`text-foreground ${isNextLineListItem ? 'mb-1' : 'mb-3'}`}>
                                {renderInlineMarkdown(lines[i].substring(2))}
                              </li>
                            )
                            i++
                          }
                          elements.push(
                            <ul key={`ul-${i}`} className="list-disc list-inside mb-4 ml-4">
                              {listItems}
                            </ul>
                          )
                          continue
                        } else if (/^\d+\.\s/.test(line)) {
                          // 处理有序列表
                          const listItems: JSX.Element[] = []
                          while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
                            const content = lines[i].replace(/^\d+\.\s/, '')
                            const nextLine = lines[i + 1]
                            
                            // 检查是否有缩进的子列表
                            let subListItems: JSX.Element[] = []
                            let j = i + 1
                            while (j < lines.length && lines[j].startsWith('   - ')) {
                              subListItems.push(
                                <li key={j} className="text-foreground mb-1">
                                  {renderInlineMarkdown(lines[j].substring(5))}
                                </li>
                              )
                              j++
                            }
                            
                            const listItem = (
                              <li key={i} className="text-foreground mb-3">
                                {renderInlineMarkdown(content)}
                                {subListItems.length > 0 && (
                                  <ul className="list-disc list-inside mt-2 ml-4">
                                    {subListItems}
                                  </ul>
                                )}
                              </li>
                            )
                            
                            listItems.push(listItem)
                            i = j - 1 // 跳过已处理的子列表项
                            i++
                          }
                          elements.push(
                            <ol key={`ol-${i}`} className="list-decimal list-inside mb-4 ml-4">
                              {listItems}
                            </ol>
                          )
                          continue
                        } else if (line.includes('`') && line.includes('`')) {
                          const parts = line.split('`')
                          elements.push(
                            <p key={i} className="text-foreground mb-3 pl-4">
                              {parts.map((part, partIndex) => 
                                partIndex % 2 === 1 ? (
                                  <code key={partIndex} className="bg-muted/20 px-1 py-0.5 rounded text-sm font-mono text-muted-foreground">{part}</code>
                                ) : (
                                  part
                                )
                              )}
                            </p>
                          )
                        } else if (line.trim() === '') {
                          elements.push(<br key={i} />)
                        } else {
                          // 检查下一行是否是标题，如果是则增加底部间距
                          const nextLine = lines[i + 1]
                          const isNextLineTitle = nextLine && (nextLine.startsWith('# ') || nextLine.startsWith('## ') || nextLine.startsWith('### '))
                          elements.push(<p key={i} className={`text-foreground pl-4 ${isNextLineTitle ? 'mb-4' : 'mb-3'}`}>{renderInlineMarkdown(line)}</p>)
                        }
                        
                        i++
                      }
                      
                      return elements
                    })()}
                  </div>
                  </div>
                </div>

                {/* 右侧目录 */}
                <TableOfContents content={article.content} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}