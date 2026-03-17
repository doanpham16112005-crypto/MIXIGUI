import { PageHeader } from '@/components/shared/page-header'
import { PostForm } from '@/components/blog/post-form'

export default async function EditPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div>
      <PageHeader title={`Chỉnh sửa bài viết #${id}`} />
      <PostForm onSubmit={(data) => console.log(data)} />
    </div>
  )
}
