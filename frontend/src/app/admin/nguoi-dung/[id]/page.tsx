'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Loader2, CheckCircle, AlertCircle, Mail, User, Shield, Calendar } from 'lucide-react'
import Link from 'next/link'

type UserRow = {
  id: string; email: string; full_name: string; role: string
  bio: string | null; avatar_url: string | null; is_active: boolean; created_at: string
}

const ROLES = [
  { value: 'STUDENT',    label: 'Học viên',   color: 'bg-green-100 text-green-700' },
  { value: 'INSTRUCTOR', label: 'Giảng viên', color: 'bg-blue-100 text-blue-700' },
  { value: 'ADMIN',      label: 'Admin',      color: 'bg-red-100 text-red-700' },
]

export default function EditUserPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [form, setForm] = useState<Partial<UserRow>>({})
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    supabase.from('users')
      .select('id,email,full_name,role,bio,avatar_url,is_active,created_at')
      .eq('id', id).single()
      .then(({ data }) => {
        if (data) setForm(data)
        else setNotFound(true)
        setLoading(false)
      })
  }, [id])

  const set = (k: keyof UserRow, v: string | boolean | null) =>
    setForm((f) => ({ ...f, [k]: v }))

  const handleSave = async () => {
    setSaving(true); setStatus('idle')
    const { error } = await supabase.from('users').update({
      full_name: form.full_name,
      role: form.role,
      bio: form.bio || null,
      is_active: form.is_active,
    }).eq('id', id)
    setSaving(false)
    setStatus(error ? 'error' : 'success')
  }

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <Loader2 size={28} className="animate-spin text-blue-500" />
    </div>
  )
  if (notFound) return (
    <div className="py-24 text-center text-gray-400">Không tìm thấy người dùng</div>
  )

  const roleInfo = ROLES.find((r) => r.value === form.role)

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link href="/admin/nguoi-dung" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft size={15} /> Quay lại danh sách
      </Link>

      {/* User header */}
      <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        {form.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={form.avatar_url} alt="" className="h-14 w-14 rounded-full object-cover ring-2 ring-gray-100" referrerPolicy="no-referrer" />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-xl font-bold text-white">
            {(form.full_name || form.email || 'U')[0].toUpperCase()}
          </div>
        )}
        <div>
          <p className="text-lg font-bold text-gray-900">{form.full_name || '—'}</p>
          <p className="text-sm text-gray-500">{form.email}</p>
          <div className="mt-1 flex items-center gap-2">
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${roleInfo?.color ?? 'bg-gray-100 text-gray-500'}`}>
              {roleInfo?.label ?? form.role}
            </span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${form.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
              {form.is_active ? 'Hoạt động' : 'Đã khóa'}
            </span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-xs text-gray-400">
          <Calendar size={12} />
          {form.created_at ? new Date(form.created_at).toLocaleDateString('vi-VN') : '—'}
        </div>
      </div>

      {/* Edit form */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-5">
        <h2 className="text-sm font-semibold text-gray-700">Thông tin tài khoản</h2>

        {/* Email read-only */}
        <div className="space-y-1.5">
          <Label className="flex items-center gap-1.5 text-sm">
            <Mail size={13} className="text-gray-400" /> Email
          </Label>
          <div className="flex h-11 items-center rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-500">
            {form.email}
            <span className="ml-auto rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-500">Không thể thay đổi</span>
          </div>
        </div>

        {/* Full name */}
        <div className="space-y-1.5">
          <Label className="flex items-center gap-1.5 text-sm">
            <User size={13} className="text-gray-400" /> Họ tên
          </Label>
          <Input value={form.full_name ?? ''} onChange={(e) => set('full_name', e.target.value)}
            className="h-11 rounded-xl" placeholder="Nguyễn Văn A" />
        </div>

        {/* Role */}
        <div className="space-y-1.5">
          <Label className="flex items-center gap-1.5 text-sm">
            <Shield size={13} className="text-gray-400" /> Vai trò
          </Label>
          <div className="grid grid-cols-3 gap-2">
            {ROLES.map((r) => (
              <button
                key={r.value} type="button"
                onClick={() => set('role', r.value)}
                className={`rounded-xl border py-2.5 text-sm font-medium transition ${
                  form.role === r.value
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-1.5">
          <Label className="text-sm">Giới thiệu</Label>
          <Textarea value={form.bio ?? ''} onChange={(e) => set('bio', e.target.value)}
            rows={3} className="rounded-xl resize-none" placeholder="Giới thiệu ngắn..." />
        </div>

        {/* Active toggle */}
        <div>
          <label className="flex cursor-pointer items-center gap-3">
            <button type="button" onClick={() => set('is_active', !form.is_active)}
              className={`relative h-6 w-11 rounded-full transition-colors ${form.is_active ? 'bg-green-500' : 'bg-gray-200'}`}>
              <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${form.is_active ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
            <span className="text-sm font-medium text-gray-700">
              {form.is_active ? 'Tài khoản đang hoạt động' : 'Tài khoản bị khóa'}
            </span>
          </label>
        </div>

        {status === 'success' && (
          <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
            <CheckCircle size={15} /> Cập nhật thành công!
          </div>
        )}
        {status === 'error' && (
          <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            <AlertCircle size={15} /> Lỗi khi lưu. Kiểm tra RLS policy trên Supabase.
          </div>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <Link href="/admin/nguoi-dung"
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
  )
}
