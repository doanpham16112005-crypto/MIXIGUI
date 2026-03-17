export interface User {
  id: string | number
  email: string
  fullName?: string
  full_name?: string
  role: 'STUDENT' | 'ADMIN' | 'INSTRUCTOR'
  avatarUrl?: string
  avatar_url?: string
  createdAt?: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  fullName: string
}
