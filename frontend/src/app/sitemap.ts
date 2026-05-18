import type { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

const SITE = 'https://mixigui.id.vn'

const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE,                       changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE}/san-pham`,         changeFrequency: 'daily',   priority: 0.9 },
    { url: `${SITE}/khoa-hoc`,         changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${SITE}/blog`,             changeFrequency: 'daily',   priority: 0.8 },
    { url: `${SITE}/ve-chung-toi`,     changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE}/lien-he`,          changeFrequency: 'monthly', priority: 0.5 },
  ]

  const [{ data: posts }, { data: products }, { data: courses }] = await Promise.all([
    db.from('blog_posts').select('slug, updated_at').eq('is_published', true),
    db.from('products').select('slug, updated_at').eq('is_active', true),
    db.from('courses').select('slug, updated_at').eq('is_published', true),
  ])

  const blogPages: MetadataRoute.Sitemap = (posts ?? []).map((p) => ({
    url: `${SITE}/blog/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const productPages: MetadataRoute.Sitemap = (products ?? []).map((p) => ({
    url: `${SITE}/san-pham/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const coursePages: MetadataRoute.Sitemap = (courses ?? []).map((c) => ({
    url: `${SITE}/khoa-hoc/${c.slug}`,
    lastModified: new Date(c.updated_at),
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  return [...staticPages, ...blogPages, ...productPages, ...coursePages]
}
