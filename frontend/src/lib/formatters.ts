export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('vi-VN').format(new Date(date))
}
