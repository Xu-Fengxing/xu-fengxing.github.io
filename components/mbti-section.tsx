import { ExternalLink } from "lucide-react"

export function MBTISection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative lg:px-8">
      <div className="max-w-5xl w-full">
        {/* 主要内容区域 */}
        <div className="relative bg-gradient-to-br from-background to-secondary/20 rounded-3xl p-6 md:p-8 border border-border/50 overflow-hidden shadow-lg">
          {/* 背景装饰 */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-accent/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/5 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
              {/* 左侧：人物画像和基本信息 */}
              <div className="text-center lg:text-left space-y-3 lg:space-y-4">
                {/* 人物画像 */}
                <div className="relative inline-block">
                  <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-accent/80 to-accent rounded-2xl flex items-center justify-center shadow-2xl shadow-accent/25">
                    <svg className="w-20 h-20 lg:w-24 lg:h-24 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7C14.1 7 13.3 7.6 13.1 8.4L12 12L10.9 8.4C10.7 7.6 9.9 7 9 7H3V9H8.2L10.2 15.8C10.4 16.6 11.2 17.2 12 17.2S13.6 16.6 13.8 15.8L15.8 9H21Z"/>
                    </svg>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">🔧</span>
                  </div>
                </div>

                <div>
                  <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                    鉴赏家
                  </h1>
                  <p className="text-lg lg:text-xl text-yellow-600 dark:text-yellow-400 font-medium mb-4">
                    ISTP-T
                  </p>
                  <div className="max-w-md lg:max-w-none">
                    <h2 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-3">
                      "我喜欢用双手创造，用头脑思考。"
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm lg:text-base">
                      鉴赏家是天生的创造者，善于在理论与实践之间找到平衡。他们具有天然的好奇心，
                      喜欢了解事物的运作原理，并且能够灵活应对各种挑战。
                    </p>
                  </div>
                </div>

                {/* 核心特征标签 - 移到底部 */}
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  <span className="px-3 py-1.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-full text-xs lg:text-sm font-medium">
                    🛠️ 实用主义
                  </span>
                  <span className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs lg:text-sm font-medium">
                    🔍 好奇心强
                  </span>
                  <span className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs lg:text-sm font-medium">
                    ⚡ 适应性强
                  </span>
                  <span className="px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs lg:text-sm font-medium">
                    🎯 解决问题
                  </span>
                </div>
              </div>

              {/* 右侧：MBTI五维度数据和特征 */}
              <div className="space-y-3 lg:space-y-4">
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white text-center lg:text-left">性格维度分析</h3>
                
                <div className="space-y-3 lg:space-y-4">
                  {/* 内向 vs 外向 */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs lg:text-sm font-medium">
                      <span className="text-gray-600 dark:text-gray-400">外向</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">82% 内向</span>
                      <span className="text-gray-600 dark:text-gray-400">内向</span>
                    </div>
                    <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-blue-500"></div>
                      <div 
                        className="absolute top-0 right-0 h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: '82%' }}
                      ></div>
                      <div className="absolute top-1/2 left-[18%] w-3 h-3 bg-white rounded-full shadow-sm transform -translate-y-1/2 -translate-x-1/2 border-2 border-blue-500"></div>
                    </div>
                  </div>

                  {/* 求真务实 vs 天马行空 */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs lg:text-sm font-medium">
                      <span className="text-gray-600 dark:text-gray-400">天马行空</span>
                      <span className="text-orange-600 dark:text-orange-400 font-bold">72% 求真务实</span>
                      <span className="text-gray-600 dark:text-gray-400">求真务实</span>
                    </div>
                    <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-orange-500"></div>
                      <div 
                        className="absolute top-0 right-0 h-full bg-orange-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: '72%' }}
                      ></div>
                      <div className="absolute top-1/2 left-[28%] w-3 h-3 bg-white rounded-full shadow-sm transform -translate-y-1/2 -translate-x-1/2 border-2 border-orange-500"></div>
                    </div>
                  </div>

                  {/* 理性思考 vs 情感细腻 */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs lg:text-sm font-medium">
                      <span className="text-gray-600 dark:text-gray-400">理性思考</span>
                      <span className="text-green-600 dark:text-green-400 font-bold">53% 理性思考</span>
                      <span className="text-gray-600 dark:text-gray-400">情感细腻</span>
                    </div>
                    <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-gray-300"></div>
                      <div 
                        className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: '53%' }}
                      ></div>
                      <div className="absolute top-1/2 left-[53%] w-3 h-3 bg-white rounded-full shadow-sm transform -translate-y-1/2 -translate-x-1/2 border-2 border-green-500"></div>
                    </div>
                  </div>

                  {/* 随机应变 vs 运筹帷幄 */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs lg:text-sm font-medium">
                      <span className="text-gray-600 dark:text-gray-400">运筹帷幄</span>
                      <span className="text-purple-600 dark:text-purple-400 font-bold">65% 随机应变</span>
                      <span className="text-gray-600 dark:text-gray-400">随机应变</span>
                    </div>
                    <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-purple-500"></div>
                      <div 
                        className="absolute top-0 right-0 h-full bg-purple-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: '65%' }}
                      ></div>
                      <div className="absolute top-1/2 left-[35%] w-3 h-3 bg-white rounded-full shadow-sm transform -translate-y-1/2 -translate-x-1/2 border-2 border-purple-500"></div>
                    </div>
                  </div>

                  {/* 情绪易波动 vs 自信果断 */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs lg:text-sm font-medium">
                      <span className="text-gray-600 dark:text-gray-400">自信果断</span>
                      <span className="text-red-600 dark:text-red-400 font-bold">56% 情绪易波动</span>
                      <span className="text-gray-600 dark:text-gray-400">情绪易波动</span>
                    </div>
                    <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-red-500"></div>
                      <div 
                        className="absolute top-0 right-0 h-full bg-red-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: '56%' }}
                      ></div>
                      <div className="absolute top-1/2 left-[44%] w-3 h-3 bg-white rounded-full shadow-sm transform -translate-y-1/2 -translate-x-1/2 border-2 border-red-500"></div>
                    </div>
                  </div>
                </div>

                {/* 人格统计 */}
                <div className="space-y-2">
                  <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white text-center lg:text-left">人格统计</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 lg:p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                      <div className="text-xl lg:text-2xl font-bold text-accent">5-6%</div>
                      <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">人口占比</div>
                    </div>
                    <div className="text-center p-3 lg:p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl">
                      <div className="text-xl lg:text-2xl font-bold text-accent">SP</div>
                      <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">探险家组</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右下角测试引导 */}
        <div className="absolute bottom-8 right-8">
          <a
            href="https://www.16personalities.com/ch/free-personality-test"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-full font-medium shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all duration-300 hover:scale-105"
          >
            <span>测测你的MBTI</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  )
}
