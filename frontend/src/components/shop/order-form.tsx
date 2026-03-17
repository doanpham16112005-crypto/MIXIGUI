'use client'

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface OrderFormData {
  fullName: string
  phone: string
  address: string
}

export function OrderForm({ onSubmit }: { onSubmit: (data: OrderFormData) => void }) {
  const { register, handleSubmit } = useForm<OrderFormData>()
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div><Label>Họ tên</Label><Input {...register('fullName')} placeholder="Nguyễn Văn A" /></div>
      <div><Label>Số điện thoại</Label><Input {...register('phone')} placeholder="0901234567" /></div>
      <div><Label>Địa chỉ giao hàng</Label><Input {...register('address')} placeholder="123 Đường ABC, TP.HCM" /></div>
      <Button type="submit">Đặt hàng</Button>
    </form>
  )
}
