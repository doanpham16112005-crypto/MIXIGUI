'use client'

import { Button } from '@/components/ui/button'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Có lỗi xảy ra</h2>
      <p className="text-gray-500">{error.message}</p>
      <Button onClick={reset}>Thử lại</Button>
    </div>
  )
}
