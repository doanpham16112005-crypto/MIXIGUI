import { PageHeader } from '@/components/shared/page-header'
import { EmptyState } from '@/components/shared/empty-state'

export default function MyOrders() {
  return (
    <div>
      <PageHeader title="Đơn hàng của tôi" />
      <EmptyState title="Chưa có đơn hàng" />
    </div>
  )
}
