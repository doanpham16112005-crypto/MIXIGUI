import apiClient from './client'
import type { Order, PaginatedResponse } from '@/types'

export const ordersApi = {
  getAll: (params?: Record<string, unknown>) =>
    apiClient.get<PaginatedResponse<Order>>('/orders', { params }),
  getById: (id: number) => apiClient.get<{ data: Order }>(`/orders/${id}`),
  create: (data: Partial<Order>) => apiClient.post<{ data: Order }>('/orders', data),
  updateStatus: (id: number, status: string) => apiClient.patch(`/orders/${id}/status`, { status }),
}
