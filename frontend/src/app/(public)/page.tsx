import { generateMetadata as genMeta } from '@/lib/seo'
import { OrganizationSchema } from '@/components/seo/organization-schema'

export const metadata = genMeta({ title: 'Trang chủ', description: 'Học nhạc và mua nhạc cụ chất lượng cao tại MixiGui' })

export default function HomePage() {
  return (
    <div>
      <OrganizationSchema />
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 py-24 text-center text-white">
        <h1 className="text-5xl font-bold">Chào mừng đến MixiGui</h1>
        <p className="mt-4 text-xl">Học nhạc và mua nhạc cụ chất lượng cao</p>
      </section>
    </div>
  )
}
