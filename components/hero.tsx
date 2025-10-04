"use client"

interface HeroProps {
  onToggleMBTI?: () => void
}

export function Hero({ onToggleMBTI }: HeroProps) {
  const contacts = [
    {
      name: "Bilibili",
      icon: "fa-brands fa-bilibili",
      href: "https://space.bilibili.com/1525408234",
    },
    {
      name: "Steam",
      icon: "fa-brands fa-steam",
      href: "https://steamcommunity.com/id/Justin_Xu/",
    },
    {
      name: "GitHub",
      icon: "fa-brands fa-github",
      href: "https://github.com/Xu-Fengxing",
    },
    {
      name: "Email",
      icon: "fa-solid fa-envelope",
      href: "mailto:justin_xu@qq.com",
    },
    {
      name: "QQ",
      icon: "fa-brands fa-qq",
      href: "https://qm.qq.com/q/AmEgkq1cju",
    },
  ]

  return (
    <section className="flex items-center justify-center px-6 py-20 h-screen relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center pointer-events-auto">
        {/* Greeting */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          欢迎来到我的个人空间
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
          你好，我是
          <span className="block mt-2 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
            风行Justin
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty animate-fade-in-up animation-delay-300">
          一个兴趣使然的设计爱好者
        </p>

        <div className="flex items-center justify-center gap-3 md:gap-4 mt-12 animate-fade-in-up animation-delay-400 max-w-sm md:max-w-none mx-auto px-4">
          {contacts.map((contact) => {
            return (
              <a
                key={contact.name}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl bg-secondary transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-lg hover:shadow-accent/20 hover:scale-110"
                title={contact.name}
              >
                <i className={`${contact.icon} text-lg md:text-xl`}></i>
              </a>
            )
          })}
        </div>

        {/* Scroll down arrow - positioned below the icon row */}
        <div className="flex justify-center mt-24 animate-bounce" style={{animationDuration: '2s'}}>
          <button
            onClick={() => {
              console.log('Arrow clicked!')
              const mbtiSection = document.getElementById('mbti-section')
              console.log('MBTI section found:', mbtiSection)
              if (mbtiSection) {
                mbtiSection.scrollIntoView({ behavior: 'smooth' })
                console.log('Scrolling to MBTI section')
              } else {
                console.log('MBTI section not found, trying alternative scroll')
                window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
              }
            }}
            className="group transition-transform hover:translate-y-1"
            title="跳转到MBTI"
          >
            <svg 
              className="w-8 h-8 text-foreground/60 hover:text-foreground transition-colors" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M7 10l5 5 5-5" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  )
}
