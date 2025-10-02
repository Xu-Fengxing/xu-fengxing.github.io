export function MBTISection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">关于我的性格</h2>
          <p className="text-muted-foreground">了解我的MBTI人格类型</p>
        </div>

        <div className="bg-secondary rounded-2xl p-8 md:p-12 border border-border">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-accent/10 flex items-center justify-center border-4 border-accent/20">
                <span className="text-4xl font-bold text-accent">ISTP</span>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-3">ISTP - 鉴赏家</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                善于观察和分析，喜欢动手实践。对技术和工具有天然的兴趣，
                擅长解决实际问题。独立自主，灵活应变，追求效率和实用性。
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">实践者</span>
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">问题解决者</span>
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">技术爱好者</span>
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">独立思考</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
