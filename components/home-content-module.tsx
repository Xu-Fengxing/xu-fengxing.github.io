import { BlogGrid } from "@/components/blog-grid"
import { Footer } from "@/components/footer"

interface HomeContentModuleProps {
  onScrollUp?: () => void
}

export async function HomeContentModule({ onScrollUp }: HomeContentModuleProps) {
  return (
    <div id="content" className="h-full bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <BlogGrid />
      </div>
    </div>
  )
}
