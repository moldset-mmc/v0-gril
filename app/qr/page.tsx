import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "QR-набор Wine & Grill",
  robots: {
    index: false,
    follow: false,
  },
}

const qrCodes = [
  {
    id: "menu",
    title: "Полное меню",
    subtitle: "Meniul complet",
    href: "https://kitchenap.md/?qr=menu#menu",
  },
  {
    id: "main",
    title: "Мясо и гриль",
    subtitle: "Carne & Grill",
    href: "https://kitchenap.md/?category=main&qr=group-main#menu",
  },
  {
    id: "soups",
    title: "Супы",
    subtitle: "Supe",
    href: "https://kitchenap.md/?category=soups&qr=group-soups#menu",
  },
  {
    id: "clatite",
    title: "Блинчики",
    subtitle: "Clătite",
    href: "https://kitchenap.md/?category=clatite&qr=group-clatite#menu",
  },
  {
    id: "coltunasi",
    title: "Вареники",
    subtitle: "Colțunași",
    href: "https://kitchenap.md/?category=coltunasi&qr=group-coltunasi#menu",
  },
  {
    id: "pelmeni",
    title: "Пельмени",
    subtitle: "Pelmeni",
    href: "https://kitchenap.md/?category=pelmeni&qr=group-pelmeni#menu",
  },
  {
    id: "garnitura",
    title: "Гарниры",
    subtitle: "Garnituri",
    href: "https://kitchenap.md/?category=garnitura&qr=group-garnitura#menu",
  },
  {
    id: "snacks",
    title: "Закуски",
    subtitle: "Gustări",
    href: "https://kitchenap.md/?category=snacks&qr=group-snacks#menu",
  },
  {
    id: "beer",
    title: "Пиво",
    subtitle: "Bere",
    href: "https://kitchenap.md/?category=beer&qr=group-beer#menu",
  },
  {
    id: "wine",
    title: "Вино",
    subtitle: "Vin",
    href: "https://kitchenap.md/?category=wine&qr=group-wine#menu",
  },
  {
    id: "spirits",
    title: "Крепкие напитки",
    subtitle: "Băuturi tari",
    href: "https://kitchenap.md/?category=spirits&qr=group-spirits#menu",
  },
] as const

export default function QrBoardPage() {
  return (
    <main className="min-h-screen bg-[#f8f0e4] px-4 py-10 text-[#2c1a0e] sm:px-8">
      <header className="mx-auto max-w-6xl text-center print:mb-5">
        <div className="mx-auto inline-flex rounded-full bg-[#2c1a0e] px-5 py-2 text-xs font-black uppercase tracking-[2px] text-[#f5c200]">
          Wine & Grill
        </div>
        <h1 className="mt-4 text-3xl font-black uppercase sm:text-5xl">
          QR-коды для печати
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#2c1a0e]/65 print:hidden">
          Полный QR ведёт ко всему меню. QR конкретного товара должен использовать
          код его группы: клиент увидит все подходящие блюда и сможет выбрать.
        </p>
      </header>

      <section className="mx-auto mt-9 grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 print:mt-4 print:grid-cols-3">
        {qrCodes.map((qr) => (
          <article
            key={qr.id}
            className="break-inside-avoid rounded-3xl border border-black/10 bg-white p-4 text-center shadow-sm print:rounded-xl print:p-3 print:shadow-none"
          >
            <Image
              src={`/qr/${qr.id}.svg`}
              alt={`QR: ${qr.title}`}
              width={1024}
              height={1024}
              className="aspect-square h-auto w-full"
              priority={qr.id === "menu"}
            />
            <h2 className="mt-3 text-sm font-black uppercase leading-tight sm:text-base">
              {qr.title}
            </h2>
            <p className="mt-1 text-xs font-semibold text-[#9a7300]">{qr.subtitle}</p>
            <a
              href={`/qr/${qr.id}.svg`}
              download={`wine-grill-${qr.id}.svg`}
              className="mt-3 inline-flex min-h-10 items-center justify-center rounded-full bg-[#f5c200] px-4 text-xs font-black uppercase print:hidden"
            >
              Скачать SVG
            </a>
            <p className="mt-3 break-all text-[0.55rem] leading-relaxed text-black/40 print:text-[0.45rem]">
              {qr.href}
            </p>
          </article>
        ))}
      </section>
    </main>
  )
}
