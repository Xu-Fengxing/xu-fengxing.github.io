export function HeroSection() {
  return (
    <section className="relative lg:ml-64 pt-14 px-6 lg:px-12 py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-primary text-sm font-medium tracking-wide uppercase">个人空间</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.1]">
              风行Justin，
              <br />
              <span className="text-primary">个人空间</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl text-pretty">
              欢迎来到我的个人空间！这里记录着我的设计思考、技术实践和生活感悟。用极简的视角，分享创作的灵感。
            </p>

            <div className="flex items-center gap-4 pt-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">向下滚动探索更多</span>
            </div>
          </div>

          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                <img 
                  src="/avatar.jpg" 
                  alt="风行Justin头像" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
