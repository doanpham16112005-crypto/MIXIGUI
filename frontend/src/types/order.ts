export type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'

export interface OrderItem {
  id: number
  productId: number
  quantity: number
  price: number
}

export interface Order {
  id: number
  userId: number
  status: OrderStatus
  totalAmount: number
  items: OrderItem[]
  createdAt: string
}
