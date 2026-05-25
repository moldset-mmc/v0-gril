export type Locale = "ru" | "ro"

export const translations = {
  ru: {
    // Navbar
    nav: {
      menu: "Меню",
      atmosphere: "Атмосфера",
      contacts: "Контакты",
    },
    // Hero
    hero: {
      subtitle: "Ресторан · Вкус · Атмосфера",
      viewMenu: "Смотреть меню",
      contacts: "Контакты",
      scroll: "SCROLL",
    },
    // Highlights
    highlights: {
      items: [
        {
          title: "Домашняя кухня",
          description: "Блинчики, вареники, пельмени — блюда как у мамы, приготовленные с любовью",
        },
        {
          title: "Wine & Grill",
          description: "Хорошее вино и настоящий гриль — сочетание, которое делает вечер незабываемым",
        },
        {
          title: "Быстро и вкусно",
          description: "Свежие блюда по доступным ценам от 40 до 95 MDL — для любого случая",
        },
      ],
    },
    // Menu
    menu: {
      badge: "Наше меню",
      title: "Выберите любимое блюдо",
      subtitle: "Все блюда готовятся из свежих продуктов каждый день",
      categories: {
        all: "Все",
        clatite: "Блинчики",
        coltunasi: "Вареники",
        pelmeni: "Пельмени",
        garnitura: "Гарниры",
        snacks: "Закуски",
        beer: "🍺 Пиво",
        wine: "🍷 Вино",
        spirits: "🥃 Крепкие",
      },
    },
    // Atmosphere
    atmosphere: {
      badge: "Атмосфера",
      title: "Приходите к нам",
      subtitle: "Тёплая обстановка, живое дерево, вкусная еда",
    },
    // Contact
    contact: {
      badge: "Найдите нас",
      title: "Контакты",
      address: {
        title: "Адрес",
        lines: ["ул. Григоре Александреску 2", "Кишинёв, Молдова"],
      },
      hours: {
        title: "Часы работы",
        lines: ["Пн–Вс", "10:00 — 22:00"],
      },
      phone: {
        title: "Телефон",
        lines: ["069 689 062"],
      },
      viewMenu: "Смотреть меню",
    },
    // Footer
    footer: {
      copyright: "© 2026 Wine & Grill — Все цены в MDL",
    },
  },
  ro: {
    // Navbar
    nav: {
      menu: "Meniu",
      atmosphere: "Atmosferă",
      contacts: "Contacte",
    },
    // Hero
    hero: {
      subtitle: "Restaurant · Gust · Atmosferă",
      viewMenu: "Vezi meniul",
      contacts: "Contacte",
      scroll: "SCROLL",
    },
    // Highlights
    highlights: {
      items: [
        {
          title: "Bucătărie casnică",
          description: "Clătite, colțunași, pelmeni — mâncăruri ca la mama, pregătite cu dragoste",
        },
        {
          title: "Wine & Grill",
          description: "Vin bun și grătar adevărat — combinația care face seara de neuitat",
        },
        {
          title: "Rapid și gustos",
          description: "Mâncăruri proaspete la prețuri accesibile de la 40 la 95 MDL — pentru orice ocazie",
        },
      ],
    },
    // Menu
    menu: {
      badge: "Meniul nostru",
      title: "Alege felul tău preferat",
      subtitle: "Toate felurile sunt pregătite din produse proaspete în fiecare zi",
      categories: {
        all: "Toate",
        clatite: "Clătite",
        coltunasi: "Colțunași",
        pelmeni: "Pelmeni",
        garnitura: "Garnituri",
        snacks: "Gustări",
        beer: "🍺 Bere",
        wine: "🍷 Vin",
        spirits: "🥃 Tari",
      },
    },
    // Atmosphere
    atmosphere: {
      badge: "Atmosferă",
      title: "Veniți la noi",
      subtitle: "Ambient cald, lemn natural, mâncare delicioasă",
    },
    // Contact
    contact: {
      badge: "Găsește-ne",
      title: "Contacte",
      address: {
        title: "Adresă",
        lines: ["Str. Grigore Alexandrescu 2", "Chișinău, Moldova"],
      },
      hours: {
        title: "Program",
        lines: ["Lu–Du", "10:00 — 22:00"],
      },
      phone: {
        title: "Telefon",
        lines: ["069 689 062"],
      },
      viewMenu: "Vezi meniul",
    },
    // Footer
    footer: {
      copyright: "© 2026 Wine & Grill — Toate prețurile în MDL",
    },
  },
} as const

export interface MenuItem {
  id: number
  category: string
  categoryLabel: { ru: string; ro: string }
  name: { ru: string; ro: string }
  price: number
  weight: string
  image: string
  focusRight?: boolean
  emoji?: string
  drinkBg?: string
}

// Menu items with translations
export const menuItems: MenuItem[] = [
  // Clătite / Блинчики
  {
    id: 1,
    category: "clatite",
    categoryLabel: { ru: "Clătite · Блинчики", ro: "Clătite" },
    name: { ru: "С курицей и сыром", ro: "Cu pui și cașcaval" },
    price: 85,
    weight: "300г",
    image: "/images/clatite_pui.jpg",
  },
  {
    id: 2,
    category: "clatite",
    categoryLabel: { ru: "Clătite · Блинчики", ro: "Clătite" },
    name: { ru: "С мясом", ro: "Cu carne" },
    price: 85,
    weight: "300г",
    image: "/images/clatite_pui.jpg",
  },
  {
    id: 3,
    category: "clatite",
    categoryLabel: { ru: "Clătite · Блинчики", ro: "Clătite" },
    name: { ru: "С творогом", ro: "Cu brânză de vaci" },
    price: 85,
    weight: "300г",
    image: "/images/clatite_branza.jpg",
  },
  // Colțunași / Вареники
  {
    id: 4,
    category: "coltunasi",
    categoryLabel: { ru: "Colțunași · Вареники", ro: "Colțunași" },
    name: { ru: "С картошкой", ro: "Cu cartofi" },
    price: 60,
    weight: "300г",
    image: "/images/coltunasi_cartofi.jpg",
  },
  {
    id: 5,
    category: "coltunasi",
    categoryLabel: { ru: "Colțunași · Вареники", ro: "Colțunași" },
    name: { ru: "С капустой", ro: "Cu varză" },
    price: 60,
    weight: "300г",
    image: "/images/coltunasi_cartofi.jpg",
  },
  {
    id: 6,
    category: "coltunasi",
    categoryLabel: { ru: "Colțunași · Вареники", ro: "Colțunași" },
    name: { ru: "С творогом", ro: "Cu brânză de vaci" },
    price: 60,
    weight: "300г",
    image: "/images/coltunasi_branza.jpg",
  },
  // Pelmeni / Пельмени
  {
    id: 7,
    category: "pelmeni",
    categoryLabel: { ru: "Pelmeni · Пельмени", ro: "Pelmeni" },
    name: { ru: "Жареные", ro: "Prăjiți" },
    price: 60,
    weight: "260г",
    image: "/images/pelmeni_prajiti.jpg",
  },
  {
    id: 8,
    category: "pelmeni",
    categoryLabel: { ru: "Pelmeni · Пельмени", ro: "Pelmeni" },
    name: { ru: "Классические", ro: "Clasici" },
    price: 60,
    weight: "380г",
    image: "/images/pelmeni_clasici.jpg",
  },
  {
    id: 9,
    category: "pelmeni",
    categoryLabel: { ru: "Pelmeni · Пельмени", ro: "Pelmeni" },
    name: { ru: "С курицей", ro: "Cu pui" },
    price: 60,
    weight: "300г",
    image: "/images/pelmeni_clasici.jpg",
  },
  // Garnituri / Гарниры
  {
    id: 10,
    category: "garnitura",
    categoryLabel: { ru: "Гарнир", ro: "Garnitură" },
    name: { ru: "Лапша", ro: "Tăiței" },
    price: 50,
    weight: "250г",
    image: "/images/taitei.jpg",
    focusRight: true,
  },
  {
    id: 11,
    category: "garnitura",
    categoryLabel: { ru: "Гарнир", ro: "Garnitură" },
    name: { ru: "Мамалыга", ro: "Mămăligă" },
    price: 70,
    weight: "350г",
    image: "/images/mamaliga.jpg",
    focusRight: true,
  },
  {
    id: 12,
    category: "garnitura",
    categoryLabel: { ru: "Гарнир", ro: "Garnitură" },
    name: { ru: "Картофель + салат", ro: "Cartofi cu salată" },
    price: 60,
    weight: "350г",
    image: "/images/cartofi_salata.jpg",
  },
  {
    id: 13,
    category: "garnitura",
    categoryLabel: { ru: "Гарнир", ro: "Garnitură" },
    name: { ru: "Фри с соусом", ro: "Cartofi prăjiți cu sos" },
    price: 40,
    weight: "150г",
    image: "/images/cartofi_sos.jpg",
  },
  // Snacks / Закуски
  {
    id: 14,
    category: "snacks",
    categoryLabel: { ru: "Закуски", ro: "Gustări" },
    name: { ru: "Нагетсы", ro: "Nuggets" },
    price: 95,
    weight: "400г",
    image: "/images/nuggets.jpg",
  },
  {
    id: 15,
    category: "snacks",
    categoryLabel: { ru: "Закуски", ro: "Gustări" },
    name: { ru: "Крылышки куриные", ro: "Aripioare de pui" },
    price: 95,
    weight: "400г",
    image: "/images/aripioare.jpg",
    focusRight: true,
  },
  {
    id: 16,
    category: "snacks",
    categoryLabel: { ru: "Закуски", ro: "Gustări" },
    name: { ru: "Сыр Пане", ro: "Cașcaval Pane" },
    price: 85,
    weight: "300г",
    image: "/images/cascaval_pane.jpg",
  },

  // ── ПИВО GOTTER ──────────────────────────────────────────
  {
    id: 17,
    category: "beer",
    categoryLabel: { ru: "Пиво светлое", ro: "Bere blondă" },
    name: { ru: "Pilsner Filtrată", ro: "Pilsner Filtrată" },
    price: 50,
    weight: "0.5л · 4.5%",
    image: "/images/gotter_pilsner.jpg",
  },
  {
    id: 18,
    category: "beer",
    categoryLabel: { ru: "Пиво нефильтрованное", ro: "Bere nefiltrată" },
    name: { ru: "Pilsner Nefiltrată", ro: "Pilsner Nefiltrată" },
    price: 50,
    weight: "0.5л · 4.5%",
    image: "/images/gotter_pilsner_nef.jpg",
  },
  {
    id: 19,
    category: "beer",
    categoryLabel: { ru: "Пиво пшеничное", ro: "Bere de grâu" },
    name: { ru: "Waisse (Пшеничное)", ro: "Waisse" },
    price: 55,
    weight: "0.5л · 5.2%",
    image: "/images/gotter_waisse.jpg",
  },
  {
    id: 20,
    category: "beer",
    categoryLabel: { ru: "Пиво IPA", ro: "Bere IPA" },
    name: { ru: "IPA", ro: "IPA" },
    price: 60,
    weight: "0.5л · 5.2%",
    image: "/images/gotter_ipa.jpg",
  },
  {
    id: 21,
    category: "beer",
    categoryLabel: { ru: "Пиво тёмное", ro: "Bere brună" },
    name: { ru: "Брюне (Тёмное)", ro: "Brună" },
    price: 55,
    weight: "0.5л · 4.4%",
    image: "/images/gotter_bruna.jpg",
  },
  {
    id: 22,
    category: "beer",
    categoryLabel: { ru: "Пиво мюнхенское", ro: "Bere Munchen" },
    name: { ru: "Munchen", ro: "Munchen" },
    price: 55,
    weight: "0.5л · 4.7%",
    image: "/images/gotter_munchen.jpg",
  },
  {
    id: 23,
    category: "beer",
    categoryLabel: { ru: "Пиво Porter", ro: "Bere Porter" },
    name: { ru: "Porter Nefiltrată", ro: "Porter Nefiltrată" },
    price: 60,
    weight: "0.5л",
    image: "/images/gotter_porter.jpg",
  },
  {
    id: 24,
    category: "beer",
    categoryLabel: { ru: "Пиво Double IPA", ro: "Bere Double IPA" },
    name: { ru: "Double IPA", ro: "Double IPA" },
    price: 65,
    weight: "0.5л · 8%",
    image: "/images/gotter_double_ipa.jpg",
  },
  {
    id: 25,
    category: "beer",
    categoryLabel: { ru: "Пиво Stout", ro: "Bere Stout" },
    name: { ru: "Stout Imperial", ro: "Stout Imperial" },
    price: 65,
    weight: "0.5л · 8%",
    image: "/images/gotter_stout.jpg",
  },
  {
    id: 26,
    category: "beer",
    categoryLabel: { ru: "Пиво лимонное", ro: "Bere Lemon" },
    name: { ru: "Lemon (Лимонное)", ro: "Lemon" },
    price: 40,
    weight: "0.33л · 2.4%",
    image: "/images/gotter_lemon.jpg",
  },
  {
    id: 27,
    category: "beer",
    categoryLabel: { ru: "Пиво бельгийский эль", ro: "Bere ALE Belgian" },
    name: { ru: "ALE Belgian", ro: "ALE Belgian" },
    price: 55,
    weight: "0.5л · 4%",
    image: "/images/gotter_ale.jpg",
  },
  {
    id: 28,
    category: "beer",
    categoryLabel: { ru: "Безалкогольный Мохито", ro: "Mojito Gotter" },
    name: { ru: "Mojito Gotter", ro: "Mojito Gotter" },
    price: 40,
    weight: "0.5л",
    image: "/images/gotter_mojito.jpg",
  },
  {
    id: 29,
    category: "beer",
    categoryLabel: { ru: "Квас хлебный", ro: "Cvas de pâine" },
    name: { ru: "Квас Gotter", ro: "Cvas Gotter" },
    price: 30,
    weight: "0.5л",
    image: "/images/gotter_cvas.jpg",
  },

  // ── ВИНО ─────────────────────────────────────────────────
  {
    id: 30,
    category: "wine",
    categoryLabel: { ru: "Вино красное", ro: "Vin roșu" },
    name: { ru: "Красное вино", ro: "Vin roșu" },
    price: 30,
    weight: "250мл",
    image: "/images/vin_rosu.jpg",
  },
  {
    id: 31,
    category: "wine",
    categoryLabel: { ru: "Вино белое", ro: "Vin alb" },
    name: { ru: "Белое вино", ro: "Vin alb" },
    price: 30,
    weight: "250мл",
    image: "/images/vin_alb.jpg",
  },
  {
    id: 32,
    category: "wine",
    categoryLabel: { ru: "Вино розовое", ro: "Vin roze" },
    name: { ru: "Розовое вино", ro: "Vin roze" },
    price: 30,
    weight: "250мл",
    image: "/images/vin_roze.jpg",
  },

  // ── КРЕПКИЙ АЛКОГОЛЬ ─────────────────────────────────────
  {
    id: 33,
    category: "spirits",
    categoryLabel: { ru: "Водка", ro: "Vodcă" },
    name: { ru: "Водка", ro: "Vodcă" },
    price: 40,
    weight: "50мл",
    image: "/images/vodka.jpg",
  },
  {
    id: 34,
    category: "spirits",
    categoryLabel: { ru: "Коньяк", ro: "Coniac" },
    name: { ru: "Коньяк", ro: "Coniac" },
    price: 55,
    weight: "50мл",
    image: "/images/coniac.jpg",
  },
  {
    id: 35,
    category: "spirits",
    categoryLabel: { ru: "Виски", ro: "Whisky" },
    name: { ru: "Виски", ro: "Whisky" },
    price: 65,
    weight: "50мл",
    image: "/images/whisky.jpg",
  },
  {
    id: 36,
    category: "spirits",
    categoryLabel: { ru: "Ром", ro: "Rom" },
    name: { ru: "Ром", ro: "Rom" },
    price: 55,
    weight: "50мл",
    image: "/images/rom.jpg",
  },
]
