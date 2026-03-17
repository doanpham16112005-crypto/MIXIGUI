'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { publicNav } from '@/config/navigation'
import { useAuthStore } from '@/stores/auth-store'
import { supabase } from '@/lib/supabase'

export function Header() {
  const router = useRouter()
  const { user, clearAuth } = useAuthStore()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    clearAuth()
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-blue-600">MixiGui</Link>
        <nav className="hidden gap-6 md:flex">
          {publicNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-gray-600 hover:text-blue-600">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {user.role === 'ADMIN' || user.role === 'INSTRUCTOR' ? (
                <Link href="/admin" className="text-sm text-blue-600 hover:underline">Admin</Link>
              ) : (
                <Link href="/hoc-vien" className="text-sm text-gray-600 hover:text-blue-600">Tài khoản</Link>
              )}
              <span className="text-sm font-medium text-gray-700">{user.full_name || user.email}</span>
              <button onClick={handleLogout} className="rounded-md border px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
                Đăng xuất
              </button>
            </>
          ) : (
            <Link href="/dang-nhap" className="text-sm text-gray-600 hover:text-blue-600">Đăng nhập</Link>
          )}
        </div>
      </div>
    </header>
  )
}
