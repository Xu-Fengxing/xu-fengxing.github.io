"use client"

import { ExternalLink } from "lucide-react"
import { useState, useEffect } from "react"

export function MBTISection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [startX, setStartX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX)
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    e.preventDefault()
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return
    
    const endX = e.changedTouches[0].clientX
    const diff = startX - endX
    
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentSlide < 1) {
        setCurrentSlide(currentSlide + 1)
      } else if (diff < 0 && currentSlide > 0) {
        setCurrentSlide(currentSlide - 1)
      }
    }
    
    setIsDragging(false)
  }

  return (
    <section className="h-screen flex items-center justify-center px-6 py-8 lg:px-8 relative">
      {/* 我的人格标签 - 移动端居中，桌面端左上角 */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0 z-30">
        <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white tracking-tight text-center lg:text-left" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif' }}>
          我的人格
        </h2>
        <div className="hidden lg:block w-20 h-0.5 bg-gradient-to-r from-accent via-accent/60 to-transparent mt-2"></div>
      </div>
      
      <div className="max-w-5xl w-full h-full flex items-center justify-center">
        {/* 主要内容区域 */}
        <div className="relative bg-gradient-to-br from-background to-secondary/20 rounded-3xl p-4 md:p-8 border border-border/50 overflow-hidden shadow-lg w-full max-h-[80vh] md:max-h-[85vh] flex flex-col animate-in fade-in-0 slide-in-from-bottom-4 duration-700" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
          
          {/* 背景装饰 */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-accent/10 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/5 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10 flex-1 flex flex-col">
            {/* 移动端滑动容器 */}
            <div className="lg:hidden flex-1 overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* 左侧：人物画像和基本信息 */}
                <div className="w-full flex-shrink-0 flex flex-col justify-center text-center px-2">
                  <div className="space-y-4">
                    {/* 人物画像 */}
                    <div className="relative inline-block">
                      <a 
                        href="https://www.16personalities.com/ch/档案/e1a113d589c3c" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block group"
                      >
                        <img 
                          src="/virtuoso.svg" 
                          alt="ISTP 鉴赏家" 
                          className="w-24 h-24 object-cover cursor-pointer transition-all duration-300 group-hover:opacity-90 group-hover:brightness-105 mx-auto"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallbackElement = e.currentTarget.nextElementSibling as HTMLElement;
                            if (fallbackElement) fallbackElement.style.display = 'block';
                          }}
                        />
                        <svg 
                          className="w-24 h-24 text-gray-400 hidden mx-auto" 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7C14.1 7 13.3 7.6 13.1 8.4L12 12L10.9 8.4C10.7 7.6 9.9 7 9 7H3V9H8.2L10.2 15.8C10.4 16.6 11.2 17.2 12 17.2S13.6 16.6 13.8 15.8L15.8 9H21Z"/>
                        </svg>
                      </a>
                    </div>

                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        鉴赏家
                      </h1>
                      <p className="text-lg text-yellow-600 dark:text-yellow-400 font-medium mb-4">
                        ISTP-T
                      </p>
                      <div className="max-w-sm mx-auto">
                        <h2 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-3">
                          我喜欢用双手创造，用头脑思考。
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                          鉴赏家是天生的创造者，善于在理论与实践之间找到平衡。他们具有天然的好奇心，
                          喜欢了解事物的运作原理，并且能够灵活应对各种挑战。
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 核心特征标签 */}
                  <div className="flex flex-wrap gap-2 justify-center mt-4">
                    <div className="inline-flex items-center px-3 py-1.5 bg-gray-50 dark:bg-gray-800/50 rounded-full border border-gray-200 dark:border-gray-700">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">#实用主义</span>
                    </div>
                    <div className="inline-flex items-center px-3 py-1.5 bg-gray-50 dark:bg-gray-800/50 rounded-full border border-gray-200 dark:border-gray-700">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">#好奇心强</span>
                    </div>
                    <div className="inline-flex items-center px-3 py-1.5 bg-gray-50 dark:bg-gray-800/50 rounded-full border border-gray-200 dark:border-gray-700">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">#适应性强</span>
                    </div>
                    <div className="inline-flex items-center px-3 py-1.5 bg-gray-50 dark:bg-gray-800/50 rounded-full border border-gray-200 dark:border-gray-700">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">#解决问题</span>
                    </div>
                  </div>
                </div>

                {/* 右侧：MBTI五维度数据和特征 */}
                <div className="w-full flex-shrink-0 flex flex-col justify-center px-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-4">性格维度分析</h3>
                  
                  <div className="space-y-4">
                    {/* 内向 vs 外向 */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-medium text-gray-600 dark:text-gray-400">
                        <span className="w-20 text-left">外向</span>
                        <span className="text-sm font-bold" style={{ color: '#4298B4' }}>82% 内向</span>
                        <span className="w-20 text-right">内向</span>
                      </div>
                      <div className="relative">
                        <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="absolute top-0 right-0 h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: '82%', backgroundColor: '#4298B4' }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* 求真务实 vs 天马行空 */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-medium text-gray-600 dark:text-gray-400">
                        <span className="w-20 text-left">天马行空</span>
                        <span className="text-sm font-bold" style={{ color: '#E4AE3A' }}>72% 求真务实</span>
                        <span className="w-20 text-right">求真务实</span>
                      </div>
                      <div className="relative">
                        <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="absolute top-0 right-0 h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: '72%', backgroundColor: '#E4AE3A' }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* 理性思考 vs 情感细腻 */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-medium text-gray-600 dark:text-gray-400">
                        <span className="w-20 text-left">理性思考</span>
                        <span className="text-sm font-bold" style={{ color: '#33A474' }}>53% 理性思考</span>
                        <span className="w-20 text-right">情感细腻</span>
                      </div>
                      <div className="relative">
                        <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: '53%', backgroundColor: '#33A474' }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* 随机应变 vs 运筹帷幄 */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-medium text-gray-600 dark:text-gray-400">
                        <span className="w-20 text-left">运筹帷幄</span>
                        <span className="text-sm font-bold" style={{ color: '#88619A' }}>65% 随机应变</span>
                        <span className="w-20 text-right">随机应变</span>
                      </div>
                      <div className="relative">
                        <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="absolute top-0 right-0 h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: '65%', backgroundColor: '#88619A' }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* 情绪易波动 vs 自信果断 */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-medium text-gray-600 dark:text-gray-400">
                        <span className="w-20 text-left">自信果断</span>
                        <span className="text-sm font-bold" style={{ color: '#F25E62' }}>56% 情绪易波动</span>
                        <span className="w-20 text-right">情绪易波动</span>
                      </div>
                      <div className="relative">
                        <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="absolute top-0 right-0 h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: '56%', backgroundColor: '#F25E62' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 人格统计 */}
                  <div className="space-y-2 mt-6">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white text-center">人格统计</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/60 dark:to-gray-700/60 rounded-xl border border-gray-200/50 dark:border-gray-600/30">
                        <div className="text-lg font-bold text-accent">5-6%</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">人口占比</div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/60 dark:to-gray-700/60 rounded-xl border border-gray-200/50 dark:border-gray-600/30">
                        <div className="text-lg font-bold text-accent">SP</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">探险家组</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 桌面端布局 */}
            <div className="hidden lg:grid lg:grid-cols-7 gap-6 lg:gap-8 flex-1 items-start">
              {/* 左侧：人物画像和基本信息 */}
              <div className="lg:col-span-3 text-center lg:text-left flex flex-col h-full">
                <div className="space-y-4">
                  {/* 人物画像 */}
                  <div className="relative inline-block -ml-2">
                    <a 
                      href="https://www.16personalities.com/ch/档案/e1a113d589c3c" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <img 
                        src="/virtuoso.svg" 
                        alt="ISTP 鉴赏家" 
                        className="w-32 h-32 lg:w-40 lg:h-40 object-cover cursor-pointer transition-all duration-300 group-hover:opacity-90 group-hover:brightness-105"
                        onError={(e) => {
                          // 如果图片加载失败，显示备用图标
                          e.currentTarget.style.display = 'none';
                          const fallbackElement = e.currentTarget.nextElementSibling as HTMLElement;
                          if (fallbackElement) fallbackElement.style.display = 'block';
                        }}
                      />
                      <svg 
                        className="w-32 h-32 lg:w-40 lg:h-40 text-gray-400 hidden" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7C14.1 7 13.3 7.6 13.1 8.4L12 12L10.9 8.4C10.7 7.6 9.9 7 9 7H3V9H8.2L10.2 15.8C10.4 16.6 11.2 17.2 12 17.2S13.6 16.6 13.8 15.8L15.8 9H21Z"/>
                      </svg>
                    </a>
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
                        我喜欢用双手创造，用头脑思考。
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm lg:text-base">
                        鉴赏家是天生的创造者，善于在理论与实践之间找到平衡。他们具有天然的好奇心，
                        喜欢了解事物的运作原理，并且能够灵活应对各种挑战。
                      </p>
                    </div>
                  </div>
                </div>

                {/* 核心特征标签 - 推到底部 */}
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start mt-auto pt-4">
                  <div className="inline-flex items-center px-3 py-1.5 bg-gray-50 dark:bg-gray-800/50 rounded-full border border-gray-200 dark:border-gray-700 transition-all duration-150 hover:bg-gray-100 dark:hover:bg-gray-700/55 hover:border-gray-300 dark:hover:border-gray-600">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">#实用主义</span>
                  </div>
                  <div className="inline-flex items-center px-3 py-1.5 bg-gray-50 dark:bg-gray-800/50 rounded-full border border-gray-200 dark:border-gray-700 transition-all duration-150 hover:bg-gray-100 dark:hover:bg-gray-700/55 hover:border-gray-300 dark:hover:border-gray-600">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">#好奇心强</span>
                  </div>
                  <div className="inline-flex items-center px-3 py-1.5 bg-gray-50 dark:bg-gray-800/50 rounded-full border border-gray-200 dark:border-gray-700 transition-all duration-150 hover:bg-gray-100 dark:hover:bg-gray-700/55 hover:border-gray-300 dark:hover:border-gray-600">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">#适应性强</span>
                  </div>
                  <div className="inline-flex items-center px-3 py-1.5 bg-gray-50 dark:bg-gray-800/50 rounded-full border border-gray-200 dark:border-gray-700 transition-all duration-150 hover:bg-gray-100 dark:hover:bg-gray-700/55 hover:border-gray-300 dark:hover:border-gray-600">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">#解决问题</span>
                  </div>
                </div>
              </div>

              {/* 右侧：MBTI五维度数据和特征 */}
              <div className="lg:col-span-4 flex flex-col h-full">
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white text-center lg:text-left mb-4">性格维度分析</h3>
                
                <div className="flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* 内向 vs 外向 */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-medium text-gray-600 dark:text-gray-400">
                        <span className="w-20 text-left">外向</span>
                        <span className="text-sm font-bold" style={{ color: '#4298B4' }}>82% 内向</span>
                        <span className="w-20 text-right">内向</span>
                      </div>
                      <div className="relative">
                        <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="absolute top-0 right-0 h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: '82%', backgroundColor: '#4298B4' }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* 求真务实 vs 天马行空 */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-medium text-gray-600 dark:text-gray-400">
                        <span className="w-20 text-left">天马行空</span>
                        <span className="text-sm font-bold" style={{ color: '#E4AE3A' }}>72% 求真务实</span>
                        <span className="w-20 text-right">求真务实</span>
                      </div>
                      <div className="relative">
                        <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="absolute top-0 right-0 h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: '72%', backgroundColor: '#E4AE3A' }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* 理性思考 vs 情感细腻 */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-medium text-gray-600 dark:text-gray-400">
                        <span className="w-20 text-left">理性思考</span>
                        <span className="text-sm font-bold" style={{ color: '#33A474' }}>53% 理性思考</span>
                        <span className="w-20 text-right">情感细腻</span>
                      </div>
                      <div className="relative">
                        <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: '53%', backgroundColor: '#33A474' }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* 随机应变 vs 运筹帷幄 */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-medium text-gray-600 dark:text-gray-400">
                        <span className="w-20 text-left">运筹帷幄</span>
                        <span className="text-sm font-bold" style={{ color: '#88619A' }}>65% 随机应变</span>
                        <span className="w-20 text-right">随机应变</span>
                      </div>
                      <div className="relative">
                        <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="absolute top-0 right-0 h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: '65%', backgroundColor: '#88619A' }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* 情绪易波动 vs 自信果断 */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-medium text-gray-600 dark:text-gray-400">
                        <span className="w-20 text-left">自信果断</span>
                        <span className="text-sm font-bold" style={{ color: '#F25E62' }}>56% 情绪易波动</span>
                        <span className="w-20 text-right">情绪易波动</span>
                      </div>
                      <div className="relative">
                        <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="absolute top-0 right-0 h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: '56%', backgroundColor: '#F25E62' }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 人格统计 - 与左侧标签底部对齐 */}
                  <div className="space-y-2 mt-3">
                    <h3 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white text-center lg:text-left">人格统计</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-4 lg:p-5 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/60 dark:to-gray-700/60 rounded-xl border border-gray-200/50 dark:border-gray-600/30 shadow-sm transition-all duration-150 hover:bg-gradient-to-br hover:from-gray-100 hover:to-gray-150 dark:hover:from-gray-700/65 dark:hover:to-gray-600/65">
                        <div className="text-xl lg:text-2xl font-bold text-accent">5-6%</div>
                        <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">人口占比</div>
                      </div>
                      <div className="text-center p-4 lg:p-5 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/60 dark:to-gray-700/60 rounded-xl border border-gray-200/50 dark:border-gray-600/30 shadow-sm transition-all duration-150 hover:bg-gradient-to-br hover:from-gray-100 hover:to-gray-150 dark:hover:from-gray-700/65 dark:hover:to-gray-600/65">
                        <div className="text-xl lg:text-2xl font-bold text-accent">SP</div>
                        <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">探险家组</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 移动端圆点指示器 */}
            <div className="lg:hidden flex justify-center space-x-2 mt-4">
              <button
                onClick={() => setCurrentSlide(0)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  currentSlide === 0 ? 'bg-accent w-6' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
              <button
                onClick={() => setCurrentSlide(1)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  currentSlide === 1 ? 'bg-accent w-6' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            </div>
          </div>
        </div>
        
        {/* MBTI跳转按钮 - 集成到卡片内 */}
            <div className="absolute bottom-6 right-6 z-20">
          <a 
            href="https://www.16personalities.com/ch" 
            target="_blank" 
            rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent text-accent-foreground rounded-full hover:bg-accent/90 transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105"
          >
            <ExternalLink className="w-4 h-4" />
            测测你的MBTI
          </a>
        </div>
      </div>
    </section>
  )
}
