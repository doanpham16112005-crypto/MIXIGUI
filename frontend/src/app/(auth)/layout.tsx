import { Header } from '@/components/layout/header'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 py-12">
        <div className="w-full max-w-md px-4">{children}</div>
      </div>
    </>
  )
}
