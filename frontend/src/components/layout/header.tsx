'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { publicNav } from '@/config/navigation'
import { useAuthStore } from '@/stores/auth-store'

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { user, clearAuth } = useAuthStore()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = async () => {
    const { supabase } = await import('@/lib/supabase')
    await supabase.auth.signOut()
    clearAuth()
    setMobileOpen(false)
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-noel-100/90 bg-white/92 backdrop-blur-md shadow-xs">
      {/* Thanh thông báo mùa lễ hội Noel & Tình Yêu */}
      <div className="bg-gradient-to-r from-noel-900 via-noel-700 to-wine-700 px-4 py-1.5 text-center text-xs text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-2 gap-y-0.5">
          <span aria-hidden="true" className="text-gold-300">🎄</span>
          <span className="font-medium tracking-wide">
            Giáng Sinh Ấm Áp &amp; Giai Điệu Tình Yêu <span aria-hidden="true" className="text-love-300">♥</span> Ưu đãi mùa lễ hội &amp; Học thử 3 bài miễn phí
          </span>
          <Link
            href="/khoa-hoc"
            className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold text-gold-200 transition hover:bg-white/25 hover:text-white"
          >
            Khám phá ngay →
          </Link>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
          <div className="relative">
            <Image
              src="/images/logo.png"
              alt="MixiGui"
              width={38}
              height={38}
              className="rounded-full object-cover ring-2 ring-noel-200 transition group-hover:ring-gold-400"
            />
            <span
              aria-hidden="true"
              className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-noel-500 to-wine-600 text-[9px] text-white shadow-xs"
            >
              ♥
            </span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="bg-gradient-to-r from-noel-700 via-noel-600 to-wine-600 bg-clip-text text-xl font-extrabold text-transparent">
              MixiGui
            </span>
            <span className="mt-0.5 text-[10px] font-medium tracking-wider text-wine-500">
              ❄ Noel &amp; Love
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1.5 md:flex">
          {publicNav.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                  active
                    ? 'bg-noel-50 text-noel-700 ring-1 ring-noel-200/80'
                    : 'text-gray-600 hover:bg-noel-50/60 hover:text-noel-600'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Auth & Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          {user ? (
            <div className="hidden items-center gap-3 sm:flex">
              {user.role === 'ADMIN' || user.role === 'INSTRUCTOR' ? (
                <Link href="/admin" className="rounded-full bg-noel-50 px-3 py-1 text-xs font-semibold text-noel-700 hover:bg-noel-100">
                  Admin
                </Link>
              ) : (
                <Link href="/hoc-vien" className="text-sm font-medium text-gray-600 hover:text-noel-600">
                  Tài khoản
                </Link>
              )}
              <div className="flex items-center gap-2">
                {(user.avatar_url || user.avatarUrl) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.avatar_url || user.avatarUrl || ''}
                    alt={user.full_name || user.fullName || user.email || ''}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full object-cover ring-2 ring-noel-200"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-noel-600 to-wine-600 text-sm font-semibold text-white">
                    {(user.full_name || user.fullName || user.email || 'U')[0].toUpperCase()}
                  </div>
                )}
                <span className="max-w-[130px] truncate text-sm font-medium text-gray-700">
                  {user.full_name || user.fullName || user.email}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-full border border-noel-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-noel-50 hover:text-noel-700"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                href="/dang-nhap"
                className="rounded-full px-3.5 py-1.5 text-sm font-medium text-gray-600 transition hover:text-noel-600"
              >
                Đăng nhập
              </Link>
              <Link
                href="/dang-ky"
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-noel-600 to-wine-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:from-noel-700 hover:to-wine-700 hover:shadow"
              >
                <span aria-hidden="true" className="text-xs">💝</span> Đăng ký
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-noel-100 text-noel-700 transition hover:bg-noel-50 md:hidden"
          >
            {mobileOpen ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Dải ánh đèn lễ hội mảnh tinh tế dưới Header */}
      <div
        aria-hidden="true"
        className="h-[2px] w-full bg-gradient-to-r from-noel-200 via-gold-300 to-wine-200 opacity-75"
      />

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-noel-100 bg-white/98 px-4 py-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-1">
            {publicNav.map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                    active ? 'bg-noel-50 text-noel-700' : 'text-gray-700 hover:bg-noel-50/60 hover:text-noel-600'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && <span aria-hidden="true" className="text-xs text-noel-500">♥</span>}
                </Link>
              )
            })}
          </nav>

          <div className="mt-4 border-t border-noel-100 pt-4">
            {user ? (
              <div className="flex items-center justify-between gap-2">
                <Link
                  href={user.role === 'ADMIN' || user.role === 'INSTRUCTOR' ? '/admin' : '/hoc-vien'}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-semibold text-noel-700"
                >
                  {user.full_name || user.fullName || user.email} →
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-full border border-noel-200 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  href="/dang-nhap"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full border border-noel-200 py-2 text-center text-sm font-medium text-noel-700 hover:bg-noel-50"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/dang-ky"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full bg-gradient-to-r from-noel-600 to-wine-600 py-2 text-center text-sm font-semibold text-white shadow-sm"
                >
                  💝 Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
