import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/formatters'
import { COURSE_LEVEL_LABELS } from '@/lib/constants'
import type { Course } from '@/types'

export function CourseCard({ course }: { course: Course }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <img src={course.thumbnailUrl} alt={course.title} className="h-40 w-full object-cover" />
      <CardContent>
        <Badge>{COURSE_LEVEL_LABELS[course.level]}</Badge>
        <h3 className="mt-2 font-semibold line-clamp-2">{course.title}</h3>
        <p className="mt-1 text-blue-600 font-bold">{formatPrice(course.price)}</p>
        <Link href={`/khoa-hoc/${course.slug}`} className="mt-2 block text-sm text-blue-500 hover:underline">Xem chi tiết →</Link>
      </CardContent>
    </Card>
  )
}
