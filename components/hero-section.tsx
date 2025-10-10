export function HeroSection() {
  return (
    <section className="relative lg:ml-64 pt-14 px-6 lg:px-12 py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-primary text-sm font-medium tracking-wide uppercase">Designer's Blog</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.1]">
              主用极简的视角，
              <br />
              <span className="text-primary">记录设计与思考</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl text-pretty">
              探索设计的本质，分享创作的灵感。在这里记录关于用户体验、 视觉设计和前端开发的思考与实践。
            </p>

            <div className="flex items-center gap-4 pt-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">向下滚动探索更多</span>
            </div>
          </div>

          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Easel stand */}
                <path
                  d="M120 350 L120 150 M280 350 L280 150 M200 380 L200 150"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-foreground"
                />

                {/* Canvas frame */}
                <rect
                  x="80"
                  y="80"
                  width="240"
                  height="180"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  className="text-foreground"
                  rx="4"
                />

                {/* Pencil */}
                <g transform="translate(260, 120) rotate(45)">
                  <rect x="0" y="0" width="12" height="80" fill="currentColor" className="text-foreground" rx="2" />
                  <path d="M 6 80 L 0 95 L 12 95 Z" fill="currentColor" className="text-foreground" />
                </g>

                {/* Blue accent dot */}
                <circle cx="200" cy="170" r="16" fill="currentColor" className="text-primary" />

                {/* Top holder */}
                <rect
                  x="180"
                  y="60"
                  width="40"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  className="text-foreground"
                  rx="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
