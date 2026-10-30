import { Header } from '@/components/layout/header'
import { FestiveAmbience } from '@/components/layout/festive-ambience'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FestiveAmbience />
      <Header />
      <div className="bg-warm-snow min-h-[calc(100vh-4rem)]">
        {children}
      </div>
    </>
  )
}
