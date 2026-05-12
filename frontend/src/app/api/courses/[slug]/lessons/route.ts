import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin, extractToken, verifyToken, unauthorized, ok } from '@/lib/api-server'

export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const db = getSupabaseAdmin()
  const { data, error } = await db
    .from('lessons')
    .select('id, title, slug, description, duration, order_index, is_free, created_at')
    .eq('course_id', slug)
    .order('order_index')
  if (error) return NextResponse.json({ message: 'Lỗi truy vấn' }, { status: 500 })
  return ok(data ?? [])
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const token = extractToken(request)
  const payload = token ? verifyToken(token) : null
  if (!payload || !['ADMIN', 'INSTRUCTOR'].includes(payload.role)) return unauthorized()

  const { slug } = await params
  const body = await request.json()
  const db = getSupabaseAdmin()
  const { data, error } = await db
    .from('lessons')
    .insert({ ...body, course_id: slug })
    .select()
    .single()
  if (error) return NextResponse.json({ message: error.message }, { status: 500 })
  return NextResponse.json({ data }, { status: 201 })
}
