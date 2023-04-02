export interface Product {
  id: string
  name: string,
  category: string,
  price: number,
  imgUrl: string,
  user: {
    username: string
  }
}
