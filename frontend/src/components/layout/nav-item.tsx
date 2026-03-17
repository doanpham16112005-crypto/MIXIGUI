import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NavItemProps {
  href: string
  label: string
  active?: boolean
}

export function NavItem({ href, label, active }: NavItemProps) {
  return (
    <Link href={href} className={cn('block rounded-md px-3 py-2 text-sm', active ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100')}>
      {label}
    </Link>
  )
}
