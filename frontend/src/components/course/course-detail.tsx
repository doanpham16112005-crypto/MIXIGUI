import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/formatters'
import type { Course } from '@/types'

export function CourseDetail({ course }: { course: Course }) {
  return (
    <div className="max-w-3xl">
      <img src={course.thumbnailUrl} alt={course.title} className="mb-6 h-64 w-full rounded-lg object-cover" />
      <Badge>{course.level}</Badge>
      <h1 className="mt-2 text-3xl font-bold">{course.title}</h1>
      <p className="mt-4 text-gray-600">{course.description}</p>
      <p className="mt-4 text-2xl font-bold text-blue-600">{formatPrice(course.price)}</p>
    </div>
  )
}
