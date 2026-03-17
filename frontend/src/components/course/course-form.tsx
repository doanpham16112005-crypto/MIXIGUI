'use client'

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import type { Course } from '@/types'

export function CourseForm({ onSubmit, defaultValues }: { onSubmit: (data: Partial<Course>) => void; defaultValues?: Partial<Course> }) {
  const { register, handleSubmit } = useForm<Partial<Course>>({ defaultValues })
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
      <div><Label>Tên khóa học</Label><Input {...register('title')} placeholder="Tên khóa học" /></div>
      <div><Label>Mô tả</Label><Textarea {...register('description')} placeholder="Mô tả" /></div>
      <div><Label>Giá (VND)</Label><Input type="number" {...register('price')} /></div>
      <Button type="submit">Lưu</Button>
    </form>
  )
}
