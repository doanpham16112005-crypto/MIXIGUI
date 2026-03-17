import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Về Chúng Tôi | MixiGui - Nền Tảng Học Nhạc & Nhạc Cụ Chính Hãng',
  description:
    'MixiGui được thành lập với sứ mệnh giúp mọi người Việt Nam tiếp cận âm nhạc dễ dàng. Đội ngũ giảng viên 10+ năm kinh nghiệm, nhạc cụ chính hãng Yamaha, Roland, Casio.',
  alternates: { canonical: `${siteConfig.url}/ve-chung-toi` },
  openGraph: {
    title: 'Về Chúng Tôi | MixiGui',
    description: 'Câu chuyện, sứ mệnh và đội ngũ đằng sau nền tảng học nhạc MixiGui.',
    url: `${siteConfig.url}/ve-chung-toi`,
  },
}

const STATS = [
  { value: '10+', label: 'Năm kinh nghiệm' },
  { value: '500+', label: 'Học viên tin tưởng' },
  { value: '50+', label: 'Khóa học chất lượng' },
  { value: '100+', label: 'Nhạc cụ chính hãng' },
]

const TEAM = [
  {
    name: 'Nguyễn Minh Tuấn',
    role: 'Giảng viên Guitar',
    avatar: '🎸',
    bio: 'Hơn 12 năm biểu diễn và giảng dạy guitar acoustic & fingerstyle. Từng tham gia các chương trình âm nhạc lớn toàn quốc.',
  },
  {
    name: 'Trần Thị Lan',
    role: 'Giảng viên Piano',
    avatar: '🎹',
    bio: 'Tốt nghiệp Nhạc viện Hà Nội chuyên ngành Piano cổ điển. 10 năm kinh nghiệm giảng dạy từ cơ bản đến nâng cao.',
  },
  {
    name: 'Lê Hoàng Nam',
    role: 'Giảng viên Trống',
    avatar: '🥁',
    bio: 'Tay trống chuyên nghiệp với kinh nghiệm biểu diễn tại các sân khấu lớn. Phương pháp dạy trực quan, dễ tiếp thu.',
  },
]

const MILESTONES = [
  { year: '2018', event: 'MixiGui được thành lập tại Hà Nội với 3 giảng viên đầu tiên.' },
  { year: '2019', event: 'Ra mắt nền tảng học nhạc trực tuyến, thu hút 100 học viên đầu tiên.' },
  { year: '2021', event: 'Mở rộng sang cửa hàng nhạc cụ chính hãng, hợp tác với Yamaha Việt Nam.' },
  { year: '2023', event: 'Đạt mốc 300+ học viên, bổ sung thêm các khóa học ukulele và bass.' },
  { year: '2025', event: 'Nâng cấp nền tảng toàn diện, ra mắt ứng dụng di động và chương trình học thử miễn phí.' },
]

export default function VeChungToiPage() {
  return (
    <main>
      {/* ── HERO ── */}
      <section
        aria-label="Giới thiệu"
        className="py-20 text-center text-white"
        style={{ background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)' }}
      >
        <div className="mx-auto max-w-3xl px-4">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-blue-200">Câu chuyện của chúng tôi</p>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">Về MixiGui</h1>
          <p className="mt-5 text-lg text-blue-100">
            Chúng tôi tin rằng <strong className="text-white">âm nhạc là ngôn ngữ không biên giới</strong> — và mọi người đều xứng đáng được học nhạc một cách dễ dàng, vui vẻ và hiệu quả.
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
      <section aria-label="Thống kê" className="border-b bg-white py-12">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 px-4 text-center sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-extrabold text-blue-600">{s.value}</p>
              <p className="mt-1 text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SỨ MỆNH & TẦM NHÌN ── */}
      <section aria-labelledby="mission-heading" className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-2xl bg-blue-50 p-8">
              <div className="mb-4 text-4xl">🎯</div>
              <h2 id="mission-heading" className="mb-3 text-2xl font-bold text-gray-900">Sứ mệnh</h2>
              <p className="leading-relaxed text-gray-600">
                MixiGui được thành lập với một mục tiêu rõ ràng: <strong>giúp mọi người Việt Nam — dù ở độ tuổi nào, trình độ nào — đều có thể học nhạc và sở hữu nhạc cụ chất lượng với chi phí hợp lý.</strong>
              </p>
              <p className="mt-3 leading-relaxed text-gray-600">
                Chúng tôi xây dựng hệ thống khóa học có lộ trình rõ ràng, nội dung thực tế, được kiểm duyệt kỹ càng bởi các giảng viên chuyên nghiệp. Mỗi bài học đều hướng đến kết quả thực tế — bạn chơi được nhạc, không chỉ học lý thuyết.
              </p>
            </div>
            <div className="rounded-2xl bg-green-50 p-8">
              <div className="mb-4 text-4xl">🔭</div>
              <h2 className="mb-3 text-2xl font-bold text-gray-900">Tầm nhìn</h2>
              <p className="leading-relaxed text-gray-600">
                Chúng tôi hướng đến trở thành <strong>hệ sinh thái âm nhạc toàn diện số 1 Việt Nam</strong> — nơi người học có thể tìm thấy mọi thứ cần thiết cho hành trình âm nhạc: từ khóa học, nhạc cụ, đến cộng đồng chia sẻ đam mê.
              </p>
              <p className="mt-3 leading-relaxed text-gray-600">
                Đến năm 2027, MixiGui đặt mục tiêu phục vụ hơn 10.000 học viên trên toàn quốc và mở rộng sang thị trường Đông Nam Á với nền tảng đa ngôn ngữ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── GIÁ TRỊ CỐT LÕI ── */}
      <section aria-labelledby="values-heading" className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="values-heading" className="mb-10 text-center text-3xl font-bold text-gray-900">Giá trị cốt lõi</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '🏆', title: 'Chất lượng hàng đầu', desc: 'Mỗi khóa học và sản phẩm đều được kiểm duyệt nghiêm ngặt trước khi đến tay học viên và khách hàng.' },
              { icon: '🤝', title: 'Tận tâm phục vụ', desc: 'Đội ngũ hỗ trợ luôn lắng nghe và giải quyết mọi vấn đề của học viên trong vòng 24 giờ.' },
              { icon: '💡', title: 'Đổi mới liên tục', desc: 'Chúng tôi liên tục cập nhật phương pháp giảng dạy và nội dung theo xu hướng âm nhạc hiện đại.' },
              { icon: '🌱', title: 'Cộng đồng gắn kết', desc: 'Xây dựng cộng đồng học viên yêu nhạc, nơi mọi người chia sẻ, hỗ trợ và truyền cảm hứng cho nhau.' },
            ].map((v) => (
              <div key={v.title} className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-3 text-4xl">{v.icon}</div>
                <h3 className="mb-2 font-semibold text-gray-800">{v.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ĐỘI NGŨ ── */}
      <section aria-labelledby="team-heading" className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="team-heading" className="mb-2 text-center text-3xl font-bold text-gray-900">Đội ngũ giảng viên</h2>
          <p className="mb-10 text-center text-gray-500">Những chuyên gia âm nhạc đứng sau sự thành công của học viên MixiGui</p>
          <div className="grid gap-8 sm:grid-cols-3">
            {TEAM.map((member) => (
              <div key={member.name} className="rounded-xl border bg-white p-6 text-center shadow-sm">
                <div className="mb-4 text-7xl">{member.avatar}</div>
                <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
                <p className="mb-3 text-sm font-medium text-blue-600">{member.role}</p>
                <p className="text-sm leading-relaxed text-gray-500">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HÀNH TRÌNH ── */}
      <section aria-labelledby="timeline-heading" className="bg-gray-50 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 id="timeline-heading" className="mb-10 text-center text-3xl font-bold text-gray-900">Hành trình phát triển</h2>
          <div className="relative border-l-2 border-blue-200 pl-8 space-y-8">
            {MILESTONES.map((m) => (
              <div key={m.year} className="relative">
                <span className="absolute -left-[2.85rem] flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white ring-4 ring-white">
                  {m.year.slice(2)}
                </span>
                <p className="text-xs font-bold uppercase tracking-widest text-blue-500">{m.year}</p>
                <p className="mt-1 text-gray-600">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        aria-label="Kêu gọi hành động"
        className="py-20 text-center text-white"
        style={{ background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)' }}
      >
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-3xl font-bold">Tham gia cùng chúng tôi ngay hôm nay</h2>
          <p className="mt-3 text-blue-100">Bắt đầu hành trình âm nhạc của bạn với MixiGui — miễn phí, không cần thẻ tín dụng.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/dang-ky" className="rounded-full bg-white px-8 py-3 font-semibold text-blue-700 shadow transition hover:bg-blue-50">
              Đăng ký miễn phí
            </Link>
            <Link href="/lien-he" className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white/10">
              Liên hệ với chúng tôi
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
