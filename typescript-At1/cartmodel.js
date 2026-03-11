export class Cart {
    items = [];
    addItem(product, quantity) {
        const productExists = this.items.some(item => item.product.id === product.id);
        if (productExists) {
            const existingItem = this.items.find(item => item.product.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            }
        }
        else {
            this.items.push({ product, quantity });
        }
    }
    getTotalItems() {
        return this.items.reduce((total, currentItem) => {
            return total + currentItem.quantity;
        }, 0);
    }
    getFinalPrice() {
        return this.items.reduce((total, currentItem) => {
            return total + (currentItem.product.price * currentItem.quantity);
        }, 0);
    }
    getCartDetails() {
        return this.items;
    }
}
//# sourceMappingURL=cartmodel.js.map