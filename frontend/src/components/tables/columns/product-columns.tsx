import type { ColumnDef } from '@tanstack/react-table'
import type { Product } from '@/types'
import { formatPrice } from '@/lib/formatters'

export const productColumns: ColumnDef<Product>[] = [
  { accessorKey: 'name', header: 'Tên sản phẩm' },
  { accessorKey: 'price', header: 'Giá', cell: ({ getValue }) => formatPrice(getValue<number>()) },
  { accessorKey: 'stock', header: 'Tồn kho' },
  { accessorKey: 'published', header: 'Trạng thái', cell: ({ getValue }) => getValue<boolean>() ? 'Đang bán' : 'Ẩn' },
]
