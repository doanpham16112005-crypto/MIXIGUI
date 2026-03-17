import apiClient from './client'
import type { Course, PaginatedResponse } from '@/types'

export const coursesApi = {
  getAll: (params?: Record<string, unknown>) =>
    apiClient.get<PaginatedResponse<Course>>('/courses', { params }),
  getBySlug: (slug: string) => apiClient.get<{ data: Course }>(`/courses/${slug}`),
  create: (data: Partial<Course>) => apiClient.post<{ data: Course }>('/courses', data),
  update: (id: number, data: Partial<Course>) => apiClient.put<{ data: Course }>(`/courses/${id}`, data),
  delete: (id: number) => apiClient.delete(`/courses/${id}`),
}
