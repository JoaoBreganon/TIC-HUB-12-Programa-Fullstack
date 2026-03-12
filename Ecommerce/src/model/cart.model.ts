import { Product } from "./product.model";

export class cart {
  constructor( 
    public list: Product[],
    public total: number=0
 ) {}
}
