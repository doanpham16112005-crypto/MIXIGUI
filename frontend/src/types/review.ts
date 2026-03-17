export interface Review {
  id: number
  userId: number
  targetId: number
  targetType: 'COURSE' | 'PRODUCT'
  rating: number
  comment: string
  createdAt: string
}
