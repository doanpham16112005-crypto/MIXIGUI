import type { Lesson } from '@/types'

export function LessonList({ lessons }: { lessons: Lesson[] }) {
  return (
    <ul className="space-y-2">
      {lessons.map((lesson) => (
        <li key={lesson.id} className="flex items-center justify-between rounded-md border p-3">
          <span className="text-sm font-medium">{lesson.orderIndex}. {lesson.title}</span>
          {lesson.isFree && <span className="text-xs text-green-600">Miễn phí</span>}
        </li>
      ))}
    </ul>
  )
}
