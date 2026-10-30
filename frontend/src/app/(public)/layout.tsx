import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import FloatingContactsIsland from '@/components/layout/floating-contacts-island'
import { FestiveAmbience } from '@/components/layout/festive-ambience'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FestiveAmbience />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingContactsIsland />
    </>
  )
}
