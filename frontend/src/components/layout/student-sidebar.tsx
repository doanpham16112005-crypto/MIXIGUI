'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/auth-store'
import { cn } from '@/lib/utils'
import { LayoutDashboard, BookOpen, ShoppingBag, User, LogOut, Music } from 'lucide-react'

const navItems = [
  { label: 'Tổng quan',        href: '/hoc-vien',                   icon: LayoutDashboard },
  { label: 'Khóa học của tôi', href: '/hoc-vien/khoa-hoc-cua-toi', icon: BookOpen },
  { label: 'Đơn hàng',         href: '/hoc-vien/don-hang',          icon: ShoppingBag },
  { label: 'Hồ sơ',            href: '/hoc-vien/ho-so',             icon: User },
]

export function StudentSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, clearAuth } = useAuthStore()

  const handleLogout = async () => {
    const { supabase } = await import('@/lib/supabase')
    await supabase.auth.signOut()
    clearAuth()
    router.push('/')
  }

  return (
    <aside className="flex w-64 flex-col border-r border-gray-200 bg-white">
      {/* User info */}
      <div className="border-b border-gray-100 px-5 py-5">
        <div className="flex items-center gap-3">
          {(user?.avatar_url || user?.avatarUrl) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.avatar_url || user.avatarUrl || ''}
              alt={user.full_name || user.fullName || ''}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-100"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-bold text-white">
              {(user?.full_name || user?.fullName || user?.email || 'U')[0].toUpperCase()}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-gray-900">
              {user?.full_name || user?.fullName || 'Học viên'}
            </p>
            <p className="truncate text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Menu
        </p>
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                active
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <Icon size={18} className={active ? 'text-white' : 'text-gray-400'} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="space-y-1 border-t border-gray-100 px-3 py-4">
        <Link
          href="/khoa-hoc"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
        >
          <Music size={18} className="text-gray-400" />
          Khám phá khóa học
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
        >
          <LogOut size={18} />
          Đăng xuất
        </button>
      </div>
    </aside>
  )
}
