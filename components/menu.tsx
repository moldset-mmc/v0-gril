"use client"

import { useState } from "react"
import Image from "next/image"
import { useLocale } from "./locale-provider"
import { menuItems } from "@/lib/translations"
import { useCart } from "@/lib/cart-context"

const categoryIds = ["all", "clatite", "coltunasi", "pelmeni", "garnitura", "snacks", "beer", "wine", "spirits"] as const

export function Menu() {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const { locale, t } = useLocale()
  const { addItem, items } = useCart()

  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory)

  return (
    <section id="menu" className="py-20 px-6 bg-white/[0.68] backdrop-blur-[2px]">
      <div className="text-center mb-14">
        <span className="inline-block bg-[#f5c200] text-[#2c1a0e] text-xs font-extrabold uppercase tracking-[3px] px-4 py-1 rounded-full mb-3">
          {t.menu.badge}
        </span>
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black uppercase tracking-[1px] text-[#2c1a0e]">
          {t.menu.title}
        </h2>
        <p className="mt-2 opacity-55 text-sm text-[#2c1a0e]">
          {t.menu.subtitle}
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categoryIds.map((catId) => (
          <button
            key={catId}
            onClick={() => setActiveCategory(catId)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.5px] border transition-all cursor-pointer ${
              activeCategory === catId
                ? "bg-[#f5c200] text-[#2c1a0e] border-[#f5c200]"
                : "bg-black/[0.06] text-[rgba(44,26,14,0.75)] border-black/[0.12] hover:bg-[#f5c200] hover:text-[#2c1a0e] hover:border-[#f5c200]"
            }`}
          >
            {t.menu.categories[catId as keyof typeof t.menu.categories]}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredItems.map((item) => {
          const qtyInCart = items.find((i) => i.item.id === item.id)?.quantity ?? 0
          return (
            <div
              key={item.id}
              className="bg-white border border-black/[0.07] rounded-[18px] overflow-hidden transition-all duration-250 hover:-translate-y-1.5 hover:border-[#f5c200] hover:shadow-[0_12px_40px_rgba(245,194,0,0.15)]"
            >
              <div className="relative w-full h-[185px]">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name[locale]}
                    fill
                    className={`object-cover ${item.focusRight ? "object-right" : "object-center"}`}
                  />
                ) : (
                  <div
                    className="w-full h-full flex flex-col items-center justify-center gap-2"
                    style={{ background: `linear-gradient(135deg, ${item.drinkBg ?? "#2c1a0e"}cc, ${item.drinkBg ?? "#2c1a0e"})` }}
                  >
                    <span className="text-6xl">{item.emoji ?? "🍹"}</span>
                    <span className="text-white/70 text-xs font-bold uppercase tracking-[2px]">
                      {item.weight}
                    </span>
                  </div>
                )}
                {/* Badge if already in cart */}
                {qtyInCart > 0 && (
                  <div className="absolute top-2 right-2 bg-[#f5c200] text-[#2c1a0e] font-black text-sm w-7 h-7 rounded-full flex items-center justify-center shadow-md">
                    {qtyInCart}
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="text-[0.65rem] font-bold uppercase tracking-[2px] text-[#f5c200] mb-1">
                  {item.categoryLabel[locale]}
                </div>
                <div className="text-base font-extrabold uppercase tracking-[0.5px] text-[#2c1a0e]">
                  {item.name[locale]}
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="bg-[#f5c200] text-[#2c1a0e] font-black text-base px-3 py-1 rounded-full">
                    {item.price} MDL
                  </span>
                  <button
                    onClick={() => addItem(item)}
                    className="w-10 h-10 rounded-full bg-[#2c1a0e] text-white flex items-center justify-center text-2xl font-black hover:bg-[#f5c200] hover:text-[#2c1a0e] transition-all hover:scale-110 shadow-md"
                    aria-label="Добавить в заказ"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
