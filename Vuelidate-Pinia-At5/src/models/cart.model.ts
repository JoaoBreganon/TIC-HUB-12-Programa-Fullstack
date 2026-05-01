import type { Product } from './product.model';
import type { CartItem } from './cart-item.model';

export class Cart {
  items: CartItem[] = [];

  get totalItems(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice(): number {
    return this.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  addItem(product: Product) {
    const existing = this.items.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.items.push({ product, quantity: 1 });
    }
  }

  removeItem(productId: number) {
    const index = this.items.findIndex(item => item.product.id === productId);
    if (index !== -1) {
      const item = this.items[index];
      if (item && item.quantity > 1) {
        item.quantity--;
      } else {
        this.items.splice(index, 1);
      }
    }
  }
  
  deleteItem(productId: number) {
    const index = this.items.findIndex(item => item.product.id === productId);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
}
