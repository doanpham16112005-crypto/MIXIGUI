'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type Course = {
  id: string
  title: string
  slug: string
  description: string | null
  thumbnail_url: string | null
  price: number
  discount_price: number | null
  level: string | null
  is_published: boolean
}

type RelatedCourse = {
  id: string
  title: string
  slug: string
  thumbnail_url: string | null
  price: number
  discount_price: number | null
  level: string | null
}

const levelLabel: Record<string, string> = {
  BEGINNER: 'Cơ bản',
  INTERMEDIATE: 'Trung cấp',
  ADVANCED: 'Nâng cao',
}
const levelColor: Record<string, string> = {
  BEGINNER: 'bg-green-100 text-green-700',
  INTERMEDIATE: 'bg-blue-100 text-blue-700',
  ADVANCED: 'bg-purple-100 text-purple-700',
}

// Nội dung tĩnh bổ sung cho trang chi tiết
const WHAT_YOU_LEARN = [
  'Kỹ thuật cơ bản đến nâng cao theo lộ trình bài bản',
  'Đọc tab nhạc và sheet music chuyên nghiệp',
  'Chơi được các bài nhạc yêu thích hoàn chỉnh',
  'Kỹ thuật luyện ngón tay linh hoạt và chính xác',
  'Hiểu lý thuyết âm nhạc ứng dụng thực tế',
  'Tự học bài mới mà không cần giảng viên hỗ trợ',
  'Xây dựng thói quen luyện tập hiệu quả mỗi ngày',
  'Biểu diễn tự tin trước người thân và bạn bè',
]

const CURRICULUM = [
  { section: 'Phần 1: Làm quen nhạc cụ', lessons: ['Giới thiệu khóa học và cách học hiệu quả', 'Tư thế ngồi, cầm đàn đúng kỹ thuật', 'Làm quen với các bộ phận của nhạc cụ', 'Bài tập ngón tay cơ bản đầu tiên'] },
  { section: 'Phần 2: Kỹ thuật nền tảng', lessons: ['Các nốt nhạc cơ bản và cách đọc', 'Nhịp điệu và cách đếm nhịp chuẩn', 'Hợp âm cơ bản và cách bấm', 'Chuyển hợp âm mượt mà không bị ngắt'] },
  { section: 'Phần 3: Bài nhạc thực hành', lessons: ['Bài nhạc đơn giản đầu tiên', 'Bài tập kết hợp giai điệu và hợp âm', 'Học 3–5 bài nhạc phổ biến hoàn chỉnh', 'Kỹ thuật nâng cao theo chuyên ngành'] },
  { section: 'Phần 4: Nâng cao & Biểu diễn', lessons: ['Kỹ thuật nâng cao và tốc độ', 'Cách tự học bài mới hiệu quả', 'Tips luyện tập thông minh tiết kiệm thời gian', 'Bài thi tốt nghiệp và nhận chứng chỉ'] },
]

const REVIEWS = [
  { name: 'Nguyễn Minh Tuấn', rating: 5, date: '15/02/2026', text: 'Khóa học rất hay, giảng viên dạy rõ ràng và nhiệt tình. Sau 2 tháng tôi đã chơi được nhiều bài nhạc mà trước đây tưởng không thể học được.' },
  { name: 'Trần Thu Hà', rating: 5, date: '03/01/2026', text: 'Nội dung bài giảng rất bài bản, từ cơ bản đến nâng cao. Tôi đặc biệt thích phần bài tập thực hành có backing track đi kèm, học rất hiệu quả.' },
  { name: 'Lê Hoàng Phúc', rating: 4, date: '20/12/2025', text: 'Khóa học tốt, video HD rõ nét. Đặt câu hỏi cho giảng viên được phản hồi nhanh trong ngày. Chỉ mong có thêm nhiều bài nhạc Việt hơn.' },
]

export default function KhoaHocDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const [course, setCourse] = useState<Course | null>(null)
  const [related, setRelated] = useState<RelatedCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [enrolled, setEnrolled] = useState(false)
  const [openSection, setOpenSection] = useState<number | null>(0)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('courses')
        .select('id, title, slug, description, thumbnail_url, price, discount_price, level, is_published')
        .eq('slug', slug)
        .single()
      setCourse(data)

      if (data?.level) {
        const { data: rel } = await supabase
          .from('courses')
          .select('id, title, slug, thumbnail_url, price, discount_price, level')
          .eq('is_published', true)
          .eq('level', data.level)
          .neq('slug', slug)
          .limit(4)
        setRelated(rel ?? [])
      }
      setLoading(false)
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    )
  }

  if (!course) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <div className="text-6xl">😕</div>
        <h1 className="text-2xl font-bold text-gray-800">Không tìm thấy khóa học</h1>
        <Link href="/khoa-hoc" className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700">
          Xem tất cả khóa học
        </Link>
      </div>
    )
  }

  const discountPct = course.discount_price && course.discount_price < course.price
    ? Math.round((1 - course.discount_price / course.price) * 100)
    : null

  return (
    <main>
      {/* ── BREADCRUMB ── */}
      <div className="border-b bg-gray-50 py-3">
        <div className="mx-auto max-w-7xl px-4">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
            <span className="mx-2">/</span>
            <Link href="/khoa-hoc" className="hover:text-blue-600">Khóa học</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{course.title}</span>
          </nav>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              {course.level && (
                <span className={`mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold ${levelColor[course.level] ?? 'bg-gray-100 text-gray-600'}`}>
                  {levelLabel[course.level] ?? course.level}
                </span>
              )}
              <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">{course.title}</h1>
              {course.description && (
                <p className="mt-4 text-lg text-blue-100 leading-relaxed">{course.description}</p>
              )}
              <div className="mt-5 flex flex-wrap gap-4 text-sm text-blue-100">
                {['⏱ Học trọn đời', '📱 Mọi thiết bị', '🎓 Chứng chỉ hoàn thành', '💬 Hỏi đáp giảng viên'].map((b) => (
                  <span key={b} className="flex items-center gap-1">{b}</span>
                ))}
              </div>
              {/* Rating */}
              <div className="mt-4 flex items-center gap-2">
                <div className="flex text-yellow-400">{'★'.repeat(5)}</div>
                <span className="text-sm text-blue-100">4.9/5 ({REVIEWS.length} đánh giá)</span>
              </div>
            </div>

            {/* Thumbnail */}
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              {course.thumbnail_url ? (
                <img src={course.thumbnail_url} alt={course.title} className="h-64 w-full object-cover" />
              ) : (
                <div className="flex h-64 items-center justify-center bg-blue-600/50 text-8xl">🎸</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── NỘI DUNG CHÍNH + SIDEBAR ── */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-3">

            {/* Nội dung trái */}
            <div className="lg:col-span-2 space-y-10">

              {/* Bạn sẽ học được gì */}
              <div className="rounded-2xl border p-6">
                <h2 className="mb-5 text-xl font-bold text-gray-900">Bạn sẽ học được gì?</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {WHAT_YOU_LEARN.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-0.5 shrink-0 text-green-500 font-bold">✓</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Chương trình học */}
              <div>
                <h2 className="mb-5 text-xl font-bold text-gray-900">Chương trình học</h2>
                <div className="space-y-2">
                  {CURRICULUM.map((sec, i) => (
                    <div key={i} className="overflow-hidden rounded-xl border">
                      <button
                        onClick={() => setOpenSection(openSection === i ? null : i)}
                        className="flex w-full items-center justify-between bg-gray-50 px-5 py-4 text-left font-semibold text-gray-800 hover:bg-gray-100 transition"
                      >
                        <span>{sec.section}</span>
                        <span className="flex items-center gap-2 text-sm font-normal text-gray-500">
                          <span>{sec.lessons.length} bài</span>
                          <span className={`transition-transform ${openSection === i ? 'rotate-180' : ''}`}>▾</span>
                        </span>
                      </button>
                      {openSection === i && (
                        <ul className="divide-y bg-white">
                          {sec.lessons.map((lesson, j) => (
                            <li key={j} className="flex items-center gap-3 px-5 py-3 text-sm text-gray-600">
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-600">
                                {j + 1}
                              </span>
                              <span>▶</span>
                              {lesson}
                              {j === 0 && (
                                <span className="ml-auto rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">Xem thử</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Yêu cầu */}
              <div className="rounded-2xl border p-6">
                <h2 className="mb-4 text-xl font-bold text-gray-900">Yêu cầu đầu vào</h2>
                <ul className="space-y-2">
                  {[
                    'Không yêu cầu kiến thức âm nhạc trước, phù hợp cho người mới bắt đầu hoàn toàn',
                    'Cần có nhạc cụ để luyện tập (có thể mua tại MixiGui với ưu đãi dành cho học viên)',
                    'Máy tính, điện thoại hoặc tablet có kết nối Internet',
                    'Cam kết luyện tập ít nhất 20–30 phút mỗi ngày để đạt kết quả tốt nhất',
                  ].map((req) => (
                    <li key={req} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-0.5 shrink-0 text-blue-500">•</span>{req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Đánh giá */}
              <div>
                <h2 className="mb-5 text-xl font-bold text-gray-900">Đánh giá từ học viên</h2>
                <div className="mb-6 flex items-center gap-6 rounded-2xl bg-blue-50 p-6">
                  <div className="text-center">
                    <p className="text-5xl font-extrabold text-blue-600">4.9</p>
                    <div className="mt-1 flex justify-center text-yellow-400 text-xl">{'★'.repeat(5)}</div>
                    <p className="mt-1 text-xs text-gray-500">Đánh giá khóa học</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{star}★</span>
                        <div className="flex-1 h-2 rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-yellow-400"
                            style={{ width: star === 5 ? '85%' : star === 4 ? '12%' : '3%' }}
                          />
                        </div>
                        <span>{star === 5 ? '85%' : star === 4 ? '12%' : '3%'}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  {REVIEWS.map((r) => (
                    <div key={r.name} className="rounded-xl border bg-white p-5">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                            {r.name[0]}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">{r.name}</p>
                            <p className="text-xs text-gray-400">{r.date}</p>
                          </div>
                        </div>
                        <div className="text-yellow-400 text-sm">{'★'.repeat(r.rating)}</div>
                      </div>
                      <p className="text-sm leading-relaxed text-gray-600">{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar phải — sticky */}
            <div className="lg:sticky lg:top-6 lg:self-start">
              <div className="rounded-2xl border bg-white p-6 shadow-lg">
                {/* Giá */}
                <div className="mb-4">
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-extrabold text-blue-600">
                      {course.price === 0 ? 'Miễn phí' : Number(course.price).toLocaleString('vi-VN') + '₫'}
                    </span>
                    {course.discount_price && course.discount_price < course.price && (
                      <span className="mb-1 text-base text-gray-400 line-through">
                        {Number(course.discount_price).toLocaleString('vi-VN')}₫
                      </span>
                    )}
                  </div>
                  {discountPct && (
                    <p className="mt-1 text-sm font-semibold text-red-500">⚡ Giảm {discountPct}% — Ưu đãi có hạn!</p>
                  )}
                </div>

                {/* Nút đăng ký */}
                <button
                  onClick={() => setEnrolled(true)}
                  className={`w-full rounded-full py-3.5 font-bold text-white shadow transition text-base ${
                    enrolled ? 'bg-green-500' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {enrolled ? '✓ Đã đăng ký thành công!' : course.price === 0 ? 'Học miễn phí ngay' : 'Đăng ký khóa học'}
                </button>
                <button className="mt-3 w-full rounded-full border-2 border-blue-600 py-3 font-semibold text-blue-600 transition hover:bg-blue-50">
                  Xem thử miễn phí
                </button>

                <p className="mt-3 text-center text-xs text-gray-400">Hoàn tiền 100% trong 7 ngày nếu không hài lòng</p>

                {/* Bao gồm */}
                <div className="mt-5 border-t pt-5">
                  <p className="mb-3 font-semibold text-gray-800 text-sm">Khóa học bao gồm:</p>
                  <ul className="space-y-2.5 text-sm text-gray-600">
                    {[
                      ['🎬', `${CURRICULUM.reduce((a, s) => a + s.lessons.length, 0)} bài học video HD`],
                      ['📄', 'Tài liệu PDF và tab nhạc'],
                      ['🎵', 'Backing track luyện tập'],
                      ['💬', 'Hỏi đáp với giảng viên'],
                      ['⏱', 'Truy cập trọn đời'],
                      ['📱', 'Học trên mọi thiết bị'],
                      ['🏅', 'Chứng chỉ hoàn thành'],
                    ].map(([icon, text]) => (
                      <li key={text} className="flex items-center gap-2">
                        <span>{icon}</span><span>{text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Chia sẻ */}
                <div className="mt-5 border-t pt-4 text-center">
                  <p className="mb-2 text-xs text-gray-400">Chia sẻ khóa học</p>
                  <div className="flex justify-center gap-2">
                    {['📘 Facebook', '💬 Zalo', '🔗 Copy link'].map((s) => (
                      <button key={s} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 hover:bg-gray-200 transition">{s}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Giảng viên */}
              <div className="mt-4 rounded-2xl border bg-white p-5 shadow-sm">
                <p className="mb-3 font-semibold text-gray-800">Giảng viên</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl">🎸</div>
                  <div>
                    <p className="font-semibold text-gray-800">Giảng viên MixiGui</p>
                    <p className="text-xs text-gray-500">Chuyên gia âm nhạc • 10+ năm kinh nghiệm</p>
                    <p className="text-xs text-blue-600 mt-0.5">⭐ 4.9 • 2.400+ học viên</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KHÓA HỌC LIÊN QUAN ── */}
      {related.length > 0 && (
        <section className="border-t bg-gray-50 py-12">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Khóa học cùng cấp độ</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((c) => (
                <Link key={c.id} href={`/khoa-hoc/${c.slug}`}
                  className="group overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md">
                  <div className="relative h-40 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200">
                    {c.thumbnail_url
                      ? <img src={c.thumbnail_url} alt={c.title} className="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" />
                      : <div className="flex h-full items-center justify-center text-5xl">🎸</div>
                    }
                    {c.level && (
                      <span className={`absolute left-2 top-2 rounded px-2 py-0.5 text-xs font-medium ${levelColor[c.level] ?? ''}`}>
                        {levelLabel[c.level] ?? c.level}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="line-clamp-2 text-sm font-semibold text-gray-800 group-hover:text-blue-600">{c.title}</h3>
                    <p className="mt-2 font-bold text-blue-600">
                      {c.price === 0 ? 'Miễn phí' : Number(c.price).toLocaleString('vi-VN') + '₫'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="bg-blue-600 py-10 text-center text-white">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="text-xl font-bold">Sẵn sàng bắt đầu hành trình âm nhạc?</h2>
          <p className="mt-2 text-sm text-blue-100">Tham gia ngay — hoàn tiền 100% nếu không hài lòng trong 7 ngày</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setEnrolled(true)}
              className="rounded-full bg-white px-8 py-3 font-bold text-blue-700 shadow transition hover:bg-blue-50"
            >
              {enrolled ? '✓ Đã đăng ký!' : 'Đăng ký ngay'}
            </button>
            <Link href="/lien-he" className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white/10">
              Tư vấn miễn phí
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
