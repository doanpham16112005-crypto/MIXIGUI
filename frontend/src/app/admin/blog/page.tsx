'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/ui/button'

type Post = { id: string; title: string; slug: string; is_published: boolean; published_at: string }

export default function AdminBlog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = async () => {
    setLoading(true)
    const { data } = await supabase.from('blog_posts').select('id, title, slug, is_published, published_at').order('created_at', { ascending: false })
    setPosts(data ?? [])
    setLoading(false)
  }

  const togglePublish = async (id: string, current: boolean) => {
    await supabase.from('blog_posts').update({ is_published: !current }).eq('id', id)
    fetchPosts()
  }

  const deletePost = async (id: string, title: string) => {
    if (!confirm(`Xóa bài viết "${title}"?`)) return
    await supabase.from('blog_posts').delete().eq('id', id)
    fetchPosts()
  }

  useEffect(() => { fetchPosts() }, [])

  return (
    <div>
      <div className="flex items-center justify-between">
        <PageHeader title="Quản lý Blog" />
        <Link href="/admin/blog/tao-moi"><Button>+ Viết bài mới</Button></Link>
      </div>
      {loading ? <div className="py-10 text-center text-gray-400">Đang tải...</div> : (
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-4 py-3">Tiêu đề</th>
                <th className="px-4 py-3">Ngày đăng</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {posts.length === 0 ? (
                <tr><td colSpan={4} className="py-10 text-center text-gray-400">Chưa có bài viết</td></tr>
              ) : posts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800 line-clamp-1">{p.title}</p>
                    <p className="text-xs text-gray-400">{p.slug}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(p.published_at).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => togglePublish(p.id, p.is_published)} className={`rounded-full px-2 py-0.5 text-xs font-medium ${p.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {p.is_published ? 'Đã đăng' : 'Ẩn'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link href={`/admin/blog/${p.id}`} className="text-blue-600 hover:underline">Sửa</Link>
                      <button onClick={() => deletePost(p.id, p.title)} className="text-red-500 hover:underline">Xóa</button>
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
