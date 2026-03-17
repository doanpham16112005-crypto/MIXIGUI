import { PageHeader } from '@/components/shared/page-header'

export default async function UserDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div>
      <PageHeader title={`Người dùng #${id}`} />
    </div>
  )
}
