"use client"

export function BackToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="mt-12 text-center">
      <button
        onClick={scrollToTop}
        className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-xl hover:bg-accent/90 transition-colors font-medium shadow-lg hover:shadow-xl"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        返回顶部
      </button>
    </div>
  )
}
