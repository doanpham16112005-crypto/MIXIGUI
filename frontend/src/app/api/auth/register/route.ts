import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getSupabaseAdmin, signTokens, ok } from '@/lib/api-server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email, password, fullName } = body

  if (!email || !password || !fullName) {
    return NextResponse.json({ message: 'email, password, fullName là bắt buộc' }, { status: 400 })
  }

  const db = getSupabaseAdmin()
  const { data: existing } = await db.from('users').select('id').eq('email', email).single()
  if (existing) {
    return NextResponse.json({ message: 'Email đã được sử dụng' }, { status: 409 })
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const { data: user, error } = await db
    .from('users')
    .insert({ email, password_hash: passwordHash, full_name: fullName, role: 'STUDENT' })
    .select('id, email, full_name, role, avatar_url, bio, is_active, created_at')
    .single()

  if (error) {
    return NextResponse.json({ message: 'Đăng ký thất bại' }, { status: 500 })
  }

  return ok(user)
}
