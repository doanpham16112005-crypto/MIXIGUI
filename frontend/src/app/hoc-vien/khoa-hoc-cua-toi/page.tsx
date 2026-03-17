import { PageHeader } from '@/components/shared/page-header'
import { EmptyState } from '@/components/shared/empty-state'

export default function MyCourses() {
  return (
    <div>
      <PageHeader title="Khóa học của tôi" />
      <EmptyState title="Chưa có khóa học" description="Hãy đăng ký khóa học đầu tiên" />
    </div>
  )
}
