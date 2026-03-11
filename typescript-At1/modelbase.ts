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


export class Category implements ICategory {
  constructor(
    public id: number,
    public name: string
  ) {}
}

export class Product implements IProduct {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public category: ICategory
  ) {}
}