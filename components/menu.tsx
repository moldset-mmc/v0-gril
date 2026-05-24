"use client"

import { useState } from "react"
import Image from "next/image"

type MenuItem = {
  id: number
  category: string
  categoryLabel: string
  name: string
  nameRu: string
  price: number
  weight: string
  image: string
  focusRight?: boolean
}

const menuItems: MenuItem[] = [
  // Clătite / Блинчики
  {
    id: 1,
    category: "clatite",
    categoryLabel: "Clătite · Блинчики",
    name: "Cu pui și cașcaval",
    nameRu: "С курицей и сыром",
    price: 85,
    weight: "300г",
    image: "/images/clatite_pui.jpg",
  },
  {
    id: 2,
    category: "clatite",
    categoryLabel: "Clătite · Блинчики",
    name: "Cu carne",
    nameRu: "С мясом",
    price: 85,
    weight: "300г",
    image: "/images/clatite_pui.jpg",
  },
  {
    id: 3,
    category: "clatite",
    categoryLabel: "Clătite · Блинчики",
    name: "Cu brânză de vaci",
    nameRu: "С творогом",
    price: 85,
    weight: "300г",
    image: "/images/clatite_branza.jpg",
  },
  // Colțunași / Вареники
  {
    id: 4,
    category: "coltunasi",
    categoryLabel: "Colțunași · Вареники",
    name: "Cu cartofi",
    nameRu: "С картошкой",
    price: 60,
    weight: "300г",
    image: "/images/coltunasi_cartofi.jpg",
  },
  {
    id: 5,
    category: "coltunasi",
    categoryLabel: "Colțunași · Вареники",
    name: "Cu varză",
    nameRu: "С капустой",
    price: 60,
    weight: "300г",
    image: "/images/coltunasi_cartofi.jpg",
  },
  {
    id: 6,
    category: "coltunasi",
    categoryLabel: "Colțunași · Вареники",
    name: "Cu brânză de vaci",
    nameRu: "С творогом",
    price: 60,
    weight: "300г",
    image: "/images/coltunasi_branza.jpg",
  },
  // Pelmeni / Пельмени
  {
    id: 7,
    category: "pelmeni",
    categoryLabel: "Pelmeni · Пельмени",
    name: "Prăjiți",
    nameRu: "Жареные",
    price: 60,
    weight: "260г",
    image: "/images/pelmeni_prajiti.jpg",
  },
  {
    id: 8,
    category: "pelmeni",
    categoryLabel: "Pelmeni · Пельмени",
    name: "Clasici",
    nameRu: "Классические",
    price: 60,
    weight: "380г",
    image: "/images/pelmeni_clasici.jpg",
  },
  {
    id: 9,
    category: "pelmeni",
    categoryLabel: "Pelmeni · Пельмени",
    name: "Cu pui",
    nameRu: "С курицей",
    price: 60,
    weight: "300г",
    image: "/images/pelmeni_clasici.jpg",
  },
  // Garnituri / Гарниры
  {
    id: 10,
    category: "garnitura",
    categoryLabel: "Гарнир",
    name: "Tăiței",
    nameRu: "Лапша",
    price: 50,
    weight: "250г",
    image: "/images/taitei.jpg",
    focusRight: true,
  },
  {
    id: 11,
    category: "garnitura",
    categoryLabel: "Гарнир",
    name: "Mămăligă",
    nameRu: "Мамалыга",
    price: 70,
    weight: "350г",
    image: "/images/mamaliga.jpg",
    focusRight: true,
  },
  {
    id: 12,
    category: "garnitura",
    categoryLabel: "Гарнир",
    name: "Cartofi cu salată",
    nameRu: "Картофель + салат",
    price: 60,
    weight: "350г",
    image: "/images/cartofi_salata.jpg",
  },
  {
    id: 13,
    category: "garnitura",
    categoryLabel: "Гарнир",
    name: "Cartofi prăjiți cu sos",
    nameRu: "Фри с соусом",
    price: 40,
    weight: "150г",
    image: "/images/cartofi_sos.jpg",
  },
  // Snacks / Закуски
  {
    id: 14,
    category: "snacks",
    categoryLabel: "Закуски",
    name: "Nuggets",
    nameRu: "Нагетсы",
    price: 95,
    weight: "400г",
    image: "/images/nuggets.jpg",
  },
  {
    id: 15,
    category: "snacks",
    categoryLabel: "Закуски",
    name: "Aripioare de pui",
    nameRu: "Крылышки куриные",
    price: 95,
    weight: "400г",
    image: "/images/aripioare.jpg",
    focusRight: true,
  },
  {
    id: 16,
    category: "snacks",
    categoryLabel: "Закуски",
    name: "Cașcaval Pane",
    nameRu: "Сыр Пане",
    price: 85,
    weight: "300г",
    image: "/images/cascaval_pane.jpg",
  },
]

const categories = [
  { id: "all", label: "Все" },
  { id: "clatite", label: "Блинчики" },
  { id: "coltunasi", label: "Вареники" },
  { id: "pelmeni", label: "Пельмени" },
  { id: "garnitura", label: "Гарниры" },
  { id: "snacks", label: "Закуски" },
]

export function Menu() {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory)

  return (
    <section id="menu" className="py-20 px-6 bg-white/[0.68] backdrop-blur-[2px]">
      <div className="text-center mb-14">
        <span className="inline-block bg-[#f5c200] text-[#2c1a0e] text-xs font-extrabold uppercase tracking-[3px] px-4 py-1 rounded-full mb-3">
          Наше меню
        </span>
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black uppercase tracking-[1px] text-[#2c1a0e]">
          Выберите любимое блюдо
        </h2>
        <p className="mt-2 opacity-55 text-sm text-[#2c1a0e]">
          Все блюда готовятся из свежих продуктов каждый день
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.5px] border transition-all cursor-pointer ${
              activeCategory === cat.id
                ? "bg-[#f5c200] text-[#2c1a0e] border-[#f5c200]"
                : "bg-black/[0.06] text-[rgba(44,26,14,0.75)] border-black/[0.12] hover:bg-[#f5c200] hover:text-[#2c1a0e] hover:border-[#f5c200]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-black/[0.07] rounded-[18px] overflow-hidden transition-all duration-250 hover:-translate-y-1.5 hover:border-[#f5c200] hover:shadow-[0_12px_40px_rgba(245,194,0,0.15)]"
          >
            <div className="relative w-full h-[185px]">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className={`object-cover ${item.focusRight ? "object-right" : "object-center"}`}
              />
            </div>
            <div className="p-4">
              <div className="text-[0.65rem] font-bold uppercase tracking-[2px] text-[#f5c200] mb-1">
                {item.categoryLabel}
              </div>
              <div className="text-base font-extrabold uppercase tracking-[0.5px] text-[#2c1a0e]">
                {item.name}
              </div>
              <div className="text-xs opacity-50 mt-0.5 italic text-[#2c1a0e]">
                {item.nameRu}
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="bg-[#f5c200] text-[#2c1a0e] font-black text-base px-3 py-1 rounded-full">
                  {item.price} MDL
                </span>
                <span className="text-xs opacity-40">{item.weight}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
