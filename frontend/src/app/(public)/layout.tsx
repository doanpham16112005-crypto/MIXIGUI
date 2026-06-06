import dynamic from 'next/dynamic'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

const FloatingContacts = dynamic(() => import('@/components/layout/floating-contacts'), { ssr: false })

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingContacts />
    </>
  )
}
