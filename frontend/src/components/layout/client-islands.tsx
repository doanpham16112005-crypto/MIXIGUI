'use client'

import dynamic from 'next/dynamic'

export const PersistentPlayerIsland = dynamic(
  () => import('./persistent-player'),
  { ssr: false }
)

export const FloatingContactsIsland = dynamic(
  () => import('./floating-contacts'),
  { ssr: false }
)

export const HeaderAuthIsland = dynamic(
  () => import('./header-auth').then((m) => ({ default: m.HeaderAuth })),
  { ssr: false, loading: () => <div className="w-20" /> }
)
