import create from 'zustand'
import { persist } from 'zustand/middleware'

type CartItem = {
  id: number
  title: string
  price: number
  image: string
  quantity: number
}

type CartState = {
  items: CartItem[]
  add: (item: Omit<CartItem, 'quantity'>, qty?: number) => void
  remove: (id: number) => void
  setQuantity: (id: number, qty: number) => void
  clear: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item, qty = 1) => {
        const items = [...get().items]
        const idx = items.findIndex(i => i.id === item.id)
        if (idx >= 0) {
          items[idx].quantity += qty
        } else {
          items.push({ ...item, quantity: qty })
        }
        set({ items })
      },
      remove: (id) => set({ items: get().items.filter(i => i.id !== id) }),
      setQuantity: (id, qty) => {
        const items = get().items.map(i => i.id === id ? { ...i, quantity: Math.max(1, qty) } : i)
        set({ items })
      },
      clear: () => set({ items: [] }),
    }),
    { name: 'ecom-cart' }
  )
)
