import { Header } from '@/components/layout/header'
import { StudentSidebar } from '@/components/layout/student-sidebar'

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex min-h-[calc(100vh-4rem)] bg-gray-50">
        <StudentSidebar />
        <main className="flex-1 overflow-auto p-6 lg:p-8">{children}</main>
      </div>
    </>
  )
}
