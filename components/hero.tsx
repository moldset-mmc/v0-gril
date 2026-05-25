"use client"

import Image from "next/image"
import Link from "next/link"
import { useLocale } from "./locale-provider"

export function Hero() {
  const { t } = useLocale()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-repeat opacity-55 z-0"
        style={{
          backgroundImage: "url('/images/wood_tile.jpg')",
          backgroundSize: "220px auto",
        }}
      />
      {/* Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(30,15,5,0.3) 0%, rgba(30,15,5,0.75) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-[2] p-8">
        <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-6 border-4 border-[#f5c200] animate-pulse-glow">
          <Image
            src="/images/logo.png"
            alt="Wine & Grill"
            width={160}
            height={160}
            className="w-full h-full object-cover object-[center_5%]"
          />
        </div>
        <h1 className="text-[clamp(2.8rem,8vw,5.5rem)] font-black uppercase tracking-[3px] leading-none text-white">
          <span className="text-[#f5c200]">Wine</span> & Grill
        </h1>
        <p className="mt-3 text-[clamp(0.95rem,2.5vw,1.3rem)] uppercase tracking-[4px] opacity-75 text-white">
          {t.hero.subtitle}
        </p>
        <div className="mt-10 flex gap-4 justify-center flex-wrap">
          <Link
            href="#menu"
            className="px-9 py-3.5 rounded-full text-base font-bold uppercase tracking-[1px] bg-[#f5c200] text-[#2c1a0e] no-underline transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
          >
            {t.hero.viewMenu}
          </Link>
          <Link
            href="#contact"
            className="px-9 py-3.5 rounded-full text-base font-bold uppercase tracking-[1px] bg-transparent text-white border-2 border-white/50 no-underline transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:border-white"
          >
            {t.hero.contacts}
          </Link>
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <Link
        href="#highlights"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-1 opacity-60 text-white text-xs tracking-[2px] no-underline animate-bounce-arrow"
      >
        <span>{t.hero.scroll}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-6 h-6"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </Link>
    </section>
  )
}
