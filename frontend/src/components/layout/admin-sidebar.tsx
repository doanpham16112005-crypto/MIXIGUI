'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { adminNav } from '@/config/navigation'
import { cn } from '@/lib/utils'

export function AdminSidebar() {
  const pathname = usePathname()
  return (
    <aside className="h-screen w-64 border-r bg-white p-4">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-xl font-bold text-blue-600">Admin</span>
        <Link href="/" className="rounded-md px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 hover:text-blue-600" title="Về trang chủ">
          ← Trang chủ
        </Link>
      </div>
      <nav className="space-y-1">
        {adminNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn('block rounded-md px-3 py-2 text-sm transition-colors', pathname === item.href ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100')}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
