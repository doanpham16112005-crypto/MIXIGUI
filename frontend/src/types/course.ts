export interface Course {
  id: number
  title: string
  slug: string
  description: string
  thumbnailUrl: string
  price: number
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'
  categoryId: number
  instructorId: number
  published: boolean
  createdAt: string
}
