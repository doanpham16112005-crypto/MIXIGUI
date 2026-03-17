'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { registerSchema, type RegisterFormData } from '@/lib/validations'
import { authApi } from '@/lib/api/auth'
import Link from 'next/link'

export default function DangKyPage() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await authApi.register(data)
      router.push('/dang-nhap')
    } catch {
      alert('Đăng ký thất bại')
    }
  }

  return (
    <Card>
      <CardHeader><CardTitle>Đăng ký</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Họ tên</Label>
            <Input {...register('fullName')} placeholder="Nguyễn Văn A" />
            {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" {...register('email')} placeholder="email@example.com" />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <Label>Mật khẩu</Label>
            <Input type="password" {...register('password')} placeholder="••••••••" />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm">
          Đã có tài khoản? <Link href="/dang-nhap" className="text-blue-600 hover:underline">Đăng nhập</Link>
        </p>
      </CardContent>
    </Card>
  )
}
