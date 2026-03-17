import apiClient from './client'
import type { Product, PaginatedResponse } from '@/types'

export const productsApi = {
  getAll: (params?: Record<string, unknown>) =>
    apiClient.get<PaginatedResponse<Product>>('/products', { params }),
  getBySlug: (slug: string) => apiClient.get<{ data: Product }>(`/products/${slug}`),
  create: (data: Partial<Product>) => apiClient.post<{ data: Product }>('/products', data),
  update: (id: number, data: Partial<Product>) => apiClient.put<{ data: Product }>(`/products/${id}`, data),
  delete: (id: number) => apiClient.delete(`/products/${id}`),
}
