"use client"

import { Github, Twitter, Mail, Rss } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SocialLinks() {
  return (
    <div className="flex items-center justify-center gap-6 pb-2">
      <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-primary/10">
        <Github className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-primary/10">
        <Twitter className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-primary/10">
        <Mail className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="h-10 w-10 hover:bg-primary/10">
        <Rss className="h-5 w-5" />
      </Button>
    </div>
  )
}
