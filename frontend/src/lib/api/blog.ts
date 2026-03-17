import apiClient from './client'
import type { Post, PaginatedResponse } from '@/types'

export const blogApi = {
  getAll: (params?: Record<string, unknown>) =>
    apiClient.get<PaginatedResponse<Post>>('/posts', { params }),
  getBySlug: (slug: string) => apiClient.get<{ data: Post }>(`/posts/${slug}`),
  create: (data: Partial<Post>) => apiClient.post<{ data: Post }>('/posts', data),
  update: (id: number, data: Partial<Post>) => apiClient.put<{ data: Post }>(`/posts/${id}`, data),
  delete: (id: number) => apiClient.delete(`/posts/${id}`),
}
