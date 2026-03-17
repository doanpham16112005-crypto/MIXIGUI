'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LienHePage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setSent(true)
    setLoading(false)
  }

  return (
    <main>
      {/* ── HERO ── */}
      <section className="border-b py-14 text-white" style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a5f)' }}>
        <div className="mx-auto max-w-7xl px-4">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-blue-300">
            <Link href="/" className="hover:text-white">Trang chủ</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Liên hệ</span>
          </nav>
          <h1 className="text-4xl font-extrabold">Liên Hệ Với MixiGui</h1>
          <p className="mt-3 max-w-2xl text-lg text-blue-200">
            Bạn có câu hỏi về khóa học, nhạc cụ hay cần tư vấn? Đội ngũ MixiGui luôn sẵn sàng hỗ trợ bạn trong vòng 24 giờ.
          </p>
        </div>
      </section>

      {/* ── THÔNG TIN + FORM ── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 lg:grid-cols-2">

            {/* Thông tin liên hệ */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Thông tin liên hệ</h2>
              <div className="space-y-5">
                {[
                  { icon: '📧', title: 'Email hỗ trợ', value: 'contact@mixigui.vn', sub: 'Phản hồi trong vòng 24 giờ' },
                  { icon: '📞', title: 'Hotline', value: '1800 6868 (miễn phí)', sub: 'Thứ 2 – Thứ 7, 8:00 – 21:00' },
                  { icon: '🏪', title: 'Showroom Hà Nội', value: '123 Nguyễn Trãi, Thanh Xuân, Hà Nội', sub: 'Mở cửa: 9:00 – 20:00 hàng ngày' },
                  { icon: '🏪', title: 'Showroom TP.HCM', value: '456 Lê Văn Sỹ, Quận 3, TP.HCM', sub: 'Mở cửa: 9:00 – 20:00 hàng ngày' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 rounded-xl border bg-white p-4 shadow-sm">
                    <span className="shrink-0 text-3xl">{item.icon}</span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{item.title}</p>
                      <p className="font-semibold text-gray-800">{item.value}</p>
                      <p className="text-sm text-gray-500">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mạng xã hội */}
              <div className="mt-8">
                <h3 className="mb-4 font-semibold text-gray-700">Theo dõi chúng tôi</h3>
                <div className="flex gap-3">
                  {[
                    { label: 'Facebook', icon: '📘', color: 'bg-blue-600' },
                    { label: 'YouTube', icon: '▶️', color: 'bg-red-600' },
                    { label: 'TikTok', icon: '🎵', color: 'bg-gray-900' },
                    { label: 'Instagram', icon: '📸', color: 'bg-pink-600' },
                  ].map((s) => (
                    <button key={s.label} className={`${s.color} flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition hover:opacity-90`}>
                      <span>{s.icon}</span> {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Giờ làm việc */}
              <div className="mt-8 rounded-xl bg-blue-50 p-5">
                <h3 className="mb-3 font-semibold text-gray-800">🕐 Giờ làm việc</h3>
                <table className="w-full text-sm text-gray-600">
                  <tbody>
                    {[
                      ['Thứ 2 – Thứ 6', '8:00 – 21:00'],
                      ['Thứ 7', '8:00 – 20:00'],
                      ['Chủ nhật', '9:00 – 18:00'],
                    ].map(([day, time]) => (
                      <tr key={day} className="border-b border-blue-100 last:border-0">
                        <td className="py-2 font-medium">{day}</td>
                        <td className="py-2 text-right text-blue-600 font-semibold">{time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Form liên hệ */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Gửi tin nhắn cho chúng tôi</h2>

              {sent ? (
                <div className="rounded-2xl bg-green-50 p-10 text-center">
                  <div className="mb-4 text-6xl">✅</div>
                  <h3 className="mb-2 text-xl font-bold text-green-700">Gửi thành công!</h3>
                  <p className="text-gray-600">Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.</p>
                  <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                    className="mt-6 rounded-full bg-green-600 px-6 py-2 text-sm font-semibold text-white hover:bg-green-700 transition">
                    Gửi tin nhắn khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Họ và tên <span className="text-red-500">*</span></label>
                      <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Nguyễn Văn A"
                        className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                      <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="email@example.com"
                        className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Chủ đề</label>
                    <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100">
                      <option value="">-- Chọn chủ đề --</option>
                      <option>Tư vấn khóa học</option>
                      <option>Tư vấn mua nhạc cụ</option>
                      <option>Hỗ trợ kỹ thuật</option>
                      <option>Hợp tác kinh doanh</option>
                      <option>Khác</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Nội dung <span className="text-red-500">*</span></label>
                    <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Mô tả chi tiết câu hỏi hoặc yêu cầu của bạn..."
                      className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none" />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full rounded-full bg-blue-600 py-3 font-semibold text-white shadow transition hover:bg-blue-700 disabled:opacity-60">
                    {loading ? 'Đang gửi...' : 'Gửi tin nhắn'}
                  </button>
                  <p className="text-center text-xs text-gray-400">Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CÁC CÁCH HỖ TRỢ ── */}
      <section aria-labelledby="support-heading" className="bg-gray-50 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 id="support-heading" className="mb-8 text-center text-2xl font-bold text-gray-900">Chúng tôi có thể giúp bạn điều gì?</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '🎓', title: 'Tư vấn khóa học', desc: 'Chưa biết nên học nhạc cụ nào hay bắt đầu từ đâu? Chúng tôi sẽ giúp bạn chọn lộ trình phù hợp nhất.', action: 'Chat ngay' },
              { icon: '🎸', title: 'Tư vấn nhạc cụ', desc: 'Cần mua đàn guitar, piano hay trống nhưng chưa biết chọn loại nào? Để chúng tôi tư vấn theo ngân sách của bạn.', action: 'Hỏi ngay' },
              { icon: '🛠️', title: 'Hỗ trợ kỹ thuật', desc: 'Gặp sự cố khi truy cập khóa học, thanh toán hay vấn đề tài khoản? Đội kỹ thuật hỗ trợ 24/7.', action: 'Báo lỗi' },
              { icon: '🤝', title: 'Hợp tác', desc: 'Bạn là giảng viên, nhà sản xuất nhạc cụ hay đối tác muốn hợp tác với MixiGui? Hãy liên hệ với chúng tôi.', action: 'Liên hệ' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl bg-white p-6 shadow-sm text-center">
                <div className="mb-3 text-5xl">{item.icon}</div>
                <h3 className="mb-2 font-bold text-gray-800">{item.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-gray-500">{item.desc}</p>
                <span className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600">{item.action}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BẢN ĐỒ ── */}
      <section aria-label="Địa chỉ showroom" className="py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">Tìm chúng tôi tại</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { city: 'Hà Nội', address: '123 Nguyễn Trãi, Thanh Xuân, Hà Nội', hours: '9:00 – 20:00 hàng ngày', phone: '024 1234 5678', color: 'border-blue-400' },
              { city: 'TP. Hồ Chí Minh', address: '456 Lê Văn Sỹ, Quận 3, TP.HCM', hours: '9:00 – 20:00 hàng ngày', phone: '028 1234 5678', color: 'border-red-400' },
            ].map((loc) => (
              <div key={loc.city} className={`rounded-xl border-l-4 ${loc.color} bg-white p-6 shadow-sm`}>
                <h3 className="mb-3 text-lg font-bold text-gray-800">🏪 Showroom {loc.city}</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex gap-2"><span className="shrink-0">📍</span><span>{loc.address}</span></li>
                  <li className="flex gap-2"><span className="shrink-0">🕐</span><span>{loc.hours}</span></li>
                  <li className="flex gap-2"><span className="shrink-0">📞</span><span>{loc.phone}</span></li>
                </ul>
                <button className="mt-4 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 transition">
                  Xem bản đồ →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
