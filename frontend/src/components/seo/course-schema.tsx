const SITE = 'https://mixigui.id.vn'

interface CourseSchemaProps {
  title: string
  description?: string | null
  slug: string
  price?: number
  thumbnail?: string | null
}

export function CourseSchema({ title, description, slug, price, thumbnail }: CourseSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: title,
    description: description ?? undefined,
    image: thumbnail ?? undefined,
    provider: { '@type': 'Organization', name: 'MixiGui', url: SITE },
    url: `${SITE}/khoa-hoc/${slug}`,
    offers: price != null ? { '@type': 'Offer', price, priceCurrency: 'VND' } : undefined,
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
