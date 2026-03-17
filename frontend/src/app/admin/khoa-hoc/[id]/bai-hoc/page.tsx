import { PageHeader } from '@/components/shared/page-header'
import { EmptyState } from '@/components/shared/empty-state'

export default async function CourseLessons({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div>
      <PageHeader title={`Bài học - Khóa #${id}`} />
      <EmptyState title="Chưa có bài học" />
    </div>
  )
}
