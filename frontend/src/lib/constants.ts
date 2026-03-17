export const ROLES = {
  STUDENT: 'STUDENT',
  ADMIN: 'ADMIN',
  INSTRUCTOR: 'INSTRUCTOR',
} as const

export const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Chờ thanh toán',
  PAID: 'Đã thanh toán',
  SHIPPED: 'Đang giao',
  DELIVERED: 'Đã giao',
  CANCELLED: 'Đã hủy',
}

export const COURSE_LEVEL_LABELS: Record<string, string> = {
  BEGINNER: 'Cơ bản',
  INTERMEDIATE: 'Trung cấp',
  ADVANCED: 'Nâng cao',
}
