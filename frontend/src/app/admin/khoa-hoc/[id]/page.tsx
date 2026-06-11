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

type CourseRow = {
  id: string; title: string; slug: string; description: string
  thumbnail_url: string | null; price: number
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'; published: boolean
}

const LEVELS = [
  { value: 'BEGINNER',     label: 'Cơ bản' },
  { value: 'INTERMEDIATE', label: 'Trung cấp' },
  { value: 'ADVANCED',     label: 'Nâng cao' },
]

export default function EditCoursePage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [form, setForm] = useState<Partial<CourseRow>>({})
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    supabase.from('courses')
      .select('id,title,slug,description,thumbnail_url,price,level,published')
      .eq('id', id).single()
      .then(({ data }) => {
        if (data) setForm(data)
        else setNotFound(true)
        setLoading(false)
      })
  }, [id])

  const set = (k: keyof CourseRow, v: string | number | boolean) =>
    setForm((f) => ({ ...f, [k]: v }))

  const handleSave = async () => {
    setSaving(true); setStatus('idle')
    const { error } = await supabase.from('courses').update({
      title: form.title, slug: form.slug, description: form.description,
      thumbnail_url: form.thumbnail_url || null, price: Number(form.price),
      level: form.level, published: form.published,
    }).eq('id', id)
    setSaving(false)
    setStatus(error ? 'error' : 'success')
  }

  const handleDelete = async () => {
    if (!confirm('Xóa khóa học này? Hành động không thể hoàn tác.')) return
    await supabase.from('courses').delete().eq('id', id)
    router.push('/admin/khoa-hoc')
  }

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <Loader2 size={28} className="animate-spin text-blue-500" />
    </div>
  )
  if (notFound) return (
    <div className="py-24 text-center text-gray-400">Không tìm thấy khóa học</div>
  )

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link href="/admin/khoa-hoc" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft size={15} /> Quay lại danh sách
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa khóa học</h1>
        <p className="mt-1 font-mono text-xs text-gray-400">{id}</p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 space-y-1.5">
            <Label>Tên khóa học</Label>
            <Input value={form.title ?? ''} onChange={(e) => set('title', e.target.value)}
              className="h-11 rounded-xl" placeholder="Tên khóa học" />
          </div>
          <div className="col-span-2 space-y-1.5">
            <Label>Slug (URL)</Label>
            <Input value={form.slug ?? ''} onChange={(e) => set('slug', e.target.value)}
              className="h-11 rounded-xl font-mono text-sm" placeholder="ten-khoa-hoc" />
          </div>
          <div className="col-span-2 space-y-1.5">
            <Label>Mô tả</Label>
            <Textarea value={form.description ?? ''} onChange={(e) => set('description', e.target.value)}
              rows={4} className="rounded-xl resize-none" placeholder="Mô tả khóa học..." />
          </div>
          <div className="space-y-1.5">
            <Label>Giá (VND)</Label>
            <Input type="number" value={form.price ?? 0} onChange={(e) => set('price', e.target.value)}
              className="h-11 rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <Label>Cấp độ</Label>
            <select
              value={form.level ?? 'BEGINNER'}
              onChange={(e) => set('level', e.target.value)}
              className="h-11 w-full rounded-xl border border-gray-200 px-3 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              {LEVELS.map((l) => (
                <option key={l.value} value={l.value}>{l.label}</option>
              ))}
            </select>
          </div>
          <div className="col-span-2 space-y-1.5">
            <Label>URL thumbnail</Label>
            <Input value={form.thumbnail_url ?? ''} onChange={(e) => set('thumbnail_url', e.target.value)}
              className="h-11 rounded-xl" placeholder="https://..." />
            {form.thumbnail_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.thumbnail_url} alt="" className="mt-2 h-28 w-48 rounded-xl border object-cover" />
            )}
          </div>
          <div className="col-span-2">
            <label className="flex cursor-pointer items-center gap-3">
              <button type="button" onClick={() => set('published', !form.published)}
                className={`relative h-6 w-11 rounded-full transition-colors ${form.published ? 'bg-blue-600' : 'bg-gray-200'}`}>
                <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${form.published ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
              <span className="text-sm font-medium text-gray-700">
                {form.published ? 'Đang hiển thị công khai' : 'Ẩn khỏi danh sách'}
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
            <Trash2 size={14} /> Xóa khóa học
          </button>
          <div className="flex gap-3">
            <Link href="/admin/khoa-hoc"
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
