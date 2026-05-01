import { defineStore } from 'pinia'
import type { Product } from '@/models/product.model'
import type { CartItem } from '@/models/cart-item.model'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),
  getters: {
    total(): number {
      return this.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    },
    itemCount(): number {
      return this.items.reduce((sum, item) => sum + item.quantity, 0)
    }
  },
  actions: {
    add(product: Product, quantity: number = 1) {
      const existing = this.items.find(i => i.product.id === product.id)
      if (existing) {
        existing.quantity += quantity
      } else {
        this.items.push({ product, quantity })
      }
    },
    remove(productId: string) {
      this.items = this.items.filter(i => i.product.id !== productId)
    },
    clear() {
      this.items = []
    }
  }
})
