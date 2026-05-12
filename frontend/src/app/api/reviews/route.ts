import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin, extractToken, verifyToken, unauthorized, ok } from '@/lib/api-server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get('productId')
  const courseId = searchParams.get('courseId')

  const db = getSupabaseAdmin()
  let query = db
    .from('reviews')
    .select('*, users(full_name, avatar_url)')
    .order('created_at', { ascending: false })

  if (productId) query = query.eq('product_id', productId)
  if (courseId) query = query.eq('course_id', courseId)

  const { data, error } = await query
  if (error) return NextResponse.json({ message: 'Lỗi truy vấn' }, { status: 500 })
  return ok(data ?? [])
}

export async function POST(request: NextRequest) {
  const token = extractToken(request)
  const payload = token ? verifyToken(token) : null
  if (!payload) return unauthorized()

  const body = await request.json()
  const db = getSupabaseAdmin()
  const { data, error } = await db
    .from('reviews')
    .insert({ ...body, user_id: payload.sub })
    .select()
    .single()
  if (error) return NextResponse.json({ message: error.message }, { status: 500 })
  return NextResponse.json({ data }, { status: 201 })
}
