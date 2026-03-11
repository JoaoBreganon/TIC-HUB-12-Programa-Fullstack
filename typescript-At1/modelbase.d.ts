export interface ICategory {
    id: number;
    name: string;
}
export interface IProduct {
    id: number;
    name: string;
    price: number;
    category: ICategory;
}
export declare class Category implements ICategory {
    id: number;
    name: string;
    constructor(id: number, name: string);
}
export declare class Product implements IProduct {
    id: number;
    name: string;
    price: number;
    category: ICategory;
    constructor(id: number, name: string, price: number, category: ICategory);
}
//# sourceMappingURL=modelbase.d.ts.map