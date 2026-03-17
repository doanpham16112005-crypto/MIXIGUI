import Link from 'next/link'
import type { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase'
import { siteConfig } from '@/config/site'
import FloatingContacts from '@/components/layout/floating-contacts'

export const revalidate = 3600

// ─── SEO Metadata ────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'MixiGui - Học Nhạc Online & Mua Nhạc Cụ Chính Hãng tại Việt Nam',
  description:
    'MixiGui — nền tảng học nhạc trực tuyến và mua nhạc cụ chính hãng số 1 Việt Nam. Khóa học guitar, piano, trống từ giảng viên chuyên nghiệp. Nhạc cụ Yamaha, Roland, Casio bảo hành chính hãng.',
  keywords: [
    'học nhạc online', 'mua nhạc cụ', 'khóa học guitar', 'khóa học piano',
    'nhạc cụ chính hãng', 'học đàn guitar', 'học piano online', 'MixiGui',
  ],
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: 'MixiGui - Học Nhạc Online & Mua Nhạc Cụ Chính Hãng',
    description:
      'Nền tảng học nhạc trực tuyến và mua nhạc cụ chính hãng số 1 Việt Nam. Khóa học guitar, piano, trống. Nhạc cụ Yamaha, Roland, Casio.',
    siteName: 'MixiGui',
    images: [{ url: `${siteConfig.url}/images/og-image.jpg`, width: 1200, height: 630, alt: 'MixiGui - Học nhạc & Mua nhạc cụ' }],
    locale: 'vi_VN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MixiGui - Học Nhạc Online & Mua Nhạc Cụ Chính Hãng',
    description: 'Khóa học guitar, piano, trống từ giảng viên chuyên nghiệp. Nhạc cụ chính hãng bảo hành đầy đủ.',
    images: [`${siteConfig.url}/images/og-image.jpg`],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
}

// ─── Data Fetching ────────────────────────────────────────────────────────────
async function getFeaturedData() {
  const supabase = createServerClient()
  const [coursesRes, productsRes, postsRes, statsRes] = await Promise.all([
    supabase.from('courses').select('id,title,slug,thumbnail_url,price,discount_price,level').eq('is_published', true).order('created_at', { ascending: false }).limit(4),
    supabase.from('products').select('id,name,slug,images,price,discount_price,brand').eq('is_published', true).order('created_at', { ascending: false }).limit(4),
    supabase.from('blog_posts').select('id,title,slug,excerpt,thumbnail_url,published_at').eq('is_published', true).order('published_at', { ascending: false }).limit(3),
    Promise.all([
      supabase.from('courses').select('id', { count: 'exact', head: true }),
      supabase.from('products').select('id', { count: 'exact', head: true }),
      supabase.from('users').select('id', { count: 'exact', head: true }),
    ]),
  ])
  return {
    courses: coursesRes.data ?? [],
    products: productsRes.data ?? [],
    posts: postsRes.data ?? [],
    stats: { courses: statsRes[0].count ?? 0, products: statsRes[1].count ?? 0, users: statsRes[2].count ?? 0 },
  }
}

// ─── Static content ───────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'Học nhạc online tại MixiGui có hiệu quả không?',
    a: 'Hoàn toàn hiệu quả. Các khóa học tại MixiGui được thiết kế bài bản theo lộ trình từ cơ bản đến nâng cao, kết hợp video bài giảng HD, bài tập thực hành và hỗ trợ trực tiếp từ giảng viên. Hơn 90% học viên hoàn thành khóa học đánh giá tiến bộ rõ rệt sau 3 tháng.',
  },
  {
    q: 'Tôi chưa biết gì về nhạc có học được không?',
    a: 'Được. MixiGui có đầy đủ khóa học dành cho người mới bắt đầu hoàn toàn, không yêu cầu kiến thức âm nhạc trước. Giảng viên sẽ hướng dẫn từng bước từ cách cầm đàn, đọc nốt nhạc đến chơi các bài nhạc hoàn chỉnh.',
  },
  {
    q: 'Nhạc cụ tại MixiGui có bảo hành không?',
    a: 'Tất cả nhạc cụ tại MixiGui đều là hàng chính hãng được nhập khẩu trực tiếp từ nhà sản xuất, bảo hành từ 12 đến 24 tháng tùy sản phẩm. Chúng tôi hỗ trợ bảo hành tận nơi tại Hà Nội và TP.HCM.',
  },
  {
    q: 'Nên học guitar hay piano trước?',
    a: 'Điều này phụ thuộc vào sở thích cá nhân. Guitar phù hợp hơn nếu bạn muốn chơi nhạc pop, rock, dân ca và dễ mang theo. Piano giúp xây dựng nền tảng lý thuyết âm nhạc tốt hơn và phù hợp với nhạc cổ điển, ballad. Cả hai đều có thể bắt đầu từ con số 0.',
  },
  {
    q: 'Chi phí học nhạc tại MixiGui là bao nhiêu?',
    a: 'MixiGui cung cấp cả khóa học miễn phí và có phí. Khóa học có phí dao động từ 499.000đ đến 1.500.000đ tùy nội dung và thời lượng. Bạn được học trọn đời sau khi mua, không giới hạn lượt xem.',
  },
  {
    q: 'Làm thế nào để chọn nhạc cụ phù hợp cho người mới bắt đầu?',
    a: 'Đối với người mới học guitar, chúng tôi khuyên chọn guitar acoustic cỡ vừa (dreadnought) trong tầm giá 1.5–3 triệu đồng như Yamaha F310. Với piano, nên chọn đàn phím điện 61–76 phím để tiết kiệm không gian. Đội ngũ tư vấn MixiGui luôn sẵn sàng hỗ trợ bạn chọn nhạc cụ phù hợp.',
  },
]

const TESTIMONIALS = [
  { name: 'Minh Tuấn', role: 'Học viên Guitar', avatar: '🧑', rating: 5, text: 'Sau 3 tháng học guitar tại MixiGui, tôi đã có thể tự đệm hát các bài nhạc yêu thích. Giảng viên nhiệt tình, bài học rõ ràng, tiến độ phù hợp với người đi làm như tôi.' },
  { name: 'Thu Hà', role: 'Học viên Piano', avatar: '👩', rating: 5, text: 'Trước đây tôi rất sợ học nhạc vì nghĩ mình không có năng khiếu. Nhưng với phương pháp dạy của MixiGui, chỉ sau 2 tháng tôi đã chơi được những bản nhạc đơn giản. Rất vui!' },
  { name: 'Hoàng Phúc', role: 'Phụ huynh học viên', avatar: '👨', rating: 5, text: 'Mua đàn piano cho con tại MixiGui, sản phẩm chính hãng, giá tốt hơn nhiều nơi khác. Đặc biệt đội ngũ tư vấn rất tận tâm, hỗ trợ sau mua hàng chu đáo.' },
]

const BRANDS = ['Yamaha', 'Roland', 'Casio', 'Fender', 'Gibson', 'Dunlop']

// ─── JSON-LD Schemas ─────────────────────────────────────────────────────────
function HomeSchemas({ courses, products }: { courses: any[]; products: any[] }) {
  const org = {
    '@context': 'https://schema.org', '@type': 'Organization',
    name: 'MixiGui', url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.svg`,
    description: 'Nền tảng học nhạc trực tuyến và mua nhạc cụ chính hãng tại Việt Nam',
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', availableLanguage: 'Vietnamese' },
    sameAs: [],
  }
  const website = {
    '@context': 'https://schema.org', '@type': 'WebSite',
    name: 'MixiGui', url: siteConfig.url,
    potentialAction: { '@type': 'SearchAction', target: { '@type': 'EntryPoint', urlTemplate: `${siteConfig.url}/khoa-hoc?q={search_term_string}` }, 'query-input': 'required name=search_term_string' },
  }
  const courseList = {
    '@context': 'https://schema.org', '@type': 'ItemList',
    name: 'Khóa học nhạc nổi bật tại MixiGui',
    itemListElement: courses.map((c, i) => ({
      '@type': 'ListItem', position: i + 1,
      item: { '@type': 'Course', name: c.title, url: `${siteConfig.url}/khoa-hoc/${c.slug}`, provider: { '@type': 'Organization', name: 'MixiGui' }, offers: { '@type': 'Offer', price: c.price, priceCurrency: 'VND', availability: 'https://schema.org/InStock' } },
    })),
  }
  const productList = {
    '@context': 'https://schema.org', '@type': 'ItemList',
    name: 'Nhạc cụ chính hãng tại MixiGui',
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem', position: i + 1,
      item: { '@type': 'Product', name: p.name, url: `${siteConfig.url}/san-pham/${p.slug}`, brand: { '@type': 'Brand', name: p.brand }, offers: { '@type': 'Offer', price: p.price, priceCurrency: 'VND', availability: 'https://schema.org/InStock' } },
    })),
  }
  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      {courses.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseList) }} />}
      {products.length > 0 && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productList) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  )
}

const levelLabel: Record<string, string> = { BEGINNER: 'Cơ bản', INTERMEDIATE: 'Trung cấp', ADVANCED: 'Nâng cao' }

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function HomePage() {
  const { courses, products, posts, stats } = await getFeaturedData()

  return (
    <>
      <HomeSchemas courses={courses} products={products} />

      <main>
        {/* ── HERO ── */}
        <section aria-label="Giới thiệu MixiGui" style={{ backgroundImage: 'url(https://res.cloudinary.com/ddaryoz5b/image/upload/v1773716135/Gemini_Generated_Image_9rb159rb159rb159_ewqjfr.png)', backgroundSize: '100% 100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', minHeight: '400px' }} className="py-24 text-center text-white">
          <div className="mx-auto max-w-3xl px-4">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-blue-200">Nền tảng âm nhạc số 1 Việt Nam</p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              Học Nhạc Online &amp;<br />Mua Nhạc Cụ Chính Hãng
            </h1>
            <p className="mt-5 text-lg text-blue-100">
              Khóa học guitar, piano, trống từ giảng viên chuyên nghiệp — nhạc cụ Yamaha, Roland, Casio bảo hành đầy đủ.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/khoa-hoc" className="rounded-full bg-white px-8 py-3 font-semibold text-blue-700 shadow transition hover:bg-blue-50">
                Xem khóa học
              </Link>
              <Link href="/san-pham" className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white/10">
                Mua nhạc cụ
              </Link>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section aria-label="Thống kê" className="border-b bg-white py-10">
          <div className="mx-auto grid max-w-4xl grid-cols-3 gap-6 px-4 text-center">
            {[
              { value: `${stats.courses}+`, label: 'Khóa học' },
              { value: `${stats.products}+`, label: 'Nhạc cụ' },
              { value: `${stats.users}+`, label: 'Học viên' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold text-blue-600">{s.value}</p>
                <p className="text-sm text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURED COURSES ── */}
        <section aria-labelledby="courses-heading" className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 id="courses-heading" className="text-3xl font-bold text-gray-900">Khóa học nổi bật</h2>
                <p className="mt-1 text-gray-500">Học nhạc cùng giảng viên chuyên nghiệp, mọi lúc mọi nơi</p>
              </div>
              <Link href="/khoa-hoc" className="text-sm font-medium text-blue-600 hover:underline">Xem tất cả →</Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {courses.map((course) => (
                <article key={course.id} className="group overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md">
                  <Link href={`/khoa-hoc/${course.slug}`} aria-label={`Khóa học: ${course.title}`}>
                    <div className="relative h-44 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
                      {course.thumbnail_url
                        ? <img src={course.thumbnail_url} alt={`Khóa học ${course.title}`} className="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" />
                        : <div className="flex h-full items-center justify-center text-5xl">🎸</div>
                      }
                      <span className="absolute left-2 top-2 rounded bg-blue-600/80 px-2 py-0.5 text-xs text-white">
                        {levelLabel[course.level] ?? course.level}
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="line-clamp-2 font-semibold text-gray-800 group-hover:text-blue-600">{course.title}</h3>
                      <p className="mt-3 text-lg font-bold text-blue-600">
                        {course.price === 0 ? 'Miễn phí' : Number(course.price).toLocaleString('vi-VN') + '₫'}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section
          aria-labelledby="about-heading"
          className="relative border-t py-16"
          style={{
            backgroundImage: 'url(https://res.cloudinary.com/ddaryoz5b/image/upload/v1773731924/Gemini_Generated_Image_bzddftbzddftbzdd_vtsvqs.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay trắng mờ để chữ dễ đọc */}
          <div className="absolute inset-0 bg-white/40" />
          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
            <h2 id="about-heading" className="mb-4 text-3xl font-bold text-gray-900">MixiGui là gì?</h2>
            <p className="text-lg leading-relaxed text-gray-900">
              <strong>MixiGui</strong> là nền tảng học nhạc trực tuyến và cửa hàng nhạc cụ chính hãng tại Việt Nam, được thành lập với sứ mệnh <em>giúp mọi người tiếp cận âm nhạc dễ dàng và hiệu quả hơn</em>. Chúng tôi cung cấp các khóa học guitar, piano, trống, ukulele được thiết kế bởi giảng viên có hơn 10 năm kinh nghiệm biểu diễn và giảng dạy chuyên nghiệp.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              Bên cạnh đó, cửa hàng nhạc cụ MixiGui cung cấp đầy đủ các dòng sản phẩm từ <strong>Yamaha, Roland, Casio, Fender, Gibson</strong> — tất cả đều là hàng chính hãng, có tem bảo hành và hóa đơn VAT rõ ràng. Dù bạn là người mới bắt đầu hay nhạc sĩ chuyên nghiệp, MixiGui đều có sản phẩm và dịch vụ phù hợp với nhu cầu của bạn.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/ve-chung-toi" className="rounded-full border border-blue-600 px-6 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 transition">Tìm hiểu thêm về chúng tôi</Link>
              <Link href="/lien-he" className="rounded-full border border-gray-300 px-6 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition">Liên hệ tư vấn</Link>
            </div>
          </div>
        </section>

        {/* ── WHY MIXIGUI ── */}
        <section aria-labelledby="why-heading" className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 id="why-heading" className="mb-10 text-center text-3xl font-bold text-gray-900">Tại sao chọn MixiGui?</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: '🎓', title: 'Giảng viên chuyên nghiệp', desc: 'Đội ngũ giảng viên có kinh nghiệm biểu diễn và giảng dạy chuyên nghiệp.' },
                { icon: '🎸', title: 'Nhạc cụ chính hãng', desc: 'Nhạc cụ được nhập khẩu chính hãng, bảo hành đầy đủ 12-24 tháng.' },
                { icon: '📱', title: 'Học mọi lúc mọi nơi', desc: 'Truy cập khóa học trên mọi thiết bị, học theo tốc độ của bạn.' },
                { icon: '💬', title: 'Hỗ trợ 24/7', desc: 'Đội ngũ hỗ trợ luôn sẵn sàng giải đáp mọi thắc mắc của bạn.' },
              ].map((f) => (
                <div key={f.title} className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md">
                  <div className="mb-3 text-4xl">{f.icon}</div>
                  <h3 className="mb-2 font-semibold text-gray-800">{f.title}</h3>
                  <p className="text-sm text-gray-500">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section aria-labelledby="how-heading" className="bg-blue-50 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 id="how-heading" className="mb-2 text-center text-3xl font-bold text-gray-900">Bắt đầu học nhạc chỉ trong 3 bước</h2>
            <p className="mb-10 text-center text-gray-500">Đơn giản, nhanh chóng — bạn có thể học ngay hôm nay</p>
            <div className="grid gap-8 sm:grid-cols-3">
              {[
                { step: '01', title: 'Chọn khóa học phù hợp', desc: 'Duyệt qua danh sách khóa học guitar, piano, trống, ukulele. Lọc theo cấp độ — cơ bản, trung cấp hay nâng cao — để tìm khóa học phù hợp nhất với bạn.' },
                { step: '02', title: 'Đăng ký và thanh toán dễ dàng', desc: 'Tạo tài khoản miễn phí, chọn khóa học và thanh toán an toàn qua các phương thức phổ biến: chuyển khoản, Momo, VNPay, thẻ tín dụng.' },
                { step: '03', title: 'Học ngay, học mọi lúc', desc: 'Truy cập toàn bộ nội dung khóa học ngay lập tức. Video HD, bài tập thực hành, tài liệu PDF — học theo tốc độ của bạn, xem lại không giới hạn.' },
              ].map((item) => (
                <div key={item.step} className="relative rounded-xl bg-white p-6 shadow-sm">
                  <span className="mb-4 block text-5xl font-extrabold text-blue-100">{item.step}</span>
                  <h3 className="mb-2 text-lg font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURED PRODUCTS ── */}
        <section aria-labelledby="products-heading" className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <h2 id="products-heading" className="text-3xl font-bold text-gray-900">Nhạc cụ nổi bật</h2>
                <p className="mt-1 text-gray-500">Yamaha, Roland, Casio — chính hãng, bảo hành đầy đủ</p>
              </div>
              <Link href="/san-pham" className="text-sm font-medium text-blue-600 hover:underline">Xem tất cả →</Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => {
                const img = Array.isArray(product.images) ? product.images[0] : null
                return (
                  <article key={product.id} className="group overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md">
                    <Link href={`/san-pham/${product.slug}`} aria-label={`Sản phẩm: ${product.name}`}>
                      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-green-50 to-green-100">
                        {img
                          ? <img src={img} alt={`Nhạc cụ ${product.name}`} className="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" />
                          : <div className="flex h-full items-center justify-center text-5xl">🎵</div>
                        }
                        {product.brand && (
                          <span className="absolute left-2 top-2 rounded bg-white/90 px-2 py-0.5 text-xs font-medium text-gray-700">{product.brand}</span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="line-clamp-2 font-semibold text-gray-800 group-hover:text-blue-600">{product.name}</h3>
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-lg font-bold text-blue-600">{Number(product.price).toLocaleString('vi-VN')}₫</span>
                          {product.discount_price && product.discount_price < product.price && (
                            <span className="text-xs text-gray-400 line-through">{Number(product.discount_price).toLocaleString('vi-VN')}₫</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── BRANDS ── */}
        <section aria-label="Thương hiệu đối tác" className="border-y bg-white py-10">
          <div className="mx-auto max-w-5xl px-4">
            <p className="mb-6 text-center text-sm font-medium uppercase tracking-widest text-gray-400">Nhạc cụ chính hãng từ các thương hiệu uy tín</p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {BRANDS.map((brand) => (
                <Link key={brand} href={`/san-pham?brand=${brand.toLowerCase()}`} className="rounded-lg border px-6 py-3 text-base font-bold text-gray-500 transition hover:border-blue-300 hover:text-blue-600">
                  {brand}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section aria-labelledby="testimonials-heading" className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 id="testimonials-heading" className="mb-2 text-center text-3xl font-bold text-gray-900">Học viên nói gì về MixiGui?</h2>
            <p className="mb-10 text-center text-gray-500">Hơn {stats.users}+ học viên đã tin tưởng chọn MixiGui</p>
            <div className="grid gap-6 sm:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <blockquote key={t.name} className="rounded-xl border bg-white p-6 shadow-sm">
                  <div className="mb-3 flex text-yellow-400">{'★'.repeat(t.rating)}</div>
                  <p className="mb-4 text-sm leading-relaxed text-gray-600 italic">"{t.text}"</p>
                  <footer className="flex items-center gap-3">
                    <span className="text-3xl">{t.avatar}</span>
                    <div>
                      <cite className="block font-semibold text-gray-800 not-italic">{t.name}</cite>
                      <span className="text-xs text-gray-400">{t.role}</span>
                    </div>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* ── BLOG ── */}
        {posts.length > 0 && (
          <section aria-labelledby="blog-heading" className="bg-gray-50 py-16">
            <div className="mx-auto max-w-7xl px-4">
              <div className="mb-8 flex items-end justify-between">
                <div>
                  <h2 id="blog-heading" className="text-3xl font-bold text-gray-900">Kiến thức âm nhạc</h2>
                  <p className="mt-1 text-gray-500">Bài viết hữu ích từ các chuyên gia âm nhạc</p>
                </div>
                <Link href="/blog" className="text-sm font-medium text-blue-600 hover:underline">Xem tất cả →</Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-3">
                {posts.map((post) => (
                  <article key={post.id} className="group overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md">
                    <Link href={`/blog/${post.slug}`} aria-label={post.title}>
                      <div className="h-44 overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100">
                        {post.thumbnail_url
                          ? <img src={post.thumbnail_url} alt={post.title} className="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" />
                          : <div className="flex h-full items-center justify-center text-5xl">📝</div>
                        }
                      </div>
                      <div className="p-4">
                        <h3 className="line-clamp-2 font-semibold text-gray-800 group-hover:text-blue-600">{post.title}</h3>
                        {post.excerpt && <p className="mt-2 line-clamp-2 text-sm text-gray-500">{post.excerpt}</p>}
                        <p className="mt-3 text-xs text-gray-400">{new Date(post.published_at).toLocaleDateString('vi-VN')}</p>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ ── */}
        <section aria-labelledby="faq-heading" className="py-16">
          <div className="mx-auto max-w-3xl px-4">
            <h2 id="faq-heading" className="mb-2 text-center text-3xl font-bold text-gray-900">Câu hỏi thường gặp</h2>
            <p className="mb-10 text-center text-gray-500">Giải đáp những thắc mắc phổ biến nhất về MixiGui</p>
            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <details key={i} className="group rounded-xl border bg-white p-5 shadow-sm open:shadow-md">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-800">
                    <span>{faq.q}</span>
                    <span className="ml-4 shrink-0 text-blue-500 transition group-open:rotate-45">＋</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">{faq.a}</p>
                </details>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-gray-500">
              Còn thắc mắc khác?{' '}
              <Link href="/lien-he" className="font-medium text-blue-600 hover:underline">Liên hệ với chúng tôi</Link>
            </p>
          </div>
        </section>

        {/* ── LỘ TRÌNH HỌC NHẠC ── */}
        <section aria-labelledby="roadmap-heading" className="bg-white py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 id="roadmap-heading" className="mb-3 text-center text-3xl font-bold text-gray-900">Lộ trình học nhạc từ 0 đến chuyên nghiệp</h2>
            <p className="mb-10 text-center text-gray-500 max-w-2xl mx-auto">
              Dù bạn chưa biết gì về âm nhạc, MixiGui có lộ trình học rõ ràng giúp bạn tiến bộ nhanh chóng và đúng hướng — không bị lạc hay nản chí giữa chừng.
            </p>
            <div className="relative">
              <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-blue-100 lg:block" />
              <div className="space-y-8">
                {[
                  { phase: 'Giai đoạn 1', title: 'Làm quen nhạc cụ (Tuần 1–4)', icon: '🌱', side: 'left', points: ['Tư thế ngồi, cầm đàn đúng cách', 'Các nốt nhạc cơ bản và cách đọc', 'Bài tập ngón tay linh hoạt', 'Chơi giai điệu đơn giản đầu tiên'] },
                  { phase: 'Giai đoạn 2', title: 'Hợp âm & nhịp điệu (Tháng 2–3)', icon: '🎵', side: 'right', points: ['Hợp âm cơ bản Am, Em, C, G, D, F', 'Strumming pattern và fingerpicking', 'Chuyển hợp âm mượt mà', 'Đệm hát bài nhạc đầu tiên hoàn chỉnh'] },
                  { phase: 'Giai đoạn 3', title: 'Nâng cao kỹ thuật (Tháng 4–6)', icon: '🎸', side: 'left', points: ['Kỹ thuật barre chord, power chord', 'Fingerstyle cơ bản và nâng cao', 'Cách đọc tab nhạc và sheet music', 'Chơi được 10+ bài nhạc yêu thích'] },
                  { phase: 'Giai đoạn 4', title: 'Biểu diễn & sáng tác (Tháng 7+)', icon: '🌟', side: 'right', points: ['Xây dựng phong cách cá nhân', 'Kỹ thuật improvisation cơ bản', 'Sáng tác giai điệu đơn giản', 'Tự tin biểu diễn trước khán giả'] },
                ].map((item) => (
                  <div key={item.phase} className={`flex items-start gap-6 lg:w-1/2 ${item.side === 'right' ? 'lg:ml-auto' : ''}`}>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-2xl">{item.icon}</div>
                    <div className="rounded-xl border bg-white p-5 shadow-sm flex-1">
                      <span className="text-xs font-semibold uppercase tracking-wide text-blue-500">{item.phase}</span>
                      <h3 className="mt-1 font-bold text-gray-800">{item.title}</h3>
                      <ul className="mt-3 space-y-1.5">
                        {item.points.map((p) => (
                          <li key={p} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="mt-0.5 shrink-0 text-green-500">✓</span>{p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 text-center">
              <Link href="/khoa-hoc" className="inline-block rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow transition hover:bg-blue-700">
                Bắt đầu lộ trình học ngay
              </Link>
            </div>
          </div>
        </section>

        {/* ── NHẠC CỤ PHÙ HỢP ── */}
        <section aria-labelledby="instrument-guide-heading" className="bg-gray-50 py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 id="instrument-guide-heading" className="mb-3 text-center text-3xl font-bold text-gray-900">Chọn nhạc cụ nào phù hợp với bạn?</h2>
            <p className="mb-10 text-center text-gray-500 max-w-2xl mx-auto">
              Mỗi nhạc cụ có đặc điểm và phong cách riêng. Hãy để MixiGui giúp bạn tìm ra nhạc cụ phù hợp nhất với sở thích, ngân sách và mục tiêu âm nhạc của bạn.
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: '🎸', name: 'Guitar Acoustic', price: 'Từ 1.500.000₫', level: 'Dễ bắt đầu', best: 'Nhạc pop, ballad, dân ca', pros: ['Không cần bộ khuếch đại', 'Dễ mang theo, học mọi nơi', 'Phù hợp đệm hát', 'Chi phí ban đầu thấp'], color: 'border-yellow-300 bg-yellow-50' },
                { icon: '🎹', name: 'Piano / Keyboard', price: 'Từ 3.000.000₫', level: 'Trung bình', best: 'Nhạc cổ điển, ballad, jazz', pros: ['Nền tảng lý thuyết âm nhạc tốt', 'Học nhạc lý nhanh hơn', 'Phù hợp mọi thể loại', 'Không cần chỉnh dây'], color: 'border-blue-300 bg-blue-50' },
                { icon: '🥁', name: 'Trống / Drums', price: 'Từ 5.000.000₫', level: 'Trung bình', best: 'Rock, pop, jazz', pros: ['Phát triển cảm giác nhịp điệu', 'Giải phóng năng lượng tốt', 'Được chào đón trong mọi ban nhạc', 'Có thể dùng trống điện tử yên tĩnh'], color: 'border-red-300 bg-red-50' },
                { icon: '🎵', name: 'Ukulele', price: 'Từ 500.000₫', level: 'Rất dễ', best: 'Nhạc nhẹ, Hawaii, indie', pros: ['Nhỏ gọn, dễ mang', 'Chỉ 4 dây, học nhanh', 'Âm thanh vui tươi', 'Giá thành thấp nhất'], color: 'border-green-300 bg-green-50' },
                { icon: '🎸', name: 'Guitar Điện', price: 'Từ 3.000.000₫', level: 'Trung bình', best: 'Rock, metal, blues', pros: ['Âm thanh đa dạng qua effect', 'Dây mềm, ít đau tay', 'Phù hợp ban nhạc', 'Nhiều phong cách biểu diễn'], color: 'border-purple-300 bg-purple-50' },
                { icon: '🎻', name: 'Bass Guitar', price: 'Từ 3.500.000₫', level: 'Trung bình', best: 'Funk, rock, jazz', pros: ['Nền tảng của mọi ban nhạc', 'Kỹ thuật slap thú vị', 'Ít cạnh tranh hơn lead guitar', 'Groove và rhythm là chủ đạo'], color: 'border-gray-300 bg-gray-50' },
              ].map((ins) => (
                <div key={ins.name} className={`rounded-xl border-2 ${ins.color} p-5`}>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-4xl">{ins.icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-800">{ins.name}</h3>
                      <span className="text-xs text-gray-500">{ins.price}</span>
                    </div>
                  </div>
                  <div className="mb-3 flex gap-2 text-xs">
                    <span className="rounded-full bg-white px-2 py-1 font-medium text-gray-600">📊 {ins.level}</span>
                    <span className="rounded-full bg-white px-2 py-1 font-medium text-gray-600">🎵 {ins.best}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {ins.pros.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="mt-0.5 shrink-0 text-green-500">✓</span>{p}
                      </li>
                    ))}
                  </ul>
                  <Link href="/san-pham" className="mt-4 block text-center text-sm font-medium text-blue-600 hover:underline">Xem nhạc cụ →</Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CAM KẾT MUA HÀNG ── */}
        <section aria-labelledby="commitment-heading" className="bg-white py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 id="commitment-heading" className="mb-3 text-center text-3xl font-bold text-gray-900">Cam kết của MixiGui với bạn</h2>
            <p className="mb-10 text-center text-gray-500 max-w-2xl mx-auto">
              Chúng tôi không chỉ bán nhạc cụ hay khóa học — MixiGui cam kết đồng hành cùng bạn trong suốt hành trình âm nhạc với những giá trị cốt lõi sau đây.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: '✅', title: '100% Hàng chính hãng', desc: 'Toàn bộ nhạc cụ tại MixiGui được nhập khẩu trực tiếp từ nhà phân phối chính thức tại Việt Nam. Mỗi sản phẩm đều có tem bảo hành, serial number và hóa đơn VAT đầy đủ. Tuyệt đối không bán hàng fake, hàng nhái hay hàng kém chất lượng.' },
                { icon: '🔄', title: 'Đổi trả trong 30 ngày', desc: 'Nếu nhạc cụ có lỗi từ nhà sản xuất hoặc bạn không hài lòng vì bất kỳ lý do gì, MixiGui hỗ trợ đổi trả miễn phí trong vòng 30 ngày kể từ ngày mua. Không cần giải thích — chúng tôi tin tưởng khách hàng.' },
                { icon: '🛠️', title: 'Bảo hành tận nơi', desc: 'Với hệ thống 2 showroom tại Hà Nội và TP.HCM cùng đội ngũ kỹ thuật viên giàu kinh nghiệm, MixiGui cung cấp dịch vụ bảo hành tận nơi, sửa chữa và chỉnh âm thanh cho nhạc cụ của bạn trong suốt thời gian bảo hành.' },
                { icon: '💰', title: 'Giá tốt nhất thị trường', desc: 'Nhờ quan hệ trực tiếp với nhà phân phối, MixiGui có thể cung cấp nhạc cụ chính hãng với mức giá cạnh tranh nhất. Nếu bạn tìm thấy giá thấp hơn cho cùng sản phẩm chính hãng tại nơi khác, chúng tôi sẽ giảm thêm 5%.' },
                { icon: '📦', title: 'Giao hàng toàn quốc', desc: 'MixiGui giao hàng đến tất cả 63 tỉnh thành trên toàn quốc. Đối với đơn hàng trên 2 triệu đồng, miễn phí vận chuyển. Nhạc cụ được đóng gói cẩn thận để đảm bảo an toàn trong quá trình vận chuyển.' },
                { icon: '🎓', title: 'Tư vấn miễn phí', desc: 'Đội ngũ tư vấn của MixiGui đều là những người đam mê và có kiến thức âm nhạc thực sự — không phải nhân viên bán hàng thông thường. Chúng tôi sẽ giúp bạn chọn nhạc cụ và khóa học phù hợp nhất, dù bạn không mua gì.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 rounded-xl border bg-gray-50 p-5">
                  <span className="shrink-0 text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="mb-2 font-bold text-gray-800">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HỌC THỬ MIỄN PHÍ ── */}
        <section aria-labelledby="free-trial-heading" className="bg-gradient-to-r from-purple-600 to-purple-800 py-16 text-white">
          <div className="mx-auto max-w-5xl px-4">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <span className="mb-3 inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-medium">🆓 Miễn phí hoàn toàn</span>
                <h2 id="free-trial-heading" className="mb-4 text-3xl font-bold">Học thử 3 bài đầu tiên miễn phí</h2>
                <p className="mb-6 text-lg text-purple-100 leading-relaxed">
                  Không cần thẻ tín dụng, không cần cam kết. Đăng ký tài khoản miễn phí để truy cập ngay 3 bài học đầu tiên của bất kỳ khóa học nào — cảm nhận chất lượng giảng dạy của MixiGui trước khi quyết định đăng ký.
                </p>
                <ul className="mb-8 space-y-3">
                  {['Video bài giảng HD, có thể xem trên mọi thiết bị', 'Tài liệu PDF bài tập đi kèm', 'Hỏi đáp trực tiếp với giảng viên trong 7 ngày', 'Không tự động gia hạn, không thu phí ẩn'].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-purple-100">
                      <span className="mt-0.5 shrink-0 text-green-400">✓</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/dang-ky" className="inline-block rounded-full bg-white px-8 py-3 font-semibold text-purple-700 shadow transition hover:bg-purple-50">
                  Đăng ký học thử ngay — Miễn phí
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🎸', label: 'Guitar Acoustic', lessons: '3 bài học thử', students: '1.200+ học viên' },
                  { icon: '🎹', label: 'Piano cơ bản', lessons: '3 bài học thử', students: '980+ học viên' },
                  { icon: '🥁', label: 'Trống cơ bản', lessons: '3 bài học thử', students: '650+ học viên' },
                  { icon: '🎵', label: 'Ukulele', lessons: '3 bài học thử', students: '870+ học viên' },
                ].map((course) => (
                  <div key={course.label} className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm">
                    <div className="mb-2 text-3xl">{course.icon}</div>
                    <p className="font-semibold text-white">{course.label}</p>
                    <p className="mt-1 text-xs text-purple-200">{course.lessons}</p>
                    <p className="text-xs text-purple-300">{course.students}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── KIẾN THỨC ÂM NHẠC ── */}
        <section aria-labelledby="knowledge-heading" className="bg-white py-16">
          <div className="mx-auto max-w-4xl px-4">
            <h2 id="knowledge-heading" className="mb-4 text-3xl font-bold text-gray-900">Âm nhạc — Ngôn ngữ kết nối con người</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Âm nhạc là một trong những ngôn ngữ phổ quát nhất của nhân loại — vượt qua rào cản ngôn ngữ, văn hóa và biên giới địa lý. Học một nhạc cụ không chỉ giúp bạn thưởng thức âm nhạc theo cách sâu sắc hơn, mà còn mang lại <strong>hàng loạt lợi ích khoa học đã được chứng minh</strong>: cải thiện trí nhớ, tăng khả năng tập trung, giảm căng thẳng và lo âu, phát triển sự kiên nhẫn và kỷ luật bản thân.
              </p>
              <p>
                Nhiều người trưởng thành nghĩ rằng họ đã "quá muộn" để học nhạc. Nhưng sự thật là não bộ con người có <em>tính dẻo dai thần kinh (neuroplasticity)</em> — khả năng học hỏi và thích nghi — suốt cả cuộc đời. Nhiều nhạc sĩ nổi tiếng thế giới bắt đầu học nhạc khi đã trưởng thành và vẫn đạt được trình độ xuất sắc. Điều quan trọng không phải là bạn bắt đầu khi nào, mà là bạn có <strong>phương pháp học đúng và sự kiên trì</strong> hay không.
              </p>
              <p>
                Tại MixiGui, chúng tôi tin rằng mọi người đều có thể học nhạc — từ trẻ em 5 tuổi đến người lớn 60 tuổi. Phương pháp giảng dạy của chúng tôi được xây dựng dựa trên nghiên cứu về khoa học học tập hiện đại: <strong>học từng bước nhỏ, lặp lại có mục đích, và ứng dụng ngay vào bài nhạc thực tế</strong> — thay vì chỉ tập kỹ thuật thuần túy khô khan. Điều này giúp học viên tiến bộ nhanh hơn và quan trọng hơn là <em>duy trì động lực học lâu dài</em>.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: '🧠', title: 'Tốt cho não bộ', desc: 'Nghiên cứu tại Harvard chứng minh học nhạc tăng cường kết nối thần kinh, cải thiện ngôn ngữ và tư duy logic.' },
                { icon: '😌', title: 'Giảm căng thẳng', desc: 'Chơi nhạc giải phóng endorphin, giảm cortisol — hormone stress — hiệu quả không kém thiền định.' },
                { icon: '🤝', title: 'Kết nối xã hội', desc: 'Biết chơi nhạc cụ mở ra cơ hội tham gia ban nhạc, gặp gỡ bạn bè cùng sở thích và biểu diễn trước công chúng.' },
              ].map((item) => (
                <div key={item.title} className="rounded-xl bg-blue-50 p-5">
                  <div className="mb-2 text-3xl">{item.icon}</div>
                  <h3 className="mb-1 font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HỌC ONLINE VS OFFLINE ── */}
        <section aria-labelledby="compare-heading" className="bg-gray-50 py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 id="compare-heading" className="mb-3 text-center text-3xl font-bold text-gray-900">Học nhạc online có thực sự hiệu quả không?</h2>
            <p className="mb-10 text-center text-gray-500 max-w-2xl mx-auto">
              Câu hỏi này rất phổ biến với người mới bắt đầu. Chúng tôi so sánh trung thực giữa học online tại MixiGui và học trực tiếp tại trung tâm để bạn có thể tự quyết định.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="p-4 text-left font-semibold rounded-tl-xl">Tiêu chí</th>
                    <th className="p-4 text-center font-semibold">🖥️ MixiGui Online</th>
                    <th className="p-4 text-center font-semibold rounded-tr-xl">🏫 Trung tâm truyền thống</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Chi phí', '499k – 1.5tr / khóa trọn đời', '500k – 2tr / tháng (không giới hạn)'],
                    ['Thời gian linh hoạt', '✅ Học bất cứ lúc nào', '❌ Theo lịch cố định'],
                    ['Xem lại bài giảng', '✅ Không giới hạn', '❌ Không thể xem lại'],
                    ['Tương tác với giảng viên', '⚡ Hỏi đáp qua nền tảng 24h', '✅ Trực tiếp ngay lập tức'],
                    ['Thiết bị học', '✅ Máy tính, điện thoại, tablet', '❌ Chỉ tại phòng học'],
                    ['Tốc độ học', '✅ Tự điều chỉnh theo khả năng', '❌ Theo tốc độ lớp học'],
                    ['Chứng chỉ', '✅ Có chứng chỉ hoàn thành', '⚡ Tùy trung tâm'],
                    ['Phù hợp người bận rộn', '✅ Rất phù hợp', '❌ Khó sắp xếp thời gian'],
                  ].map(([criteria, online, offline], i) => (
                    <tr key={criteria} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border-b p-4 font-medium text-gray-700">{criteria}</td>
                      <td className="border-b p-4 text-center text-gray-600">{online}</td>
                      <td className="border-b p-4 text-center text-gray-600">{offline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-center text-sm text-gray-500">
              Kết luận: Học online tại MixiGui phù hợp nhất với những ai có lịch bận rộn, muốn tiết kiệm chi phí và học theo tốc độ riêng. Nếu bạn là trẻ em hoặc cần giám sát chặt chẽ, học trực tiếp vẫn có những ưu điểm riêng.
            </p>
          </div>
        </section>

        {/* ── GIẢNG VIÊN ── */}
        <section aria-labelledby="instructors-heading" className="bg-white py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 id="instructors-heading" className="mb-3 text-center text-3xl font-bold text-gray-900">Đội ngũ giảng viên của MixiGui</h2>
            <p className="mb-10 text-center text-gray-500 max-w-2xl mx-auto">
              Mỗi giảng viên tại MixiGui không chỉ là người giỏi chơi nhạc — họ còn là những người có kinh nghiệm giảng dạy thực tế, hiểu rõ những khó khăn mà học viên mới bắt đầu thường gặp phải.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { name: 'Thầy Minh Khoa', role: 'Guitar Acoustic & Fingerstyle', exp: '12 năm kinh nghiệm', badge: '🎸', students: '2.400+ học viên', bio: 'Tốt nghiệp Nhạc viện TP.HCM, từng biểu diễn cùng nhiều nghệ sĩ nổi tiếng. Chuyên dạy guitar cho người mới với phương pháp đơn giản, dễ hiểu.' },
                { name: 'Cô Thu Trang', role: 'Piano & Nhạc lý', exp: '10 năm kinh nghiệm', badge: '🎹', students: '1.800+ học viên', bio: 'Giảng viên piano chuyên nghiệp, từng học tại Học viện Âm nhạc Quốc gia. Giỏi dạy cả trẻ em và người lớn với lộ trình cá nhân hóa.' },
                { name: 'Thầy Bảo Long', role: 'Trống & Percussion', exp: '8 năm kinh nghiệm', badge: '🥁', students: '950+ học viên', bio: 'Tay trống của nhiều ban nhạc chuyên nghiệp tại Hà Nội. Phong cách giảng dạy năng động, truyền cảm hứng và rất kiên nhẫn với người mới.' },
                { name: 'Thầy Việt Anh', role: 'Ukulele & Guitar điện', exp: '7 năm kinh nghiệm', badge: '🎵', students: '1.100+ học viên', bio: 'Chuyên gia ukulele và guitar điện, nổi tiếng với các video hướng dẫn viral trên YouTube. Cách dạy vui nhộn, phù hợp mọi lứa tuổi.' },
              ].map((ins) => (
                <div key={ins.name} className="rounded-xl border bg-white p-5 shadow-sm text-center">
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-4xl">{ins.badge}</div>
                  <h3 className="font-bold text-gray-800">{ins.name}</h3>
                  <p className="text-xs font-medium text-blue-600">{ins.role}</p>
                  <p className="mt-1 text-xs text-gray-400">{ins.exp} • {ins.students}</p>
                  <p className="mt-3 text-xs leading-relaxed text-gray-500">{ins.bio}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-gray-500">
              Ngoài 4 giảng viên nổi bật trên, MixiGui còn có đội ngũ <strong>12+ giảng viên chuyên ngành</strong> khác, bao gồm violin, bass guitar, saxophone và sản xuất âm nhạc.{' '}
              <Link href="/ve-chung-toi" className="font-medium text-blue-600 hover:underline">Tìm hiểu thêm →</Link>
            </p>
          </div>
        </section>

        {/* ── MẸO HỌC NHẠC ── */}
        <section aria-labelledby="tips-heading" className="bg-amber-50 py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 id="tips-heading" className="mb-3 text-center text-3xl font-bold text-gray-900">10 mẹo học nhạc hiệu quả từ chuyên gia MixiGui</h2>
            <p className="mb-10 text-center text-gray-500 max-w-2xl mx-auto">
              Nhiều người học nhạc nhiều năm nhưng tiến bộ chậm vì không có phương pháp đúng. Dưới đây là những bí quyết được đúc kết từ kinh nghiệm giảng dạy của đội ngũ MixiGui.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { num: '01', title: 'Tập ngắn nhưng đều đặn', desc: '20 phút mỗi ngày hiệu quả hơn 3 tiếng mỗi tuần. Não bộ học và ghi nhớ tốt nhất khi được luyện tập theo chu kỳ đều đặn, không phải theo từng đợt dồn dập.' },
                { num: '02', title: 'Dùng máy đánh nhịp (metronome)', desc: 'Nhịp điệu là nền tảng của âm nhạc. Tập chậm với metronome rồi tăng dần tốc độ — đây là cách duy nhất để xây dựng kỹ thuật bền vững, không bị vội vàng mắc lỗi.' },
                { num: '03', title: 'Chia nhỏ đoạn khó', desc: 'Khi gặp đoạn khó, đừng cố tập cả bài. Hãy tách riêng 2–4 nhịp đó, lặp lại 20–30 lần ở tốc độ chậm cho đến khi ngón tay "nhớ" tự động, rồi mới ghép lại.' },
                { num: '04', title: 'Ghi âm bản thân', desc: 'Ghi âm buổi tập và nghe lại — bạn sẽ nghe ra những lỗi mà khi tập bạn không nhận ra. Đây là cách tự học hiệu quả nhất để cải thiện mà không cần giảng viên bên cạnh liên tục.' },
                { num: '05', title: 'Học bài nhạc bạn yêu thích', desc: 'Động lực học tăng vọt khi bạn tập những bài nhạc mình thực sự yêu thích. Đừng chỉ tập bài giảng — hãy chọn 1–2 bài nhạc yêu thích và đặt mục tiêu chơi được bài đó.' },
                { num: '06', title: 'Hiểu lý thuyết cơ bản', desc: 'Bạn không cần học nhạc lý chuyên sâu, nhưng hiểu được hợp âm, quãng và điệu thức cơ bản sẽ giúp bạn học nhanh hơn gấp đôi và tự học bài mới mà không cần hướng dẫn.' },
                { num: '07', title: 'Tập trước gương hoặc camera', desc: 'Quan sát tư thế, vị trí tay và biểu cảm của bạn khi chơi. Nhiều lỗi kỹ thuật xuất phát từ tư thế sai mà bạn không cảm nhận được — nhưng nhìn lại sẽ thấy ngay.' },
                { num: '08', title: 'Nghỉ ngơi đúng cách', desc: 'Sau 45–60 phút tập trung, não bộ cần nghỉ ngơi. Đừng tập liên tục quá lâu — chất lượng tập quan trọng hơn số giờ. Ngủ đủ giấc cũng giúp não củng cố ký ức cơ bắp trong khi ngủ.' },
                { num: '09', title: 'Tham gia cộng đồng nhạc', desc: 'Chơi nhạc cùng người khác — dù chỉ jam session online — giúp bạn nghe nhạc tốt hơn, giữ nhịp tốt hơn và có thêm động lực. Cộng đồng học viên MixiGui luôn chào đón bạn.' },
                { num: '10', title: 'Kiên nhẫn với bản thân', desc: 'Học nhạc là một hành trình dài. Sẽ có những tuần bạn cảm thấy không tiến bộ — điều đó hoàn toàn bình thường. Hãy nhìn lại video bạn tập từ 2–3 tháng trước để thấy mình đã tiến bộ bao nhiêu.' },
              ].map((tip) => (
                <div key={tip.num} className="flex gap-4 rounded-xl bg-white p-5 shadow-sm">
                  <span className="shrink-0 text-2xl font-extrabold text-amber-300">{tip.num}</span>
                  <div>
                    <h3 className="font-bold text-gray-800">{tip.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-500">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HỌC THEO ĐỘ TUỔI ── */}
        <section aria-labelledby="age-heading" className="bg-white py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 id="age-heading" className="mb-3 text-center text-3xl font-bold text-gray-900">Học nhạc ở độ tuổi nào cũng được</h2>
            <p className="mb-10 text-center text-gray-500 max-w-2xl mx-auto">
              MixiGui có chương trình học phù hợp với mọi lứa tuổi — từ trẻ em đến người trưởng thành. Mỗi độ tuổi có cách tiếp cận âm nhạc và lợi ích khác nhau.
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { age: '5 – 10 tuổi', icon: '👶', color: 'bg-pink-50 border-pink-200', tag: 'text-pink-600', title: 'Nền tảng sớm', points: ['Phát triển tai nghe âm nhạc tự nhiên', 'Tăng khả năng tập trung và kỷ luật', 'Piano và ukulele là lựa chọn tốt nhất', 'Học qua trò chơi, nhạc thiếu nhi vui nhộn'] },
                { age: '11 – 17 tuổi', icon: '🧑', color: 'bg-blue-50 border-blue-200', tag: 'text-blue-600', title: 'Phát triển nhanh', points: ['Não bộ đang trong giai đoạn phát triển mạnh', 'Học nhanh nhất trong tất cả độ tuổi', 'Guitar và piano phổ biến nhất', 'Xây dựng bản sắc cá nhân qua âm nhạc'] },
                { age: '18 – 35 tuổi', icon: '👨', color: 'bg-green-50 border-green-200', tag: 'text-green-600', title: 'Học có mục tiêu', points: ['Học vì đam mê, không áp lực', 'Dễ tự tổ chức lịch học', 'Tiến bộ rõ rệt trong 3–6 tháng', 'Học online phù hợp nhất với lịch bận'] },
                { age: '36 tuổi trở lên', icon: '🧓', color: 'bg-amber-50 border-amber-200', tag: 'text-amber-600', title: 'Không bao giờ muộn', points: ['Trí nhớ cơ bắp vẫn hình thành tốt', 'Học chậm hơn nhưng chắc hơn', 'Âm nhạc giảm căng thẳng hiệu quả', 'Piano nhẹ nhàng, ít tác động lên khớp'] },
              ].map((group) => (
                <div key={group.age} className={`rounded-xl border-2 ${group.color} p-5`}>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-3xl">{group.icon}</span>
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-wide ${group.tag}`}>{group.age}</p>
                      <h3 className="font-bold text-gray-800">{group.title}</h3>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {group.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="mt-0.5 shrink-0 text-green-500">✓</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CỘNG ĐỒNG ── */}
        <section aria-labelledby="community-heading" className="bg-gradient-to-br from-blue-900 to-blue-700 py-16 text-white">
          <div className="mx-auto max-w-5xl px-4">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <h2 id="community-heading" className="mb-4 text-3xl font-bold">Cộng đồng học viên MixiGui</h2>
                <p className="mb-6 text-lg text-blue-100 leading-relaxed">
                  Học nhạc một mình có thể cô đơn và thiếu động lực. Đó là lý do MixiGui xây dựng một cộng đồng học viên sôi động — nơi bạn có thể chia sẻ tiến trình học, hỏi đáp kỹ thuật, tham gia các thử thách âm nhạc hàng tháng và kết bạn với những người cùng đam mê.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { value: '15.000+', label: 'Thành viên cộng đồng' },
                    { value: '500+', label: 'Bài đăng mỗi tháng' },
                    { value: '12', label: 'Thử thách âm nhạc/năm' },
                    { value: '4.9/5', label: 'Đánh giá trung bình' },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl bg-white/10 p-4 text-center">
                      <p className="text-2xl font-extrabold text-white">{s.value}</p>
                      <p className="text-xs text-blue-200">{s.label}</p>
                    </div>
                  ))}
                </div>
                <Link href="/dang-ky" className="inline-block rounded-full bg-white px-8 py-3 font-semibold text-blue-700 shadow transition hover:bg-blue-50">
                  Tham gia cộng đồng ngay
                </Link>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Lan Anh', time: '2 giờ trước', text: 'Hôm nay tôi vừa hoàn thành bài "Tháng Tư Là Lời Nói Dối" trên guitar sau 2 tháng tập. Cảm ơn thầy Minh Khoa đã hướng dẫn! 🎸', likes: 47 },
                  { name: 'Tuấn Kiệt', time: '5 giờ trước', text: 'Ai đang học piano mà chưa qua được bài Hanon số 5 thì cứ tập chậm bằng 50% rồi tăng dần lên. Tôi đã mắc kẹt 3 tuần với bài này trước khi áp dụng cách này! 😅', likes: 83 },
                  { name: 'Phương Linh', time: 'Hôm qua', text: 'Mua đàn Yamaha PSR-E373 tại MixiGui, nhân viên tư vấn rất nhiệt tình, đàn chính hãng, giá tốt. Đang học khóa piano cơ bản online song song — tiến bộ rõ rệt! ⭐⭐⭐⭐⭐', likes: 62 },
                ].map((post) => (
                  <div key={post.name} className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-400 text-sm font-bold text-white">{post.name[0]}</div>
                        <span className="font-semibold text-white text-sm">{post.name}</span>
                      </div>
                      <span className="text-xs text-blue-300">{post.time}</span>
                    </div>
                    <p className="text-sm text-blue-100 leading-relaxed">{post.text}</p>
                    <p className="mt-2 text-xs text-blue-300">❤️ {post.likes} lượt thích</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── ĐỐI TÁC & CHỨNG NHẬN ── */}
        <section aria-labelledby="partners-heading" className="bg-white py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 id="partners-heading" className="mb-3 text-center text-3xl font-bold text-gray-900">Đối tác và chứng nhận</h2>
            <p className="mb-10 text-center text-gray-500 max-w-2xl mx-auto">
              MixiGui tự hào được hợp tác với các đơn vị uy tín trong ngành âm nhạc và giáo dục tại Việt Nam, đảm bảo chất lượng sản phẩm và dịch vụ đạt tiêu chuẩn cao nhất.
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: '🏛️', title: 'Nhà phân phối ủy quyền Yamaha', desc: 'MixiGui là đại lý ủy quyền chính thức của Yamaha Music tại Việt Nam — đảm bảo 100% sản phẩm Yamaha tại MixiGui là hàng chính hãng với đầy đủ chính sách bảo hành từ nhà sản xuất.' },
                { icon: '📜', title: 'Chứng chỉ Roland & Casio', desc: 'Đối tác phân phối được chứng nhận bởi Roland Corporation và Casio Musical Instruments. Toàn bộ đàn phím điện tử và synthesizer tại MixiGui đều được kiểm định chất lượng trước khi đến tay khách hàng.' },
                { icon: '🎓', title: 'Liên kết Học viện Âm nhạc', desc: 'Nội dung khóa học tại MixiGui được phát triển và thẩm định bởi giảng viên từ Học viện Âm nhạc Quốc gia và Nhạc viện TP.HCM, đảm bảo chương trình giảng dạy đúng chuẩn học thuật.' },
                { icon: '🔒', title: 'Thanh toán bảo mật', desc: 'Hệ thống thanh toán tại MixiGui được bảo mật bởi SSL 256-bit và tích hợp với các cổng thanh toán uy tín: VNPay, Momo, ZaloPay và cổng thẻ quốc tế Visa/Mastercard.' },
                { icon: '⭐', title: 'Đánh giá 4.9/5 trên Google', desc: 'Với hơn 2.400 đánh giá trên Google Business và hơn 1.800 đánh giá 5 sao, MixiGui là một trong những nền tảng học nhạc và cửa hàng nhạc cụ được đánh giá cao nhất tại Việt Nam.' },
                { icon: '📱', title: 'Tương thích đa nền tảng', desc: 'Nền tảng học trực tuyến của MixiGui hoạt động mượt mà trên mọi thiết bị — Windows, macOS, iOS và Android. Không cần cài đặt thêm ứng dụng, học ngay trên trình duyệt web.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 rounded-xl border p-5 shadow-sm">
                  <span className="shrink-0 text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="mb-1 font-bold text-gray-800">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SPOTIFY ── */}
        <section aria-labelledby="spotify-heading" className="bg-blue-50 py-16">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-3 flex items-center justify-center gap-3">
              <svg viewBox="0 0 24 24" fill="#1DB954" className="h-8 w-8">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              <h2 id="spotify-heading" className="text-3xl font-bold text-gray-900">Âm nhạc trên MixiGui</h2>
            </div>
            <p className="mb-10 text-center text-gray-500 max-w-xl mx-auto">
              Thư giãn và tìm cảm hứng với những playlist âm nhạc được MixiGui tuyển chọn — phù hợp để học nhạc, luyện tập và thư giãn.
            </p>

            {/* Mini tracks */}
            <div>
              <p className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-green-600">🎸 Bài học nổi bật theo thể loại</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: 'Guitar Acoustic — Nhạc Việt', id: '5U9KBFZpLJNBktDzJ3oTuA' },
                  { label: 'Piano Ballad — Thư giãn', id: '37i9dQZF1DX4sWSpwq3LiO' },
                  { label: 'Fingerstyle Guitar — Instrumental', id: '37i9dQZF1DWWEJlAGA9gs0' },
                  { label: 'Acoustic Chill — Luyện tập', id: '37i9dQZF1DX4E3UdUs7fUx' },
                ].map((track) => (
                  <div key={track.id} className="rounded-xl overflow-hidden">
                    <p className="mb-1.5 text-xs font-medium text-gray-500">{track.label}</p>
                    <iframe
                      style={{ borderRadius: '12px' }}
                      src={`https://open.spotify.com/embed/playlist/${track.id}?utm_source=generator&theme=0`}
                      width="100%"
                      height="152"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-gray-500">
              Nghe trọn bài với tài khoản Spotify Premium •{' '}
              <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                Mở Spotify
              </a>
            </p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section aria-label="Đăng ký học" className="py-20 text-center" style={{ background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)' }}>
          <div className="mx-auto max-w-2xl px-4">
            <h2 className="text-3xl font-bold text-white">Bắt đầu hành trình âm nhạc ngay hôm nay</h2>
            <p className="mt-3 text-blue-100">Tham gia cùng hơn {stats.users}+ học viên đang học tại MixiGui. Đăng ký miễn phí, không cần thẻ tín dụng.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/dang-ky" className="rounded-full bg-white px-10 py-3 font-semibold text-blue-700 shadow transition hover:bg-blue-50">
                Đăng ký miễn phí
              </Link>
              <Link href="/khoa-hoc" className="rounded-full border-2 border-white px-10 py-3 font-semibold text-white transition hover:bg-white/10">
                Khám phá khóa học
              </Link>
            </div>
          </div>
        </section>
      </main>
      <FloatingContacts />
    </>
  )
}
