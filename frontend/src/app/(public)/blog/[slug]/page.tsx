'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type Post = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  thumbnail_url: string | null
  published_at: string
  is_published: boolean
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function readingTime(content: string | null) {
  if (!content) return '3'
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200)).toString()
}

export default function BlogDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const [post, setPost] = useState<Post | null>(null)
  const [related, setRelated] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, content, thumbnail_url, published_at, is_published')
        .eq('slug', slug)
        .single()
      setPost(data)

      if (data) {
        const { data: rel } = await supabase
          .from('blog_posts')
          .select('id, title, slug, excerpt, thumbnail_url, published_at')
          .eq('is_published', true)
          .neq('slug', slug)
          .order('published_at', { ascending: false })
          .limit(3)
        setRelated(rel ?? [])
      }
      setLoading(false)
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-600 border-t-transparent" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <div className="text-6xl">😕</div>
        <h1 className="text-2xl font-bold text-gray-800">Không tìm thấy bài viết</h1>
        <Link href="/blog" className="rounded-full bg-purple-600 px-6 py-2 text-sm font-semibold text-white hover:bg-purple-700">
          Xem tất cả bài viết
        </Link>
      </div>
    )
  }

  return (
    <main>
      {/* ── BREADCRUMB ── */}
      <div className="border-b bg-gray-50 py-3">
        <div className="mx-auto max-w-5xl px-4">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-purple-600">Trang chủ</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-purple-600">Blog</Link>
            <span className="mx-2">/</span>
            <span className="line-clamp-1 text-gray-800">{post.title}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-3">

          {/* ── NỘI DUNG BÀI VIẾT ── */}
          <article className="lg:col-span-2">

            {/* Meta */}
            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">Blog Âm Nhạc</span>
              <span>📅 {formatDate(post.published_at)}</span>
              <span>⏱ {readingTime(post.content)} phút đọc</span>
            </div>

            {/* Tiêu đề */}
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="mb-6 text-lg leading-relaxed text-gray-500 border-l-4 border-purple-400 pl-4 italic">
                {post.excerpt}
              </p>
            )}

            {/* Thumbnail */}
            {post.thumbnail_url && (
              <div className="mb-8 overflow-hidden rounded-2xl">
                <img
                  src={post.thumbnail_url}
                  alt={post.title}
                  className="h-72 w-full object-cover sm:h-96"
                />
              </div>
            )}

            {/* Nội dung */}
            {post.content ? (
              <div
                className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-purple-600 prose-strong:text-gray-800 prose-li:text-gray-600"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              /* Nội dung mẫu nếu DB chưa có content */
              <div className="space-y-5 text-gray-600 leading-relaxed">
                <p>
                  Đây là một trong những câu hỏi phổ biến nhất mà học viên mới thường hỏi khi bắt đầu hành trình âm nhạc. Cả guitar và ukulele đều là những nhạc cụ tuyệt vời cho người mới bắt đầu, nhưng mỗi nhạc cụ có những đặc điểm và ưu nhược điểm riêng mà bạn cần cân nhắc trước khi quyết định.
                </p>
                <h2 className="text-2xl font-bold text-gray-900">Guitar Acoustic — Nhạc cụ đa năng</h2>
                <p>
                  Guitar acoustic là lựa chọn phổ biến nhất cho người mới học nhạc tại Việt Nam. Với 6 dây và âm thanh phong phú, guitar phù hợp với hầu hết các thể loại nhạc từ pop, ballad, dân ca đến rock nhẹ. Tuy nhiên, guitar cũng có một số thách thức ban đầu:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cần rèn luyện độ cứng ngón tay (callus) trong 2–4 tuần đầu</li>
                  <li>Hợp âm F barre là "ải" đầu tiên nhiều người bỏ cuộc</li>
                  <li>Kích thước to hơn, ít tiện lợi khi mang đi</li>
                  <li>Chi phí ban đầu từ 1.5–3 triệu cho đàn chất lượng tốt</li>
                </ul>
                <h2 className="text-2xl font-bold text-gray-900">Ukulele — Nhỏ gọn, dễ học, vui nhộn</h2>
                <p>
                  Ukulele chỉ có 4 dây với dây nylon mềm, nên không đau tay khi mới học. Nhạc cụ này có kích thước nhỏ gọn, dễ mang theo và học nhanh hơn guitar đáng kể. Chỉ sau 1–2 tuần, bạn đã có thể chơi được các bài nhạc đơn giản hoàn chỉnh.
                </p>
                <p>
                  Tuy nhiên, ukulele có âm thanh đặc trưng của nhạc Hawaii và nhạc nhẹ — nếu bạn muốn chơi rock, metal hay nhạc phức tạp, ukulele sẽ bị giới hạn hơn guitar.
                </p>
                <h2 className="text-2xl font-bold text-gray-900">Vậy nên học cái nào?</h2>
                <p>
                  <strong>Chọn Ukulele nếu:</strong> Bạn muốn học nhanh, có kết quả sớm để duy trì động lực, thích nhạc nhẹ/indie/acoustic, ngân sách hạn chế (từ 500k), hoặc mua cho trẻ em lần đầu học nhạc.
                </p>
                <p>
                  <strong>Chọn Guitar nếu:</strong> Bạn muốn học nhạc cụ đa năng lâu dài, thích pop/ballad/rock, muốn đệm hát nhiều bài nhạc Việt và quốc tế, hoặc có kế hoạch học nhạc nghiêm túc.
                </p>
                <div className="rounded-xl bg-purple-50 p-5">
                  <p className="font-semibold text-purple-800">💡 Lời khuyên từ MixiGui:</p>
                  <p className="mt-2 text-purple-700">
                    Nếu bạn thực sự chưa biết chọn gì, hãy thử ukulele trước. Chi phí thấp, học nhanh có kết quả, và nếu bạn yêu thích âm nhạc, việc chuyển sang guitar sau đó sẽ dễ dàng hơn nhiều vì đã có nền tảng nhịp điệu và hợp âm cơ bản.
                  </p>
                </div>
              </div>
            )}

            {/* Tags & Share */}
            <div className="mt-10 border-t pt-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {['Âm nhạc', 'Guitar', 'Ukulele', 'Người mới bắt đầu'].map((tag) => (
                    <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-purple-100 hover:text-purple-700 cursor-pointer transition">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>Chia sẻ:</span>
                  {['📘 Facebook', '💬 Zalo', '🔗 Copy'].map((s) => (
                    <button key={s} className="rounded-full bg-gray-100 px-3 py-1 text-xs hover:bg-gray-200 transition">{s}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tác giả */}
            <div className="mt-8 flex items-center gap-4 rounded-2xl border bg-gray-50 p-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-purple-100 text-3xl">🎸</div>
              <div>
                <p className="font-bold text-gray-800">Đội ngũ giảng viên MixiGui</p>
                <p className="text-xs text-gray-500 mt-0.5">Chuyên gia âm nhạc với 10+ năm kinh nghiệm giảng dạy và biểu diễn chuyên nghiệp</p>
                <Link href="/ve-chung-toi" className="mt-1 inline-block text-xs font-medium text-purple-600 hover:underline">Xem thêm về chúng tôi →</Link>
              </div>
            </div>
          </article>

          {/* ── SIDEBAR ── */}
          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">

            {/* Bài viết mới nhất */}
            {related.length > 0 && (
              <div className="rounded-2xl border bg-white p-5 shadow-sm">
                <h3 className="mb-4 font-bold text-gray-900">Bài viết mới nhất</h3>
                <div className="space-y-4">
                  {related.map((p) => (
                    <Link key={p.id} href={`/blog/${p.slug}`} className="group flex gap-3">
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-purple-50">
                        {p.thumbnail_url
                          ? <img src={p.thumbnail_url} alt={p.title} className="h-full w-full object-cover" loading="lazy" />
                          : <div className="flex h-full items-center justify-center text-xl">📝</div>
                        }
                      </div>
                      <div>
                        <p className="line-clamp-2 text-sm font-medium text-gray-800 group-hover:text-purple-600 leading-snug">{p.title}</p>
                        <p className="mt-1 text-xs text-gray-400">{formatDate(p.published_at)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Chủ đề */}
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <h3 className="mb-4 font-bold text-gray-900">Chủ đề</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: '🎸', label: 'Guitar', slug: 'guitar' },
                  { icon: '🎹', label: 'Piano', slug: 'piano' },
                  { icon: '🥁', label: 'Trống', slug: 'trong' },
                  { icon: '🎵', label: 'Ukulele', slug: 'ukulele' },
                  { icon: '🎼', label: 'Lý thuyết', slug: 'ly-thuyet' },
                  { icon: '💡', label: 'Tips', slug: 'tips' },
                  { icon: '🛒', label: 'Review', slug: 'review' },
                ].map((t) => (
                  <Link key={t.slug} href={`/blog?chu-de=${t.slug}`}
                    className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium text-gray-600 hover:border-purple-400 hover:text-purple-600 transition">
                    {t.icon} {t.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA đăng ký */}
            <div className="rounded-2xl bg-purple-600 p-5 text-white text-center">
              <div className="mb-2 text-3xl">🎓</div>
              <h3 className="font-bold">Muốn học nhạc thực sự?</h3>
              <p className="mt-2 text-xs text-purple-100 leading-relaxed">
                Tham gia khóa học của MixiGui — học từ giảng viên chuyên nghiệp, có lộ trình bài bản.
              </p>
              <Link href="/khoa-hoc"
                className="mt-4 inline-block rounded-full bg-white px-5 py-2 text-sm font-semibold text-purple-700 hover:bg-purple-50 transition">
                Xem khóa học →
              </Link>
            </div>
          </aside>
        </div>
      </div>

      {/* ── BÀI VIẾT LIÊN QUAN ── */}
      {related.length > 0 && (
        <section className="border-t bg-gray-50 py-12">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Bài viết liên quan</h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {related.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`}
                  className="group overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md">
                  <div className="h-44 overflow-hidden bg-purple-50">
                    {p.thumbnail_url
                      ? <img src={p.thumbnail_url} alt={p.title} className="h-full w-full object-cover transition group-hover:scale-105" loading="lazy" />
                      : <div className="flex h-full items-center justify-center text-5xl">📝</div>
                    }
                  </div>
                  <div className="p-4">
                    <h3 className="line-clamp-2 font-semibold text-gray-800 group-hover:text-purple-600">{p.title}</h3>
                    {p.excerpt && <p className="mt-2 line-clamp-2 text-sm text-gray-500">{p.excerpt}</p>}
                    <p className="mt-3 text-xs text-gray-400">{formatDate(p.published_at)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
