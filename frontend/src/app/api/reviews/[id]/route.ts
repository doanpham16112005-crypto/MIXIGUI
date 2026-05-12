import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin, extractToken, verifyToken, unauthorized } from '@/lib/api-server'

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = extractToken(request)
  const payload = token ? verifyToken(token) : null
  if (!payload) return unauthorized()

  const { id } = await params
  const db = getSupabaseAdmin()

  const { data: review } = await db.from('reviews').select('user_id').eq('id', id).single()
  if (!review) return NextResponse.json({ message: 'Không tìm thấy' }, { status: 404 })
  if (payload.role !== 'ADMIN' && review.user_id !== payload.sub) return unauthorized()

  const { error } = await db.from('reviews').delete().eq('id', id)
  if (error) return NextResponse.json({ message: error.message }, { status: 500 })
  return new NextResponse(null, { status: 204 })
}
