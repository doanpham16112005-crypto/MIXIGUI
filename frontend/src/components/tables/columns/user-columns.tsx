import type { ColumnDef } from '@tanstack/react-table'
import type { User } from '@/types'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/formatters'

export const userColumns: ColumnDef<User>[] = [
  { accessorKey: 'fullName', header: 'Họ tên' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'role', header: 'Vai trò', cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge> },
  { accessorKey: 'createdAt', header: 'Ngày tạo', cell: ({ getValue }) => formatDate(getValue<string>()) },
]
