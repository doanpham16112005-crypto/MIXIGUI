'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { registerSchema, type RegisterFormData } from '@/lib/validations'
import { authApi } from '@/lib/api/auth'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="white" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

export default function DangKyPage() {
  const router = useRouter()
  const [oauthLoading, setOauthLoading] = useState<'google' | 'facebook' | null>(null)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const handleOAuth = async (provider: 'google' | 'facebook') => {
    setOauthLoading(provider)
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await authApi.register(data)
      router.push('/dang-nhap')
    } catch {
      alert('Đăng ký thất bại')
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Panel trái — branding */}
      <div className="relative hidden flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-violet-600 via-blue-600 to-blue-500 px-12 lg:flex lg:w-5/12">
        <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-white/10" />
        <div className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-white/5" />

        <div className="relative z-10 text-center text-white">
          <div className="mb-6 flex justify-center">
            <div className="flex items-center gap-3 rounded-2xl bg-white/15 px-5 py-3 backdrop-blur-sm">
              <Image src="/images/logo.png" alt="MixiGui" width={40} height={40} className="rounded-full" />
              <span className="text-2xl font-bold">MixiGui</span>
            </div>
          </div>
          <h2 className="mb-3 text-3xl font-bold leading-tight">
            Bắt đầu<br />hành trình nhạc!
          </h2>
          <p className="mb-8 text-base text-blue-100">
            Tham gia cùng hàng nghìn học viên<br />đang học nhạc tại MixiGui
          </p>

          <div className="flex justify-center gap-4 text-4xl text-white/30 select-none">
            <span className="animate-bounce" style={{ animationDelay: '0ms' }}>♩</span>
            <span className="animate-bounce" style={{ animationDelay: '150ms' }}>♪</span>
            <span className="animate-bounce" style={{ animationDelay: '300ms' }}>♫</span>
            <span className="animate-bounce" style={{ animationDelay: '450ms' }}>♬</span>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 mt-12 grid w-full max-w-xs grid-cols-3 gap-3">
          {[
            { value: '500+', label: 'Khóa học' },
            { value: '10K+', label: 'Học viên' },
            { value: '50+', label: 'Giảng viên' },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-white/10 p-3 text-center backdrop-blur-sm">
              <div className="text-lg font-bold text-white">{s.value}</div>
              <div className="text-xs text-blue-200">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Panel phải — form */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Tạo tài khoản</h1>
            <p className="mt-1 text-sm text-gray-500">Đăng ký miễn phí, học ngay hôm nay</p>
          </div>

          {/* OAuth */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleOAuth('google')}
              disabled={oauthLoading !== null}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 disabled:opacity-60"
            >
              <GoogleIcon />
              {oauthLoading === 'google' ? 'Đang mở...' : 'Google'}
            </button>
            <button
              type="button"
              onClick={() => handleOAuth('facebook')}
              disabled={oauthLoading !== null}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#1877F2] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#166FE5] disabled:opacity-60"
            >
              <FacebookIcon />
              {oauthLoading === 'facebook' ? 'Đang mở...' : 'Facebook'}
            </button>
          </div>

          <div className="mb-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">hoặc</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">Họ tên</Label>
              <Input
                {...register('fullName')}
                placeholder="Nguyễn Văn A"
                className="h-11 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">Email</Label>
              <Input
                type="email"
                {...register('email')}
                placeholder="email@example.com"
                className="h-11 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">Mật khẩu</Label>
              <Input
                type="password"
                {...register('password')}
                placeholder="••••••••"
                className="h-11 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <Button
              type="submit"
              className="h-11 w-full rounded-xl bg-blue-600 text-sm font-semibold hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang đăng ký...' : 'Tạo tài khoản miễn phí'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Đã có tài khoản?{' '}
            <Link href="/dang-nhap" className="font-medium text-blue-600 hover:underline">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
