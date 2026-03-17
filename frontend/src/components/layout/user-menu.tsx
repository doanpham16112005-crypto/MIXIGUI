'use client'

import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/navigation'

export function UserMenu() {
  const { user, clearAuth } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    clearAuth()
    router.push('/')
  }

  if (!user) return null
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm">{user.fullName}</span>
      <button onClick={handleLogout} className="text-sm text-red-500 hover:underline">Đăng xuất</button>
    </div>
  )
}
