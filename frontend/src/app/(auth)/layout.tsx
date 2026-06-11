import { Header } from '@/components/layout/header'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
        {children}
      </div>
    </>
  )
}
