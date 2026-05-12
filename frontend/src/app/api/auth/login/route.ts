import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getSupabaseAdmin, signTokens } from '@/lib/api-server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email, password } = body

  if (!email || !password) {
    return NextResponse.json({ message: 'email và password là bắt buộc' }, { status: 400 })
  }

  const db = getSupabaseAdmin()
  const { data: user } = await db
    .from('users')
    .select('id, email, password_hash, full_name, role, avatar_url, is_active')
    .eq('email', email)
    .single()

  if (!user || !user.is_active) {
    return NextResponse.json({ message: 'Email hoặc mật khẩu không đúng' }, { status: 401 })
  }

  const valid = await bcrypt.compare(password, user.password_hash)
  if (!valid) {
    return NextResponse.json({ message: 'Email hoặc mật khẩu không đúng' }, { status: 401 })
  }

  const { accessToken, refreshToken } = signTokens({ sub: user.id, email: user.email, role: user.role })

  return NextResponse.json({
    data: {
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, fullName: user.full_name, role: user.role, avatarUrl: user.avatar_url },
    },
  })
}
