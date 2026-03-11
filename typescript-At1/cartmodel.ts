import { ICategory, IProduct } from "../typescript Atividade 1/modelbase.js";
export interface CartItem {
  product: IProduct;
  quantity: number;
}

export class Cart {
  
  private items: CartItem[] = [];


  addItem(product: IProduct, quantity: number): void {
   
    const productExists = this.items.some(item => item.product.id === product.id);

    if (productExists) {
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      }
    } else {
      this.items.push({ product, quantity });
    }
  }


  getTotalItems(): number {
    return this.items.reduce((total, currentItem) => {
      return total + currentItem.quantity;
    }, 0); 
  }

 
  getFinalPrice(): number {
    return this.items.reduce((total, currentItem) => {
      return total + (currentItem.product.price * currentItem.quantity);
    }, 0);
  }

  getCartDetails(): CartItem[] {
    return this.items;
  }
}