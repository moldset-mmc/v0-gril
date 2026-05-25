"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLocale } from "./locale-provider"
import { useCart } from "@/lib/cart-context"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { locale, setLocale, t } = useLocale()
  const { count, setIsOpen } = useCart()

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
        <div className="w-[38px] h-[38px] rounded-full overflow-hidden border-2 border-[#f5c200] shrink-0">
          <Image
            src="/images/logo.png"
            alt="Wine & Grill"
            width={38}
            height={38}
            className="w-full h-full object-cover object-[center_5%]"
          />
        </div>
        <span className="text-base sm:text-xl font-black uppercase tracking-[1px] sm:tracking-[2px] whitespace-nowrap">Wine & Grill</span>
      </Link>
      <div className="flex items-center gap-2 sm:gap-6">
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
        {/* Cart Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-[#f5c200] text-[#2c1a0e] font-black text-sm uppercase tracking-[1px] hover:bg-[#e6b800] transition-all hover:-translate-y-0.5"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          {count > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#c0392b] text-white text-xs font-black flex items-center justify-center">
              {count}
            </span>
          )}
        </button>

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
