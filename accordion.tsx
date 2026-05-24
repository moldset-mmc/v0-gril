"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLocale } from "./locale-provider"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { locale, setLocale, t } = useLocale()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-3 transition-all duration-400 ${
        scrolled
          ? "bg-[rgba(20,8,2,0.92)] backdrop-blur-[12px] shadow-[0_2px_20px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <Link href="#hero" className="flex items-center gap-2 text-[#f5c200] no-underline">
        <div className="w-[38px] h-[38px] rounded-full overflow-hidden border-2 border-[#f5c200]">
          <Image
            src="/images/logo.jpg"
            alt="Wine & Grill"
            width={38}
            height={38}
            className="w-full h-full object-cover object-[center_5%]"
          />
        </div>
        <span className="text-xl font-black uppercase tracking-[2px]">Wine & Grill</span>
      </Link>
      <div className="flex items-center gap-6">
        <ul className="hidden sm:flex gap-6 list-none">
          <li>
            <Link
              href="#menu"
              className="text-white/70 no-underline text-sm font-semibold uppercase tracking-[1px] hover:text-[#f5c200] transition-colors"
            >
              {t.nav.menu}
            </Link>
          </li>
          <li>
            <Link
              href="#atmosphere"
              className="text-white/70 no-underline text-sm font-semibold uppercase tracking-[1px] hover:text-[#f5c200] transition-colors"
            >
              {t.nav.atmosphere}
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="text-white/70 no-underline text-sm font-semibold uppercase tracking-[1px] hover:text-[#f5c200] transition-colors"
            >
              {t.nav.contacts}
            </Link>
          </li>
        </ul>
        {/* Language Switcher */}
        <div className="flex items-center gap-1 bg-white/10 rounded-full p-1">
          <button
            onClick={() => setLocale("ru")}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.5px] transition-all ${
              locale === "ru"
                ? "bg-[#f5c200] text-[#2c1a0e]"
                : "text-white/70 hover:text-white"
            }`}
          >
            RU
          </button>
          <button
            onClick={() => setLocale("ro")}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-[0.5px] transition-all ${
              locale === "ro"
                ? "bg-[#f5c200] text-[#2c1a0e]"
                : "text-white/70 hover:text-white"
            }`}
          >
            RO
          </button>
        </div>
      </div>
    </nav>
  )
}
