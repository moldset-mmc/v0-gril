"use client"

import Link from "next/link"
import { useLocale } from "./locale-provider"

export function Contact() {
  const { t } = useLocale()

  const contactItems = [
    {
      icon: (
        <svg className="w-10 h-10 mx-auto text-[#c0392b]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
      title: t.contact.address.title,
      lines: t.contact.address.lines,
    },
    {
      icon: (
        <svg className="w-10 h-10 mx-auto text-[#c0392b]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: t.contact.hours.title,
      lines: t.contact.hours.lines,
    },
    {
      icon: (
        <svg className="w-10 h-10 mx-auto text-[#c0392b]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
      title: t.contact.phone.title,
      lines: t.contact.phone.lines,
    },
  ]

  return (
    <section id="contact" className="py-20 px-6 bg-white/[0.72] text-center">
      <div className="mb-10">
        <span className="inline-block bg-[#f5c200] text-[#2c1a0e] text-xs font-extrabold uppercase tracking-[3px] px-4 py-1 rounded-full mb-3">
          {t.contact.badge}
        </span>
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black uppercase tracking-[1px] text-[#2c1a0e]">
          {t.contact.title}
        </h2>
      </div>

      <div className="max-w-[700px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
        {contactItems.map((item, index) => (
          <div key={index}>
            <span className="block mb-2">{item.icon}</span>
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
        {t.contact.viewMenu}
      </Link>
    </section>
  )
}
