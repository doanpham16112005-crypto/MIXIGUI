'use client'

import { useState } from 'react'

const CONTACTS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/nmd.3925',
    bg: 'bg-blue-600 hover:bg-blue-700',
    tooltip: 'Chat Facebook',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/phwgnqm/',
    bg: 'bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:opacity-90',
    tooltip: 'Theo dõi Instagram',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'Zalo',
    href: 'https://zalo.me/mixigui',
    bg: 'bg-sky-500 hover:bg-sky-600',
    tooltip: 'Nhắn Zalo',
    icon: (
      <svg viewBox="0 0 50 50" fill="currentColor" className="h-6 w-6">
        <path d="M25 2C12.318 2 2 12.318 2 25c0 3.96 1.023 7.685 2.816 10.933L2 48l12.378-2.686A22.846 22.846 0 0025 48c12.682 0 23-10.318 23-23S37.682 2 25 2zm0 4c10.477 0 19 8.523 19 19S35.477 44 25 44a18.85 18.85 0 01-9.452-2.531l-.651-.392-6.747 1.464 1.554-6.581-.413-.661A18.87 18.87 0 016 25c0-10.477 8.523-19 19-19zm-7.5 9.5c-.5 0-1.25.167-1.917 1-.667.833-2.5 3.083-2.5 7.5s2.583 8.75 2.917 9.333c.333.583 4.667 7.5 11.417 10.25 5.75 2.333 7.083 1.917 8.25 1.75 1.167-.167 3.75-1.583 4.25-3.083.5-1.5.5-2.833.333-3.083-.167-.25-.583-.417-1.25-.75-.667-.333-3.75-1.917-4.333-2.083-.583-.167-1-.25-1.417.25-.417.5-1.583 2.083-1.917 2.5-.333.417-.667.5-1.25.167-.583-.333-2.583-1-4.917-3.083-1.833-1.583-3.083-3.583-3.417-4.167-.333-.583-.017-.917.25-1.233.25-.3.583-.75.875-1.125.292-.375.375-.625.562-1.042.187-.417.083-.792-.083-1.125-.167-.333-1.458-3.5-2.042-4.75-.5-1.083-1.042-1.083-1.458-1.083-.375 0-.792-.042-1.292-.042z" />
      </svg>
    ),
  },
]

export default function FloatingContacts() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-3">
      {/* Các bong bóng liên hệ */}
      <div
        className={`flex flex-col items-end gap-3 transition-all duration-300 ${
          open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {CONTACTS.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-2 rounded-full ${c.bg} px-4 py-2.5 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl`}
            aria-label={c.tooltip}
          >
            <span className="hidden text-sm font-medium group-hover:block whitespace-nowrap">{c.tooltip}</span>
            {c.icon}
          </a>
        ))}
      </div>

      {/* Nút toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Đóng liên hệ' : 'Mở liên hệ'}
        className={`flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all duration-300 hover:scale-110 ${
          open
            ? 'bg-gray-700 hover:bg-gray-800 rotate-45'
            : 'bg-blue-600 hover:bg-blue-700 animate-bounce-slow'
        } text-white`}
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
            <path d="M20 2H4C2.897 2 2 2.897 2 4v18l4-4h14c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
          </svg>
        )}
      </button>

      {/* Gợn sóng khi đóng */}
      {!open && (
        <span className="pointer-events-none absolute bottom-0 right-0 h-14 w-14 animate-ping rounded-full bg-blue-400 opacity-30" />
      )}
    </div>
  )
}
