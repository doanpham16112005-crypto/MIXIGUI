import type { Product } from '@/types'
import { siteConfig } from '@/config/site'

export function ProductSchema({ product }: { product: Product }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.imageUrl,
    offers: { '@type': 'Offer', price: product.price, priceCurrency: 'VND', url: `${siteConfig.url}/san-pham/${product.slug}` },
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
