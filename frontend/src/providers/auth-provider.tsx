'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/stores/auth-store'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { accessToken, setAuth, clearAuth } = useAuthStore()

  useEffect(() => {
    if (!accessToken) return
    const run = () => {
      import('@/lib/api/auth').then(({ authApi }) => {
        authApi.me()
          .then((res) => setAuth(res.data.data, accessToken))
          .catch(() => clearAuth())
      })
    }
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(run)
    } else {
      setTimeout(run, 500)
    }
  }, [])

  return <>{children}</>
}
