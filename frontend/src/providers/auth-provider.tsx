'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/stores/auth-store'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { accessToken, setAuth, clearAuth } = useAuthStore()

  useEffect(() => {
    if (!accessToken) return
    import('@/lib/api/auth').then(({ authApi }) => {
      authApi.me()
        .then((res) => setAuth(res.data.data, accessToken))
        .catch(() => clearAuth())
    })
  }, [])

  return <>{children}</>
}
