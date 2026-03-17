import { formatDate } from '@/lib/formatters'
import type { Post } from '@/types'

export function PostDetail({ post }: { post: Post }) {
  return (
    <article className="max-w-3xl">
      <img src={post.thumbnailUrl} alt={post.title} className="mb-6 h-64 w-full rounded-lg object-cover" />
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="mt-2 text-sm text-gray-400">{formatDate(post.createdAt)}</p>
      <div className="prose mt-6" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}
