"use client"

import { useLocale } from "./locale-provider"

export function Footer() {
  const { t } = useLocale()

  return (
    <footer className="bg-[#2c1a0e] py-6 text-center text-sm text-white/50">
      <p>{t.footer.copyright}</p>
    </footer>
  )
}
