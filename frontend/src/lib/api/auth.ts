import apiClient from './client'
import type { LoginRequest, RegisterRequest, AuthTokens, User } from '@/types'

export const authApi = {
  login: (data: LoginRequest) => apiClient.post<{ data: AuthTokens }>('/auth/login', data),
  register: (data: RegisterRequest) => apiClient.post<{ data: User }>('/auth/register', data),
  me: () => apiClient.get<{ data: User }>('/auth/me'),
  logout: () => apiClient.post('/auth/logout'),
}
