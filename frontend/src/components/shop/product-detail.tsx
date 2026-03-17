import { formatPrice } from '@/lib/formatters'
import type { Product } from '@/types'

export function ProductDetail({ product }: { product: Product }) {
  return (
    <div className="max-w-3xl">
      <img src={product.imageUrl} alt={product.name} className="mb-6 h-64 w-full rounded-lg object-cover" />
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="mt-4 text-gray-600">{product.description}</p>
      <p className="mt-4 text-2xl font-bold text-blue-600">{formatPrice(product.price)}</p>
      <p className="mt-1 text-sm text-gray-500">Còn {product.stock} sản phẩm</p>
    </div>
  )
}
