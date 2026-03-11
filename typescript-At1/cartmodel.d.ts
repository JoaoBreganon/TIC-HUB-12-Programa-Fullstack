import { IProduct } from "../typescript Atividade 1/modelbase.js";
export interface CartItem {
    product: IProduct;
    quantity: number;
}
export declare class Cart {
    private items;
    addItem(product: IProduct, quantity: number): void;
    getTotalItems(): number;
    getFinalPrice(): number;
    getCartDetails(): CartItem[];
}
//# sourceMappingURL=cartmodel.d.ts.map