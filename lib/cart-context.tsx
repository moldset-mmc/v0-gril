"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { MenuItem } from "./translations"

interface CartItem {
  item: MenuItem
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: MenuItem) => void
  removeItem: (id: number) => void
  clearCart: () => void
  total: number
  count: number
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = (item: MenuItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.item.id === item.id)
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { item, quantity: 1 }]
    })
  }

  const removeItem = (id: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.item.id === id)
      if (existing && existing.quantity > 1) {
        return prev.map((i) =>
          i.item.id === id ? { ...i, quantity: i.quantity - 1 } : i
        )
      }
      return prev.filter((i) => i.item.id !== id)
    })
  }

  const clearCart = () => setItems([])

  const total = items.reduce((sum, i) => sum + i.item.price * i.quantity, 0)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, total, count, isOpen, setIsOpen }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
