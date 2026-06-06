'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/auth-store'

export function HeaderAuth() {
  const router = useRouter()
  const { user, clearAuth } = useAuthStore()

  const handleLogout = async () => {
    const { supabase } = await import('@/lib/supabase')
    await supabase.auth.signOut()
    clearAuth()
    router.push('/')
  }

  if (!user) {
    return (
      <Link href="/dang-nhap" className="text-sm text-gray-600 hover:text-blue-600">
        Đăng nhập
      </Link>
    )
  }

  return (
    <div className="flex items-center gap-3">
      {user.role === 'ADMIN' || user.role === 'INSTRUCTOR' ? (
        <Link href="/admin" className="text-sm text-blue-600 hover:underline">Admin</Link>
      ) : (
        <Link href="/hoc-vien" className="text-sm text-gray-600 hover:text-blue-600">Tài khoản</Link>
      )}
      <span className="text-sm font-medium text-gray-700">{user.full_name || user.fullName || user.email}</span>
      <button onClick={handleLogout} className="rounded-md border px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
        Đăng xuất
      </button>
    </div>
  )
}
