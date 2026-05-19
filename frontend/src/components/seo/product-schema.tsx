const SITE = 'https://mixigui.id.vn'

interface ProductSchemaProps {
  name: string
  description?: string | null
  image?: string | null
  price: number
  slug: string
  brand?: string | null
  inStock?: boolean
}

export function ProductSchema({ name, description, image, price, slug, brand, inStock = true }: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description: description ?? undefined,
    image: image ?? undefined,
    brand: brand ? { '@type': 'Brand', name: brand } : undefined,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'VND',
      availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `${SITE}/san-pham/${slug}`,
    },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
