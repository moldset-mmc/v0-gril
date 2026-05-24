"use client"

import Image from "next/image"
import { useLocale } from "./locale-provider"

const photos = [
  "/images/clatite_branza.jpg",
  "/images/nuggets.jpg",
  "/images/pelmeni_prajiti.jpg",
  "/images/aripioare.jpg",
  "/images/cascaval_pane.jpg",
  "/images/cartofi_salata.jpg",
  "/images/mamaliga.jpg",
  "/images/coltunasi_branza.jpg",
]

export function Atmosphere() {
  const { t } = useLocale()

  return (
    <section id="atmosphere" className="py-16 bg-white/[0.55] overflow-hidden">
      <div className="text-center px-6 pb-12">
        <span className="inline-block bg-[#f5c200] text-[#2c1a0e] text-xs font-extrabold uppercase tracking-[3px] px-4 py-1 rounded-full mb-3">
          {t.atmosphere.badge}
        </span>
        <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black uppercase tracking-[1px] text-[#2c1a0e]">
          {t.atmosphere.title}
        </h2>
        <p className="mt-2 opacity-55 text-sm text-[#2c1a0e]">
          {t.atmosphere.subtitle}
        </p>
      </div>

      <div className="overflow-hidden">
        <div className="flex gap-4 w-max animate-marquee">
          {/* First set */}
          {photos.map((photo, index) => (
            <div
              key={`first-${index}`}
              className="relative h-[220px] w-[330px] flex-shrink-0"
            >
              <Image
                src={photo}
                alt=""
                fill
                className={`object-cover rounded-xl ${
                  photo.includes("aripioare") || photo.includes("mamaliga")
                    ? "object-right"
                    : "object-center"
                }`}
              />
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {photos.map((photo, index) => (
            <div
              key={`second-${index}`}
              className="relative h-[220px] w-[330px] flex-shrink-0"
            >
              <Image
                src={photo}
                alt=""
                fill
                className={`object-cover rounded-xl ${
                  photo.includes("aripioare") || photo.includes("mamaliga")
                    ? "object-right"
                    : "object-center"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
