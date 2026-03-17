'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/stores/auth-store'
import { authApi } from '@/lib/api/auth'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { accessToken, setAuth, clearAuth } = useAuthStore()

  useEffect(() => {
    if (accessToken) {
      authApi.me()
        .then((res) => setAuth(res.data.data, accessToken))
        .catch(() => clearAuth())
    }
  }, [])

  return <>{children}</>
}
