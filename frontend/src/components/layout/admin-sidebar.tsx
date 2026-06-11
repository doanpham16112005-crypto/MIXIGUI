'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/auth-store'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, BookOpen, ShoppingBag, ShoppingCart,
  FileText, Tag, Users, Star, LogOut, Globe,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard',    href: '/admin',              icon: LayoutDashboard },
  { label: 'Khóa học',     href: '/admin/khoa-hoc',     icon: BookOpen },
  { label: 'Sản phẩm',     href: '/admin/san-pham',     icon: ShoppingBag },
  { label: 'Đơn hàng',     href: '/admin/don-hang',     icon: ShoppingCart },
  { label: 'Blog',         href: '/admin/blog',          icon: FileText },
  { label: 'Danh mục',     href: '/admin/danh-muc',     icon: Tag },
  { label: 'Người dùng',   href: '/admin/nguoi-dung',   icon: Users },
  { label: 'Đánh giá',     href: '/admin/danh-gia',     icon: Star },
]

export function AdminSidebar() {
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
    <aside className="flex w-64 flex-shrink-0 flex-col border-r border-gray-200 bg-white">
      {/* Admin badge + user */}
      <div className="border-b border-gray-100 px-5 py-5">
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          <span className="text-xs font-semibold text-blue-600">ADMIN PANEL</span>
        </div>
        <div className="flex items-center gap-3">
          {(user?.avatar_url || user?.avatarUrl) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.avatar_url || user.avatarUrl || ''}
              alt={user.full_name || user.fullName || ''}
              className="h-9 w-9 rounded-full object-cover ring-2 ring-blue-100"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-sm font-bold text-white">
              {(user?.full_name || user?.fullName || user?.email || 'A')[0].toUpperCase()}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-gray-900">
              {user?.full_name || user?.fullName || 'Admin'}
            </p>
            <p className="text-xs text-gray-400">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 px-3 py-4">
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Quản lý
        </p>
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (href !== '/admin' && pathname.startsWith(href))
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
              <Icon size={17} className={active ? 'text-white' : 'text-gray-400'} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="space-y-0.5 border-t border-gray-100 px-3 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
        >
          <Globe size={17} className="text-gray-400" />
          Xem trang web
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50"
        >
          <LogOut size={17} />
          Đăng xuất
        </button>
      </div>
    </aside>
  )
}
