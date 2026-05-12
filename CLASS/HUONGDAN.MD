# Hướng dẫn thủ công - MIXIGUI Deployment

> Các bước dưới đây AI không thể tự thực hiện vì cần đăng nhập tài khoản tenten.vn và Vercel dashboard trực tiếp.

---

## BƯỚC 1 — Cấu hình DNS trên tenten.vn (BẮT BUỘC)

Mục tiêu: Trỏ tên miền `mixigui.id.vn` về Vercel.

### 1.1 Đăng nhập tenten.vn

- Truy cập: https://tenten.vn
- Đăng nhập tài khoản chủ domain `mixigui.id.vn`

### 1.2 Vào quản lý DNS

- Vào **Quản lý tên miền** → chọn `mixigui.id.vn` → **Quản lý DNS / DNS Management**

### 1.3 Thêm các bản ghi DNS sau

| Loại   | Tên (Host) | Giá trị (Value)         | TTL  |
|--------|------------|--------------------------|------|
| A      | @          | `76.76.21.21`            | 3600 |
| CNAME  | www        | `cname.vercel-dns.com`   | 3600 |

> **Lưu ý**: Nếu đã có bản ghi A hoặc CNAME cũ, hãy **xóa trước** rồi thêm bản ghi mới.

### 1.4 Lưu và chờ propagation

- Lưu các thay đổi DNS.
- DNS propagation mất **15 phút đến 48 giờ**.
- Kiểm tra propagation tại: https://dnschecker.org/#A/mixigui.id.vn

---

## BƯỚC 2 — Xác nhận domain trong Vercel Dashboard

> Domain `mixigui.id.vn` đã được thêm vào project Vercel qua API, nhưng cần xác nhận sau khi DNS propagate.

### 2.1 Kiểm tra trong Vercel

- Truy cập: https://vercel.com/dashboard
- Vào project **mixigui** → tab **Settings** → **Domains**
- Chờ cột "Status" hiện **Valid Configuration** (dấu xanh ✓)

### 2.2 Nếu vẫn hiện lỗi "Invalid Configuration"

- Nhấn nút **Refresh** trên domain `mixigui.id.vn`
- Nếu vẫn lỗi, kiểm tra lại bản ghi DNS ở bước 1

---

## BƯỚC 3 — Redeploy project sau khi thêm code mới

Các file code đã được cập nhật (Next.js API Routes thay thế Spring Boot). Cần trigger deploy lại:

### Cách 1: Dùng Git push (nếu đã connect GitHub)

```bash
cd "e:/Career/University/Year3Term2/SEO - EC304.Q21/MIXIGUI"
git add frontend/
git commit -m "feat: replace Spring Boot backend with Next.js API routes for Vercel hosting"
git push origin master
```

Vercel sẽ tự động detect push và deploy lại.

### Cách 2: Trigger deploy thủ công trong Vercel

- Vào project **mixigui** → tab **Deployments**
- Nhấn **Redeploy** trên deployment mới nhất

---

## BƯỚC 4 — Cấu hình Supabase CORS (nếu cần)

Nếu frontend gặp lỗi CORS khi gọi Supabase:

- Truy cập: https://supabase.com/dashboard/project/vcomczhnpnejndojrqcd
- Vào **Settings** → **API**
- Phần **Additional Allowed Origins**, thêm: `https://mixigui.id.vn`
- Lưu lại

---

## BƯỚC 5 — Kiểm tra sau deploy

Sau khi deploy xong và DNS propagate, kiểm tra các URL:

| URL | Kết quả mong đợi |
|-----|-----------------|
| https://mixigui.id.vn | Trang chủ hiển thị bình thường |
| https://mixigui.id.vn/api/health | `{"status":"ok","timestamp":"..."}` |
| https://mixigui.id.vn/api/products | Danh sách sản phẩm (JSON) |
| https://mixigui.id.vn/api/courses | Danh sách khóa học (JSON) |
| https://www.mixigui.id.vn | Redirect về `mixigui.id.vn` |

---

## Tóm tắt những gì AI đã tự làm

- Tạo 20+ Next.js API Route handlers thay thế Spring Boot backend
- Cài đặt `bcryptjs` + `jsonwebtoken` cho xác thực
- Cập nhật `NEXT_PUBLIC_API_URL=/api` (frontend gọi API nội bộ, không cần server riêng)
- Cập nhật `NEXT_PUBLIC_SITE_URL=https://mixigui.id.vn`
- Thêm domain `mixigui.id.vn` + `www.mixigui.id.vn` vào Vercel project
- Thêm biến môi trường `JWT_SECRET` vào Vercel
- Cập nhật `NEXT_PUBLIC_SITE_URL` trong Vercel về `https://mixigui.id.vn`
