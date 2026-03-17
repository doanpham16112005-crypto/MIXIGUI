import { PageHeader } from '@/components/shared/page-header'
import { PostForm } from '@/components/blog/post-form'

export default function CreatePost() {
  return (
    <div>
      <PageHeader title="Tạo bài viết mới" />
      <PostForm onSubmit={(data) => console.log(data)} />
    </div>
  )
}
