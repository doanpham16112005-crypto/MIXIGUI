import type { ColumnDef } from '@tanstack/react-table'
import type { Order } from '@/types'
import { Badge } from '@/components/ui/badge'
import { formatPrice, formatDate } from '@/lib/formatters'
import { ORDER_STATUS_LABELS } from '@/lib/constants'

export const orderColumns: ColumnDef<Order>[] = [
  { accessorKey: 'id', header: 'Mã đơn' },
  { accessorKey: 'totalAmount', header: 'Tổng tiền', cell: ({ getValue }) => formatPrice(getValue<number>()) },
  { accessorKey: 'status', header: 'Trạng thái', cell: ({ getValue }) => <Badge>{ORDER_STATUS_LABELS[getValue<string>()] || getValue<string>()}</Badge> },
  { accessorKey: 'createdAt', header: 'Ngày tạo', cell: ({ getValue }) => formatDate(getValue<string>()) },
]
