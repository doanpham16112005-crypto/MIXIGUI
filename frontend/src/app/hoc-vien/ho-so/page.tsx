'use client'

import { useState, useRef, useEffect } from 'react'
import { useAuthStore } from '@/stores/auth-store'
import { supabase } from '@/lib/supabase'
import { Camera, Mail, User, FileText, CheckCircle, AlertCircle, Loader2, Lock } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function ProfilePage() {
  const { user, updateUser } = useAuthStore()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [oauthProvider, setOauthProvider] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const provider = session?.user?.app_metadata?.provider
      if (provider && provider !== 'email') setOauthProvider(provider)
    })
  }, [])

  const [fullName, setFullName] = useState(user?.full_name || user?.fullName || '')
  const [bio, setBio] = useState(user?.bio || '')
  const [avatarPreview, setAvatarPreview] = useState<string>(user?.avatar_url || user?.avatarUrl || '')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  const handleSave = async () => {
    if (!user) return
    setSaving(true)
    setStatus('idle')

    try {
      let avatarUrl = user.avatar_url || user.avatarUrl || null

      // Upload avatar nếu có file mới
      if (avatarFile) {
        const ext = avatarFile.name.split('.').pop()
        const path = `avatars/${user.id}.${ext}`
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(path, avatarFile, { upsert: true })

        if (!uploadError) {
          const { data } = supabase.storage.from('avatars').getPublicUrl(path)
          avatarUrl = data.publicUrl
        }
      }

      const { error } = await supabase
        .from('users')
        .update({ full_name: fullName, bio, avatar_url: avatarUrl })
        .eq('id', user.id)

      if (error) throw error

      updateUser({ full_name: fullName, fullName, bio, avatar_url: avatarUrl ?? undefined, avatarUrl: avatarUrl ?? undefined })
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      setSaving(false)
    }
  }

  const initials = (user?.full_name || user?.fullName || user?.email || 'U')[0].toUpperCase()

  const providerLabel = oauthProvider === 'google' ? 'Google' : oauthProvider === 'facebook' ? 'Facebook' : oauthProvider
  const isOAuth = !!oauthProvider

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
        <p className="mt-1 text-sm text-gray-500">
          {isOAuth ? 'Thông tin tài khoản của bạn' : 'Cập nhật thông tin cá nhân của bạn'}
        </p>
      </div>

      {/* OAuth notice */}
      {isOAuth && (
        <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
          <Lock size={18} className="mt-0.5 shrink-0 text-amber-500" />
          <div>
            <p className="text-sm font-semibold text-amber-800">
              Tài khoản được quản lý bởi {providerLabel}
            </p>
            <p className="mt-0.5 text-sm text-amber-700">
              Bạn đã đăng nhập qua {providerLabel}. Để thay đổi tên hoặc ảnh đại diện,
              vui lòng cập nhật trực tiếp trên tài khoản {providerLabel} của bạn.
            </p>
          </div>
        </div>
      )}

      {/* Avatar */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-gray-700">Ảnh đại diện</h2>
        <div className="flex items-center gap-5">
          <div className="relative">
            {avatarPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarPreview}
                alt="Avatar"
                className="h-20 w-20 rounded-full object-cover ring-4 ring-gray-100"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-2xl font-bold text-white ring-4 ring-gray-100">
                {initials}
              </div>
            )}
            {!isOAuth && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700"
              >
                <Camera size={13} />
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">
              {user?.full_name || user?.fullName || 'Học viên'}
            </p>
            <p className="text-xs text-gray-400">Nhấn vào icon camera để thay đổi</p>
            <p className="mt-1 text-xs text-gray-400">JPG, PNG — tối đa 2MB</p>
          </div>
        </div>
      </div>

      {/* Form thông tin */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-sm font-semibold text-gray-700">Thông tin cá nhân</h2>
        <div className="space-y-5">
          {/* Email — read only */}
          <div className="space-y-1.5">
            <Label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
              <Mail size={14} className="text-gray-400" /> Email
            </Label>
            <div className="flex h-11 items-center rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-500">
              {user?.email}
              <span className="ml-auto rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-500">
                Không thể thay đổi
              </span>
            </div>
          </div>

          {/* Họ tên */}
          <div className="space-y-1.5">
            <Label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
              <User size={14} className="text-gray-400" /> Họ tên
            </Label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nguyễn Văn A"
              disabled={isOAuth}
              className="h-11 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <Label className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
              <FileText size={14} className="text-gray-400" /> Giới thiệu bản thân
            </Label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Viết vài dòng về bản thân bạn, sở thích âm nhạc..."
              rows={4}
              disabled={isOAuth}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
            />
            {!isOAuth && <p className="text-xs text-gray-400">{bio.length}/300 ký tự</p>}
          </div>
        </div>

        {/* Status message */}
        {status === 'success' && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
            <CheckCircle size={16} /> Cập nhật hồ sơ thành công!
          </div>
        )}
        {status === 'error' && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            <AlertCircle size={16} /> Có lỗi xảy ra, vui lòng thử lại.
          </div>
        )}

        {!isOAuth && (
          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setFullName(user?.full_name || user?.fullName || '')
                setBio(user?.bio || '')
                setAvatarPreview(user?.avatar_url || user?.avatarUrl || '')
                setAvatarFile(null)
                setStatus('idle')
              }}
              className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Hủy
            </button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="h-10 rounded-xl bg-blue-600 px-6 text-sm font-semibold hover:bg-blue-700"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={15} className="animate-spin" /> Đang lưu...
                </span>
              ) : 'Lưu thay đổi'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
