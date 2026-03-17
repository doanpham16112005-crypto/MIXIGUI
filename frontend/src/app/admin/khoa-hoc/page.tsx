'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/ui/button'

type Course = {
  id: string; title: string; slug: string; level: string
  price: number; discount_price: number; is_published: boolean; created_at: string
}

const levelLabel: Record<string, string> = { BEGINNER: 'Cơ bản', INTERMEDIATE: 'Trung cấp', ADVANCED: 'Nâng cao' }

export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCourses = async () => {
    setLoading(true)
    const { data } = await supabase.from('courses')
      .select('id, title, slug, level, price, discount_price, is_published, created_at')
      .order('created_at', { ascending: false })
    setCourses(data ?? [])
    setLoading(false)
  }

  const togglePublish = async (id: string, current: boolean) => {
    await supabase.from('courses').update({ is_published: !current }).eq('id', id)
    fetchCourses()
  }

  const deleteCourse = async (id: string, title: string) => {
    if (!confirm(`Xóa khóa học "${title}"?`)) return
    await supabase.from('courses').delete().eq('id', id)
    fetchCourses()
  }

  useEffect(() => { fetchCourses() }, [])

  return (
    <div>
      <div className="flex items-center justify-between">
        <PageHeader title="Quản lý khóa học" />
        <Link href="/admin/khoa-hoc/tao-moi"><Button>+ Tạo mới</Button></Link>
      </div>

      {loading ? (
        <div className="py-10 text-center text-gray-400">Đang tải...</div>
      ) : (
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-4 py-3">Tên khóa học</th>
                <th className="px-4 py-3">Cấp độ</th>
                <th className="px-4 py-3">Giá</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {courses.length === 0 ? (
                <tr><td colSpan={5} className="py-10 text-center text-gray-400">Chưa có khóa học</td></tr>
              ) : courses.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800">{c.title}</p>
                    <p className="text-xs text-gray-400">{c.slug}</p>
                  </td>
                  <td className="px-4 py-3">{levelLabel[c.level] ?? c.level}</td>
                  <td className="px-4 py-3">{Number(c.price).toLocaleString('vi-VN')}₫</td>
                  <td className="px-4 py-3">
                    <button onClick={() => togglePublish(c.id, c.is_published)}
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${c.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {c.is_published ? 'Đang hiện' : 'Ẩn'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link href={`/admin/khoa-hoc/${c.id}`} className="text-blue-600 hover:underline">Sửa</Link>
                      <button onClick={() => deleteCourse(c.id, c.title)} className="text-red-500 hover:underline">Xóa</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
