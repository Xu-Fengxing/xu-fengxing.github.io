import { Mail, MessageSquare, Github, Video, Gamepad2 } from "lucide-react"

export function Contact() {
  const contacts = [
    {
      name: "Bilibili",
      icon: Video,
      href: "https://space.bilibili.com/1525408234",
    },
    {
      name: "Steam",
      icon: Gamepad2,
      href: "https://steamcommunity.com/id/Justin_Xu/",
    },
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/Xu-Fengxing",
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:justin_xu@qq.com",
    },
    {
      name: "QQ",
      icon: MessageSquare,
      href: "https://qm.qq.com/q/AmEgkq1cju",
    },
  ]

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-6 flex-wrap">
          {contacts.map((contact) => {
            const Icon = contact.icon

            return (
              <a
                key={contact.name}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-14 w-14 items-center justify-center rounded-xl bg-secondary transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-lg hover:shadow-accent/20 hover:scale-110"
                title={contact.name}
              >
                <Icon className="h-6 w-6" />
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
