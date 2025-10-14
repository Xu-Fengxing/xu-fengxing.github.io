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
  Edit3
} from 'lucide-react'

interface MarkdownEditorProps {}

export default function MarkdownEditor({}: MarkdownEditorProps) {
  const [content, setContent] = useState(`# Markdown编辑器

欢迎使用Markdown可视化编辑器！

## 功能特性

- **实时预览**：左侧编辑，右侧预览
- **语法高亮**：支持Markdown语法高亮
- **工具栏**：快速插入常用格式
- **文件操作**：保存和下载功能

### 支持的语法

1. **标题**：使用 # 创建标题
2. **粗体**：使用 **文本** 创建粗体
3. **斜体**：使用 *文本* 创建斜体
4. **列表**：使用 - 或 1. 创建列表
5. **代码**：使用 \`代码\` 或 \`\`\`代码块\`\`\`
6. **链接**：使用 [文本](链接) 创建链接

### 示例代码块

\`\`\`typescript
function hello() {
  console.log("Hello, Markdown Editor!");
}
\`\`\`

> 这是一个引用块示例

---

开始编辑您的Markdown文档吧！`)

  const [showPreview, setShowPreview] = useState(true)
  const [fileName, setFileName] = useState('untitled.md')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // 工具栏功能
  const insertText = (before: string, after: string = '', placeholder: string = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    const textToInsert = selectedText || placeholder

    const newContent = 
      content.substring(0, start) + 
      before + textToInsert + after + 
      content.substring(end)

    setContent(newContent)

    // 设置光标位置
    setTimeout(() => {
      const newCursorPos = start + before.length + textToInsert.length
      textarea.focus()
      textarea.setSelectionRange(newCursorPos, newCursorPos)
    }, 0)
  }

  const toolbarActions = [
    {
      icon: Heading1,
      label: 'H1',
      action: () => insertText('# ', '', '标题')
    },
    {
      icon: Heading2,
      label: 'H2',
      action: () => insertText('## ', '', '标题')
    },
    {
      icon: Heading3,
      label: 'H3',
      action: () => insertText('### ', '', '标题')
    },
    {
      icon: Bold,
      label: '粗体',
      action: () => insertText('**', '**', '粗体文本')
    },
    {
      icon: Italic,
      label: '斜体',
      action: () => insertText('*', '*', '斜体文本')
    },
    {
      icon: List,
      label: '列表',
      action: () => insertText('- ', '', '列表项')
    },
    {
      icon: ListOrdered,
      label: '有序列表',
      action: () => insertText('1. ', '', '列表项')
    },
    {
      icon: Code,
      label: '代码',
      action: () => insertText('`', '`', '代码')
    },
    {
      icon: Quote,
      label: '引用',
      action: () => insertText('> ', '', '引用文本')
    },
    {
      icon: Link,
      label: '链接',
      action: () => insertText('[', '](url)', '链接文本')
    },
    {
      icon: Image,
      label: '图片',
      action: () => insertText('![', '](url)', '图片描述')
    }
  ]

  // 渲染Markdown预览
  const renderMarkdown = (text: string) => {
    const lines = text.split('\n')
    const elements: JSX.Element[] = []
    let i = 0

    while (i < lines.length) {
      const line = lines[i]

      // 处理代码块
      if (line.trim().startsWith('```')) {
        const language = line.trim().replace('```', '').trim()
        const codeLines: string[] = []
        i++

        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeLines.push(lines[i])
          i++
        }

        elements.push(
          <pre key={i} className="bg-muted/30 rounded-lg p-4 overflow-x-auto my-4">
            <code className="text-sm font-mono">{codeLines.join('\n')}</code>
          </pre>
        )
        i++
        continue
      }

      // 处理标题
      if (line.startsWith('# ')) {
        elements.push(<h1 key={i} className="text-2xl font-bold text-foreground mb-4 mt-6">{line.substring(2)}</h1>)
      } else if (line.startsWith('## ')) {
        elements.push(<h2 key={i} className="text-xl font-semibold text-foreground mb-3 mt-5">{line.substring(3)}</h2>)
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={i} className="text-lg font-medium text-foreground mb-2 mt-4">{line.substring(4)}</h3>)
      } else if (line.startsWith('#### ')) {
        elements.push(<h4 key={i} className="text-base font-medium text-foreground mb-2 mt-3">{line.substring(5)}</h4>)
      } else if (line.startsWith('- ')) {
        // 处理无序列表
        const listItems: JSX.Element[] = []
        while (i < lines.length && lines[i].startsWith('- ')) {
          listItems.push(
            <li key={i} className="text-foreground mb-1">
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
          listItems.push(
            <li key={i} className="text-foreground mb-1">
              {renderInlineMarkdown(content)}
            </li>
          )
          i++
        }
        elements.push(
          <ol key={`ol-${i}`} className="list-decimal list-inside mb-4 ml-4">
            {listItems}
          </ol>
        )
        continue
      } else if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={i} className="border-l-4 border-primary/30 pl-4 py-2 my-4 bg-muted/20">
            <p className="text-foreground italic">{renderInlineMarkdown(line.substring(2))}</p>
          </blockquote>
        )
      } else if (line.trim() === '') {
        elements.push(<br key={i} />)
      } else {
        elements.push(
          <p key={i} className="text-foreground mb-3 leading-relaxed">
            {renderInlineMarkdown(line)}
          </p>
        )
      }

      i++
    }

    return elements
  }

  // 渲染内联Markdown
  const renderInlineMarkdown = (text: string) => {
    // 处理内联代码
    if (text.includes('`')) {
      const parts = text.split('`')
      return parts.map((part, index) => 
        index % 2 === 1 ? (
          <code key={index} className="bg-muted/20 px-1 py-0.5 rounded text-sm font-mono text-muted-foreground">{part}</code>
        ) : (
          part
        )
      )
    }
    
    // 处理粗体和斜体
    let result = text
    result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    result = result.replace(/\*(.*?)\*/g, '<em>$1</em>')
    result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
    result = result.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-2" />')
    
    return <span dangerouslySetInnerHTML={{ __html: result }} />
  }

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
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? <Edit3 className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showPreview ? '仅编辑' : '预览'}
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
      <div className={`grid gap-6 ${showPreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        {/* 编辑区域 */}
        <Card className="p-0">
          <div className="p-4 border-b border-border">
            <h3 className="text-lg font-semibold">编辑器</h3>
          </div>
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-[600px] p-4 bg-background border-0 resize-none focus:outline-none font-mono text-sm leading-relaxed"
            placeholder="开始编写您的Markdown文档..."
          />
        </Card>

        {/* 预览区域 */}
        {showPreview && (
          <Card className="p-0">
            <div className="p-4 border-b border-border">
              <h3 className="text-lg font-semibold">预览</h3>
            </div>
            <div className="p-4 h-[600px] overflow-y-auto">
              <div className="prose prose-invert max-w-none">
                {renderMarkdown(content)}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
