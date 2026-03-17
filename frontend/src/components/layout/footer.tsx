'use client'

import Link from 'next/link'

const footerLinks = {
  courses: [
    { label: 'Guitar cơ bản', href: '/khoa-hoc' },
    { label: 'Piano cho người mới', href: '/khoa-hoc' },
    { label: 'Ukulele vui vẻ', href: '/khoa-hoc' },
    { label: 'Violin nâng cao', href: '/khoa-hoc' },
    { label: 'Trống cơ bản', href: '/khoa-hoc' },
  ],
  products: [
    { label: 'Đàn Guitar', href: '/san-pham' },
    { label: 'Đàn Piano', href: '/san-pham' },
    { label: 'Ukulele', href: '/san-pham' },
    { label: 'Phụ kiện nhạc cụ', href: '/san-pham' },
    { label: 'Sách học nhạc', href: '/san-pham' },
  ],
  company: [
    { label: 'Về chúng tôi', href: '/ve-chung-toi' },
    { label: 'Blog âm nhạc', href: '/blog' },
    { label: 'Liên hệ', href: '/lien-he' },
    { label: 'Chính sách bảo mật', href: '/lien-he' },
    { label: 'Điều khoản sử dụng', href: '/lien-he' },
  ],
  support: [
    { label: 'Hướng dẫn học online', href: '/blog' },
    { label: 'Câu hỏi thường gặp', href: '/lien-he' },
    { label: 'Chính sách đổi trả', href: '/lien-he' },
    { label: 'Bảo hành sản phẩm', href: '/lien-he' },
    { label: 'Tư vấn miễn phí', href: '/lien-he' },
  ],
}

const socials = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/nmd.3925',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/phwgnqm/',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'Zalo',
    href: 'https://zalo.me/0123456789',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 50 50">
        <path d="M25 2C12.318 2 2 12.318 2 25c0 3.96 1.023 7.854 2.963 11.29L2.037 46.73a1 1 0 0 0 1.232 1.232l10.44-2.926C17.15 46.978 21.045 48 25 48c12.682 0 23-10.318 23-23S37.682 2 25 2zm-7 22h4v-6a1 1 0 0 1 2 0v7a1 1 0 0 1-1 1h-5a1 1 0 0 1 0-2zm14 2h-5a1 1 0 0 1-1-1v-8a1 1 0 0 1 2 0v7h4a1 1 0 0 1 0 2zm-12-9a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.73a4.85 4.85 0 0 1-1.01-.04z" />
      </svg>
    ),
  },
]

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold text-white">
                Mixi<span className="text-blue-400">Gui</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Trung tâm âm nhạc hàng đầu — học online linh hoạt, mua nhạc cụ
              chính hãng, phát triển đam mê âm nhạc cùng hàng nghìn học viên.
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-400">123 Nguyễn Văn Linh, Q.7, TP.HCM</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="h-4 w-4 shrink-0 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+84123456789" className="text-gray-400 hover:text-white transition-colors">0123 456 789</a>
              </div>
              <div className="flex items-center gap-3">
                <svg className="h-4 w-4 shrink-0 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:hello@mixigui.com" className="text-gray-400 hover:text-white transition-colors">hello@mixigui.com</a>
              </div>
            </div>

            {/* Socials */}
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-all hover:bg-blue-600 hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Khóa học
            </h3>
            <ul className="space-y-3">
              {footerLinks.courses.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Sản phẩm
            </h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Công ty
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Hỗ trợ
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-blue-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Open hours */}
            <div className="mt-8">
              <h4 className="mb-3 text-sm font-semibold text-white">Giờ làm việc</h4>
              <div className="space-y-1 text-sm text-gray-400">
                <p>Thứ 2 – Thứ 6: 8:00 – 21:00</p>
                <p>Thứ 7 – CN: 8:00 – 18:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-blue-900/50 to-blue-800/30 p-8">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Nhận thông tin khóa học mới</h3>
              <p className="mt-1 text-sm text-gray-400">
                Đăng ký để nhận ưu đãi độc quyền và cập nhật khóa học mới nhất.
              </p>
            </div>
            <form className="flex w-full max-w-md gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email của bạn..."
                className="flex-1 rounded-xl bg-gray-800 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none ring-1 ring-gray-700 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>

        {/* Certifications / trust badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
          {[
            { icon: '🛡️', text: 'Thanh toán bảo mật' },
            { icon: '🔄', text: 'Đổi trả 30 ngày' },
            { icon: '🎓', text: 'Chứng chỉ được công nhận' },
            { icon: '📱', text: 'Học mọi thiết bị' },
            { icon: '🎵', text: '10.000+ học viên' },
          ].map((badge) => (
            <div key={badge.text} className="flex items-center gap-2 text-sm text-gray-400">
              <span>{badge.icon}</span>
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-gray-500 md:flex-row">
          <p>© {new Date().getFullYear()} MixiGui. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/lien-he" className="hover:text-gray-300 transition-colors">
              Chính sách bảo mật
            </Link>
            <Link href="/lien-he" className="hover:text-gray-300 transition-colors">
              Điều khoản dịch vụ
            </Link>
            <Link href="/lien-he" className="hover:text-gray-300 transition-colors">
              Cookie
            </Link>
          </div>
          <p className="text-xs">
            Thiết kế với ❤️ tại Việt Nam
          </p>
        </div>
      </div>
    </footer>
  )
}
