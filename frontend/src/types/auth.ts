export interface User {
  id: number
  email: string
  fullName: string
  role: 'STUDENT' | 'ADMIN' | 'INSTRUCTOR'
  avatarUrl?: string
  createdAt: string
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
