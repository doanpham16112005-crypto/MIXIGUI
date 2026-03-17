import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { formatPrice } from '@/lib/formatters'
import type { Product } from '@/types'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <img src={product.imageUrl} alt={product.name} className="h-40 w-full object-cover" />
      <CardContent>
        <h3 className="font-semibold line-clamp-2">{product.name}</h3>
        <p className="mt-1 text-blue-600 font-bold">{formatPrice(product.price)}</p>
        <Link href={`/san-pham/${product.slug}`} className="mt-2 block text-sm text-blue-500 hover:underline">Xem chi tiết →</Link>
      </CardContent>
    </Card>
  )
}
