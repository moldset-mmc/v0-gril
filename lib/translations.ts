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
          title: "Мясо и гриль",
          description: "Шашлык, мититеи и колбаски — сытные блюда для быстрого заказа",
        },
        {
          title: "Домашняя кухня",
          description: "Блинчики, вареники и пельмени — знакомые блюда на каждый день",
        },
        {
          title: "Быстрый заказ",
          description: "Откройте всё меню, соберите заказ и отправьте его сотрудникам",
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
        main: "Основные блюда",
        soups: "Супы",
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
    order: {
      title: "Ваш заказ",
      empty: "Корзина пуста",
      emptyHint: "Добавьте блюда из меню",
      total: "Итого",
      items: "Блюд в заказе",
      comment: "Комментарий к заказу",
      commentHint: "Например: соус отдельно",
      submit: "Отправить заказ",
      sending: "Отправляем…",
      clear: "Очистить заказ",
      error: "Не удалось отправить заказ. Корзина сохранена — попробуйте ещё раз.",
      success: "Заказ отправлен",
      successHint: "Заказ передан сотрудникам. Сохраните номер — назовите его при получении.",
      orderNumber: "Номер заказа",
      backToMenu: "Вернуться в меню",
      newOrder: "Начать новый заказ",
      follow: "Понравилось у нас? Оставайтесь на связи",
      review: "Оставить отзыв",
      share: "Поделиться меню",
      option: "Выберите начинку",
      add: "Добавить",
      linkCopied: "Ссылка на меню скопирована",
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
          title: "Carne & Grill",
          description: "Frigărui, mititei și cârnați — preparate consistente pentru o comandă rapidă",
        },
        {
          title: "Bucătărie casnică",
          description: "Clătite, colțunași și pelmeni — preparate cunoscute pentru fiecare zi",
        },
        {
          title: "Comandă rapidă",
          description: "Deschideți tot meniul, formați comanda și trimiteți-o echipei",
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
        main: "Feluri principale",
        soups: "Supe",
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
    order: {
      title: "Comanda dvs.",
      empty: "Coșul este gol",
      emptyHint: "Adăugați bucate din meniu",
      total: "Total",
      items: "Bucate în comandă",
      comment: "Comentariu la comandă",
      commentHint: "De exemplu: sosul separat",
      submit: "Trimite comanda",
      sending: "Se trimite…",
      clear: "Golește comanda",
      error: "Comanda nu a putut fi trimisă. Coșul a fost păstrat — încercați din nou.",
      success: "Comanda a fost trimisă",
      successHint: "Comanda a fost transmisă echipei. Păstrați numărul și comunicați-l la ridicare.",
      orderNumber: "Numărul comenzii",
      backToMenu: "Înapoi la meniu",
      newOrder: "Comandă nouă",
      follow: "V-a plăcut? Rămâneți alături de noi",
      review: "Lasă o recenzie",
      share: "Distribuie meniul",
      option: "Alegeți umplutura",
      add: "Adaugă",
      linkCopied: "Linkul meniului a fost copiat",
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
  slug?: string
  category: string
  categoryLabel: { ru: string; ro: string }
  name: { ru: string; ro: string }
  description?: { ru: string; ro: string }
  price: number
  weight: string
  image: string
  focusRight?: boolean
  emoji?: string
  drinkBg?: string
  options?: MenuOption[]
  imageZoom?: number
  imagePosition?: string
}

export interface MenuOption {
  value: string
  label: { ru: string; ro: string }
}

// Menu items with translations
export const menuItems: MenuItem[] = [
  // Feluri principale / Основные блюда
  {
    id: 37,
    slug: "frigarui-de-porc",
    category: "main",
    categoryLabel: { ru: "Мясо и гриль", ro: "Carne & Grill" },
    name: { ru: "Шашлык свиной", ro: "Frigărui de porc" },
    description: {
      ru: "Свиной шашлык с запечённым картофелем, капустным салатом, зелёным горошком и соусом.",
      ro: "Frigărui de porc cu cartofi copți, salată de varză, mazăre verde și sos.",
    },
    price: 150,
    weight: "600г",
    image: "/images/frigarui-porc.webp",
  },
  {
    id: 38,
    slug: "frigarui-de-pui",
    category: "main",
    categoryLabel: { ru: "Мясо и гриль", ro: "Carne & Grill" },
    name: { ru: "Шашлык куриный", ro: "Frigărui de pui" },
    description: {
      ru: "Куриный шашлык с запечённым картофелем, капустным салатом, зелёным горошком и соусом.",
      ro: "Frigărui de pui cu cartofi copți, salată de varză, mazăre verde și sos.",
    },
    price: 140,
    weight: "600г",
    image: "/images/frigarui-pui.webp",
  },
  {
    id: 39,
    slug: "carnati-de-pui",
    category: "main",
    categoryLabel: { ru: "Мясо и гриль", ro: "Carne & Grill" },
    name: { ru: "Колбаски куриные", ro: "Cârnați de pui" },
    description: {
      ru: "Куриные колбаски с запечённым картофелем, капустным салатом, зелёным горошком и соусом.",
      ro: "Cârnați de pui cu cartofi copți, salată de varză, mazăre verde și sos.",
    },
    price: 110,
    weight: "600г",
    image: "/images/carnati-pui.webp",
  },
  {
    id: 40,
    slug: "carnati-de-porc",
    category: "main",
    categoryLabel: { ru: "Мясо и гриль", ro: "Carne & Grill" },
    name: { ru: "Колбаски свиные", ro: "Cârnați de porc" },
    description: {
      ru: "Свиные колбаски с запечённым картофелем, капустным салатом, зелёным горошком и соусом.",
      ro: "Cârnați de porc cu cartofi copți, salată de varză, mazăre verde și sos.",
    },
    price: 120,
    weight: "600г",
    image: "/images/carnati-porc.webp",
  },
  {
    id: 41,
    slug: "mititei",
    category: "main",
    categoryLabel: { ru: "Мясо и гриль", ro: "Carne & Grill" },
    name: { ru: "Мититеи", ro: "Mititei" },
    description: {
      ru: "Мититеи с запечённым картофелем, капустным салатом, зелёным горошком и соусом.",
      ro: "Mititei cu cartofi copți, salată de varză, mazăre verde și sos.",
    },
    price: 110,
    weight: "550г",
    image: "/images/mititei.webp",
  },
  {
    id: 42,
    slug: "chighiri",
    category: "main",
    categoryLabel: { ru: "Мясо и гриль", ro: "Carne & Grill" },
    name: { ru: "Чигири", ro: "Chighiri" },
    description: {
      ru: "Два чигири с мамалыгой и соусом — полноценная горячая порция.",
      ro: "Două chighiri cu mămăligă și sos — o porție caldă completă.",
    },
    price: 110,
    weight: "550г",
    image: "/images/chighiri.webp",
  },
  {
    id: 43,
    slug: "cupati",
    category: "main",
    categoryLabel: { ru: "Мясо и гриль", ro: "Carne & Grill" },
    name: { ru: "Купаты", ro: "Cupați" },
    description: {
      ru: "Купаты с картофелем фри, свежим салатом и белым соусом.",
      ro: "Cupați cu cartofi prăjiți, salată proaspătă și sos alb.",
    },
    price: 95,
    weight: "400г",
    image: "/images/cupati.webp",
  },
  {
    id: 44,
    slug: "cheburek",
    category: "main",
    categoryLabel: { ru: "Чебуреки", ro: "Cheburek" },
    name: { ru: "Чебурек", ro: "Cheburek" },
    description: {
      ru: "Хрустящий чебурек. Выберите одну из пяти начинок перед добавлением в заказ.",
      ro: "Cheburek crocant. Alegeți una dintre cele cinci umpluturi înainte de a-l adăuga în comandă.",
    },
    price: 50,
    weight: "1 шт.",
    image: "/images/cheburek-board.webp",
    options: [
      { value: "lamb", label: { ru: "С бараниной", ro: "Cu carne de miel" } },
      { value: "beef", label: { ru: "С говядиной", ro: "Cu carne de vită" } },
      { value: "chicken", label: { ru: "С курицей", ro: "Cu pui" } },
      { value: "pork", label: { ru: "Со свининой", ro: "Cu porc" } },
      { value: "ham-cheese", label: { ru: "С ветчиной и сыром", ro: "Cu șuncă și cașcaval" } },
    ],
  },

  // Supe / Супы
  {
    id: 45,
    slug: "bors",
    category: "soups",
    categoryLabel: { ru: "Супы", ro: "Supe" },
    name: { ru: "Борщ", ro: "Borș" },
    description: {
      ru: "Горячий борщ с насыщенным овощным бульоном, свёклой, мясом и зеленью.",
      ro: "Borș cald cu bulion bogat de legume, sfeclă, carne și verdeață.",
    },
    price: 60,
    weight: "400г",
    image: "/images/bors.webp",
  },
  {
    id: 46,
    slug: "zeama",
    category: "soups",
    categoryLabel: { ru: "Супы", ro: "Supe" },
    name: { ru: "Зама", ro: "Zeamă" },
    description: {
      ru: "Лёгкая горячая зама с курицей, овощами, домашней лапшой и зеленью.",
      ro: "Zeamă caldă și ușoară cu pui, legume, tăiței de casă și verdeață.",
    },
    price: 50,
    weight: "450г",
    image: "/images/zeama.webp",
  },
  {
    id: 47,
    slug: "soleanca",
    category: "soups",
    categoryLabel: { ru: "Супы", ro: "Supe" },
    name: { ru: "Солянка", ro: "Soleancă" },
    description: {
      ru: "Насыщенная солянка с мясными ингредиентами, маслинами, лимоном и зеленью.",
      ro: "Soleancă bogată cu ingrediente din carne, măsline, lămâie și verdeață.",
    },
    price: 70,
    weight: "350г",
    image: "/images/soleanca.webp",
  },

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
    id: 19,
    category: "beer",
    categoryLabel: { ru: "Пиво пшеничное", ro: "Bere de grâu" },
    name: { ru: "Waisse (Пшеничное)", ro: "Waisse" },
    price: 55,
    weight: "0.5л · 5.2%",
    image: "/images/gotter_waisse.jpg",
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
    price: 25,
    weight: "250мл",
    image: "/images/vin_rosu.jpg",
  },
  {
    id: 31,
    category: "wine",
    categoryLabel: { ru: "Вино белое", ro: "Vin alb" },
    name: { ru: "Белое вино", ro: "Vin alb" },
    price: 25,
    weight: "250мл",
    image: "/images/vin_alb.jpg",
  },
  {
    id: 32,
    category: "wine",
    categoryLabel: { ru: "Вино розовое", ro: "Vin roze" },
    name: { ru: "Розовое вино", ro: "Vin roze" },
    price: 25,
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
