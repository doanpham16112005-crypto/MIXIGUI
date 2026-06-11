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

type ProductRow = {
  id: string; name: string; slug: string; description: string
  price: number; stock: number; images: string[]; is_published: boolean; brand: string
}

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [form, setForm] = useState<Partial<ProductRow>>({})
  const [imageInput, setImageInput] = useState('')
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    supabase.from('products')
      .select('id,name,slug,description,price,stock,images,is_published,brand')
      .eq('id', id).single()
      .then(({ data }) => {
        if (data) {
          setForm(data)
          setImageInput(data.images?.[0] ?? '')
        } else {
          setNotFound(true)
        }
        setLoading(false)
      })
  }, [id])

  const set = (k: keyof ProductRow, v: string | number | boolean) =>
    setForm((f) => ({ ...f, [k]: v }))

  const handleSave = async () => {
    setSaving(true); setStatus('idle')
    const { error } = await supabase.from('products').update({
      name: form.name, slug: form.slug, description: form.description,
      price: Number(form.price), stock: Number(form.stock), brand: form.brand,
      images: imageInput ? [imageInput] : (form.images ?? []),
      is_published: form.is_published,
    }).eq('id', id)
    setSaving(false)
    setStatus(error ? 'error' : 'success')
  }

  const handleDelete = async () => {
    if (!confirm('Xóa sản phẩm này? Hành động không thể hoàn tác.')) return
    await supabase.from('products').delete().eq('id', id)
    router.push('/admin/san-pham')
  }

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <Loader2 size={28} className="animate-spin text-blue-500" />
    </div>
  )
  if (notFound) return (
    <div className="py-24 text-center text-gray-400">Không tìm thấy sản phẩm</div>
  )

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link href="/admin/san-pham" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft size={15} /> Quay lại danh sách
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa sản phẩm</h1>
        <p className="mt-1 font-mono text-xs text-gray-400">{id}</p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 space-y-1.5">
            <Label>Tên sản phẩm</Label>
            <Input value={form.name ?? ''} onChange={(e) => set('name', e.target.value)}
              className="h-11 rounded-xl" placeholder="Tên sản phẩm" />
          </div>
          <div className="col-span-2 space-y-1.5">
            <Label>Slug (URL)</Label>
            <Input value={form.slug ?? ''} onChange={(e) => set('slug', e.target.value)}
              className="h-11 rounded-xl font-mono text-sm" placeholder="ten-san-pham" />
          </div>
          <div className="space-y-1.5">
            <Label>Thương hiệu</Label>
            <Input value={form.brand ?? ''} onChange={(e) => set('brand', e.target.value)}
              className="h-11 rounded-xl" placeholder="Brand" />
          </div>
          <div className="space-y-1.5">
            <Label>Số lượng trong kho</Label>
            <Input type="number" value={form.stock ?? 0} onChange={(e) => set('stock', e.target.value)}
              className="h-11 rounded-xl" />
          </div>
          <div className="col-span-2 space-y-1.5">
            <Label>Mô tả</Label>
            <Textarea value={form.description ?? ''} onChange={(e) => set('description', e.target.value)}
              rows={4} className="rounded-xl resize-none" placeholder="Mô tả sản phẩm..." />
          </div>
          <div className="space-y-1.5">
            <Label>Giá (VND)</Label>
            <Input type="number" value={form.price ?? 0} onChange={(e) => set('price', e.target.value)}
              className="h-11 rounded-xl" />
          </div>
          <div className="space-y-1.5" />
          <div className="col-span-2 space-y-1.5">
            <Label>URL hình ảnh chính</Label>
            <Input value={imageInput} onChange={(e) => setImageInput(e.target.value)}
              className="h-11 rounded-xl" placeholder="https://..." />
            {imageInput && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageInput} alt="" className="mt-2 h-28 w-28 rounded-xl border object-cover" />
            )}
          </div>
          <div className="col-span-2">
            <label className="flex cursor-pointer items-center gap-3">
              <button type="button" onClick={() => set('is_published', !form.is_published)}
                className={`relative h-6 w-11 rounded-full transition-colors ${form.is_published ? 'bg-blue-600' : 'bg-gray-200'}`}>
                <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${form.is_published ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
              <span className="text-sm font-medium text-gray-700">
                {form.is_published ? 'Đang hiển thị trên cửa hàng' : 'Ẩn khỏi cửa hàng'}
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
            <Trash2 size={14} /> Xóa sản phẩm
          </button>
          <div className="flex gap-3">
            <Link href="/admin/san-pham"
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
