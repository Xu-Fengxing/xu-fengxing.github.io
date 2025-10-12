import { Sidebar } from "@/components/sidebar"
import { SwipeContainer } from "@/components/swipe-container"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 lg:ml-64">
          <SwipeContainer />
        </div>
      </div>
    </div>
  )
}
