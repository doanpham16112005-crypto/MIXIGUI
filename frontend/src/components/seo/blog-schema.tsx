import type { Post } from '@/types'
import { siteConfig } from '@/config/site'

export function BlogSchema({ post }: { post: Post }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.thumbnailUrl,
    datePublished: post.createdAt,
    url: `${siteConfig.url}/blog/${post.slug}`,
    publisher: { '@type': 'Organization', name: siteConfig.name },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
