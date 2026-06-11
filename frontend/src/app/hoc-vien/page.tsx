'use client'

import Link from 'next/link'
import { useAuthStore } from '@/stores/auth-store'
import { BookOpen, ShoppingBag, Music2, ChevronRight, Star, Clock } from 'lucide-react'

const stats = [
  { label: 'Khóa học đã đăng ký', value: '0', icon: BookOpen, color: 'bg-blue-50 text-blue-600', border: 'border-blue-100' },
  { label: 'Đơn hàng',            value: '0', icon: ShoppingBag, color: 'bg-violet-50 text-violet-600', border: 'border-violet-100' },
  { label: 'Bài học hoàn thành',  value: '0', icon: Star,        color: 'bg-amber-50 text-amber-600', border: 'border-amber-100' },
  { label: 'Giờ học',             value: '0', icon: Clock,       color: 'bg-green-50 text-green-600', border: 'border-green-100' },
]

const quickActions = [
  { label: 'Khám phá khóa học mới', desc: 'Tìm khóa học phù hợp với bạn', href: '/khoa-hoc', icon: BookOpen, gradient: 'from-blue-500 to-blue-600' },
  { label: 'Mua nhạc cụ',           desc: 'Nhạc cụ chất lượng, giá tốt',  href: '/san-pham', icon: Music2,   gradient: 'from-violet-500 to-violet-600' },
]

export default function StudentDashboard() {
  const user = useAuthStore((s) => s.user)
  const name = user?.full_name || user?.fullName || 'bạn'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Chào buổi sáng' : hour < 18 ? 'Chào buổi chiều' : 'Chào buổi tối'

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-blue-600 to-blue-500 px-8 py-8 text-white">
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 right-24 h-32 w-32 rounded-full bg-white/10" />
        <div className="relative z-10">
          <p className="text-sm text-blue-100">{greeting},</p>
          <h1 className="mt-1 text-2xl font-bold">{name} 👋</h1>
          <p className="mt-2 max-w-md text-sm text-blue-100">
            Hôm nay bạn muốn học nhạc gì? Tiếp tục hành trình âm nhạc của mình nhé!
          </p>
          <Link
            href="/khoa-hoc"
            className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Xem khóa học <ChevronRight size={16} />
          </Link>
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-6xl select-none opacity-20">
          ♫
        </div>
      </div>

      {/* Stats */}
      <div>
        <h2 className="mb-4 text-base font-semibold text-gray-700">Thống kê của bạn</h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map(({ label, value, icon: Icon, color, border }) => (
            <div key={label} className={`rounded-2xl border ${border} bg-white p-5 shadow-sm`}>
              <div className={`mb-3 inline-flex rounded-xl p-2.5 ${color}`}>
                <Icon size={20} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="mt-0.5 text-xs text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="mb-4 text-base font-semibold text-gray-700">Bắt đầu ngay</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {quickActions.map(({ label, desc, href, icon: Icon, gradient }) => (
            <Link
              key={href}
              href={href}
              className={`group flex items-center gap-4 rounded-2xl bg-gradient-to-r ${gradient} p-5 text-white shadow-sm transition hover:shadow-md hover:brightness-105`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
                <Icon size={22} />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{label}</p>
                <p className="text-sm text-white/80">{desc}</p>
              </div>
              <ChevronRight size={20} className="shrink-0 opacity-70 transition group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent courses placeholder */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-700">Khóa học gần đây</h2>
          <Link href="/hoc-vien/khoa-hoc-cua-toi" className="text-sm font-medium text-blue-600 hover:underline">
            Xem tất cả
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-14 text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
            <BookOpen size={26} className="text-blue-500" />
          </div>
          <p className="font-medium text-gray-700">Chưa có khóa học nào</p>
          <p className="mt-1 text-sm text-gray-400">Đăng ký khóa học đầu tiên để bắt đầu học nhạc</p>
          <Link
            href="/khoa-hoc"
            className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Khám phá khóa học <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}
