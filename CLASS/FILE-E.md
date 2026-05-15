# FILE-E: KẾ HOẠCH SEO & HƯỚNG DẪN BÁO CÁO LOOKER STUDIO
> Môn: SEO — EC304.Q21 | Website: https://mixigui.id.vn | Hạn nộp: 19/05/2026

---

## PHẦN 1: QUY TRÌNH THỰC HIỆN SEO (PROCESS)

### Bước 1 — Nghiên cứu từ khóa ✅ Done
- Dùng **Google Keyword Planner** để tìm lượng tìm kiếm
- Nhóm từ khóa theo chủ đề (guitar, piano, ukulele, violin)
- Xem chi tiết trong FILE-D

### Bước 2 — Technical SEO ✅ Done
| Hạng mục | Trạng thái | Công cụ kiểm tra |
|----------|-----------|-----------------|
| HTTPS | ✅ Có (Let's Encrypt qua Vercel) | https://www.ssllabs.com/ssltest/ |
| Sitemap XML | ✅ Có tại /sitemap.xml | Google Search Console |
| Robots.txt | ✅ Có tại /robots.txt | https://mixigui.id.vn/robots.txt |
| Page Speed (Mobile) | ✅ >90 | PageSpeed Insights |
| Mobile-friendly | ✅ Next.js responsive | Google Mobile Test |
| Canonical URL | ✅ Cấu hình trong Next.js | Xem source code |
| Structured Data | ✅ Product schema | Schema Markup Validator |
| Core Web Vitals | ✅ Tối ưu Vercel Edge | Search Console > Core Web Vitals |

### Bước 3 — Onpage SEO ✅ Done
Mỗi trang sản phẩm đã có:
- **Title tag** chuẩn: `[Tên sản phẩm từ khóa] - MixiGui` (< 60 ký tự)
- **Meta description**: có từ khóa + CTA, 150-160 ký tự
- **H1**: Đúng 1 H1/trang chứa từ khóa chính
- **URL slug**: Tiếng Việt không dấu, từ khóa trong URL
- **Alt text**: Mô tả ảnh chứa từ khóa

### Bước 4 — Content SEO (Đang thực hiện)
- Website có blog tại /blog với nội dung kiến thức âm nhạc
- Mỗi bài blog nhắm từ khóa TOFU (informational)
- Trang sản phẩm nhắm từ khóa BOFU (transactional)

### Bước 5 — Offpage SEO (Đang thực hiện)
- Đăng ký Google My Business
- Liên kết profile mạng xã hội về website
- Đăng sản phẩm lên Zalo Shop, Facebook Shop kèm link website

---

## PHẦN 2: HƯỚNG DẪN GOOGLE SEARCH CONSOLE

### 2.1 Thêm Property
1. Vào https://search.google.com/search-console
2. Nhấn **+ Add property** → chọn **Domain**
3. Nhập: `mixigui.id.vn`
4. Xác minh quyền sở hữu bằng file HTML (đã upload tại `/google1c4c86ed5c110633.html`)
5. Nhấn **VERIFY**

### 2.2 Submit Sitemap
1. Vào **Sitemaps** (menu trái)
2. Nhập: `sitemap.xml`
3. Nhấn **SUBMIT**
4. Chờ Google crawl (1-3 ngày)

### 2.3 Các báo cáo quan trọng cần xem
| Báo cáo | Mục đích | Vị trí trong GSC |
|---------|---------|-----------------|
| Performance | Xem clicks, impressions, CTR, position | Performance > Search results |
| Coverage | Xem trang nào được index | Indexing > Pages |
| Core Web Vitals | Tốc độ tải trang | Experience > Core Web Vitals |
| Mobile Usability | Tối ưu mobile | Experience > Mobile Usability |

---

## PHẦN 3: HƯỚNG DẪN GOOGLE ANALYTICS 4

### 3.1 Cài đặt GA4
1. Vào https://analytics.google.com → **Create property**
2. Tên property: `MixiGui`
3. Múi giờ: `(GMT+07:00) Vietnam`
4. Tiền tệ: `Vietnamese Dong (VND)`
5. Copy **Measurement ID** (dạng G-XXXXXXXXXX)
6. Thêm vào `frontend/src/app/layout.tsx`:

```tsx
// Thêm vào <head> trong layout.tsx
<Script src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`} strategy="afterInteractive" />
<Script id="google-analytics" strategy="afterInteractive">
  {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');`}
</Script>
```

### 3.2 Các báo cáo quan trọng
| Báo cáo | Chỉ số cần xem | Vị trí trong GA4 |
|---------|---------------|-----------------|
| Acquisition | Traffic source (Organic/Direct) | Reports > Acquisition > Traffic acquisition |
| Engagement | Bounce rate, session duration | Reports > Engagement > Overview |
| Pages | Trang nào được xem nhiều | Reports > Engagement > Pages and screens |

---

## PHẦN 4: HƯỚNG DẪN TẠO BÁO CÁO LOOKER STUDIO (CHI TIẾT)

> Link tool: https://lookerstudio.google.com

### 4.1 Kết nối Data Sources

**Bước 1: Kết nối Google Search Console**
1. Mở Looker Studio → **Create** → **Report**
2. Chọn connector: **Search Console**
3. Chọn site: `https://mixigui.id.vn/`
4. Chọn **Site Impression** (không phải URL Impression)
5. Nhấn **Add to report**

**Bước 2: Kết nối Google Analytics**
1. Nhấn **Add data** (góc trên)
2. Chọn connector: **Google Analytics**
3. Chọn property: `MixiGui`
4. Nhấn **Add to report**

**Bước 3: Kết nối Google Sheets (Danh sách từ khóa)**
1. Tạo Google Sheets mới tại: https://sheets.google.com
2. Nhập danh sách từ khóa cần theo dõi (theo FILE-D)
3. Trong Looker Studio → **Add data** → **Google Sheets**
4. Chọn file Google Sheets vừa tạo
5. **Blend data** với Search Console theo cột từ khóa

### 4.2 Tạo các Chart theo yêu cầu bài tập

**Chart 1: Báo cáo thứ hạng từ khóa trong danh sách theo dõi**
- Loại: **Table**
- Dimension: `Query` (từ khóa)
- Metrics: `Position`, `Clicks`, `Impressions`, `CTR`
- Filter: Chỉ hiện từ khóa có trong Google Sheets (dùng Blend Data)
- Sort: `Position` tăng dần

**Chart 2: Từ khóa có lượng hiển thị nhiều nhất**
- Loại: **Bar Chart** (hoặc Table)
- Dimension: `Query`
- Metric: `Impressions`
- Sort: `Impressions` giảm dần
- Limit: Top 20

**Chart 3: Từ khóa có vị trí tốt nhất**
- Loại: **Table**
- Dimension: `Query`
- Metrics: `Position`, `Clicks`, `Impressions`, `CTR`
- Filter: `Position` ≤ 20
- Sort: `Position` tăng dần

**Chart 4: Từ khóa TOP 10 mới (tháng trước chưa có)**
- Loại: **Table**
- Dimension: `Query`, `Date`
- Filter: `Position` ≤ 10
- So sánh: Date Range current vs previous period
- Chú thích: Đây là từ khóa mới lên TOP 10

### 4.3 Cấu trúc trang báo cáo gợi ý

```
Trang 1: TỔNG QUAN
├── Scorecard: Total Clicks | Total Impressions | Avg CTR | Avg Position
├── Line chart: Clicks & Impressions theo thời gian
└── Date range control (filter ngày)

Trang 2: TỪ KHÓA ĐANG THEO DÕI
├── Tiêu đề: "Báo cáo thứ hạng từ khóa mục tiêu"
└── Table: Từ khóa từ Google Sheets + Position/Clicks/Impressions/CTR

Trang 3: PHÂN TÍCH TỪ KHÓA
├── Bar chart: Top 20 từ khóa có Impressions cao nhất
└── Table: Top 20 từ khóa có Position tốt nhất

Trang 4: TỪ KHÓA TOP 10 MỚI
└── Table: Từ khóa mới vào TOP 10 so với tháng trước
```

### 4.4 Hướng dẫn Blend Data (kết hợp GSC + Google Sheets)

1. Trong Looker Studio, click vào chart cần blend
2. Chọn **Blend data** (icon ở Resource panel)
3. **Left table**: Search Console — Dimension: `Query`
4. **Right table**: Google Sheets — Dimension: `Tu khoa`
5. **Join condition**: `Query = Tu khoa` (Inner Join)
6. Chọn metrics cần hiển thị từ cả 2 nguồn

---

## PHẦN 5: TIMELINE THỰC HIỆN

| Ngày | Việc cần làm | Trạng thái |
|------|-------------|-----------|
| 12/05/2026 | ✅ Website live tại mixigui.id.vn | Hoàn thành |
| 13/05/2026 | ✅ Submit sitemap lên Google Search Console | Hoàn thành |
| 13/05/2026 | Tạo báo cáo Looker Studio (Bài tập nhóm) | **HẠN HÔM NAY 17:00** |
| 14/05/2026 | Cài đặt Google Analytics 4 | Cần làm |
| 15-17/05/2026 | Chờ Google index, kiểm tra vị trí từ khóa | Cần làm |
| 18/05/2026 | Hoàn thiện báo cáo đồ án | Cần làm |
| 19/05/2026 | **NỘP ĐỒ ÁN** | Deadline |

---

## PHẦN 6: DANH SÁCH TỪ KHÓA THEO DÕI (Dán vào Google Sheets)

Sao chép bảng này vào Google Sheets để dùng trong Looker Studio:

| Tu khoa | URL dich | Loai | Nhom |
|---------|---------|------|------|
| dan guitar acoustic | /san-pham?category=dan-guitar | Nhom hang dau | Nhom |
| mua dan guitar | /san-pham?category=dan-guitar | Nhom hang dau | Nhom |
| dan guitar gia re | /san-pham?category=dan-guitar | Nhom hang dau | Nhom |
| guitar yamaha | /san-pham/dan-guitar-acoustic-yamaha-f310 | Nhom hang dau | Nhom |
| nhac cu gia re | /san-pham | Ca nhan | Ca nhan |
| mua nhac cu | /san-pham | Ca nhan | Ca nhan |
| shop nhac cu | /san-pham | Ca nhan | Ca nhan |
| dan piano dien | /san-pham?category=keyboard-synthesizer | Phu | Nhom |
| hoc guitar online | /khoa-hoc | Phu | Nhom |
| dan ukulele | /san-pham?category=dan-ukulele | Phu | Nhom |
