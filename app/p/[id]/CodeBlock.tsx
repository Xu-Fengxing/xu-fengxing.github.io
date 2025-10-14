"use client"

import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface CodeBlockProps {
  language: string
  code: string
  codeBlockIndex: number
}

export default function CodeBlock({ language, code, codeBlockIndex }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, 2000)
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }

  return (
    <div className="my-6">
      <div className="bg-muted/50 rounded-t-lg px-4 py-2 text-sm text-muted-foreground border-b border-border flex items-center justify-between">
        <span>{language || 'code'}</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {isCopied ? (
            <>
              <Check className="h-3 w-3" />
              <span>已复制</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>复制</span>
            </>
          )}
        </button>
      </div>
      <pre className="bg-muted/30 rounded-b-lg p-4 overflow-x-auto border border-border">
        <code className="text-sm font-mono text-foreground">
          {code}
        </code>
      </pre>
    </div>
  )
}
