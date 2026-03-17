import apiClient from './client'
import type { Lesson } from '@/types'

export const lessonsApi = {
  getByCourse: (courseId: number) => apiClient.get<{ data: Lesson[] }>(`/courses/${courseId}/lessons`),
  create: (courseId: number, data: Partial<Lesson>) =>
    apiClient.post<{ data: Lesson }>(`/courses/${courseId}/lessons`, data),
  update: (id: number, data: Partial<Lesson>) => apiClient.put<{ data: Lesson }>(`/lessons/${id}`, data),
  delete: (id: number) => apiClient.delete(`/lessons/${id}`),
}
