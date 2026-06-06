import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FloatingContactsIsland } from '@/components/layout/client-islands'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <FloatingContactsIsland />
    </>
  )
}
