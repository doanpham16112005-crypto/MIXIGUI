import apiClient from './client'
import type { User, PaginatedResponse } from '@/types'

export const usersApi = {
  getAll: (params?: Record<string, unknown>) =>
    apiClient.get<PaginatedResponse<User>>('/users', { params }),
  getById: (id: number) => apiClient.get<{ data: User }>(`/users/${id}`),
  update: (id: number, data: Partial<User>) => apiClient.put<{ data: User }>(`/users/${id}`, data),
}
