'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Loader2, CheckCircle, AlertCircle, Trash2 } from 'lucide-react'
import Link from 'next/link'

type PostRow = {
  id: string; title: string; slug: string; excerpt: string
  content: string; thumbnail_url: string | null; is_published: boolean
}

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [form, setForm] = useState<Partial<PostRow>>({})
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    supabase.from('blog_posts')
      .select('id,title,slug,excerpt,content,thumbnail_url,is_published')
      .eq('id', id).single()
      .then(({ data }) => {
        if (data) setForm(data)
        else setNotFound(true)
        setLoading(false)
      })
  }, [id])

  const set = (k: keyof PostRow, v: string | boolean) =>
    setForm((f) => ({ ...f, [k]: v }))

  const handleSave = async () => {
    setSaving(true); setStatus('idle')
    const { error } = await supabase.from('blog_posts').update({
      title: form.title, slug: form.slug, excerpt: form.excerpt,
      content: form.content, thumbnail_url: form.thumbnail_url || null,
      is_published: form.is_published,
    }).eq('id', id)
    setSaving(false)
    setStatus(error ? 'error' : 'success')
  }

  const handleDelete = async () => {
    if (!confirm('Xóa bài viết này? Hành động không thể hoàn tác.')) return
    await supabase.from('blog_posts').delete().eq('id', id)
    router.push('/admin/blog')
  }

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <Loader2 size={28} className="animate-spin text-blue-500" />
    </div>
  )
  if (notFound) return (
    <div className="py-24 text-center text-gray-400">Không tìm thấy bài viết</div>
  )

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft size={15} /> Quay lại danh sách
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa bài viết</h1>
        <p className="mt-1 font-mono text-xs text-gray-400">{id}</p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Tiêu đề</Label>
            <Input value={form.title ?? ''} onChange={(e) => set('title', e.target.value)}
              className="h-11 rounded-xl" placeholder="Tiêu đề bài viết" />
          </div>
          <div className="space-y-1.5">
            <Label>Slug (URL)</Label>
            <Input value={form.slug ?? ''} onChange={(e) => set('slug', e.target.value)}
              className="h-11 rounded-xl font-mono text-sm" placeholder="tieu-de-bai-viet" />
          </div>
          <div className="space-y-1.5">
            <Label>Tóm tắt</Label>
            <Textarea value={form.excerpt ?? ''} onChange={(e) => set('excerpt', e.target.value)}
              rows={2} className="rounded-xl resize-none" placeholder="Tóm tắt ngắn..." />
          </div>
          <div className="space-y-1.5">
            <Label>URL ảnh bìa</Label>
            <Input value={form.thumbnail_url ?? ''} onChange={(e) => set('thumbnail_url', e.target.value)}
              className="h-11 rounded-xl" placeholder="https://..." />
            {form.thumbnail_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.thumbnail_url} alt="" className="mt-2 h-28 w-48 rounded-xl border object-cover" />
            )}
          </div>
          <div className="space-y-1.5">
            <Label>Nội dung</Label>
            <Textarea value={form.content ?? ''} onChange={(e) => set('content', e.target.value)}
              rows={12} className="rounded-xl resize-none font-mono text-sm" placeholder="Nội dung bài viết..." />
          </div>
          <div>
            <label className="flex cursor-pointer items-center gap-3">
              <button type="button" onClick={() => set('is_published', !form.is_published)}
                className={`relative h-6 w-11 rounded-full transition-colors ${form.is_published ? 'bg-blue-600' : 'bg-gray-200'}`}>
                <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${form.is_published ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
              <span className="text-sm font-medium text-gray-700">
                {form.is_published ? 'Đã đăng công khai' : 'Bản nháp (ẩn)'}
              </span>
            </label>
          </div>
        </div>

        {status === 'success' && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
            <CheckCircle size={15} /> Lưu thành công!
          </div>
        )}
        {status === 'error' && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            <AlertCircle size={15} /> Lỗi khi lưu. Kiểm tra RLS policy trên Supabase.
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <button onClick={handleDelete}
            className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50">
            <Trash2 size={14} /> Xóa bài viết
          </button>
          <div className="flex gap-3">
            <Link href="/admin/blog"
              className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
              Hủy
            </Link>
            <Button onClick={handleSave} disabled={saving}
              className="h-10 rounded-xl bg-blue-600 px-6 text-sm font-semibold hover:bg-blue-700">
              {saving
                ? <span className="flex items-center gap-2"><Loader2 size={14} className="animate-spin" />Đang lưu...</span>
                : 'Lưu thay đổi'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
