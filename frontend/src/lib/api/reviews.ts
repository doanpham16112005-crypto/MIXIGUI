import apiClient from './client'
import type { Review } from '@/types'

export const reviewsApi = {
  getAll: (params?: Record<string, unknown>) =>
    apiClient.get<{ data: Review[] }>('/reviews', { params }),
  create: (data: Partial<Review>) => apiClient.post<{ data: Review }>('/reviews', data),
  delete: (id: number) => apiClient.delete(`/reviews/${id}`),
}
