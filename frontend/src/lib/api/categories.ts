import apiClient from './client'
import type { Category } from '@/types'

export const categoriesApi = {
  getAll: () => apiClient.get<{ data: Category[] }>('/categories'),
  create: (data: Partial<Category>) => apiClient.post<{ data: Category }>('/categories', data),
  update: (id: number, data: Partial<Category>) => apiClient.put<{ data: Category }>(`/categories/${id}`, data),
  delete: (id: number) => apiClient.delete(`/categories/${id}`),
}
