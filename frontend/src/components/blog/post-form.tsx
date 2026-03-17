'use client'

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RichTextEditor } from '@/components/shared/rich-text-editor'
import type { Post } from '@/types'
import { useState } from 'react'

export function PostForm({ onSubmit, defaultValues }: { onSubmit: (data: Partial<Post>) => void; defaultValues?: Partial<Post> }) {
  const { register, handleSubmit, setValue } = useForm<Partial<Post>>({ defaultValues })
  const [content, setContent] = useState(defaultValues?.content || '')
  return (
    <form onSubmit={handleSubmit((data) => onSubmit({ ...data, content }))} className="space-y-4 max-w-xl">
      <div><Label>Tiêu đề</Label><Input {...register('title')} /></div>
      <div><Label>Tóm tắt</Label><Input {...register('excerpt')} /></div>
      <div><Label>Nội dung</Label><RichTextEditor value={content} onChange={(val) => { setContent(val); setValue('content', val) }} /></div>
      <Button type="submit">Lưu</Button>
    </form>
  )
}
