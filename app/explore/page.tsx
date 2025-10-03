"use client"

import { Sidebar } from "@/components/sidebar"
import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", name: "全部", icon: "🌐" },
    { id: "tech", name: "科技", icon: "💻" },
    { id: "design", name: "设计", icon: "🎨" },
    { id: "dev", name: "开发", icon: "⚡" },
    { id: "life", name: "生活", icon: "🌟" },
    { id: "travel", name: "旅行", icon: "✈️" },
    { id: "food", name: "美食", icon: "🍜" },
    { id: "music", name: "音乐", icon: "🎵" },
    { id: "photo", name: "摄影", icon: "📸" },
    { id: "book", name: "阅读", icon: "📚" },
  ]

  const communities = {
    all: [
      {
        name: "前端开发",
        description: "分享前端技术心得，讨论最新框架和工具",
        members: "12.5K",
        icon: "⚡",
        category: "开发"
      },
      {
        name: "UI设计",
        description: "探索界面设计趋势，分享设计作品",
        members: "8.2K",
        icon: "🎨",
        category: "设计"
      },
      {
        name: "摄影分享",
        description: "展示摄影作品，交流拍摄技巧",
        members: "15.3K",
        icon: "📸",
        category: "摄影"
      },
      {
        name: "旅行日记",
        description: "记录旅行足迹，分享旅行攻略",
        members: "6.8K",
        icon: "✈️",
        category: "旅行"
      },
      {
        name: "美食探索",
        description: "发现美食，分享烹饪心得",
        members: "9.1K",
        icon: "🍜",
        category: "美食"
      },
      {
        name: "读书笔记",
        description: "分享读书心得，推荐好书",
        members: "7.4K",
        icon: "📚",
        category: "阅读"
      }
    ],
    tech: [
      {
        name: "前端开发",
        description: "分享前端技术心得，讨论最新框架和工具",
        members: "12.5K",
        icon: "⚡",
        category: "开发"
      },
      {
        name: "AI探索",
        description: "探讨人工智能技术，分享AI工具使用心得",
        members: "18.7K",
        icon: "🤖",
        category: "科技"
      },
      {
        name: "开源项目",
        description: "分享开源项目，参与开源贡献",
        members: "11.2K",
        icon: "🔧",
        category: "开发"
      }
    ],
    design: [
      {
        name: "UI设计",
        description: "探索界面设计趋势，分享设计作品",
        members: "8.2K",
        icon: "🎨",
        category: "设计"
      },
      {
        name: "品牌设计",
        description: "讨论品牌视觉设计，分享设计案例",
        members: "5.6K",
        icon: "🎯",
        category: "设计"
      },
      {
        name: "插画艺术",
        description: "展示插画作品，交流创作技巧",
        members: "9.3K",
        icon: "🖌️",
        category: "设计"
      }
    ],
    dev: [
      {
        name: "前端开发",
        description: "分享前端技术心得，讨论最新框架和工具",
        members: "12.5K",
        icon: "⚡",
        category: "开发"
      },
      {
        name: "开源项目",
        description: "分享开源项目，参与开源贡献",
        members: "11.2K",
        icon: "🔧",
        category: "开发"
      },
      {
        name: "算法学习",
        description: "分享算法学习心得，讨论编程题解",
        members: "6.9K",
        icon: "🧮",
        category: "开发"
      }
    ],
    life: [
      {
        name: "生活分享",
        description: "分享日常生活，记录美好瞬间",
        members: "13.8K",
        icon: "🌟",
        category: "生活"
      },
      {
        name: "健康生活",
        description: "分享健康生活方式，交流养生心得",
        members: "7.2K",
        icon: "💪",
        category: "生活"
      }
    ],
    travel: [
      {
        name: "旅行日记",
        description: "记录旅行足迹，分享旅行攻略",
        members: "6.8K",
        icon: "✈️",
        category: "旅行"
      },
      {
        name: "城市探索",
        description: "探索城市文化，发现隐藏景点",
        members: "4.5K",
        icon: "🏙️",
        category: "旅行"
      }
    ],
    food: [
      {
        name: "美食探索",
        description: "发现美食，分享烹饪心得",
        members: "9.1K",
        icon: "🍜",
        category: "美食"
      },
      {
        name: "烘焙分享",
        description: "分享烘焙作品，交流制作技巧",
        members: "3.7K",
        icon: "🧁",
        category: "美食"
      }
    ],
    music: [
      {
        name: "音乐分享",
        description: "分享喜欢的音乐，发现新声音",
        members: "10.4K",
        icon: "🎵",
        category: "音乐"
      }
    ],
    photo: [
      {
        name: "摄影分享",
        description: "展示摄影作品，交流拍摄技巧",
        members: "15.3K",
        icon: "📸",
        category: "摄影"
      }
    ],
    book: [
      {
        name: "读书笔记",
        description: "分享读书心得，推荐好书",
        members: "7.4K",
        icon: "📚",
        category: "阅读"
      }
    ]
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 lg:ml-64">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 md:mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              返回首页
            </Link>

            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">探索社区</h1>
              <p className="text-muted-foreground text-sm md:text-base px-4">发现有趣的社区，与志同道合的人交流</p>
            </div>

            {/* 分类导航 */}
            <div className="mb-8">
              <div className="flex gap-3 overflow-x-auto pb-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                      activeCategory === category.id
                        ? "bg-accent text-accent-foreground shadow-md"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 社区列表 */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {activeCategory === "all" ? "为您推荐" : categories.find(c => c.id === activeCategory)?.name}
                </h2>
                {activeCategory !== "all" && (
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    查看全部 →
                  </Link>
                )}
              </div>

              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {communities[activeCategory as keyof typeof communities]?.map((community, index) => (
                  <div
                    key={index}
                    className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/10 hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/30 via-accent/20 to-accent/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">{community.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-1 group-hover:text-accent transition-colors">
                          {community.name}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {community.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {community.members} 成员
                          </span>
                          <button className="px-4 py-1.5 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors text-sm font-medium">
                            加入
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 显示更多按钮 */}
              <div className="text-center pt-6">
                <button className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                  显示更多
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}