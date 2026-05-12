import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin, extractToken, verifyToken, unauthorized, paginated, parsePageParams } from '@/lib/api-server'

export async function GET(request: NextRequest) {
  const token = extractToken(request)
  const payload = token ? verifyToken(token) : null
  if (!payload || payload.role !== 'ADMIN') return unauthorized()

  const { page, size, from, to } = parsePageParams(request)
  const db = getSupabaseAdmin()
  const { data, count, error } = await db
    .from('users')
    .select('id, email, full_name, role, avatar_url, is_active, created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) return NextResponse.json({ message: 'Lỗi truy vấn' }, { status: 500 })
  return paginated(data ?? [], count ?? 0, page, size)
}
