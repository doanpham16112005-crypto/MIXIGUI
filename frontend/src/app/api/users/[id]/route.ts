import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin, extractToken, verifyToken, unauthorized, ok } from '@/lib/api-server'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = extractToken(request)
  const payload = token ? verifyToken(token) : null
  if (!payload) return unauthorized()

  const { id } = await params
  if (payload.role !== 'ADMIN' && payload.sub !== id) return unauthorized()

  const db = getSupabaseAdmin()
  const { data, error } = await db
    .from('users')
    .select('id, email, full_name, role, avatar_url, bio, is_active, created_at')
    .eq('id', id)
    .single()

  if (error || !data) return NextResponse.json({ message: 'Không tìm thấy' }, { status: 404 })
  return ok(data)
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = extractToken(request)
  const payload = token ? verifyToken(token) : null
  if (!payload) return unauthorized()

  const { id } = await params
  if (payload.role !== 'ADMIN' && payload.sub !== id) return unauthorized()

  const body = await request.json()
  const { password_hash, role, ...safeFields } = body
  const updateFields = payload.role === 'ADMIN' ? body : safeFields

  const db = getSupabaseAdmin()
  const { data, error } = await db
    .from('users')
    .update({ ...updateFields, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id, email, full_name, role, avatar_url, bio, is_active')
    .single()

  if (error) return NextResponse.json({ message: error.message }, { status: 500 })
  return ok(data)
}
