import Link from 'next/link'
import type { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Khóa Học Nhạc Online | Guitar, Piano, Trống - MixiGui',
  description:
    'Hơn 50+ khóa học nhạc online chất lượng cao tại MixiGui: học guitar, piano, trống, ukulele từ cơ bản đến nâng cao. Giảng viên chuyên nghiệp, học mọi lúc mọi nơi, học phí từ 399.000₫.',
  keywords: ['khóa học nhạc online', 'học guitar online', 'học piano online', 'học trống', 'học ukulele', 'khóa học âm nhạc'],
  alternates: { canonical: `${siteConfig.url}/khoa-hoc` },
  openGraph: {
    title: 'Khóa Học Nhạc Online | MixiGui',
    description: '50+ khóa học guitar, piano, trống từ giảng viên chuyên nghiệp. Học mọi lúc mọi nơi.',
    url: `${siteConfig.url}/khoa-hoc`,
  },
}

export const revalidate = 60

const COURSE_FAQS = [
  { q: 'Khóa học có thời hạn truy cập không?', a: 'Không. Sau khi mua, bạn được truy cập trọn đời vào khóa học, bao gồm tất cả cập nhật nội dung trong tương lai.' },
  { q: 'Tôi có thể học trên điện thoại không?', a: 'Có. Nền tảng MixiGui hỗ trợ đầy đủ trên mọi thiết bị: máy tính, tablet và điện thoại thông minh iOS/Android.' },
  { q: 'Nếu không hài lòng có được hoàn tiền không?', a: 'Có. Chúng tôi cam kết hoàn tiền 100% trong vòng 7 ngày nếu bạn không hài lòng với khóa học, không cần giải thích lý do.' },
  { q: 'Có được hỏi đáp với giảng viên không?', a: 'Có. Mỗi khóa học đều có phần hỏi đáp trực tiếp với giảng viên. Bạn có thể đặt câu hỏi và nhận phản hồi trong vòng 24-48 giờ.' },
]

const INSTRUMENTS = [
  { icon: '🎸', name: 'Guitar Acoustic', desc: 'Phù hợp nhạc pop, ballad, dân ca' },
  { icon: '🎸', name: 'Guitar Fingerstyle', desc: 'Kỹ thuật đệm nhạc nâng cao' },
  { icon: '🎹', name: 'Piano / Keyboard', desc: 'Nền tảng lý thuyết âm nhạc vững chắc' },
  { icon: '🥁', name: 'Trống / Drums', desc: 'Nhịp điệu, kỹ thuật đánh tay chân' },
  { icon: '🎵', name: 'Ukulele', desc: 'Nhạc cụ nhỏ gọn, dễ học, dễ mang' },
  { icon: '🎻', name: 'Bass Guitar', desc: 'Nền tảng ban nhạc, groove & slap' },
]

async function getCourses() {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('courses')
    .select('id, title, slug, thumbnail_url, price, discount_price, level, is_published')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
  if (error) { console.error('courses error:', error); return [] }
  return data ?? []
}

const levelLabel: Record<string, string> = {
  BEGINNER: 'Cơ bản',
  INTERMEDIATE: 'Trung cấp',
  ADVANCED: 'Nâng cao',
}
const levelColor: Record<string, string> = {
  BEGINNER: 'bg-green-50 text-green-700',
  INTERMEDIATE: 'bg-blue-50 text-blue-700',
  ADVANCED: 'bg-purple-50 text-purple-700',
}

export default async function KhoaHocPage() {
  const courses = await getCourses()
  const faqSchema = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: COURSE_FAQS.map((f) => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main>
        {/* ── HERO ── */}
        <section className="border-b bg-gradient-to-r from-blue-700 to-blue-500 py-14 text-white">
          <div className="mx-auto max-w-7xl px-4">
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-blue-200">
              <Link href="/" className="hover:text-white">Trang chủ</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Khóa học</span>
            </nav>
            <h1 className="text-4xl font-extrabold">Khóa Học Nhạc Online</h1>
            <p className="mt-3 max-w-2xl text-lg text-blue-100">
              Học guitar, piano, trống và nhiều nhạc cụ khác từ giảng viên chuyên nghiệp — mọi cấp độ, mọi lứa tuổi, học theo tốc độ của bạn.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm">
              {['🎓 50+ khóa học', '⏱ Học trọn đời', '📱 Mọi thiết bị', '💰 Từ 399.000₫', '✅ Hoàn tiền 7 ngày'].map((b) => (
                <span key={b} className="rounded-full bg-white/20 px-3 py-1">{b}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── DANH MỤC NHẠC CỤ ── */}
        <section aria-labelledby="instruments-heading" className="bg-gray-50 py-12">
          <div className="mx-auto max-w-7xl px-4">
            <h2 id="instruments-heading" className="mb-6 text-xl font-bold text-gray-800">Chọn nhạc cụ bạn muốn học</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {INSTRUMENTS.map((ins) => (
                <button key={ins.name} className="group rounded-xl border bg-white p-4 text-center shadow-sm transition hover:border-blue-400 hover:shadow-md">
                  <div className="mb-2 text-3xl">{ins.icon}</div>
                  <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-600">{ins.name}</p>
                  <p className="mt-0.5 text-xs text-gray-400">{ins.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── DANH SÁCH KHÓA HỌC ── */}
        <section aria-labelledby="courses-list-heading" className="py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-6 flex items-center justify-between">
              <h2 id="courses-list-heading" className="text-2xl font-bold text-gray-900">
                Tất cả khóa học
                <span className="ml-2 text-base font-normal text-gray-400">({courses.length} khóa học)</span>
              </h2>
            </div>

            {courses.length === 0 ? (
              <div className="py-20 text-center text-gray-400">Chưa có khóa học nào</div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {courses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/khoa-hoc/${course.slug}`}
                    className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
                  >
                    <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
                      {course.thumbnail_url ? (
                        <img src={course.thumbnail_url} alt={`Khóa học ${course.title}`} className="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-5xl">🎸</div>
                      )}
                      {course.level && (
                        <span className={`absolute left-2 top-2 rounded px-2 py-0.5 text-xs font-medium ${levelColor[course.level] ?? 'bg-gray-100 text-gray-600'}`}>
                          {levelLabel[course.level] ?? course.level}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="mb-3 line-clamp-2 font-semibold text-gray-800 group-hover:text-blue-600">
                        {course.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-blue-600">
                          {course.price === 0 ? 'Miễn phí' : Number(course.price).toLocaleString('vi-VN') + '₫'}
                        </span>
                        {course.discount_price && course.discount_price < course.price && (
                          <span className="text-xs text-gray-400 line-through">
                            {Number(course.discount_price).toLocaleString('vi-VN')}₫
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── TẠI SAO HỌC TẠI MIXIGUI ── */}
        <section aria-labelledby="why-heading" className="bg-blue-50 py-14">
          <div className="mx-auto max-w-7xl px-4">
            <h2 id="why-heading" className="mb-3 text-2xl font-bold text-gray-900">Tại sao nên học nhạc online tại MixiGui?</h2>
            <p className="mb-8 max-w-3xl text-gray-600">
              Học nhạc online đang ngày càng phổ biến nhờ sự tiện lợi và hiệu quả. Tại MixiGui, chúng tôi không chỉ cung cấp video bài giảng mà còn xây dựng một <strong>lộ trình học hoàn chỉnh</strong> — từ lý thuyết cơ bản đến bài tập thực hành và phản hồi từ giảng viên.
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: '🎬', title: 'Video HD chất lượng cao', desc: 'Bài giảng được quay đa góc độ, âm thanh rõ ràng, có thể tua lại và xem chậm từng thao tác ngón tay.' },
                { icon: '📋', title: 'Lộ trình học bài bản', desc: 'Mỗi khóa học đều có lộ trình từng bước, từ kỹ thuật cơ bản đến bài nhạc hoàn chỉnh. Không lo bị lạc hướng.' },
                { icon: '🎯', title: 'Bài tập thực hành', desc: 'Đi kèm bài tập ngón tay, backing track, file PDF tab nhạc để bạn tự luyện tập hiệu quả tại nhà.' },
                { icon: '💬', title: 'Hỏi đáp với giảng viên', desc: 'Đặt câu hỏi bất cứ lúc nào, giảng viên sẽ phản hồi trong vòng 24h để giải đáp thắc mắc của bạn.' },
                { icon: '📱', title: 'Học mọi lúc mọi nơi', desc: 'Truy cập khóa học trên máy tính, điện thoại, tablet. Không cần kết nối internet liên tục nếu tải bài về.' },
                { icon: '🏅', title: 'Chứng chỉ hoàn thành', desc: 'Nhận chứng chỉ hoàn thành khóa học sau khi đạt đủ điều kiện — có thể chia sẻ lên LinkedIn hay CV.' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 rounded-xl bg-white p-5 shadow-sm">
                  <span className="shrink-0 text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section aria-labelledby="faq-heading" className="py-14">
          <div className="mx-auto max-w-3xl px-4">
            <h2 id="faq-heading" className="mb-8 text-2xl font-bold text-gray-900">Câu hỏi thường gặp về khóa học</h2>
            <div className="space-y-3">
              {COURSE_FAQS.map((faq, i) => (
                <details key={i} className="group rounded-xl border bg-white p-5 shadow-sm open:shadow-md">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-gray-800">
                    <span>{faq.q}</span>
                    <span className="ml-4 shrink-0 text-blue-500 transition group-open:rotate-45">＋</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16 text-center text-white" style={{ background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)' }}>
          <div className="mx-auto max-w-xl px-4">
            <h2 className="text-2xl font-bold">Chưa biết bắt đầu từ đâu?</h2>
            <p className="mt-2 text-blue-100">Làm bài kiểm tra trình độ miễn phí để nhận lộ trình học phù hợp với bạn.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link href="/dang-ky" className="rounded-full bg-white px-8 py-3 font-semibold text-blue-700 shadow hover:bg-blue-50 transition">
                Đăng ký học miễn phí
              </Link>
              <Link href="/lien-he" className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white hover:bg-white/10 transition">
                Tư vấn chọn khóa học
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
