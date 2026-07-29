"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { useLocale } from "./locale-provider"
import { menuItems, type MenuOption } from "@/lib/translations"
import { useCart } from "@/lib/cart-context"

const categoryIds = [
  "all",
  "main",
  "soups",
  "clatite",
  "coltunasi",
  "pelmeni",
  "garnitura",
  "snacks",
  "beer",
  "wine",
  "spirits",
] as const

export function Menu() {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({})
  const { locale, t } = useLocale()
  const { addItem, items } = useCart()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const requestedCategory = params.get("category")
    const requestedDish = params.get("dish")

    if (requestedCategory && categoryIds.includes(requestedCategory as typeof categoryIds[number])) {
      setActiveCategory(requestedCategory)
    }

    if (!requestedDish) return

    const dish = menuItems.find(
      (item) => item.slug === requestedDish || String(item.id) === requestedDish
    )
    if (!dish) return

    // Product QR links intentionally open the whole related group.
    // This keeps the ordering flow useful for walk-up and takeaway customers.
    setActiveCategory(dish.category)
  }, [])

  const filteredItems = useMemo(
    () =>
      activeCategory === "all"
        ? menuItems
        : menuItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  )

  const selectCategory = (category: string) => {
    setActiveCategory(category)
    const url = new URL(window.location.href)
    if (category === "all") url.searchParams.delete("category")
    else url.searchParams.set("category", category)
    url.searchParams.delete("dish")
    window.history.replaceState({}, "", url)
  }

  const selectedOptionFor = (itemId: number, options?: MenuOption[]) => {
    if (!options?.length) return undefined
    const value = selectedOptions[itemId] ?? options[0].value
    return options.find((option) => option.value === value) ?? options[0]
  }

  return (
    <section id="menu" className="py-20 px-4 sm:px-6 bg-white/[0.68] backdrop-blur-[2px]">
      <div className="text-center mb-10 sm:mb-14">
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

      <div className="sticky top-[62px] z-30 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 mb-7 bg-[#f8f0e4]/95 backdrop-blur-md border-y border-black/[0.06]">
        <div className="max-w-[1100px] mx-auto flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categoryIds.map((categoryId) => (
            <button
              key={categoryId}
              onClick={() => selectCategory(categoryId)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.5px] border transition-all cursor-pointer ${
                activeCategory === categoryId
                  ? "bg-[#f5c200] text-[#2c1a0e] border-[#f5c200] shadow-sm"
                  : "bg-white/75 text-[rgba(44,26,14,0.75)] border-black/[0.10] hover:bg-[#f5c200] hover:text-[#2c1a0e] hover:border-[#f5c200]"
              }`}
            >
              {t.menu.categories[categoryId]}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredItems.map((item) => {
          const selectedOption = selectedOptionFor(item.id, item.options)
          const lineKey = `${item.id}:${selectedOption?.value ?? "default"}`
          const quantityInCart =
            items.find((line) => line.key === lineKey)?.quantity ?? 0
          return (
            <article
              id={`dish-${item.slug ?? item.id}`}
              key={item.id}
              className="scroll-mt-36 bg-white border rounded-[18px] overflow-hidden transition-all duration-300 border-black/[0.07] hover:-translate-y-1.5 hover:border-[#f5c200] hover:shadow-[0_12px_40px_rgba(245,194,0,0.15)]"
            >
              <div className="relative w-full h-[220px] sm:h-[185px] overflow-hidden bg-[#ead9c5]">
                {item.imageZoom ? (
                  <div
                    role="img"
                    aria-label={item.name[locale]}
                    className="absolute inset-0 bg-no-repeat"
                    style={{
                      backgroundImage: `url("${item.image}")`,
                      backgroundSize: `${item.imageZoom}% auto`,
                      backgroundPosition: item.imagePosition ?? "center",
                    }}
                  />
                ) : item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name[locale]}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className={`object-cover ${item.focusRight ? "object-right" : "object-center"}`}
                  />
                ) : (
                  <div
                    className="w-full h-full flex flex-col items-center justify-center gap-2"
                    style={{
                      background: `linear-gradient(135deg, ${item.drinkBg ?? "#2c1a0e"}cc, ${item.drinkBg ?? "#2c1a0e"})`,
                    }}
                  >
                    <span className="text-6xl">{item.emoji ?? "🍹"}</span>
                    <span className="text-white/70 text-xs font-bold uppercase tracking-[2px]">
                      {item.weight}
                    </span>
                  </div>
                )}
                {quantityInCart > 0 && (
                  <div className="absolute top-2 right-2 bg-[#f5c200] text-[#2c1a0e] font-black text-sm min-w-8 h-8 px-2 rounded-full flex items-center justify-center shadow-md">
                    {quantityInCart}
                  </div>
                )}
              </div>

              <div className="p-4">
                <div className="text-[0.65rem] font-bold uppercase tracking-[2px] text-[#b58400] mb-1">
                  {item.categoryLabel[locale]}
                </div>
                <h3 className="text-base font-extrabold uppercase tracking-[0.5px] text-[#2c1a0e]">
                  {item.name[locale]}
                </h3>
                <p className="text-xs text-[#2c1a0e]/55 mt-1">{item.weight}</p>

                {item.options && (
                  <label className="block mt-3">
                    <span className="sr-only">{t.order.option}</span>
                    <select
                      value={selectedOption?.value}
                      onChange={(event) =>
                        setSelectedOptions((previous) => ({
                          ...previous,
                          [item.id]: event.target.value,
                        }))
                      }
                      className="w-full rounded-xl border border-black/10 bg-[#fff9e9] px-3 py-2.5 text-sm font-semibold text-[#2c1a0e] outline-none focus:border-[#f5c200] focus:ring-2 focus:ring-[#f5c200]/30"
                    >
                      {item.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label[locale]}
                        </option>
                      ))}
                    </select>
                  </label>
                )}

                <div className="flex items-center justify-between mt-4">
                  <span className="bg-[#f5c200] text-[#2c1a0e] font-black text-base px-3 py-1 rounded-full">
                    {item.price} MDL
                  </span>
                  <button
                    onClick={() => addItem(item, selectedOption)}
                    className="min-w-11 h-11 px-4 rounded-full bg-[#2c1a0e] text-white flex items-center justify-center gap-2 font-black hover:bg-[#f5c200] hover:text-[#2c1a0e] transition-all hover:scale-105 shadow-md"
                    aria-label={`${t.order.add}: ${item.name[locale]}`}
                  >
                    <span className="text-xl leading-none">+</span>
                    {item.options && <span className="text-xs uppercase">{t.order.add}</span>}
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
