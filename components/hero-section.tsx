export function HeroSection() {
  return (
    <section className="relative py-12 lg:py-16 overflow-hidden">
      <div className="px-6 sm:px-8 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid xl:grid-cols-2 gap-8 xl:gap-12 items-center">
            {/* 左侧文字内容 */}
            <div className="w-full xl:max-w-3xl">
              <div className="space-y-3 md:space-y-4 lg:space-y-6">
                <div className="inline-flex items-center gap-2 pl-1.5">
                  <div className="relative">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-2 h-2 bg-primary rounded-full animate-ping opacity-75" />
                  </div>
                  <span className="text-sm font-medium tracking-wide uppercase text-foreground">Justin&apos;s Blog</span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-balance leading-[1.2] md:leading-[1.3] text-left">
                  <span className="block">从想法到行动</span>
                  <span className="block text-primary">让每一步都更清晰</span>
                </h1>

                <p className="text-base md:text-lg text-muted-foreground leading-relaxed w-full max-w-[50vw] text-pretty text-left">
                  在这里，整理思路、记录尝试，把每一次探索和实践都化为成长的轨迹，让进步清晰可见。
                </p>
              </div>
            </div>

            {/* 右侧Windows窗口 */}
            <div className="hidden xl:block relative">
              <div 
                className="bg-card border border-border rounded-lg shadow-2xl overflow-hidden"
                style={{
                  transform: 'perspective(1000px) rotateY(-15deg) rotateX(5deg)',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* 窗口标题栏 */}
                <div className="bg-muted border-b border-border px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">forthing.top</span>
                  <div className="w-12"></div>
                </div>

                {/* 窗口内容 */}
                <div className="p-6 space-y-4 bg-background/50 backdrop-blur-sm">
                  <div className="space-y-2">
                    <div className="h-4 bg-primary/20 rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 pt-4">
                    <div className="h-20 bg-primary/10 rounded-lg border border-primary/20"></div>
                    <div className="h-20 bg-muted rounded-lg"></div>
                    <div className="h-20 bg-muted rounded-lg"></div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-4/5"></div>
                    <div className="h-3 bg-muted rounded w-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

