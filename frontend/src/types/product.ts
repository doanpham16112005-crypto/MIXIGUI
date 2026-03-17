export interface Product {
  id: number
  name: string
  slug: string
  description: string
  price: number
  stock: number
  imageUrl: string
  categoryId: number
  published: boolean
  createdAt: string
}
