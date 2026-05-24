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
        lines: ["Wine & Grill", "Кишинёв, Молдова"],
      },
      hours: {
        title: "Часы работы",
        lines: ["Пн–Вс", "10:00 — 22:00"],
      },
      phone: {
        title: "Телефон",
        lines: ["Уточните у заведения"],
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
        lines: ["Wine & Grill", "Chișinău, Moldova"],
      },
      hours: {
        title: "Program",
        lines: ["Lu–Du", "10:00 — 22:00"],
      },
      phone: {
        title: "Telefon",
        lines: ["Verificați la local"],
      },
      viewMenu: "Vezi meniul",
    },
    // Footer
    footer: {
      copyright: "© 2026 Wine & Grill — Toate prețurile în MDL",
    },
  },
} as const

// Menu items with translations
export const menuItems = [
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
] as const
