export class Product {
  title: string
  description: string
  price: number
  discountPercentage: number

  constructor(
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
  ) {
    this.title = title
    this.description = description
    this.price = price
    this.discountPercentage = discountPercentage
  }
}