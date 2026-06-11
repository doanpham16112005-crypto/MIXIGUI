import { createServerClient } from '@/lib/supabase'
import Link from 'next/link'
import { BookOpen, ShoppingBag, FileText, Users, ShoppingCart, Plus, Tag, Star, ArrowRight } from 'lucide-react'

export const revalidate = 60

async function getStats() {
  const supabase = createServerClient()
  const [courses, products, posts, users, orders] = await Promise.all([
    supabase.from('courses').select('id', { count: 'exact', head: true }),
    supabase.from('products').select('id', { count: 'exact', head: true }),
    supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
    supabase.from('users').select('id', { count: 'exact', head: true }),
    supabase.from('orders').select('id', { count: 'exact', head: true }),
  ])
  return {
    courses: courses.count ?? 0,
    products: products.count ?? 0,
    posts: posts.count ?? 0,
    users: users.count ?? 0,
    orders: (orders as { count: number | null }).count ?? 0,
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const statCards = [
    { key: 'courses',  label: 'Khóa học',    href: '/admin/khoa-hoc',   icon: BookOpen,     gradient: 'from-blue-500 to-blue-600',   bg: 'bg-blue-50',   text: 'text-blue-600',   border: 'border-blue-100' },
    { key: 'products', label: 'Sản phẩm',    href: '/admin/san-pham',   icon: ShoppingBag,  gradient: 'from-green-500 to-green-600', bg: 'bg-green-50',  text: 'text-green-600',  border: 'border-green-100' },
    { key: 'posts',    label: 'Bài viết',     href: '/admin/blog',       icon: FileText,     gradient: 'from-violet-500 to-violet-600', bg: 'bg-violet-50', text: 'text-violet-600', border: 'border-violet-100' },
    { key: 'users',    label: 'Người dùng',  href: '/admin/nguoi-dung', icon: Users,        gradient: 'from-orange-500 to-orange-600', bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-100' },
    { key: 'orders',   label: 'Đơn hàng',    href: '/admin/don-hang',   icon: ShoppingCart, gradient: 'from-pink-500 to-pink-600',   bg: 'bg-pink-50',   text: 'text-pink-600',   border: 'border-pink-100' },
  ]

  const quickActions = [
    { href: '/admin/khoa-hoc/tao-moi',  label: 'Tạo khóa học mới',  icon: BookOpen,    color: 'text-blue-600',   bg: 'bg-blue-50' },
    { href: '/admin/san-pham/tao-moi',  label: 'Thêm sản phẩm mới', icon: ShoppingBag, color: 'text-green-600',  bg: 'bg-green-50' },
    { href: '/admin/blog/tao-moi',      label: 'Viết bài blog mới',  icon: FileText,    color: 'text-violet-600', bg: 'bg-violet-50' },
    { href: '/admin/danh-muc',          label: 'Quản lý danh mục',  icon: Tag,         color: 'text-amber-600',  bg: 'bg-amber-50' },
    { href: '/admin/don-hang',          label: 'Xem đơn hàng',       icon: ShoppingCart, color: 'text-pink-600',  bg: 'bg-pink-50' },
    { href: '/admin/danh-gia',          label: 'Xem đánh giá',       icon: Star,        color: 'text-orange-600', bg: 'bg-orange-50' },
  ]

  return (
    <div className="space-y-8">
      {/* Header banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-violet-500 px-8 py-7 text-white">
        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 right-32 h-32 w-32 rounded-full bg-white/10" />
        <div className="relative z-10">
          <p className="text-sm text-blue-100">Xin chào, Admin 👋</p>
          <h1 className="mt-1 text-2xl font-bold">Dashboard MixiGui</h1>
          <p className="mt-1 text-sm text-blue-100">Tổng quan hệ thống — cập nhật mỗi 60 giây</p>
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 text-7xl opacity-10 select-none">♫</div>
      </div>

      {/* Stats */}
      <div>
        <h2 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wider">Thống kê tổng quan</h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {statCards.map(({ key, label, href, icon: Icon, bg, text, border }) => (
            <Link
              key={key}
              href={href}
              className={`group rounded-2xl border ${border} bg-white p-5 shadow-sm transition hover:shadow-md`}
            >
              <div className={`mb-3 inline-flex rounded-xl p-2.5 ${bg}`}>
                <Icon size={20} className={text} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats[key as keyof typeof stats]}</p>
              <div className="mt-0.5 flex items-center justify-between">
                <p className="text-xs text-gray-500">{label}</p>
                <ArrowRight size={13} className="text-gray-300 transition group-hover:text-gray-500" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick actions + summary */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick actions */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-700">Thao tác nhanh</h2>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map(({ href, label, icon: Icon, color, bg }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2.5 rounded-xl border border-gray-100 px-3 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-200 hover:bg-gray-50"
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${bg}`}>
                  <Icon size={15} className={color} />
                </div>
                <span className="leading-tight">{label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Summary table */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-sm font-semibold text-gray-700">Chi tiết thống kê</h2>
          <div className="space-y-3">
            {[
              { label: 'Khóa học đang hoạt động', value: stats.courses, color: 'text-blue-600',   bg: 'bg-blue-50' },
              { label: 'Sản phẩm trong kho',       value: stats.products, color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Bài viết đã đăng',          value: stats.posts,    color: 'text-violet-600', bg: 'bg-violet-50' },
              { label: 'Đơn hàng',                  value: stats.orders,   color: 'text-pink-600',  bg: 'bg-pink-50' },
              { label: 'Tổng người dùng',            value: stats.users,    color: 'text-orange-600', bg: 'bg-orange-50' },
            ].map(({ label, value, color, bg }) => (
              <div key={label} className="flex items-center justify-between rounded-xl px-1 py-1.5">
                <span className="text-sm text-gray-600">{label}</span>
                <span className={`rounded-full ${bg} ${color} px-3 py-0.5 text-sm font-bold`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create shortcuts */}
      <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/50 p-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-blue-700">Tạo mới nhanh:</span>
          {[
            { href: '/admin/khoa-hoc/tao-moi', label: 'Khóa học' },
            { href: '/admin/san-pham/tao-moi',  label: 'Sản phẩm' },
            { href: '/admin/blog/tao-moi',       label: 'Bài viết' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-1.5 rounded-xl bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow-sm transition hover:bg-blue-600 hover:text-white"
            >
              <Plus size={14} /> {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
