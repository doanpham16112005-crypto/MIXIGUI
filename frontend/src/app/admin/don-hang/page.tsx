import { PageHeader } from '@/components/shared/page-header'
import { EmptyState } from '@/components/shared/empty-state'

export default function AdminOrders() {
  return (
    <div>
      <PageHeader title="Quản lý đơn hàng" />
      <EmptyState title="Chưa có đơn hàng" />
    </div>
  )
}
