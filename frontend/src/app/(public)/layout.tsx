import { Header } from '@/components/layout/header'
import FooterIsland from '@/components/layout/footer-island'
import FloatingContactsIsland from '@/components/layout/floating-contacts-island'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <FooterIsland />
      <FloatingContactsIsland />
    </>
  )
}
