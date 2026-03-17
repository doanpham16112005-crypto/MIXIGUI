'use client'

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { Product } from '@/types'

export function ProductForm({ onSubmit, defaultValues }: { onSubmit: (data: Partial<Product>) => void; defaultValues?: Partial<Product> }) {
  const { register, handleSubmit } = useForm<Partial<Product>>({ defaultValues })
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
      <div><Label>Tên sản phẩm</Label><Input {...register('name')} /></div>
      <div><Label>Mô tả</Label><Textarea {...register('description')} /></div>
      <div><Label>Giá (VND)</Label><Input type="number" {...register('price')} /></div>
      <div><Label>Số lượng</Label><Input type="number" {...register('stock')} /></div>
      <Button type="submit">Lưu</Button>
    </form>
  )
}
