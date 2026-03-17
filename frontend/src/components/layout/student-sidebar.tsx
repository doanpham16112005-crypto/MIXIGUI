'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { studentNav } from '@/config/navigation'
import { cn } from '@/lib/utils'

export function StudentSidebar() {
  const pathname = usePathname()
  return (
    <aside className="w-56 border-r bg-white p-4">
      <nav className="space-y-1">
        {studentNav.map((item) => (
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
