import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin, extractToken, verifyToken, unauthorized, ok } from '@/lib/api-server'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const db = getSupabaseAdmin()
  const { data, error } = await db
    .from('lessons')
    .select('*, lesson_resources(*)')
    .eq('id', id)
    .single()
  if (error || !data) return NextResponse.json({ message: 'Không tìm thấy' }, { status: 404 })
  return ok(data)
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = extractToken(request)
  const payload = token ? verifyToken(token) : null
  if (!payload || !['ADMIN', 'INSTRUCTOR'].includes(payload.role)) return unauthorized()

  const { id } = await params
  const body = await request.json()
  const db = getSupabaseAdmin()
  const { data, error } = await db.from('lessons').update(body).eq('id', id).select().single()
  if (error) return NextResponse.json({ message: error.message }, { status: 500 })
  return ok(data)
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = extractToken(request)
  const payload = token ? verifyToken(token) : null
  if (!payload || !['ADMIN', 'INSTRUCTOR'].includes(payload.role)) return unauthorized()

  const { id } = await params
  const db = getSupabaseAdmin()
  const { error } = await db.from('lessons').delete().eq('id', id)
  if (error) return NextResponse.json({ message: error.message }, { status: 500 })
  return new NextResponse(null, { status: 204 })
}
