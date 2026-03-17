'use client'

import { Button } from '@/components/ui/button'

export function EnrollButton({ courseId, price }: { courseId: number; price: number }) {
  const handleEnroll = () => {
    // TODO: call enroll API
    console.log('Enroll course', courseId)
  }
  return <Button onClick={handleEnroll} className="w-full">Đăng ký học - {price.toLocaleString('vi-VN')}đ</Button>
}
