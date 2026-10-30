import Link from 'next/link'
import type { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase'
import { siteConfig } from '@/config/site'
import { HeroSparkles } from '@/components/layout/festive-ambience'

export const metadata: Metadata = {
  title: 'Nhạc Cụ Chính Hãng | Guitar, Piano, Trống - MixiGui',
  description:
    'Mua nhạc cụ chính hãng tại MixiGui: guitar Yamaha, piano Roland, trống Casio và nhiều hơn. Bảo hành 12-24 tháng, giao hàng toàn quốc, giá tốt nhất thị trường.',
  keywords: ['mua nhạc cụ', 'nhạc cụ chính hãng', 'đàn guitar Yamaha', 'piano Roland', 'đàn ukulele', 'bộ trống điện'],
  alternates: { canonical: `${siteConfig.url}/san-pham` },
  openGraph: {
    title: 'Nhạc Cụ Chính Hãng | MixiGui',
    description: 'Guitar Yamaha, Piano Roland, Trống Casio chính hãng. Bảo hành 12-24 tháng, giao toàn quốc.',
    url: `${siteConfig.url}/san-pham`,
  },
}

export const revalidate = 60

const CATEGORIES = [
  { icon: '🎸', name: 'Guitar Acoustic', slug: 'guitar-acoustic' },
  { icon: '🎸', name: 'Guitar Classic', slug: 'guitar-classic' },
  { icon: '🎸', name: 'Guitar Điện', slug: 'guitar-dien' },
  { icon: '🎹', name: 'Piano / Keyboard', slug: 'piano' },
  { icon: '🥁', name: 'Trống', slug: 'trong' },
  { icon: '🎵', name: 'Ukulele', slug: 'ukulele' },
  { icon: '🎻', name: 'Bass Guitar', slug: 'bass' },
  { icon: '🔧', name: 'Phụ kiện', slug: 'phu-kien' },
]

const BRANDS = ['Yamaha', 'Roland', 'Casio', 'Fender', 'Gibson', 'Kapok', 'Taylor', 'Mahalo']

const PRODUCT_FAQS = [
  { q: 'Nhạc cụ tại MixiGui có phải hàng chính hãng không?', a: '100% chính hãng. Tất cả sản phẩm được nhập khẩu trực tiếp từ nhà phân phối chính thức tại Việt Nam, có tem bảo hành, hóa đơn VAT và giấy tờ chứng minh xuất xứ đầy đủ.' },
  { q: 'Chính sách bảo hành như thế nào?', a: 'Tùy sản phẩm: đàn guitar bảo hành 12 tháng, piano/keyboard bảo hành 24 tháng, trống điện bảo hành 12 tháng. Bảo hành tận nơi tại Hà Nội và TP.HCM, hoặc gửi bưu điện đổi với các tỉnh khác.' },
  { q: 'Có được đổi trả sản phẩm không?', a: 'Có. Đổi trả miễn phí trong 7 ngày nếu sản phẩm bị lỗi kỹ thuật từ nhà sản xuất. Đổi size/mẫu trong 3 ngày nếu sản phẩm còn nguyên seal, chưa qua sử dụng.' },
  { q: 'Ship hàng về tỉnh có được không, phí ship bao nhiêu?', a: 'Giao hàng toàn quốc qua GHTK, GHN, ViettelPost. Miễn phí ship cho đơn hàng từ 2 triệu đồng. Đơn dưới 2 triệu phí ship 30.000–50.000₫ tùy khu vực.' },
  { q: 'Có thể đến xem trực tiếp và mua tại cửa hàng không?', a: 'Có. Showroom MixiGui tại Hà Nội và TP.HCM. Bạn có thể đến thử đàn, nhận tư vấn trực tiếp từ nhân viên và mua tại chỗ. Liên hệ để biết địa chỉ chi tiết.' },
]

async function getProducts() {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('products')
    .select('id, name, slug, images, price, discount_price, stock, brand, is_published')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
  if (error) { console.error('products error:', error); return [] }
  return data ?? []
}

export default async function SanPhamPage() {
  const products = await getProducts()

  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: PRODUCT_FAQS.map((f) => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main>
        {/* ── HERO ── */}
        <section className="bg-noel-love relative min-h-[320px] overflow-hidden border-b border-noel-200/60 text-white sm:min-h-[380px]">
          <div className="leading-[0]">
            <video
              src="https://res.cloudinary.com/ddaryoz5b/video/upload/v1773801373/Video_T%C3%A0u_C%C3%A1_Vi%E1%BB%87t_Nam_Vui_Nh%E1%BB%99n_ltfx7m.mp4"
              autoPlay muted loop playsInline
              className="block min-h-[320px] w-full object-cover sm:min-h-[380px]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-noel-950/80 via-wine-950/60 to-emerald-950/65" />
          <HeroSparkles />
          <div className="absolute inset-0 z-10 flex items-center py-10">
            <div className="mx-auto w-full max-w-7xl px-4">
              <nav aria-label="Breadcrumb" className="mb-3 text-sm text-rose-200">
                <Link href="/" className="hover:text-white">Trang chủ</Link>
                <span className="mx-2">/</span>
                <span className="text-white">Sản phẩm</span>
              </nav>
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-gold-300/40 bg-white/15 px-3.5 py-1 text-xs font-semibold text-gold-200 backdrop-blur-xs">
                🎁🎄 Quà Tặng Nhạc Cụ Mùa Giáng Sinh &amp; Tình Yêu
              </span>
              <h1 className="text-3xl font-extrabold drop-shadow sm:text-4xl lg:text-5xl">Nhạc Cụ Chính Hãng</h1>
              <p className="mt-3 max-w-2xl text-base text-rose-100 drop-shadow sm:text-lg">
                Guitar, piano, trống, ukulele từ các thương hiệu uy tín thế giới — Yamaha, Roland, Casio, Fender. Tặng kèm nơ đỏ &amp; thiệp viết tay trao gửi yêu thương.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5 text-xs sm:text-sm">
                {['✅ 100% chính hãng', '🎀 Gói quà Noel miễn phí', '🛡 Bảo hành 12–24 tháng', '🚚 Giao toàn quốc', '🔄 Đổi trả 7 ngày'].map((b) => (
                  <span key={b} className="rounded-full border border-white/20 bg-white/15 px-3 py-1 backdrop-blur-sm">{b}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── DANH MỤC ── */}
        <section aria-labelledby="cat-heading" className="bg-warm-snow py-10">
          <div className="mx-auto max-w-7xl px-4">
            <h2 id="cat-heading" className="mb-5 text-lg font-bold text-gray-800">Danh mục nhạc cụ &amp; Quà tặng</h2>
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
              {CATEGORIES.map((c) => (
                <Link key={c.slug} href={`/san-pham?danh-muc=${c.slug}`}
                  className="card-festive group flex flex-col items-center rounded-2xl border border-noel-100/80 bg-white py-3.5 px-2 text-center shadow-xs hover:border-noel-300">
                  <span className="text-2xl">{c.icon}</span>
                  <span className="mt-1 text-xs font-medium text-gray-600 group-hover:text-noel-600">{c.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── THƯƠNG HIỆU ── */}
        <section aria-label="Thương hiệu" className="border-b border-noel-100/80 bg-white py-8">
          <div className="mx-auto max-w-7xl px-4">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-gray-400">Thương hiệu chính hãng</p>
            <div className="flex flex-wrap gap-3">
              {BRANDS.map((b) => (
                <Link key={b} href={`/san-pham?thuong-hieu=${b.toLowerCase()}`}
                  className="rounded-xl border border-noel-100 bg-warm-snow px-5 py-2 text-sm font-bold text-gray-600 transition hover:border-noel-300 hover:bg-noel-50 hover:text-noel-600">
                  {b}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── DANH SÁCH SẢN PHẨM ── */}
        <section aria-labelledby="products-list-heading" className="py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-6 flex items-center justify-between">
              <h2 id="products-list-heading" className="text-2xl font-bold text-gray-900">
                Tất cả sản phẩm
                <span className="ml-2 text-base font-normal text-gray-400">({products.length} sản phẩm)</span>
              </h2>
            </div>

            {products.length === 0 ? (
              <div className="py-20 text-center text-gray-400">Chưa có sản phẩm nào</div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => {
                  const thumbnail = Array.isArray(product.images) ? product.images[0] : null
                  return (
                    <Link key={product.id} href={`/san-pham/${product.slug}`}
                      className="card-festive group overflow-hidden rounded-2xl border border-noel-100/90 bg-white shadow-sm">
                      <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-noel-50 via-gold-50 to-green-50">
                        {thumbnail
                          ? <img src={thumbnail} alt={`Nhạc cụ ${product.name}`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                          : <div className="flex h-full items-center justify-center text-5xl">🎵</div>
                        }
                        {product.stock === 0 && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <span className="rounded bg-black/70 px-3 py-1 text-sm font-semibold text-white">Hết hàng</span>
                          </div>
                        )}
                        {product.discount_price && product.discount_price < product.price ? (
                          <span className="absolute right-2.5 top-2.5 rounded-full bg-noel-600 px-2.5 py-0.5 text-xs font-bold text-white shadow-xs">
                            -{Math.round((1 - product.discount_price / product.price) * 100)}%
                          </span>
                        ) : (
                          <span aria-hidden="true" className="absolute right-2.5 top-2.5 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-green-700 shadow-xs">
                            🎁 Chính hãng
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        {product.brand && (
                          <span className="mb-1.5 inline-block rounded-full bg-noel-50 px-2.5 py-0.5 text-xs font-medium text-noel-700">{product.brand}</span>
                        )}
                        <h3 className="mb-3 line-clamp-2 font-semibold text-gray-800 transition-colors group-hover:text-noel-600">{product.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-noel-600">{Number(product.price).toLocaleString('vi-VN')}₫</span>
                          {product.discount_price && product.discount_price < product.price && (
                            <span className="text-xs text-gray-400 line-through">{Number(product.discount_price).toLocaleString('vi-VN')}₫</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* ── CAM KẾT ── */}
        <section aria-labelledby="commitment-heading" className="bg-gradient-to-b from-noel-50/70 to-green-50/50 py-14">
          <div className="mx-auto max-w-7xl px-4">
            <h2 id="commitment-heading" className="mb-3 text-2xl font-bold text-gray-900">Cam kết của MixiGui khi mua nhạc cụ</h2>
            <p className="mb-8 max-w-3xl text-gray-600">
              Chúng tôi hiểu rằng mua nhạc cụ — cho bản thân hay làm quà tặng người thương — là một quyết định ý nghĩa. MixiGui cam kết cung cấp <strong>sản phẩm chính hãng 100%</strong>, gói quà Giáng Sinh tinh tế và dịch vụ hậu mãi chu đáo nhất.
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: '🏷️', title: 'Giá tốt nhất', desc: 'Cam kết giá cạnh tranh. Tìm thấy giá rẻ hơn cùng sản phẩm chính hãng, chúng tôi hoàn lại phần chênh lệch.' },
                { icon: '🛡️', title: 'Bảo hành chính hãng', desc: 'Bảo hành 12–24 tháng tại trung tâm bảo hành ủy quyền. Hỗ trợ sửa chữa tận nơi tại HN và HCM.' },
                { icon: '🎁', title: 'Gói quà & Đóng gói kỹ', desc: 'Đóng gói chống sốc nhiều lớp kèm nơ đỏ & thiệp Giáng Sinh miễn phí theo yêu cầu của bạn.' },
                { icon: '💝', title: 'Tư vấn từ trái tim', desc: 'Đội ngũ nhân viên am hiểu nhạc cụ, tư vấn miễn phí giúp bạn chọn đúng món quà phù hợp nhất.' },
              ].map((item) => (
                <div key={item.title} className="card-festive rounded-2xl border border-noel-100/80 bg-white p-5 shadow-sm">
                  <div className="mb-3 text-3xl">{item.icon}</div>
                  <h3 className="mb-1 font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HƯỚNG DẪN CHỌN NHẠC CỤ ── */}
        <section aria-labelledby="guide-heading" className="py-14">
          <div className="mx-auto max-w-4xl px-4">
            <h2 id="guide-heading" className="mb-6 text-2xl font-bold text-gray-900">Hướng dẫn chọn nhạc cụ cho người mới bắt đầu</h2>
            <div className="space-y-5 text-gray-600">
              <div className="rounded-xl border-l-4 border-green-500 bg-green-50 p-5">
                <h3 className="mb-2 font-bold text-gray-800">🎸 Nếu bạn muốn học Guitar</h3>
                <p className="text-sm leading-relaxed">Người mới nên chọn <strong>guitar acoustic cỡ dreadnought</strong> như Yamaha F310 hoặc Kapok LC-14 trong tầm giá 1–3 triệu đồng. Tránh mua guitar quá rẻ dưới 500.000₫ vì chất lượng kém sẽ khiến bạn khó chơi và dễ nản. Guitar classic (dây nylon) phù hợp hơn nếu bạn muốn học nhạc cổ điển hoặc tay yếu.</p>
              </div>
              <div className="rounded-xl border-l-4 border-noel-500 bg-noel-50 p-5">
                <h3 className="mb-2 font-bold text-gray-800">🎹 Nếu bạn muốn học Piano</h3>
                <p className="text-sm leading-relaxed">Với người mới, <strong>đàn phím điện 61 phím</strong> như Casio CT-S300 là lựa chọn kinh tế. Nếu nghiêm túc học, nên đầu tư đàn <strong>76–88 phím có lực phím (weighted keys)</strong> như Roland FP series để cảm giác gần với piano acoustic nhất. Tránh đàn toy keyboard dưới 1 triệu vì không đủ phím và chất lượng âm thanh kém.</p>
              </div>
              <div className="rounded-xl border-l-4 border-orange-500 bg-orange-50 p-5">
                <h3 className="mb-2 font-bold text-gray-800">🥁 Nếu bạn muốn học Trống</h3>
                <p className="text-sm leading-relaxed">Để tập tại nhà không gây ồn, <strong>bộ trống điện</strong> là giải pháp tối ưu. Roland TD-1K là mức entry-level tốt nhất trong tầm 7–10 triệu. Nếu budget eo hẹp, có thể bắt đầu với <strong>pad tập trống đơn</strong> kèm metronome để luyện kỹ thuật cơ bản trước khi đầu tư bộ trống hoàn chỉnh.</p>
              </div>
              <div className="rounded-xl border-l-4 border-wine-500 bg-wine-50 p-5">
                <h3 className="mb-2 font-bold text-gray-800">🎵 Nếu bạn muốn học Ukulele</h3>
                <p className="text-sm leading-relaxed">Ukulele là nhạc cụ dễ học nhất, phù hợp cho trẻ em và người lớn muốn bắt đầu nhanh. Chọn <strong>cỡ soprano hoặc concert</strong> với dây nylon. Các thương hiệu tốt trong tầm giá phổ thông: Mahalo, Kapok, Kala từ 300.000–800.000₫. Tránh ukulele đồ chơi plastic vì khó lên dây và dễ mất tune.</p>
              </div>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Còn băn khoăn? <Link href="/lien-he" className="font-medium text-noel-600 hover:underline">Liên hệ đội ngũ tư vấn</Link> để được hỗ trợ chọn nhạc cụ phù hợp nhất.
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section aria-labelledby="faq-heading" className="bg-warm-snow py-14">
          <div className="mx-auto max-w-3xl px-4">
            <h2 id="faq-heading" className="mb-8 text-2xl font-bold text-gray-900">Câu hỏi thường gặp khi mua nhạc cụ</h2>
            <div className="space-y-3">
              {PRODUCT_FAQS.map((faq, i) => (
                <details key={i} className="group rounded-2xl border border-noel-100/80 bg-white p-5 shadow-sm open:shadow-md">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-800">
                    <span>{faq.q}</span>
                    <span className="ml-4 shrink-0 text-noel-500 transition group-open:rotate-45">＋</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-noel-love relative overflow-hidden py-16 text-center text-white">
          <HeroSparkles />
          <div className="relative z-10 mx-auto max-w-xl px-4">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1 text-xs font-semibold text-gold-200">
              🎁♥ Trao gửi món quà âm nhạc
            </span>
            <h2 className="text-2xl font-bold sm:text-3xl">Cần tư vấn chọn nhạc cụ làm quà?</h2>
            <p className="mt-2 text-rose-100">Đội ngũ chuyên gia của MixiGui sẵn sàng giúp bạn chọn đúng cây đàn ưng ý kèm hộp quà Giáng Sinh sang trọng.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link href="/lien-he" className="rounded-full bg-white px-8 py-3 font-bold text-noel-700 shadow-lg ring-2 ring-gold-300/50 hover:bg-noel-50 transition">
                💝 Tư vấn miễn phí
              </Link>
              <Link href="/khoa-hoc" className="rounded-full border-2 border-white/85 bg-white/10 px-8 py-3 font-semibold text-white hover:bg-white/20 transition">
                Xem khóa học kèm theo
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
