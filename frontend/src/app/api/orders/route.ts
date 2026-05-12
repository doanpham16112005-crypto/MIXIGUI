import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin, extractToken, verifyToken, unauthorized, paginated, parsePageParams } from '@/lib/api-server'

export async function GET(request: NextRequest) {
  const token = extractToken(request)
  const payload = token ? verifyToken(token) : null
  if (!payload) return unauthorized()

  const { page, size, from, to } = parsePageParams(request)
  const db = getSupabaseAdmin()

  let query = db
    .from('orders')
    .select('*, order_items(*, products(name, slug, images), courses(title, slug, thumbnail_url))', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (payload.role !== 'ADMIN') {
    query = query.eq('user_id', payload.sub)
  }

  const { data, count, error } = await query
  if (error) return NextResponse.json({ message: 'Lỗi truy vấn' }, { status: 500 })
  return paginated(data ?? [], count ?? 0, page, size)
}

export async function POST(request: NextRequest) {
  const token = extractToken(request)
  const payload = token ? verifyToken(token) : null
  if (!payload) return unauthorized()

  const body = await request.json()
  const { items, ...orderData } = body

  const db = getSupabaseAdmin()
  const { data: order, error: orderError } = await db
    .from('orders')
    .insert({ ...orderData, user_id: payload.sub })
    .select()
    .single()

  if (orderError) return NextResponse.json({ message: orderError.message }, { status: 500 })

  if (items?.length) {
    const orderItems = items.map((item: Record<string, unknown>) => ({ ...item, order_id: order.id }))
    const { error: itemsError } = await db.from('order_items').insert(orderItems)
    if (itemsError) return NextResponse.json({ message: itemsError.message }, { status: 500 })
  }

  return NextResponse.json({ data: order }, { status: 201 })
}
