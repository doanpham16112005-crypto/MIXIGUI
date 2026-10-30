import Link from 'next/link'
import type { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase'
import { siteConfig } from '@/config/site'
import { HeroSparkles } from '@/components/layout/festive-ambience'

export const metadata: Metadata = {
  title: 'Blog Âm Nhạc | Kiến Thức Guitar, Piano, Trống - MixiGui',
  description:
    'Khám phá blog âm nhạc MixiGui: hướng dẫn học guitar, piano, trống cho người mới; tips luyện tập hiệu quả; review nhạc cụ; kiến thức lý thuyết âm nhạc từ giảng viên chuyên nghiệp.',
  keywords: ['blog âm nhạc', 'học guitar', 'học piano', 'tips luyện nhạc', 'kiến thức âm nhạc', 'hướng dẫn chơi đàn'],
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: {
    title: 'Blog Âm Nhạc | MixiGui',
    description: 'Kiến thức guitar, piano, trống từ giảng viên chuyên nghiệp. Cập nhật mỗi tuần.',
    url: `${siteConfig.url}/blog`,
  },
}

export const revalidate = 60

const BLOG_TOPICS = [
  { icon: '🎸', label: 'Guitar', slug: 'guitar' },
  { icon: '🎹', label: 'Piano', slug: 'piano' },
  { icon: '🥁', label: 'Trống', slug: 'trong' },
  { icon: '🎵', label: 'Ukulele', slug: 'ukulele' },
  { icon: '🎼', label: 'Lý thuyết nhạc', slug: 'ly-thuyet' },
  { icon: '🛒', label: 'Review nhạc cụ', slug: 'review' },
  { icon: '💡', label: 'Tips luyện tập', slug: 'tips' },
  { icon: '🌟', label: 'Tin tức', slug: 'tin-tuc' },
]

async function getPosts() {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, thumbnail_url, published_at, is_published')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
  if (error) { console.error('blog_posts error:', error); return [] }
  return data ?? []
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export default async function BlogPage() {
  const posts = await getPosts()
  const featured = posts[0] ?? null
  const rest = posts.slice(1)

  const blogListSchema = posts.length > 0 ? {
    '@context': 'https://schema.org', '@type': 'Blog',
    name: 'Blog Âm Nhạc MixiGui',
    url: `${siteConfig.url}/blog`,
    description: 'Kiến thức âm nhạc, hướng dẫn học đàn và review nhạc cụ từ MixiGui',
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${siteConfig.url}/blog/${p.slug}`,
      datePublished: p.published_at,
      image: p.thumbnail_url || `${siteConfig.url}/images/og-image.jpg`,
    })),
  } : null

  return (
    <>
      {blogListSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }} />
      )}

      <main>
        {/* ── HERO ── */}
        <section className="relative overflow-hidden border-b border-wine-200/60 bg-gradient-to-r from-noel-900 via-wine-700 to-wine-600 py-16 text-white">
          <HeroSparkles />
          <div className="relative z-10 mx-auto max-w-7xl px-4">
            <nav aria-label="Breadcrumb" className="mb-3 text-sm text-rose-200">
              <Link href="/" className="hover:text-white">Trang chủ</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Blog</span>
            </nav>
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-gold-300/40 bg-white/15 px-3.5 py-1 text-xs font-semibold text-gold-200">
              💌🎄 Chuyện Âm Nhạc &amp; Giai Điệu Mùa Yêu
            </span>
            <h1 className="text-4xl font-extrabold sm:text-5xl">Blog Âm Nhạc</h1>
            <p className="mt-3 max-w-2xl text-lg text-rose-100">
              Kiến thức học đàn, tips luyện tập, bản tab tình ca mùa đông và review nhạc cụ — được chia sẻ tận tâm bởi giảng viên MixiGui.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              {['📚 Cập nhật hàng tuần', '🎓 Từ giảng viên chuyên nghiệp', '💝 Cảm hứng âm nhạc miễn phí'].map((b) => (
                <span key={b} className="rounded-full border border-white/20 bg-white/15 px-3 py-1 backdrop-blur-xs">{b}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── CHỦ ĐỀ ── */}
        <section aria-labelledby="topics-heading" className="bg-warm-snow py-10">
          <div className="mx-auto max-w-7xl px-4">
            <h2 id="topics-heading" className="mb-5 text-lg font-bold text-gray-800">Chủ đề</h2>
            <div className="flex flex-wrap gap-3">
              {BLOG_TOPICS.map((t) => (
                <Link key={t.slug} href={`/blog?chu-de=${t.slug}`}
                  className="flex items-center gap-2 rounded-full border border-wine-100 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-xs transition hover:-translate-y-0.5 hover:border-wine-300 hover:bg-wine-50/50 hover:text-wine-600">
                  <span>{t.icon}</span>{t.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── BÀI VIẾT NỔI BẬT ── */}
        {featured && (
          <section aria-labelledby="featured-heading" className="py-12">
            <div className="mx-auto max-w-7xl px-4">
              <h2 id="featured-heading" className="mb-6 text-2xl font-bold text-gray-900">Bài viết nổi bật</h2>
              <Link href={`/blog/${featured.slug}`}
                className="card-festive group grid overflow-hidden rounded-2xl border border-wine-100 bg-white shadow-sm sm:grid-cols-2">
                <div className="h-64 overflow-hidden bg-gradient-to-br from-wine-50 via-love-50 to-wine-100 sm:h-auto">
                  {featured.thumbnail_url
                    ? <img src={featured.thumbnail_url} alt={featured.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    : <div className="flex h-full items-center justify-center text-7xl">📝</div>
                  }
                </div>
                <div className="flex flex-col justify-center p-8">
                  <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-wine-50 px-3 py-1 text-xs font-semibold text-wine-700">
                    ♥ Bài viết mới nhất
                  </span>
                  <h3 className="mb-3 text-2xl font-bold text-gray-900 transition-colors group-hover:text-wine-600">{featured.title}</h3>
                  {featured.excerpt && <p className="mb-4 text-gray-500 line-clamp-3">{featured.excerpt}</p>}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{formatDate(featured.published_at)}</span>
                    <span className="text-sm font-semibold text-wine-600 group-hover:underline">Đọc ngay →</span>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* ── TẤT CẢ BÀI VIẾT ── */}
        <section aria-labelledby="all-posts-heading" className="pb-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-6 flex items-center justify-between">
              <h2 id="all-posts-heading" className="text-2xl font-bold text-gray-900">
                Tất cả bài viết
                <span className="ml-2 text-base font-normal text-gray-400">({posts.length} bài)</span>
              </h2>
            </div>

            {posts.length === 0 ? (
              <div className="py-20 text-center text-gray-400">Chưa có bài viết nào</div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}
                    className="card-festive group overflow-hidden rounded-2xl border border-wine-100 bg-white shadow-sm">
                    <div className="h-48 w-full overflow-hidden bg-gradient-to-br from-wine-50 via-love-50 to-wine-100">
                      {post.thumbnail_url
                        ? <img src={post.thumbnail_url} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                        : <div className="flex h-full items-center justify-center text-5xl">📝</div>
                      }
                    </div>
                    <div className="p-4">
                      <h3 className="mb-2 line-clamp-2 font-semibold text-gray-800 transition-colors group-hover:text-wine-600">{post.title}</h3>
                      {post.excerpt && <p className="mb-3 line-clamp-2 text-sm text-gray-500">{post.excerpt}</p>}
                      <p className="text-xs text-gray-400">{formatDate(post.published_at)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── VỀ BLOG ── */}
        <section aria-labelledby="about-blog-heading" className="bg-wine-50 py-14">
          <div className="mx-auto max-w-4xl px-4">
            <h2 id="about-blog-heading" className="mb-4 text-2xl font-bold text-gray-900">Về Blog Âm Nhạc MixiGui</h2>
            <div className="space-y-4 text-gray-600">
              <p className="leading-relaxed">
                Blog MixiGui là nơi chia sẻ kiến thức âm nhạc thực tế và hữu ích, được viết bởi đội ngũ giảng viên có kinh nghiệm biểu diễn và giảng dạy chuyên nghiệp. Chúng tôi cập nhật bài viết mới mỗi tuần về các chủ đề như <strong>hướng dẫn học guitar, piano, trống cho người mới</strong>, tips luyện tập hiệu quả, review nhạc cụ và kiến thức lý thuyết âm nhạc.
              </p>
              <p className="leading-relaxed">
                Khác với nhiều blog âm nhạc khác, nội dung tại MixiGui được xây dựng từ <strong>kinh nghiệm thực tế</strong> của giảng viên — không phải sao chép hay dịch thuật. Mỗi bài viết đều có bài tập kèm theo, tab nhạc hoặc backing track để bạn có thể áp dụng ngay vào việc luyện tập.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { icon: '✍️', title: 'Nội dung thực tế', desc: 'Viết từ kinh nghiệm giảng dạy thực tế, có bài tập đi kèm' },
                { icon: '📅', title: 'Cập nhật hàng tuần', desc: 'Bài viết mới mỗi tuần, luôn cập nhật xu hướng âm nhạc' },
                { icon: '🆓', title: 'Miễn phí hoàn toàn', desc: 'Toàn bộ bài viết trên blog đều miễn phí, không cần đăng ký' },
              ].map((item) => (
                <div key={item.title} className="rounded-xl bg-white p-5 shadow-sm">
                  <div className="mb-2 text-3xl">{item.icon}</div>
                  <h3 className="mb-1 font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CHỦ ĐỀ PHỔ BIẾN ── */}
        <section aria-labelledby="popular-heading" className="py-14">
          <div className="mx-auto max-w-4xl px-4">
            <h2 id="popular-heading" className="mb-6 text-2xl font-bold text-gray-900">Chủ đề được đọc nhiều nhất</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: 'Hướng dẫn học guitar cho người mới', desc: 'Loạt bài từ cách cầm đàn, bấm hợp âm cơ bản Am, Em, C, G đến đệm hát bài nhạc hoàn chỉnh đầu tiên của bạn.', href: '/blog?chu-de=guitar', tag: '🎸 Guitar' },
                { title: 'Lý thuyết âm nhạc cơ bản', desc: 'Hiểu về nhịp điệu, quãng, gam trưởng/thứ, hợp âm — nền tảng để học bất kỳ nhạc cụ nào nhanh hơn gấp đôi.', href: '/blog?chu-de=ly-thuyet', tag: '🎼 Lý thuyết' },
                { title: 'Tips luyện tập nhạc hiệu quả', desc: 'Cách tập đúng để tiến bộ nhanh: dùng metronome, chia nhỏ đoạn khó, lịch tập khoa học và cách theo dõi tiến độ.', href: '/blog?chu-de=tips', tag: '💡 Tips' },
                { title: 'Review nhạc cụ cho người mới', desc: 'Đánh giá chi tiết các dòng đàn guitar, piano, trống phổ biến — giúp bạn chọn đúng nhạc cụ phù hợp ngân sách.', href: '/blog?chu-de=review', tag: '🛒 Review' },
              ].map((item) => (
                <Link key={item.title} href={item.href}
                  className="group rounded-xl border bg-white p-5 shadow-sm transition hover:border-wine-300 hover:shadow-md">
                  <span className="mb-3 inline-block rounded-full bg-wine-50 px-3 py-1 text-xs font-medium text-wine-600">{item.tag}</span>
                  <h3 className="mb-2 font-semibold text-gray-800 group-hover:text-wine-600">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{item.desc}</p>
                  <p className="mt-3 text-sm font-medium text-wine-600 group-hover:underline">Khám phá →</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER / CTA ── */}
        <section className="bg-noel-love relative overflow-hidden py-16 text-center text-white">
          <HeroSparkles />
          <div className="relative z-10 mx-auto max-w-xl px-4">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1 text-xs font-semibold text-gold-200">
              💌♥ Nhận cảm hứng âm nhạc mỗi tuần
            </span>
            <h2 className="text-2xl font-bold sm:text-3xl">Không bỏ lỡ bài viết nào</h2>
            <p className="mt-2 text-rose-100">Đăng ký tài khoản MixiGui để nhận thông báo bài viết mới, tab nhạc mùa lễ hội và khóa học ưu đãi.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link href="/dang-ky" className="rounded-full bg-white px-8 py-3 font-bold text-wine-700 shadow-lg ring-2 ring-gold-300/50 hover:bg-wine-50 transition">
                💝 Đăng ký miễn phí
              </Link>
              <Link href="/khoa-hoc" className="rounded-full border-2 border-white/85 bg-white/10 px-8 py-3 font-semibold text-white hover:bg-white/20 transition">
                Xem khóa học
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
