"use client"

import Image from "next/image"
import { useLocale } from "./locale-provider"

const highlightCards = [
  {
    category: "main",
    image: "/images/main-grill-board.webp",
  },
  {
    category: "homemade",
    image: "/images/clatite_branza.jpg",
  },
  {
    category: "all",
    image: "/images/cheburek-board.webp",
  },
] as const

export function Highlights() {
  const { locale, t } = useLocale()

  const openCategory = (category: string) => {
    const url = new URL(window.location.href)
    if (category === "all") url.searchParams.delete("category")
    else url.searchParams.set("category", category)
    url.searchParams.delete("dish")
    url.hash = "menu"
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`)

    window.dispatchEvent(
      new CustomEvent("wine-grill:select-category", {
        detail: { category },
      })
    )
  }

  return (
    <section
      id="highlights"
      className="bg-white/[0.76] px-4 py-12 backdrop-blur-[2px] sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-[1050px]">
        <div className="mb-6 sm:mb-8">
          <span className="text-xs font-extrabold uppercase tracking-[3px] text-[#9a7300]">
            {locale === "ru" ? "Быстрый выбор" : "Alegere rapidă"}
          </span>
          <h2 className="mt-2 text-[clamp(1.7rem,4vw,2.6rem)] font-black uppercase leading-none text-[#2c1a0e]">
            {locale === "ru" ? "Что хочется сегодня?" : "Ce alegi astăzi?"}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#2c1a0e]/60">
            {locale === "ru"
              ? "Откройте подходящую группу и сразу переходите к выбору блюд."
              : "Deschideți categoria potrivită și treceți direct la alegerea preparatelor."}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
          {t.highlights.items.map((item, index) => {
            const card = highlightCards[index]
            const featured = index === 0

            return (
              <button
                type="button"
                key={item.title}
                onClick={() => openCategory(card.category)}
                className={`group relative overflow-hidden rounded-3xl text-left shadow-[0_12px_35px_rgba(44,26,14,0.15)] transition duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c200] ${
                  featured
                    ? "col-span-2 min-h-[250px] sm:col-span-1 sm:min-h-[330px]"
                    : "min-h-[205px] sm:min-h-[330px]"
                }`}
              >
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes={featured ? "(max-width: 640px) 95vw, 33vw" : "(max-width: 640px) 47vw, 33vw"}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/5" />
                <span className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
                  <span className="block text-[0.62rem] font-bold uppercase tracking-[2px] text-[#f5c200]">
                    {locale === "ru" ? "Открыть раздел" : "Deschide categoria"}
                  </span>
                  <span className="mt-1 block text-lg font-black uppercase leading-tight sm:text-2xl">
                    {item.title}
                  </span>
                  <span className="mt-2 hidden max-w-[28ch] text-sm leading-relaxed text-white/75 sm:block">
                    {item.description}
                  </span>
                  <span className="mt-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#f5c200] text-lg font-black text-[#2c1a0e]">
                    →
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
