import { PageHeader } from '@/components/shared/page-header'
import { CourseForm } from '@/components/course/course-form'

export default async function EditCourse({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div>
      <PageHeader title={`Chỉnh sửa khóa học #${id}`} />
      <CourseForm onSubmit={(data) => console.log(data)} />
    </div>
  )
}
