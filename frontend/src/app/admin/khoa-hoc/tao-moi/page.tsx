'use client'

import { PageHeader } from '@/components/shared/page-header'
import { CourseForm } from '@/components/course/course-form'

export default function CreateCourse() {
  return (
    <div>
      <PageHeader title="Tạo khóa học mới" />
      <CourseForm onSubmit={(data) => console.log(data)} />
    </div>
  )
}
