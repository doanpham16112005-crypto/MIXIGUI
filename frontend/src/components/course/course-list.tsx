import { CourseCard } from './course-card'
import type { Course } from '@/types'

export function CourseList({ courses }: { courses: Course[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => <CourseCard key={course.id} course={course} />)}
    </div>
  )
}
