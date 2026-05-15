import type { Metadata } from 'next'
import './globals.css'
import { QueryProvider } from '@/providers/query-provider'
import { AuthProvider } from '@/providers/auth-provider'
import PersistentPlayer from '@/components/layout/persistent-player'
import MouseTrailEffect from '@/components/layout/mouse-trail'

export const metadata: Metadata = {
  title: 'MixiGui',
  description: 'Học nhạc và mua nhạc cụ chất lượng cao',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">
        <QueryProvider>
          <AuthProvider>
            {children}
            <PersistentPlayer />
            <MouseTrailEffect />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
