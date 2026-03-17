'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/button'

export function ImageUpload({ value, onChange }: { value?: string; onChange: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div className="space-y-2">
      {value && <img src={value} alt="Preview" className="h-32 w-full rounded-md object-cover" />}
      <Button type="button" variant="outline" onClick={() => inputRef.current?.click()}>Chọn ảnh</Button>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
        const file = e.target.files?.[0]
        if (file) onChange(URL.createObjectURL(file))
      }} />
    </div>
  )
}
