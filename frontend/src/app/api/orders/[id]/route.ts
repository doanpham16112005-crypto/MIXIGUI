import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin, extractToken, verifyToken, unauthorized, ok } from '@/lib/api-server'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = extractToken(request)
  const payload = token ? verifyToken(token) : null
  if (!payload) return unauthorized()

  const { id } = await params
  const db = getSupabaseAdmin()
  const { data, error } = await db
    .from('orders')
    .select('*, order_items(*, products(name, slug, images), courses(title, slug, thumbnail_url))')
    .eq('id', id)
    .single()

  if (error || !data) return NextResponse.json({ message: 'Không tìm thấy' }, { status: 404 })
  if (payload.role !== 'ADMIN' && data.user_id !== payload.sub) return unauthorized()

  return ok(data)
}
