"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { menuItems, type MenuItem, type MenuOption } from "./translations"

export interface CartItem {
  key: string
  item: MenuItem
  option?: MenuOption
  quantity: number
}

interface StoredCartItem {
  id: number
  optionValue?: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: MenuItem, option?: MenuOption) => void
  removeItem: (key: string) => void
  clearCart: () => void
  total: number
  count: number
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const CART_STORAGE_KEY = "wine-grill-cart-v2"
const CartContext = createContext<CartContextType | null>(null)

function cartKey(itemId: number, optionValue?: string) {
  return `${itemId}:${optionValue ?? "default"}`
}

function restoreCart(): CartItem[] {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY)
    if (!saved) return []

    const parsed = JSON.parse(saved) as StoredCartItem[]
    if (!Array.isArray(parsed)) return []

    return parsed.flatMap((savedItem) => {
      const item = menuItems.find((candidate) => candidate.id === savedItem.id)
      if (!item) return []

      const option = savedItem.optionValue
        ? item.options?.find((candidate) => candidate.value === savedItem.optionValue)
        : undefined

      if (savedItem.optionValue && !option) return []

      const quantity = Math.min(20, Math.max(1, Number(savedItem.quantity) || 1))
      return [{
        key: cartKey(item.id, option?.value),
        item,
        option,
        quantity,
      }]
    })
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setItems(restoreCart())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    const stored: StoredCartItem[] = items.map(({ item, option, quantity }) => ({
      id: item.id,
      optionValue: option?.value,
      quantity,
    }))
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(stored))
  }, [hydrated, items])

  const addItem = (item: MenuItem, option?: MenuOption) => {
    const selectedOption = option ?? item.options?.[0]
    const key = cartKey(item.id, selectedOption?.value)

    setItems((previous) => {
      const existing = previous.find((line) => line.key === key)
      if (existing) {
        return previous.map((line) =>
          line.key === key
            ? { ...line, quantity: Math.min(20, line.quantity + 1) }
            : line
        )
      }

      return [...previous, { key, item, option: selectedOption, quantity: 1 }]
    })
  }

  const removeItem = (key: string) => {
    setItems((previous) => {
      const existing = previous.find((line) => line.key === key)
      if (existing && existing.quantity > 1) {
        return previous.map((line) =>
          line.key === key ? { ...line, quantity: line.quantity - 1 } : line
        )
      }
      return previous.filter((line) => line.key !== key)
    })
  }

  const clearCart = () => setItems([])

  const total = useMemo(
    () => items.reduce((sum, line) => sum + line.item.price * line.quantity, 0),
    [items]
  )
  const count = useMemo(
    () => items.reduce((sum, line) => sum + line.quantity, 0),
    [items]
  )

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, total, count, isOpen, setIsOpen }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}
