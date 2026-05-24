"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

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
      <ul className="hidden sm:flex gap-6 list-none">
        <li>
          <Link
            href="#menu"
            className="text-white/70 no-underline text-sm font-semibold uppercase tracking-[1px] hover:text-[#f5c200] transition-colors"
          >
            Меню
          </Link>
        </li>
        <li>
          <Link
            href="#atmosphere"
            className="text-white/70 no-underline text-sm font-semibold uppercase tracking-[1px] hover:text-[#f5c200] transition-colors"
          >
            Атмосфера
          </Link>
        </li>
        <li>
          <Link
            href="#contact"
            className="text-white/70 no-underline text-sm font-semibold uppercase tracking-[1px] hover:text-[#f5c200] transition-colors"
          >
            Контакты
          </Link>
        </li>
      </ul>
    </nav>
  )
}
