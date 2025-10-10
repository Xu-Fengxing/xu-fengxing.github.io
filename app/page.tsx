import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { HeroSection } from "@/components/hero-section"
import { BlogGrid } from "@/components/blog-grid"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <HeroSection />
          <BlogGrid />
          <Footer />
        </main>
      </div>
    </div>
  )
}
