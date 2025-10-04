"use client"

export function BackToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="mt-12 text-center">
      <button
        onClick={scrollToTop}
        className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-3xl hover:bg-accent/90 transition-colors font-medium shadow-lg hover:shadow-xl"
      >
        <span className="text-lg font-bold">^</span>
        返回顶部
      </button>
    </div>
  )
}
