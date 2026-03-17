import { PageHeader } from '@/components/shared/page-header'

export default async function OrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div>
      <PageHeader title={`Đơn hàng #${id}`} />
    </div>
  )
}
