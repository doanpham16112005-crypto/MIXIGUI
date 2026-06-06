'use client'

import dynamic from 'next/dynamic'

const Footer = dynamic(
  () => import('./footer').then((m) => ({ default: m.Footer })),
  { ssr: false, loading: () => <div className="h-16 bg-gray-900" /> }
)

export default function FooterIsland() {
  return <Footer />
}
