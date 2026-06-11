import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chính sách bảo mật | MixiGui',
  description: 'Chính sách bảo mật và quyền riêng tư của MixiGui - Nền tảng học nhạc và mua nhạc cụ trực tuyến.',
}

export default function ChinhSachBaoMatPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">Chính sách bảo mật</h1>
      <p className="mb-10 text-sm text-gray-500">Cập nhật lần cuối: 11 tháng 6, 2026</p>

      <div className="space-y-8 text-gray-700">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-800">1. Thông tin chúng tôi thu thập</h2>
          <p>
            Khi bạn đăng ký hoặc đăng nhập vào MixiGui, chúng tôi có thể thu thập các thông tin sau:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Họ tên và địa chỉ email</li>
            <li>Ảnh đại diện (nếu đăng nhập qua Google hoặc Facebook)</li>
            <li>Thông tin giao dịch mua hàng và đăng ký khóa học</li>
            <li>Lịch sử hoạt động trên nền tảng</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-800">2. Mục đích sử dụng thông tin</h2>
          <p>Thông tin thu thập được sử dụng để:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Cung cấp và cải thiện dịch vụ của MixiGui</li>
            <li>Xác thực danh tính và bảo mật tài khoản</li>
            <li>Gửi thông báo liên quan đến khóa học và đơn hàng</li>
            <li>Hỗ trợ khách hàng</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-800">3. Chia sẻ thông tin</h2>
          <p>
            MixiGui không bán, cho thuê hoặc chia sẻ thông tin cá nhân của bạn với bên thứ ba vì mục đích thương mại.
            Chúng tôi chỉ chia sẻ thông tin trong các trường hợp: tuân thủ yêu cầu pháp lý, bảo vệ quyền lợi hợp pháp,
            hoặc với các đối tác dịch vụ (như cổng thanh toán) theo hợp đồng bảo mật nghiêm ngặt.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-800">4. Đăng nhập qua mạng xã hội</h2>
          <p>
            Khi bạn đăng nhập bằng Google hoặc Facebook, chúng tôi chỉ yêu cầu quyền truy cập vào tên và địa chỉ email
            của bạn. Chúng tôi không đăng bài, đọc tin nhắn hoặc thực hiện bất kỳ hành động nào khác trên tài khoản
            mạng xã hội của bạn.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-800">5. Bảo mật dữ liệu</h2>
          <p>
            Chúng tôi áp dụng các biện pháp bảo mật kỹ thuật và tổ chức phù hợp để bảo vệ thông tin cá nhân của bạn
            khỏi truy cập trái phép, mất mát hoặc tiết lộ. Mật khẩu được mã hóa và không bao giờ được lưu dưới dạng
            văn bản thô.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-800">6. Quyền của người dùng</h2>
          <p>Bạn có quyền:</p>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Truy cập và chỉnh sửa thông tin cá nhân trong tài khoản</li>
            <li>Yêu cầu xóa tài khoản và dữ liệu liên quan</li>
            <li>Hủy đăng ký nhận email thông báo</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-gray-800">7. Liên hệ</h2>
          <p>
            Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này, vui lòng liên hệ với chúng tôi qua email:{' '}
            <a href="mailto:support@mixigui.id.vn" className="text-blue-600 hover:underline">
              support@mixigui.id.vn
            </a>
          </p>
        </section>
      </div>
    </main>
  )
}
