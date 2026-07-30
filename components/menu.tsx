"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { useLocale } from "./locale-provider"
import { menuItems, type MenuItem, type MenuOption } from "@/lib/translations"
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

type CategoryId = (typeof categoryIds)[number]

const NAVBAR_OFFSET = 64

function scrollMenuIntoPlace(behavior: ScrollBehavior = "smooth") {
  const target = document.getElementById("menu-browser")
  if (!target) return

  const top = window.scrollY + target.getBoundingClientRect().top - NAVBAR_OFFSET
  window.scrollTo({ top: Math.max(0, top), behavior })
}

function DishVisual({
  item,
  locale,
  compact = false,
}: {
  item: MenuItem
  locale: "ru" | "ro"
  compact?: boolean
}) {
  if (item.imageZoom) {
    const zoom = compact
      ? Math.max(100, item.imageZoom - 10)
      : Math.max(100, item.imageZoom - 16)

    return (
      <div
        role="img"
        aria-label={item.name[locale]}
        className="absolute inset-0 bg-no-repeat"
        style={{
          backgroundImage: `url("${item.image}")`,
          backgroundSize: `${zoom}% auto`,
          backgroundPosition: item.imagePosition ?? "center",
        }}
      />
    )
  }

  if (item.image) {
    return (
      <Image
        src={item.image}
        alt={item.name[locale]}
        fill
        sizes={
          compact
            ? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            : "(max-width: 640px) 100vw, 560px"
        }
        className="object-contain"
      />
    )
  }

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-2"
      style={{
        background: `linear-gradient(135deg, ${item.drinkBg ?? "#2c1a0e"}cc, ${item.drinkBg ?? "#2c1a0e"})`,
      }}
    >
      <span className="text-5xl">{item.emoji ?? "🍹"}</span>
      <span className="text-xs font-bold uppercase tracking-[2px] text-white/70">
        {item.weight}
      </span>
    </div>
  )
}

export function Menu() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all")
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({})
  const [categoryPanelOpen, setCategoryPanelOpen] = useState(false)
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null)
  const { locale, t } = useLocale()
  const { addItem, items } = useCart()

  useEffect(() => {
    const applyDeepLink = () => {
      const params = new URLSearchParams(window.location.search)
      const requestedCategory = params.get("category")
      const requestedDish = params.get("dish")
      let nextCategory: CategoryId | null = null

      if (
        requestedCategory &&
        categoryIds.includes(requestedCategory as CategoryId)
      ) {
        nextCategory = requestedCategory as CategoryId
      }

      if (requestedDish) {
        const dish = menuItems.find(
          (item) => item.slug === requestedDish || String(item.id) === requestedDish
        )
        if (dish && categoryIds.includes(dish.category as CategoryId)) {
          nextCategory = dish.category as CategoryId
        }
      }

      if (!nextCategory) return
      setActiveCategory(nextCategory)

      // Wait for React to render the selected group, then align the menu browser
      // directly below the fixed navigation bar.
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => scrollMenuIntoPlace("auto"))
      })
    }

    applyDeepLink()

    const handleCategoryEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ category?: string }>
      const category = customEvent.detail?.category
      if (!categoryIds.includes(category as CategoryId)) return
      selectCategory(category as CategoryId)
    }

    window.addEventListener("wine-grill:select-category", handleCategoryEvent)
    return () =>
      window.removeEventListener("wine-grill:select-category", handleCategoryEvent)
  }, [])

  useEffect(() => {
    if (!selectedDish && !categoryPanelOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      setSelectedDish(null)
      setCategoryPanelOpen(false)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedDish, categoryPanelOpen])

  const filteredItems = useMemo(
    () =>
      activeCategory === "all"
        ? menuItems
        : menuItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  )

  const selectCategory = (category: CategoryId) => {
    setActiveCategory(category)
    setCategoryPanelOpen(false)

    const url = new URL(window.location.href)
    if (category === "all") url.searchParams.delete("category")
    else url.searchParams.set("category", category)
    url.searchParams.delete("dish")
    url.hash = "menu"
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`)

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => scrollMenuIntoPlace())
    })
  }

  const selectedOptionFor = (itemId: number, options?: MenuOption[]) => {
    if (!options?.length) return undefined
    const value = selectedOptions[itemId] ?? options[0].value
    return options.find((option) => option.value === value) ?? options[0]
  }

  const activeDishOption = selectedDish
    ? selectedOptionFor(selectedDish.id, selectedDish.options)
    : undefined

  const addSelectedDish = () => {
    if (!selectedDish) return
    addItem(selectedDish, activeDishOption)
    setSelectedDish(null)
  }

  return (
    <section
      id="menu"
      className="bg-white/[0.72] px-3 py-14 backdrop-blur-[2px] sm:px-6 sm:py-20"
    >
      <div className="mb-8 text-center sm:mb-12">
        <span className="mb-3 inline-block rounded-full bg-[#f5c200] px-4 py-1 text-xs font-extrabold uppercase tracking-[3px] text-[#2c1a0e]">
          {t.menu.badge}
        </span>
        <h2 className="text-[clamp(1.75rem,4vw,2.8rem)] font-black uppercase tracking-[1px] text-[#2c1a0e]">
          {t.menu.title}
        </h2>
        <p className="mt-2 text-sm text-[#2c1a0e]/55">{t.menu.subtitle}</p>
      </div>

      <div
        id="menu-browser"
        className="sticky top-[62px] z-30 -mx-3 mb-5 border-y border-black/[0.07] bg-[#f8f0e4]/95 px-3 py-2.5 backdrop-blur-md sm:-mx-6 sm:mb-7 sm:px-6"
      >
        <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setCategoryPanelOpen(true)}
            className="flex min-h-11 min-w-0 flex-1 items-center justify-between gap-3 rounded-2xl border border-black/10 bg-white px-4 py-2 text-left text-[#2c1a0e] shadow-sm transition-colors hover:border-[#f5c200] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c200]"
            aria-haspopup="dialog"
            aria-expanded={categoryPanelOpen}
          >
            <span className="min-w-0">
              <span className="block text-[0.62rem] font-bold uppercase tracking-[1.5px] text-[#8d6b16]">
                {locale === "ru" ? "Категория" : "Categoria"}
              </span>
              <span className="block truncate text-sm font-black uppercase">
                {t.menu.categories[activeCategory]}
              </span>
            </span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5 shrink-0"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M7 12h10M10 17h4" />
            </svg>
          </button>

          <span className="shrink-0 rounded-full bg-[#2c1a0e] px-3 py-2 text-xs font-black text-white">
            {filteredItems.length}
          </span>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1100px] grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item) => {
          const selectedOption = selectedOptionFor(item.id, item.options)
          const lineKey = `${item.id}:${selectedOption?.value ?? "default"}`
          const quantityInCart =
            items.find((line) => line.key === lineKey)?.quantity ?? 0

          return (
            <button
              type="button"
              id={`dish-${item.slug ?? item.id}`}
              key={item.id}
              onClick={() => setSelectedDish(item)}
              className="group overflow-hidden rounded-2xl border border-black/[0.08] bg-white text-left shadow-[0_6px_24px_rgba(44,26,14,0.07)] transition duration-200 hover:-translate-y-1 hover:border-[#f5c200] hover:shadow-[0_12px_34px_rgba(44,26,14,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c200]"
              aria-label={`${item.name[locale]}, ${item.price} MDL`}
            >
              <div className="relative aspect-square w-full overflow-hidden bg-[#ead9c5]">
                <DishVisual item={item} locale={locale} compact />
                {quantityInCart > 0 && (
                  <span className="absolute right-2 top-2 flex h-7 min-w-7 items-center justify-center rounded-full bg-[#f5c200] px-1.5 text-xs font-black text-[#2c1a0e] shadow-md">
                    {quantityInCart}
                  </span>
                )}
                <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#2c1a0e]/90 text-lg font-black text-white shadow-md transition-transform group-hover:scale-110">
                  ↗
                </span>
              </div>

              <div className="p-3 sm:p-4">
                <div className="mb-1 line-clamp-1 text-[0.58rem] font-bold uppercase tracking-[1.3px] text-[#9a7300] sm:text-[0.65rem]">
                  {item.categoryLabel[locale]}
                </div>
                <h3 className="line-clamp-2 min-h-10 text-[0.82rem] font-extrabold uppercase leading-tight tracking-[0.2px] text-[#2c1a0e] sm:text-base">
                  {item.name[locale]}
                </h3>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-[0.68rem] font-semibold text-[#2c1a0e]/55 sm:text-xs">
                    {item.weight}
                  </span>
                  <span className="whitespace-nowrap rounded-full bg-[#f5c200] px-2.5 py-1 text-xs font-black text-[#2c1a0e] sm:text-sm">
                    {item.price} MDL
                  </span>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {categoryPanelOpen && (
        <div className="fixed inset-0 z-[110] flex items-end justify-center sm:items-center">
          <button
            type="button"
            className="absolute inset-0 bg-black/65 backdrop-blur-[2px]"
            onClick={() => setCategoryPanelOpen(false)}
            aria-label={locale === "ru" ? "Закрыть категории" : "Închide categoriile"}
          />
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="category-dialog-title"
            className="relative z-[1] w-full max-w-xl rounded-t-3xl bg-[#fffaf1] p-5 shadow-2xl sm:rounded-3xl sm:p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[2px] text-[#9a7300]">
                  Wine & Grill
                </p>
                <h3
                  id="category-dialog-title"
                  className="text-xl font-black uppercase text-[#2c1a0e]"
                >
                  {locale === "ru" ? "Все категории" : "Toate categoriile"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCategoryPanelOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2c1a0e] text-2xl font-bold text-white"
                aria-label={locale === "ru" ? "Закрыть" : "Închide"}
              >
                ×
              </button>
            </div>
            <div className="grid max-h-[65vh] grid-cols-2 gap-2 overflow-y-auto pb-[max(0px,env(safe-area-inset-bottom))]">
              {categoryIds.map((categoryId) => (
                <button
                  type="button"
                  key={categoryId}
                  onClick={() => selectCategory(categoryId)}
                  className={`min-h-12 rounded-2xl border px-3 py-3 text-left text-xs font-black uppercase leading-tight transition-colors ${
                    activeCategory === categoryId
                      ? "border-[#f5c200] bg-[#f5c200] text-[#2c1a0e]"
                      : "border-black/10 bg-white text-[#2c1a0e] hover:border-[#f5c200]"
                  }`}
                >
                  {t.menu.categories[categoryId]}
                </button>
              ))}
            </div>
          </section>
        </div>
      )}

      {selectedDish && (
        <div className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center sm:p-5">
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-[3px]"
            onClick={() => setSelectedDish(null)}
            aria-label={locale === "ru" ? "Закрыть блюдо" : "Închide preparatul"}
          />
          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="dish-dialog-title"
            className="relative z-[1] flex max-h-[94vh] w-full max-w-xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
          >
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-[#ead9c5] sm:aspect-[16/10]">
              <DishVisual item={selectedDish} locale={locale} />
              <button
                type="button"
                onClick={() => setSelectedDish(null)}
                className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-2xl font-bold text-white backdrop-blur"
                aria-label={locale === "ru" ? "Закрыть" : "Închide"}
              >
                ×
              </button>
            </div>

            <div className="overflow-y-auto p-5 sm:p-6">
              <p className="text-[0.68rem] font-bold uppercase tracking-[2px] text-[#9a7300]">
                {selectedDish.categoryLabel[locale]}
              </p>
              <h3
                id="dish-dialog-title"
                className="mt-1 text-2xl font-black uppercase leading-tight text-[#2c1a0e]"
              >
                {selectedDish.name[locale]}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#2c1a0e]/65">
                {locale === "ru" ? "Порция" : "Porție"}: {selectedDish.weight}.{" "}
                {locale === "ru"
                  ? "Выберите вариант, если он доступен, и добавьте блюдо в заказ."
                  : "Alegeți varianta, dacă este disponibilă, și adăugați preparatul în comandă."}
              </p>

              {selectedDish.options && (
                <label className="mt-5 block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-[1px] text-[#2c1a0e]">
                    {t.order.option}
                  </span>
                  <select
                    value={activeDishOption?.value}
                    onChange={(event) =>
                      setSelectedOptions((previous) => ({
                        ...previous,
                        [selectedDish.id]: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border-2 border-black/10 bg-[#fff9e9] px-4 py-3 text-sm font-semibold text-[#2c1a0e] outline-none focus:border-[#f5c200] focus:ring-2 focus:ring-[#f5c200]/30"
                  >
                    {selectedDish.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label[locale]}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              <div className="mt-6 flex items-center gap-3">
                <span className="shrink-0 rounded-full bg-[#f5c200] px-4 py-2 text-lg font-black text-[#2c1a0e]">
                  {selectedDish.price} MDL
                </span>
                <button
                  type="button"
                  onClick={addSelectedDish}
                  className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#2c1a0e] px-5 py-3 text-sm font-black uppercase tracking-[0.5px] text-white transition-colors hover:bg-[#c0392b]"
                >
                  <span className="text-xl leading-none">+</span>
                  {t.order.add}
                </button>
              </div>
            </div>
          </article>
        </div>
      )}
    </section>
  )
}
