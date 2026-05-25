"use client"

import { useCart } from "@/lib/cart-context"
import { useLocale } from "./locale-provider"

export function CartSheet() {
  const { items, removeItem, addItem, clearCart, total, isOpen, setIsOpen } = useCart()
  const { locale } = useLocale()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={() => setIsOpen(false)}
      />

      {/* Sheet */}
      <div className="relative z-[1] w-full max-w-xl bg-white rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b-2 border-gray-100">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🛒</span>
            <h2 className="text-2xl font-black uppercase tracking-[2px] text-[#2c1a0e]">
              Ваш заказ
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-all text-2xl font-bold leading-none"
          >
            ×
          </button>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto px-7 py-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-5xl mb-4">🍽</p>
              <p className="text-gray-400 text-xl font-semibold">Корзина пуста</p>
              <p className="text-gray-300 text-sm mt-1">Добавьте блюда из меню</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map(({ item, quantity }) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0"
                >
                  {/* Name + category */}
                  <div className="flex-1 min-w-0">
                    <div className="text-xl font-black text-[#2c1a0e] leading-tight">
                      {item.name[locale]}
                    </div>
                    <div className="text-sm text-gray-400 mt-0.5">
                      {item.price} MDL · {item.weight}
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-xl font-black text-[#2c1a0e] flex items-center justify-center transition-all"
                    >
                      −
                    </button>
                    <span className="text-xl font-black text-[#2c1a0e] w-7 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => addItem(item)}
                      className="w-9 h-9 rounded-full bg-[#f5c200] hover:bg-[#e6b800] text-xl font-black text-[#2c1a0e] flex items-center justify-center transition-all"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-xl font-black text-[#2c1a0e] w-24 text-right tabular-nums">
                    {item.price * quantity} MDL
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Total + Clear — always visible at bottom */}
        {items.length > 0 && (
          <div className="px-7 py-6 border-t-4 border-[#f5c200] bg-[#fffceb] rounded-b-3xl">
            {/* Total row */}
            <div className="flex items-center justify-between mb-5">
              <span className="text-3xl font-black uppercase tracking-[2px] text-[#2c1a0e]">
                ИТОГО
              </span>
              <span className="text-5xl font-black text-[#2c1a0e] tabular-nums">
                {total} <span className="text-3xl">MDL</span>
              </span>
            </div>

            {/* Items count */}
            <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
              <span>Позиций в заказе</span>
              <span className="font-bold">{items.reduce((s, i) => s + i.quantity, 0)} шт.</span>
            </div>

            {/* Clear button */}
            <button
              onClick={clearCart}
              className="w-full py-3 rounded-full border-2 border-gray-200 text-gray-400 font-bold uppercase tracking-[1px] text-sm hover:border-red-300 hover:text-red-400 transition-all"
            >
              Очистить заказ
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
