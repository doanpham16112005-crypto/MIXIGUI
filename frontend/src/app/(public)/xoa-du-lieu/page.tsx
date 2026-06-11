import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Yêu cầu xóa dữ liệu | MixiGui',
  description: 'Hướng dẫn yêu cầu xóa dữ liệu cá nhân khỏi hệ thống MixiGui.',
}

export default function XoaDuLieuPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">Yêu cầu xóa dữ liệu</h1>
      <p className="mb-10 text-sm text-gray-500">Cập nhật lần cuối: 11 tháng 6, 2026</p>

      <div className="space-y-8 text-gray-700">
        <section>
          <p>
            Nếu bạn đã đăng nhập MixiGui bằng tài khoản Facebook và muốn xóa toàn bộ dữ liệu cá nhân
            của mình khỏi hệ thống, vui lòng làm theo các bước dưới đây.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-800">Cách 1 — Tự xóa trong tài khoản</h2>
          <ol className="list-decimal space-y-2 pl-6">
            <li>Đăng nhập vào <a href="/dang-nhap" className="text-blue-600 hover:underline">MixiGui</a></li>
            <li>Vào trang <strong>Tài khoản</strong> của bạn</li>
            <li>Chọn <strong>"Xóa tài khoản"</strong> và xác nhận</li>
          </ol>
          <p className="mt-3 text-sm text-gray-500">
            Toàn bộ thông tin cá nhân, lịch sử học tập và dữ liệu liên quan sẽ bị xóa vĩnh viễn trong vòng 30 ngày.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-800">Cách 2 — Gửi yêu cầu qua email</h2>
          <p>Gửi email đến địa chỉ bên dưới với tiêu đề <strong>"Yêu cầu xóa dữ liệu"</strong> và nội dung bao gồm:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Họ tên của bạn</li>
            <li>Địa chỉ email đăng ký / tài khoản Facebook đã dùng để đăng nhập</li>
          </ul>
          <p className="mt-4">
            <a
              href="mailto:support@mixigui.id.vn?subject=Yêu cầu xóa dữ liệu"
              className="inline-block rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              Gửi yêu cầu xóa dữ liệu
            </a>
          </p>
        </section>

        <section className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-sm text-yellow-800">
            <strong>Lưu ý:</strong> Sau khi xóa, dữ liệu sẽ không thể khôi phục. Các giao dịch mua hàng và đăng ký
            khóa học sẽ bị hủy. Chúng tôi sẽ xử lý yêu cầu trong vòng <strong>7 ngày làm việc</strong>.
          </p>
        </section>
      </div>
    </main>
  )
}
