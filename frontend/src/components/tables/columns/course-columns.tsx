import type { ColumnDef } from '@tanstack/react-table'
import type { Course } from '@/types'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/formatters'

export const courseColumns: ColumnDef<Course>[] = [
  { accessorKey: 'title', header: 'Tên khóa học' },
  { accessorKey: 'price', header: 'Giá', cell: ({ getValue }) => formatPrice(getValue<number>()) },
  { accessorKey: 'level', header: 'Cấp độ', cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge> },
  { accessorKey: 'published', header: 'Trạng thái', cell: ({ getValue }) => getValue<boolean>() ? 'Đã xuất bản' : 'Bản nháp' },
]
