import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin, extractToken, verifyToken, unauthorized, paginated, parsePageParams } from '@/lib/api-server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const { page, size, from, to } = parsePageParams(request)
  const categoryId = searchParams.get('categoryId')
  const search = searchParams.get('search')

  const db = getSupabaseAdmin()
  let query = db
    .from('products')
    .select('*, categories(id, name, slug)', { count: 'exact' })
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .range(from, to)

  if (categoryId) query = query.eq('category_id', categoryId)
  if (search) query = query.ilike('name', `%${search}%`)

  const { data, count, error } = await query
  if (error) return NextResponse.json({ message: 'Lỗi truy vấn' }, { status: 500 })

  return paginated(data ?? [], count ?? 0, page, size)
}

export async function POST(request: NextRequest) {
  const token = extractToken(request)
  const payload = token ? verifyToken(token) : null
  if (!payload || !['ADMIN', 'INSTRUCTOR'].includes(payload.role)) return unauthorized()

  const body = await request.json()
  const db = getSupabaseAdmin()
  const { data, error } = await db.from('products').insert(body).select().single()
  if (error) return NextResponse.json({ message: error.message }, { status: 500 })
  return NextResponse.json({ data }, { status: 201 })
}
