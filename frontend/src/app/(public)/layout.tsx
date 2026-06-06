import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import FloatingContacts from '@/components/layout/floating-contacts'

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
