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
      className={`fixed inset-x-0 top-0 z-50 flex min-h-16 items-center justify-between gap-2 px-3 py-2.5 transition-all duration-400 sm:px-6 sm:py-3 lg:px-8 ${
        scrolled
          ? "bg-[rgba(20,8,2,0.92)] backdrop-blur-[12px] shadow-[0_2px_20px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <Link href="#hero" className="flex min-w-0 items-center gap-1.5 text-[#f5c200] no-underline sm:gap-2">
        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-[#f5c200] sm:h-[38px] sm:w-[38px]">
          <Image
            src="/images/logo-mark.webp"
            alt="Wine & Grill"
            width={38}
            height={38}
            className="w-full h-full object-cover object-[center_5%]"
          />
        </div>
        <span className="whitespace-nowrap text-xs font-black uppercase tracking-[0.3px] min-[360px]:text-sm sm:text-xl sm:tracking-[2px]">Wine & Grill</span>
      </Link>
      <div className="flex shrink-0 items-center gap-1 sm:gap-6">
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
          aria-label={locale === "ru" ? "Открыть заказ" : "Deschide comanda"}
          className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f5c200] text-sm font-black uppercase tracking-[1px] text-[#2c1a0e] transition-all hover:-translate-y-0.5 hover:bg-[#e6b800] sm:w-auto sm:gap-2 sm:px-4"
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
        <div className="flex shrink-0 items-center gap-0.5 rounded-full bg-white/10 p-1 sm:gap-1">
          <button
            onClick={() => setLocale("ru")}
            className={`h-9 min-w-9 rounded-full px-1.5 text-xs font-bold uppercase tracking-[0.5px] transition-all sm:min-w-10 sm:px-2 ${
              locale === "ru"
                ? "bg-[#f5c200] text-[#2c1a0e]"
                : "text-white/70 hover:text-white"
            }`}
          >
            RU
          </button>
          <button
            onClick={() => setLocale("ro")}
            className={`h-9 min-w-9 rounded-full px-1.5 text-xs font-bold uppercase tracking-[0.5px] transition-all sm:min-w-10 sm:px-2 ${
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
