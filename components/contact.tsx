import Link from "next/link"

const contactItems = [
  {
    icon: "📍",
    title: "Адрес",
    lines: ["Wine & Grill", "Кишинёв, Молдова"],
  },
  {
    icon: "🕐",
    title: "Часы работы",
    lines: ["Пн–Вс", "10:00 — 22:00"],
  },
  {
    icon: "📞",
    title: "Телефон",
    lines: ["Уточните у заведения"],
  },
]

export function Contact() {
  return (
    <section id="contact" className="py-20 px-6 bg-white/[0.72] text-center">
      <div className="mb-10">
        <span className="inline-block bg-[#f5c200] text-[#2c1a0e] text-xs font-extrabold uppercase tracking-[3px] px-4 py-1 rounded-full mb-3">
          Найдите нас
        </span>
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black uppercase tracking-[1px] text-[#2c1a0e]">
          Контакты
        </h2>
      </div>

      <div className="max-w-[700px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
        {contactItems.map((item, index) => (
          <div key={index}>
            <span className="text-4xl block mb-2">{item.icon}</span>
            <h4 className="text-xs font-bold uppercase tracking-[2px] text-[#c0392b] mb-1">
              {item.title}
            </h4>
            {item.lines.map((line, i) => (
              <p key={i} className="opacity-65 text-sm leading-relaxed text-[#2c1a0e]">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>

      <Link
        href="#menu"
        className="inline-block px-9 py-3.5 rounded-full text-base font-bold uppercase tracking-[1px] bg-[#f5c200] text-[#2c1a0e] no-underline transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
      >
        Смотреть меню
      </Link>
    </section>
  )
}
