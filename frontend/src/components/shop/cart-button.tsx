'use client'

import { Button } from '@/components/ui/button'
import { useCartStore } from '@/stores/cart-store'
import type { Product } from '@/types'

export function CartButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem)
  return <Button onClick={() => addItem(product)}>Thêm vào giỏ</Button>
}
