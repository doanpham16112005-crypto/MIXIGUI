import type { MetadataRoute } from 'next'

const SITE = 'https://mixigui.id.vn'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin/', '/hoc-vien/'] },
    ],
    sitemap: `${SITE}/sitemap.xml`,
  }
}
