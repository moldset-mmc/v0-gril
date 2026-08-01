"use client"

import Image from "next/image"
import Link from "next/link"
import { useLocale } from "./locale-provider"

const steps = [
  {
    number: "01",
    image: "/images/main-grill-board.webp",
    ru: { title: "Откройте меню", text: "Сканируйте общий QR-код или QR нужной группы — без привязки к столику." },
    ro: { title: "Deschideți meniul", text: "Scanați codul QR general sau codul categoriei dorite — fără legare de masă." },
  },
  {
    number: "02",
    image: "/images/cheburek-board.webp",
    ru: { title: "Выберите блюда", text: "Нажмите карточку, посмотрите увеличенное фото и описание, затем добавьте блюдо." },
    ro: { title: "Alegeți preparatele", text: "Apăsați fișa, vedeți fotografia mărită și descrierea, apoi adăugați preparatul." },
  },
  {
    number: "03",
    image: "/images/soups-board.webp",
    ru: { title: "Отправьте заказ", text: "Проверьте позиции и сумму. Готовый заказ отправится сотрудникам заведения." },
    ro: { title: "Trimiteți comanda", text: "Verificați preparatele și totalul. Comanda ajunge direct la echipa localului." },
  },
] as const

export function Atmosphere() {
  const { locale } = useLocale()

  return (
    <section id="how-to-order" className="bg-[#2c1a0e] px-4 py-14 text-white sm:px-6 sm:py-20">
      <div className="mx-auto max-w-[1050px]">
        <div className="text-center">
          <span className="mb-3 inline-block rounded-full bg-[#f5c200] px-4 py-1 text-xs font-extrabold uppercase tracking-[3px] text-[#2c1a0e]">
            {locale === "ru" ? "Быстрый заказ" : "Comandă rapidă"}
          </span>
          <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black uppercase tracking-[1px]">
            {locale === "ru" ? "Три шага — и заказ готов" : "Trei pași — și comanda este gata"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/60">
            {locale === "ru"
              ? "Подходит для заказа у стойки, навынос или за столиком. Номер стола не требуется."
              : "Potrivit pentru comandă la tejghea, la pachet sau la masă. Numărul mesei nu este necesar."}
          </p>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {steps.map((step) => {
            const copy = step[locale]
            return (
              <article key={step.number} className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={step.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 95vw, 33vw"
                    className="object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-[#2c1a0e] via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 text-4xl font-black text-[#f5c200]">{step.number}</span>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-black uppercase">{copy.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{copy.text}</p>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="#menu"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#f5c200] px-8 text-sm font-black uppercase tracking-[0.8px] text-[#2c1a0e] transition hover:-translate-y-0.5 hover:bg-[#ffd21a]"
          >
            {locale === "ru" ? "Перейти к меню" : "Deschide meniul"}
          </Link>
        </div>
      </div>
    </section>
  )
}
