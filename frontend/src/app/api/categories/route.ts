import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin, extractToken, verifyToken, unauthorized, ok } from '@/lib/api-server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  const db = getSupabaseAdmin()
  let query = db.from('categories').select('*').order('name')
  if (type) query = query.eq('type', type)

  const { data, error } = await query
  if (error) return NextResponse.json({ message: 'Lỗi truy vấn' }, { status: 500 })
  return ok(data ?? [])
}

export async function POST(request: NextRequest) {
  const token = extractToken(request)
  const payload = token ? verifyToken(token) : null
  if (!payload || payload.role !== 'ADMIN') return unauthorized()

  const body = await request.json()
  const db = getSupabaseAdmin()
  const { data, error } = await db.from('categories').insert(body).select().single()
  if (error) return NextResponse.json({ message: error.message }, { status: 500 })
  return NextResponse.json({ data }, { status: 201 })
}
