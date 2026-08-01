"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useLocale } from "./locale-provider"
import { menuItems, type MenuItem, type MenuOption } from "@/lib/translations"
import { useCart } from "@/lib/cart-context"

const menuGroups = [
  {
    id: "main",
    categories: ["main"],
    ru: "Мясо и гриль",
    ro: "Carne & Grill",
    descriptionRu: "Шашлык, мититеи, колбаски и чебуреки",
    descriptionRo: "Frigărui, mititei, cârnați și cheburek",
  },
  {
    id: "soups",
    categories: ["soups"],
    ru: "Супы",
    ro: "Supe",
    descriptionRu: "Борщ, зама и солянка",
    descriptionRo: "Borș, zeamă și soleancă",
  },
  {
    id: "homemade",
    categories: ["clatite", "coltunasi", "pelmeni"],
    ru: "Домашняя кухня",
    ro: "Bucătărie de casă",
    descriptionRu: "Блинчики, вареники и пельмени",
    descriptionRo: "Clătite, colțunași și pelmeni",
  },
  {
    id: "sides",
    categories: ["garnitura", "snacks"],
    ru: "Гарниры и закуски",
    ro: "Garnituri și gustări",
    descriptionRu: "Гарниры, нагетсы, крылышки и сыр",
    descriptionRo: "Garnituri, nuggets, aripioare și cașcaval",
  },
  {
    id: "drinks",
    categories: ["beer", "wine", "spirits"],
    ru: "Напитки",
    ro: "Băuturi",
    descriptionRu: "Пиво, вино и крепкие напитки",
    descriptionRo: "Bere, vin și băuturi tari",
  },
] as const

type GroupId = (typeof menuGroups)[number]["id"]

function resolveGroupId(category?: string | null): GroupId | null {
  if (!category) return null

  const group = menuGroups.find(
    (candidate) =>
      candidate.id === category ||
      candidate.categories.some((itemCategory) => itemCategory === category)
  )

  return group?.id ?? null
}

function scrollToMenuGroup(
  groupId: GroupId | "all",
  behavior: ScrollBehavior = "smooth"
) {
  const target = document.getElementById(
    groupId === "all" ? "menu" : `menu-group-${groupId}`
  )
  if (!target) return

  const navbarHeight = document.querySelector("nav")?.getBoundingClientRect().height ?? 64
  const top = window.scrollY + target.getBoundingClientRect().top - navbarHeight

  if (behavior === "auto") {
    const root = document.documentElement
    const previousScrollBehavior = root.style.scrollBehavior
    root.style.scrollBehavior = "auto"
    window.scrollTo({ top: Math.max(0, top), behavior: "auto" })
    root.style.scrollBehavior = previousScrollBehavior
    return
  }

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
            : "(max-width: 640px) 95vw, 560px"
        }
        className="object-cover"
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
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string>>({})
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null)
  const dishDialogRef = useRef<HTMLElement>(null)
  const dishTriggerRef = useRef<HTMLElement | null>(null)
  const { locale, t } = useLocale()
  const { addItem, items } = useCart()

  useEffect(() => {
    let cancelled = false

    const openRequestedGroup = async () => {
      const params = new URLSearchParams(window.location.search)
      const requestedCategory = params.get("category")
      const requestedDish = params.get("dish")

      let groupId = resolveGroupId(requestedCategory)

      if (requestedDish) {
        const dish = menuItems.find(
          (item) => item.slug === requestedDish || String(item.id) === requestedDish
        )
        groupId = resolveGroupId(dish?.category) ?? groupId
      }

      if (!groupId) return

      await document.fonts.ready
      window.requestAnimationFrame(() => {
        if (!cancelled) scrollToMenuGroup(groupId, "auto")
      })
    }

    void openRequestedGroup()

    const handleCategoryEvent = (event: Event) => {
      const customEvent = event as CustomEvent<{ category?: string }>
      const category = customEvent.detail?.category

      if (category === "all") {
        scrollToMenuGroup("all")
        return
      }

      const groupId = resolveGroupId(category)
      if (groupId) scrollToMenuGroup(groupId)
    }

    window.addEventListener("wine-grill:select-category", handleCategoryEvent)
    return () => {
      cancelled = true
      window.removeEventListener("wine-grill:select-category", handleCategoryEvent)
    }
  }, [])

  useEffect(() => {
    if (!selectedDish) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    dishTriggerRef.current = document.activeElement as HTMLElement | null

    const focusDialog = window.requestAnimationFrame(() => {
      dishDialogRef.current
        ?.querySelector<HTMLElement>("button, select, [href], [tabindex]:not([tabindex='-1'])")
        ?.focus()
    })

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedDish(null)
      if (event.key !== "Tab" || !dishDialogRef.current) return

      const focusable = Array.from(
        dishDialogRef.current.querySelectorAll<HTMLElement>(
          "button:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex='-1'])"
        )
      )
      if (!focusable.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.cancelAnimationFrame(focusDialog)
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
      dishTriggerRef.current?.focus()
    }
  }, [selectedDish])

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
      className="bg-white/[0.72] px-3 py-14 sm:px-6 sm:py-20"
    >
      <div className="mb-10 text-center sm:mb-14">
        <span className="mb-3 inline-block rounded-full bg-[#f5c200] px-4 py-1 text-xs font-extrabold uppercase tracking-[3px] text-[#2c1a0e]">
          {t.menu.badge}
        </span>
        <h2 className="text-[clamp(1.75rem,4vw,2.8rem)] font-black uppercase tracking-[1px] text-[#2c1a0e]">
          {t.menu.title}
        </h2>
        <p className="mt-2 text-sm text-[#2c1a0e]/55">{t.menu.subtitle}</p>
      </div>

      <div className="mx-auto max-w-[1100px] space-y-14 sm:space-y-20">
        {menuGroups.map((group, groupIndex) => {
          const groupItems = menuItems.filter((item) =>
            group.categories.some((category) => category === item.category)
          )

          return (
            <section
              id={`menu-group-${group.id}`}
              key={group.id}
              aria-labelledby={`menu-group-title-${group.id}`}
              className="scroll-mt-16"
            >
              <header className="mb-5 flex items-end justify-between gap-4 border-b-2 border-[#f5c200] pb-3 sm:mb-7">
                <div>
                  <p className="text-[0.62rem] font-bold uppercase tracking-[2px] text-[#9a7300]">
                    {locale === "ru" ? `Раздел ${groupIndex + 1}` : `Secțiunea ${groupIndex + 1}`}
                  </p>
                  <h3
                    id={`menu-group-title-${group.id}`}
                    className="mt-1 text-xl font-black uppercase leading-tight text-[#2c1a0e] sm:text-3xl"
                  >
                    {locale === "ru" ? group.ru : group.ro}
                  </h3>
                  <p className="mt-1 text-xs text-[#2c1a0e]/55 sm:text-sm">
                    {locale === "ru" ? group.descriptionRu : group.descriptionRo}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-[#2c1a0e] px-3 py-1.5 text-xs font-black text-white">
                  {groupItems.length}
                </span>
              </header>

              <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                {groupItems.map((item) => {
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
                        <h4 className="line-clamp-2 min-h-10 text-[0.82rem] font-extrabold uppercase leading-tight tracking-[0.2px] text-[#2c1a0e] sm:text-base">
                          {item.name[locale]}
                        </h4>
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
            </section>
          )
        })}
      </div>

      {selectedDish && (
        <div className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center sm:p-5">
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-[3px]"
            onClick={() => setSelectedDish(null)}
            aria-label={locale === "ru" ? "Закрыть блюдо" : "Închide preparatul"}
          />
          <article
            ref={dishDialogRef}
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
              <p className="mt-3 text-sm leading-relaxed text-[#2c1a0e]/70">
                {selectedDish.description?.[locale] ??
                  (locale === "ru"
                    ? "Откройте карточку, проверьте порцию и добавьте выбранное блюдо в заказ."
                    : "Deschideți fișa, verificați porția și adăugați preparatul ales în comandă.")}
              </p>
              <div className="mt-4 inline-flex items-center rounded-full border border-[#2c1a0e]/10 bg-[#fff9e9] px-3 py-1.5 text-xs font-bold text-[#2c1a0e]/70">
                {locale === "ru" ? "Порция" : "Porție"}: {selectedDish.weight}
              </div>

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
