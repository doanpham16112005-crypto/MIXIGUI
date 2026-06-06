'use client'

import dynamic from 'next/dynamic'

const PersistentPlayer = dynamic(
  () => import('./persistent-player'),
  { ssr: false }
)

export default function PersistentPlayerIsland() {
  return <PersistentPlayer />
}
