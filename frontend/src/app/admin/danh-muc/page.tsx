import { PageHeader } from '@/components/shared/page-header'
import { EmptyState } from '@/components/shared/empty-state'

export default function AdminCategories() {
  return (
    <div>
      <PageHeader title="Quản lý danh mục" />
      <EmptyState title="Chưa có danh mục" />
    </div>
  )
}
