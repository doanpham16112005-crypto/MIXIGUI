import { PageHeader } from '@/components/shared/page-header'
import { EmptyState } from '@/components/shared/empty-state'

export default function AdminReviews() {
  return (
    <div>
      <PageHeader title="Quản lý đánh giá" />
      <EmptyState title="Chưa có đánh giá" />
    </div>
  )
}
