import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin, extractToken, verifyToken, unauthorized, ok } from '@/lib/api-server'

export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const db = getSupabaseAdmin()
  const isUuid = /^[0-9a-f-]{36}$/.test(slug)
  const query = db
    .from('courses')
    .select('*, categories(id, name, slug), users!instructor_id(id, full_name, avatar_url, bio), lessons(id, title, slug, order_index, is_free, duration), reviews(id, rating, comment, users(full_name, avatar_url), created_at)')

  const { data, error } = isUuid
    ? await query.eq('id', slug).single()
    : await query.eq('slug', slug).single()

  if (error || !data) return NextResponse.json({ message: 'Không tìm thấy' }, { status: 404 })
  return ok(data)
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const token = extractToken(request)
  const payload = token ? verifyToken(token) : null
  if (!payload || !['ADMIN', 'INSTRUCTOR'].includes(payload.role)) return unauthorized()

  const { slug } = await params
  const body = await request.json()
  const db = getSupabaseAdmin()
  const { data, error } = await db.from('courses').update(body).eq('id', slug).select().single()
  if (error) return NextResponse.json({ message: error.message }, { status: 500 })
  return ok(data)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const token = extractToken(_.headers.get('Authorization') ? _ : _)
  const { slug } = await params
  const db = getSupabaseAdmin()
  const { error } = await db.from('courses').delete().eq('id', slug)
  if (error) return NextResponse.json({ message: error.message }, { status: 500 })
  return new NextResponse(null, { status: 204 })
}
