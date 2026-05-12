import { NextRequest } from 'next/server'
import { getSupabaseAdmin, extractToken, verifyToken, unauthorized, ok } from '@/lib/api-server'

export async function GET(request: NextRequest) {
  const token = extractToken(request)
  if (!token) return unauthorized()

  const payload = verifyToken(token)
  if (!payload) return unauthorized()

  const db = getSupabaseAdmin()
  const { data: user } = await db
    .from('users')
    .select('id, email, full_name, role, avatar_url, bio, is_active, created_at')
    .eq('id', payload.sub)
    .single()

  if (!user) return unauthorized()
  return ok(user)
}
