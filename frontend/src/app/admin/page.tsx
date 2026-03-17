import { createServerClient } from '@/lib/supabase'
import { PageHeader } from '@/components/shared/page-header'
import Link from 'next/link'

export const revalidate = 60

async function getStats() {
  const supabase = createServerClient()
  const [courses, products, posts, users, orders] = await Promise.all([
    supabase.from('courses').select('id', { count: 'exact', head: true }),
    supabase.from('products').select('id', { count: 'exact', head: true }),
    supabase.from('blog_posts').select('id', { count: 'exact', head: true }),
    supabase.from('users').select('id', { count: 'exact', head: true }),
    supabase.from('orders').select('id', { count: 'exact', head: true }).then(r => r).catch(() => ({ count: 0 })),
  ])
  return {
    courses: courses.count ?? 0,
    products: products.count ?? 0,
    posts: posts.count ?? 0,
    users: users.count ?? 0,
    orders: (orders as { count: number | null }).count ?? 0,
  }
}

const statCards = [
  { key: 'courses', label: 'Khóa học', href: '/admin/khoa-hoc', color: 'bg-blue-500', icon: '🎓' },
  { key: 'products', label: 'Sản phẩm', href: '/admin/san-pham', color: 'bg-green-500', icon: '🎸' },
  { key: 'posts', label: 'Bài viết', href: '/admin/blog', color: 'bg-purple-500', icon: '📝' },
  { key: 'users', label: 'Người dùng', href: '/admin/nguoi-dung', color: 'bg-orange-500', icon: '👥' },
]

export default async function AdminDashboard() {
  const stats = await getStats()

  return (
    <div>
      <PageHeader title="Dashboard" description="Quản trị hệ thống MixiGui" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map(({ key, label, href, color, icon }) => (
          <Link key={key} href={href} className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="mt-1 text-3xl font-bold text-gray-800">{stats[key as keyof typeof stats]}</p>
              </div>
              <div className={`${color} flex h-12 w-12 items-center justify-center rounded-full text-2xl`}>
                {icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-semibold text-gray-700">Truy cập nhanh</h2>
          <div className="space-y-2">
            {[
              { href: '/admin/khoa-hoc/tao-moi', label: '+ Tạo khóa học mới' },
              { href: '/admin/san-pham/tao-moi', label: '+ Thêm sản phẩm mới' },
              { href: '/admin/blog/tao-moi', label: '+ Viết bài blog mới' },
              { href: '/admin/danh-muc', label: '📂 Quản lý danh mục' },
              { href: '/admin/don-hang', label: '📦 Xem đơn hàng' },
              { href: '/admin/nguoi-dung', label: '👥 Quản lý người dùng' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="block rounded-md px-3 py-2 text-sm text-blue-600 hover:bg-blue-50">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="mb-4 font-semibold text-gray-700">Thống kê nhanh</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between border-b pb-2">
              <span>Khóa học đang hoạt động</span>
              <span className="font-semibold text-green-600">{stats.courses}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Sản phẩm trong kho</span>
              <span className="font-semibold text-green-600">{stats.products}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span>Bài viết đã đăng</span>
              <span className="font-semibold text-green-600">{stats.posts}</span>
            </div>
            <div className="flex justify-between">
              <span>Tổng người dùng</span>
              <span className="font-semibold text-blue-600">{stats.users}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
