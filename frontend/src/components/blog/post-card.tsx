import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { formatDate } from '@/lib/formatters'
import type { Post } from '@/types'

export function PostCard({ post }: { post: Post }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <img src={post.thumbnailUrl} alt={post.title} className="h-40 w-full object-cover" />
      <CardContent>
        <h3 className="font-semibold line-clamp-2">{post.title}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-gray-400">{formatDate(post.createdAt)}</span>
          <Link href={`/blog/${post.slug}`} className="text-sm text-blue-500 hover:underline">Đọc thêm →</Link>
        </div>
      </CardContent>
    </Card>
  )
}
