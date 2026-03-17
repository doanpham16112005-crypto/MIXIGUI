import type { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export function generateMetadata(options: {
  title: string
  description: string
  image?: string
  noIndex?: boolean
}): Metadata {
  const { title, description, image, noIndex } = options
  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image || siteConfig.ogImage }],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  }
}
