import type { Metadata } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import './globals.css'
import { QueryProvider } from '@/providers/query-provider'
import { AuthProvider } from '@/providers/auth-provider'
import PersistentPlayer from '@/components/layout/persistent-player'
import MouseTrailEffect from '@/components/layout/mouse-trail'

const beVietnamPro = Be_Vietnam_Pro({
  variable: '--font-be-vietnam',
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

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
      <body className={`${beVietnamPro.variable} antialiased`}>
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
