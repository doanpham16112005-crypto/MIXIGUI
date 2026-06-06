'use client'

import dynamic from 'next/dynamic'

const FloatingContacts = dynamic(
  () => import('./floating-contacts'),
  { ssr: false }
)

export default function FloatingContactsIsland() {
  return <FloatingContacts />
}
