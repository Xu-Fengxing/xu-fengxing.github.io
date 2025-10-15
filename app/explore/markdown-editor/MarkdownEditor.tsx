"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Code, 
  Link, 
  Image, 
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Save,
  Download,
  Eye,
  Edit3,
  Type
} from 'lucide-react'

interface MarkdownEditorProps {}

export default function MarkdownEditor({}: MarkdownEditorProps) {
  const [content, setContent] = useState('')

  const [showSource, setShowSource] = useState(true)
  const [fileName, setFileName] = useState('untitled.md')
  const editorRef = useRef<HTMLDivElement>(null)
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // 初始化编辑器内容
  useEffect(() => {
    if (editorRef.current) {
      const html = content ? renderMarkdownToHtml(content) : '<p><br></p>'
      editorRef.current.innerHTML = html
    }
  }, [content])

  // 工具栏功能 - 可视化编辑
  const insertText = (before: string, after: string = '', placeholder: string = '') => {
    const editor = editorRef.current
    if (!editor) return

    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)
    const selectedText = selection.toString()
    const textToInsert = selectedText || placeholder

    // 创建新的文本节点
    const textNode = document.createTextNode(before + textToInsert + after)
    
    // 删除选中的内容
    range.deleteContents()
    
    // 插入新内容
    range.insertNode(textNode)

    // 设置光标位置
    const newRange = document.createRange()
    newRange.setStartAfter(textNode)
    newRange.collapse(true)
    selection.removeAllRanges()
    selection.addRange(newRange)

    // 更新内容状态
    updateContentFromEditor()
  }

  // 从编辑器获取内容并更新状态（防抖版本）
  const updateContentFromEditor = () => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current)
    }
    
    updateTimeoutRef.current = setTimeout(() => {
      const editor = editorRef.current
      if (!editor) return

      const markdownContent = convertHtmlToMarkdown(editor.innerHTML)
      setContent(markdownContent)
    }, 300) // 300ms 防抖
  }

  // 立即更新内容（用于工具栏操作）
  const updateContentImmediately = () => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current)
    }
    
    const editor = editorRef.current
    if (!editor) return

    const markdownContent = convertHtmlToMarkdown(editor.innerHTML)
    setContent(markdownContent)
  }

  // 简单的HTML到Markdown转换
  const convertHtmlToMarkdown = (html: string): string => {
    let markdown = html
      .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n')
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n')
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n')
      .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n')
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
      .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
      .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
      .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
      .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi, '![$2]($1)')
      .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, (match, content) => {
        return content.split('\n').map((line: string) => `> ${line.trim()}`).join('\n')
      })
      .replace(/<ul[^>]*>(.*?)<\/ul>/gis, (match, content) => {
        return content.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
      })
      .replace(/<ol[^>]*>(.*?)<\/ol>/gis, (match, content) => {
        let counter = 1
        return content.replace(/<li[^>]*>(.*?)<\/li>/gi, () => `${counter++}. $1\n`)
      })
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n')
      .replace(/<div[^>]*>(.*?)<\/div>/gi, '$1\n')
      .replace(/\n\s*\n/g, '\n\n')
      .trim()

    return markdown
  }

  // 改进的Markdown到HTML转换
  const renderMarkdownToHtml = (markdown: string): string => {
    if (!markdown.trim()) return '<p><br></p>'
    
    // 按行处理，保持正确的顺序
    const lines = markdown.split('\n')
    let html = ''
    let inCodeBlock = false
    let codeBlockContent = ''
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      
      // 处理代码块
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          // 结束代码块
          html += `<pre style="background: rgba(0,0,0,0.1); padding: 1rem; border-radius: 4px; overflow-x: auto; margin: 1rem 0;"><code style="font-family: monospace; white-space: pre; color: inherit;">${codeBlockContent}</code></pre>`
          codeBlockContent = ''
          inCodeBlock = false
        } else {
          // 开始代码块
          inCodeBlock = true
        }
        continue
      }
      
      if (inCodeBlock) {
        codeBlockContent += line + '\n'
        continue
      }
      
      // 处理标题
      if (line.startsWith('# ')) {
        html += `<h1 style="font-size: 2rem; font-weight: bold; margin: 1.5rem 0 1rem 0; line-height: 1.2;">${line.substring(2)}</h1>`
      } else if (line.startsWith('## ')) {
        html += `<h2 style="font-size: 1.5rem; font-weight: bold; margin: 1.2rem 0 0.8rem 0; line-height: 1.3;">${line.substring(3)}</h2>`
      } else if (line.startsWith('### ')) {
        html += `<h3 style="font-size: 1.25rem; font-weight: bold; margin: 1rem 0 0.6rem 0; line-height: 1.4;">${line.substring(4)}</h3>`
      } else if (line.startsWith('#### ')) {
        html += `<h4 style="font-size: 1.1rem; font-weight: bold; margin: 0.8rem 0 0.5rem 0; line-height: 1.4;">${line.substring(5)}</h4>`
      } else if (line.startsWith('> ')) {
        html += `<blockquote style="border-left: 4px solid #ccc; margin: 1rem 0; padding: 0.5rem 0 0.5rem 1rem; font-style: italic; color: #666; background: rgba(0,0,0,0.1);">${line.substring(2)}</blockquote>`
      } else if (line.startsWith('- ')) {
        html += `<li style="margin: 0.25rem 0; list-style-type: disc;">${line.substring(2)}</li>`
      } else if (/^\d+\. /.test(line)) {
        html += `<li style="margin: 0.25rem 0; list-style-type: decimal;">${line.replace(/^\d+\. /, '')}</li>`
      } else if (line.trim() === '') {
        html += '<br>'
      } else {
        // 处理段落内容
        let processedLine = line
          .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: bold;">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em style="font-style: italic;">$1</em>')
          .replace(/`(.*?)`/g, '<code style="background: rgba(0,0,0,0.1); padding: 0.2rem 0.4rem; border-radius: 3px; font-family: monospace; font-size: 0.9em; color: inherit;">$1</code>')
          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #0066cc; text-decoration: underline;">$1</a>')
          .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto; border-radius: 8px; margin: 0.5rem 0;" />')
        
        html += `<p style="margin: 0.5rem 0; line-height: 1.6;">${processedLine}</p>`
      }
    }
    
    // 包装列表项
    html = html.replace(/(<li[^>]*>.*?<\/li>)/gs, '<ul style="margin: 1rem 0; padding-left: 2rem;">$1</ul>')
    
    return html || '<p><br></p>'
  }

  // 可视化编辑的工具栏功能
  const formatText = (command: string, value?: string) => {
    const editor = editorRef.current
    if (!editor) return

    editor.focus()
    document.execCommand(command, false, value)
    updateContentImmediately()
  }

  const toolbarActions = [
    {
      icon: Heading1,
      label: 'H1',
      action: () => formatText('formatBlock', 'h1')
    },
    {
      icon: Heading2,
      label: 'H2',
      action: () => formatText('formatBlock', 'h2')
    },
    {
      icon: Heading3,
      label: 'H3',
      action: () => formatText('formatBlock', 'h3')
    },
    {
      icon: Bold,
      label: '粗体',
      action: () => formatText('bold')
    },
    {
      icon: Italic,
      label: '斜体',
      action: () => formatText('italic')
    },
    {
      icon: List,
      label: '列表',
      action: () => formatText('insertUnorderedList')
    },
    {
      icon: ListOrdered,
      label: '有序列表',
      action: () => formatText('insertOrderedList')
    },
    {
      icon: Code,
      label: '代码',
      action: () => {
        const editor = editorRef.current
        if (!editor) return

        editor.focus()
        const selection = window.getSelection()
        if (selection && selection.toString()) {
          const range = selection.getRangeAt(0)
          const code = document.createElement('code')
          code.style.background = 'rgba(0,0,0,0.1)'
          code.style.padding = '0.2rem 0.4rem'
          code.style.borderRadius = '3px'
          code.style.fontFamily = 'monospace'
          code.style.color = 'inherit'
          code.textContent = selection.toString()
          range.deleteContents()
          range.insertNode(code)
          updateContentImmediately()
        } else {
          // 如果没有选中文本，插入代码标记
          document.execCommand('insertText', false, '`代码`')
          updateContentImmediately()
        }
      }
    },
    {
      icon: Quote,
      label: '引用',
      action: () => formatText('formatBlock', 'blockquote')
    },
    {
      icon: Link,
      label: '链接',
      action: () => {
        const url = prompt('请输入链接地址:')
        if (url) {
          formatText('createLink', url)
        }
      }
    },
    {
      icon: Image,
      label: '图片',
      action: () => {
        const url = prompt('请输入图片地址:')
        const alt = prompt('请输入图片描述:')
        if (url) {
          const img = document.createElement('img')
          img.src = url
          img.alt = alt || ''
          img.className = 'max-w-full h-auto rounded-lg my-2'
          
          const selection = window.getSelection()
          if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0)
            range.deleteContents()
            range.insertNode(img)
            updateContentImmediately()
          }
        }
      }
    },
    {
      icon: Type,
      label: '普通文本',
      action: () => {
        const editor = editorRef.current
        if (!editor) return

        editor.focus()
        // 清除所有格式，回归普通文本
        document.execCommand('removeFormat', false)
        updateContentImmediately()
      }
    }
  ]


  // 保存文件
  const saveFile = () => {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* 工具栏 */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="px-3 py-1 text-sm bg-muted border border-border rounded-md focus:outline-none focus:ring-0 focus:border-border"
              placeholder="文件名"
            />
            <span className="text-sm text-muted-foreground">.md</span>
          </div>
          
          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSource(!showSource)}
            >
              {showSource ? <Edit3 className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showSource ? '仅编辑' : '源代码'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={saveFile}
            >
              <Download className="w-4 h-4 mr-2" />
              下载
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {toolbarActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={action.action}
              className="h-8"
            >
              <action.icon className="w-4 h-4 mr-1" />
              {action.label}
            </Button>
          ))}
        </div>
      </Card>

      {/* 编辑器区域 */}
      <div className={`grid gap-6 ${showSource ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        {/* 可视化编辑区域 */}
        <Card className="p-0">
          <div className="p-4 border-b border-border">
            <h3 className="text-lg font-semibold">可视化编辑器</h3>
          </div>
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={updateContentFromEditor}
            className="w-full h-[600px] p-4 bg-background border-0 resize-none focus:outline-none text-sm leading-relaxed overflow-y-auto"
            style={{ 
              minHeight: '600px',
              wordWrap: 'break-word',
              overflowWrap: 'break-word'
            }}
          />
        </Card>

        {/* 源代码预览区域 */}
        {showSource && (
          <Card className="p-0">
            <div className="p-4 border-b border-border">
              <h3 className="text-lg font-semibold">Markdown源代码</h3>
            </div>
            <div className="p-4 h-[600px] overflow-y-auto">
              <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
                {content}
              </pre>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
