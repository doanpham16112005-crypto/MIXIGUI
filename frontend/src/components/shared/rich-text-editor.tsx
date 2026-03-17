'use client'

import { Textarea } from '@/components/ui/textarea'

export function RichTextEditor({ value, onChange }: { value?: string; onChange: (val: string) => void }) {
  return <Textarea value={value} onChange={(e) => onChange(e.target.value)} rows={10} placeholder="Nội dung..." />
}
