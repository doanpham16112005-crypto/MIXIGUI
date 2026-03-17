import { PostCard } from './post-card'
import type { Post } from '@/types'

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => <PostCard key={post.id} post={post} />)}
    </div>
  )
}
