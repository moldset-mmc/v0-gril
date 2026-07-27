"use client"

import { useEffect, useMemo, useState } from "react"
import { useCart } from "@/lib/cart-context"
import { reviewUrl, socialLinks } from "@/lib/site-config"
import { useLocale } from "./locale-provider"

interface OrderResponse {
  ok: boolean
  orderId?: string
  total?: number
  error?: string
}

const TABLE_STORAGE_KEY = "wine-grill-table"
const CHECKOUT_KEY_STORAGE = "wine-grill-checkout-key"
const CHECKOUT_SIGNATURE_STORAGE = "wine-grill-checkout-signature"

function createIdempotencyKey() {
  return globalThis.crypto?.randomUUID?.() ??
    `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function CartSheet() {
  const { items, removeItem, addItem, clearCart, total, isOpen, setIsOpen } = useCart()
  const { locale, t } = useLocale()
  const [table, setTable] = useState("")
  const [comment, setComment] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [orderId, setOrderId] = useState("")
  const [tableError, setTableError] = useState(false)
  const [shareNotice, setShareNotice] = useState(false)

  const cartSignature = useMemo(
    () =>
      JSON.stringify(
        items.map(({ item, option, quantity }) => [
          item.id,
          option?.value ?? "",
          quantity,
        ])
      ),
    [items]
  )

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const qrTable = params.get("table")
    const savedTable = localStorage.getItem(TABLE_STORAGE_KEY)
    const initialTable = qrTable && /^\d{1,2}$/.test(qrTable) ? qrTable : savedTable
    if (initialTable) {
      setTable(initialTable)
      localStorage.setItem(TABLE_STORAGE_KEY, initialTable)
    }
  }, [])

  useEffect(() => {
    const previousSignature = localStorage.getItem(CHECKOUT_SIGNATURE_STORAGE)
    if (previousSignature === cartSignature) return
    localStorage.setItem(CHECKOUT_SIGNATURE_STORAGE, cartSignature)
    localStorage.setItem(CHECKOUT_KEY_STORAGE, createIdempotencyKey())
    if (status !== "sending") setStatus("idle")
  }, [cartSignature, status])

  if (!isOpen) return null

  const updateTable = (value: string) => {
    const normalized = value.replace(/\D/g, "").slice(0, 2)
    setTable(normalized)
    setTableError(false)
    if (normalized) localStorage.setItem(TABLE_STORAGE_KEY, normalized)
  }

  const submitOrder = async () => {
    const tableNumber = Number(table)
    if (!Number.isInteger(tableNumber) || tableNumber < 1 || tableNumber > 99) {
      setTableError(true)
      return
    }
    if (!items.length || status === "sending") return

    setStatus("sending")
    setTableError(false)

    try {
      const params = new URLSearchParams(window.location.search)
      let idempotencyKey = localStorage.getItem(CHECKOUT_KEY_STORAGE)
      if (!idempotencyKey) {
        idempotencyKey = createIdempotencyKey()
        localStorage.setItem(CHECKOUT_KEY_STORAGE, idempotencyKey)
      }

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idempotencyKey,
          locale,
          table: tableNumber,
          comment,
          items: items.map(({ item, option, quantity }) => ({
            id: item.id,
            optionValue: option?.value,
            quantity,
          })),
          source: {
            category: params.get("category"),
            dish: params.get("dish"),
            qrCode: params.get("qr"),
          },
        }),
      })

      const data = (await response.json()) as OrderResponse
      if (!response.ok || !data.ok || !data.orderId) throw new Error(data.error)

      setOrderId(data.orderId)
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  const startNewOrder = () => {
    clearCart()
    setComment("")
    setOrderId("")
    setStatus("idle")
    localStorage.setItem(CHECKOUT_KEY_STORAGE, createIdempotencyKey())
    setIsOpen(false)
    window.setTimeout(() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" }), 50)
  }

  const shareMenu = async () => {
    const shareData = {
      title: "Wine & Grill",
      text: locale === "ru" ? "Меню Wine & Grill" : "Meniul Wine & Grill",
      url: window.location.origin,
    }

    try {
      if (navigator.share) await navigator.share(shareData)
      else await navigator.clipboard.writeText(shareData.url)
      setShareNotice(true)
      window.setTimeout(() => setShareNotice(false), 2200)
    } catch {
      // The user may close the native share dialog; no error needs to be shown.
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      <button
        className="absolute inset-0 bg-black/65 backdrop-blur-[3px]"
        onClick={() => setIsOpen(false)}
        aria-label="Close"
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="relative z-[1] w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden"
      >
        <header className="flex items-center justify-between px-5 sm:px-7 py-4 sm:py-5 border-b-2 border-gray-100">
          <div className="flex items-center gap-3">
            <span className="text-3xl" aria-hidden="true">🛒</span>
            <h2 id="cart-title" className="text-xl sm:text-2xl font-black uppercase tracking-[1px] sm:tracking-[2px] text-[#2c1a0e]">
              {status === "success" ? t.order.success : t.order.title}
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-all text-2xl font-bold leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </header>

        {status === "success" ? (
          <div className="overflow-y-auto px-5 sm:px-7 py-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#f5c200] flex items-center justify-center text-3xl font-black text-[#2c1a0e]">
                ✓
              </div>
              <p className="mt-4 text-sm text-[#2c1a0e]/65">{t.order.successHint}</p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#2c1a0e] text-white px-4 py-2 text-sm font-bold">
                {t.order.orderNumber}: <span className="text-[#f5c200]">{orderId}</span>
              </div>
              <p className="mt-2 text-sm font-bold text-[#2c1a0e]">
                {t.order.table}: {table}
              </p>
            </div>

            <div className="rounded-2xl bg-[#fff9e9] border border-[#f5c200]/40 px-4 py-2">
              {items.map(({ key, item, option, quantity }) => (
                <div key={key} className="flex gap-3 justify-between py-3 border-b border-black/5 last:border-0 text-sm">
                  <span className="font-semibold text-[#2c1a0e]">
                    {quantity} × {item.name[locale]}
                    {option && <span className="block text-xs font-normal text-[#2c1a0e]/55">{option.label[locale]}</span>}
                  </span>
                  <strong className="whitespace-nowrap text-[#2c1a0e]">{item.price * quantity} MDL</strong>
                </div>
              ))}
              <div className="flex justify-between py-3 text-lg font-black uppercase text-[#2c1a0e]">
                <span>{t.order.total}</span>
                <span>{total} MDL</span>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-[#2c1a0e] text-white p-5 text-center">
              <h3 className="text-lg font-black">{t.order.follow}</h3>
              {socialLinks.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full bg-white/10 hover:bg-[#f5c200] hover:text-[#2c1a0e] px-4 py-2 text-sm font-bold transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <button
                  onClick={shareMenu}
                  className="flex-1 rounded-full bg-[#f5c200] text-[#2c1a0e] px-4 py-3 text-sm font-black uppercase"
                >
                  {shareNotice ? t.order.linkCopied : t.order.share}
                </button>
                {reviewUrl.startsWith("https://") && (
                  <a
                    href={reviewUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 rounded-full border border-white/30 px-4 py-3 text-sm font-black uppercase hover:border-[#f5c200] hover:text-[#f5c200] transition-colors"
                  >
                    {t.order.review}
                  </a>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full border-2 border-[#2c1a0e]/15 px-4 py-3 text-sm font-bold uppercase text-[#2c1a0e]"
              >
                {t.order.backToMenu}
              </button>
              <button
                onClick={startNewOrder}
                className="rounded-full bg-[#c0392b] px-4 py-3 text-sm font-black uppercase text-white"
              >
                {t.order.newOrder}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-4">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-5xl mb-4">🍽</p>
                  <p className="text-gray-400 text-xl font-semibold">{t.order.empty}</p>
                  <p className="text-gray-300 text-sm mt-1">{t.order.emptyHint}</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {items.map(({ key, item, option, quantity }) => (
                    <div key={key} className="flex items-center gap-3 py-4 border-b border-gray-100 last:border-0">
                      <div className="flex-1 min-w-0">
                        <div className="text-base sm:text-lg font-black text-[#2c1a0e] leading-tight">
                          {item.name[locale]}
                        </div>
                        {option && (
                          <div className="text-xs font-semibold text-[#c0392b] mt-1">
                            {option.label[locale]}
                          </div>
                        )}
                        <div className="text-xs sm:text-sm text-gray-400 mt-1">
                          {item.price} MDL · {item.weight}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => removeItem(key)}
                          className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-xl font-black text-[#2c1a0e] flex items-center justify-center"
                          aria-label="Minus"
                        >
                          −
                        </button>
                        <span className="text-lg font-black text-[#2c1a0e] w-6 text-center">{quantity}</span>
                        <button
                          onClick={() => addItem(item, option)}
                          className="w-9 h-9 rounded-full bg-[#f5c200] hover:bg-[#e6b800] text-xl font-black text-[#2c1a0e] flex items-center justify-center"
                          aria-label="Plus"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-base sm:text-lg font-black text-[#2c1a0e] w-[78px] sm:w-24 text-right tabular-nums">
                        {item.price * quantity} MDL
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {items.length > 0 && (
                <div className="mt-4 space-y-4">
                  <label className="block">
                    <span className="block text-xs font-black uppercase tracking-[1px] text-[#2c1a0e] mb-2">
                      {t.order.table}
                    </span>
                    <input
                      inputMode="numeric"
                      value={table}
                      onChange={(event) => updateTable(event.target.value)}
                      placeholder={t.order.tableHint}
                      className={`w-full rounded-xl border-2 bg-white px-4 py-3 text-lg font-bold text-[#2c1a0e] outline-none ${
                        tableError ? "border-red-400" : "border-black/10 focus:border-[#f5c200]"
                      }`}
                    />
                    {tableError && <span className="block text-sm text-red-500 mt-1">{t.order.requiredTable}</span>}
                  </label>

                  <label className="block">
                    <span className="block text-xs font-black uppercase tracking-[1px] text-[#2c1a0e] mb-2">
                      {t.order.comment}
                    </span>
                    <textarea
                      value={comment}
                      onChange={(event) => setComment(event.target.value.slice(0, 500))}
                      placeholder={t.order.commentHint}
                      rows={2}
                      className="w-full resize-none rounded-xl border-2 border-black/10 bg-white px-4 py-3 text-sm text-[#2c1a0e] outline-none focus:border-[#f5c200]"
                    />
                  </label>

                  {status === "error" && (
                    <div role="alert" className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm font-semibold text-red-700">
                      {t.order.error}
                    </div>
                  )}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <footer className="px-5 sm:px-7 py-5 border-t-4 border-[#f5c200] bg-[#fffceb]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl sm:text-2xl font-black uppercase tracking-[1px] text-[#2c1a0e]">
                    {t.order.total}
                  </span>
                  <span className="text-3xl sm:text-4xl font-black text-[#2c1a0e] tabular-nums">
                    {total} <span className="text-xl">MDL</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{t.order.items}</span>
                  <span className="font-bold">{items.reduce((sum, line) => sum + line.quantity, 0)}</span>
                </div>
                <button
                  onClick={submitOrder}
                  disabled={status === "sending"}
                  className="w-full py-3.5 rounded-full bg-[#c0392b] text-white font-black uppercase tracking-[1px] text-sm hover:bg-[#a93226] disabled:opacity-60 disabled:cursor-wait transition-all"
                >
                  {status === "sending" ? t.order.sending : t.order.submit}
                </button>
                <button
                  onClick={clearCart}
                  disabled={status === "sending"}
                  className="w-full mt-2 py-2 text-gray-400 font-bold uppercase tracking-[1px] text-xs hover:text-red-400 disabled:opacity-50"
                >
                  {t.order.clear}
                </button>
              </footer>
            )}
          </>
        )}
      </section>
    </div>
  )
}
