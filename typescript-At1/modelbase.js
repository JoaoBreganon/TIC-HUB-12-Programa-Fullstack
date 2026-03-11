export class Category {
    id;
    name;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
export class Product {
    id;
    name;
    price;
    category;
    constructor(id, name, price, category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
    }
}
//# sourceMappingURL=modelbase.js.map