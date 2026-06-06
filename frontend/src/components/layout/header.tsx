import Link from 'next/link'
import Image from 'next/image'
import { publicNav } from '@/config/navigation'
import { HeaderAuthIsland } from './client-islands'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="MixiGui" width={36} height={36} className="rounded-full object-cover" />
          <span className="text-xl font-bold text-blue-600">MixiGui</span>
        </Link>
        <nav className="hidden gap-6 md:flex">
          {publicNav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-gray-600 hover:text-blue-600">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <HeaderAuthIsland />
        </div>
      </div>
    </header>
  )
}
