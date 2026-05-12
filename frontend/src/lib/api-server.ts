import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || 'mixigui-256-bit-secret-key-must-be-at-least-32-characters-long'
const JWT_EXPIRATION = '24h'
const JWT_REFRESH_EXPIRATION = '7d'

export function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}

export interface JwtPayload {
  sub: string
  email: string
  role: string
  iat?: number
  exp?: number
}

export function signTokens(payload: Omit<JwtPayload, 'iat' | 'exp'>) {
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION })
  const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRATION })
  return { accessToken, refreshToken }
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload
  } catch {
    return null
  }
}

export function extractToken(request: NextRequest): string | null {
  const auth = request.headers.get('Authorization')
  if (!auth?.startsWith('Bearer ')) return null
  return auth.slice(7)
}

export function unauthorized() {
  return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
}

export function ok<T>(data: T) {
  return NextResponse.json({ data })
}

export function paginated<T>(data: T[], total: number, page: number, size: number) {
  return NextResponse.json({ data, total, page, size, totalPages: Math.ceil(total / size) })
}

export function parsePageParams(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
  const size = Math.min(100, Math.max(1, parseInt(searchParams.get('size') || '10')))
  return { page, size, from: (page - 1) * size, to: page * size - 1 }
}
