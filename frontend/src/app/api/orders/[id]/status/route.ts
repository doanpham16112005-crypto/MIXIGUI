import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin, extractToken, verifyToken, unauthorized, ok } from '@/lib/api-server'

const VALID_STATUSES = ['PENDING', 'PAID', 'SHIPPING', 'DELIVERED', 'CANCELLED', 'REFUNDED']

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = extractToken(request)
  const payload = token ? verifyToken(token) : null
  if (!payload || payload.role !== 'ADMIN') return unauthorized()

  const { id } = await params
  const { status } = await request.json()

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ message: 'Trạng thái không hợp lệ' }, { status: 400 })
  }

  const db = getSupabaseAdmin()
  const { data, error } = await db
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ message: error.message }, { status: 500 })
  return ok(data)
}
