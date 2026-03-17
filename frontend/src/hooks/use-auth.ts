import { useAuthStore } from '@/stores/auth-store'

export function useAuth() {
  const { user, accessToken, setAuth, clearAuth } = useAuthStore()
  return {
    user,
    isAuthenticated: !!accessToken,
    isAdmin: user?.role === 'ADMIN',
    setAuth,
    clearAuth,
  }
}
