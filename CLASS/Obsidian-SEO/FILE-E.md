# FILE-E: KẾ HOẠCH SEO & HƯỚNG DẪN BÁO CÁO LOOKER STUDIO

  

> [!INFO] Thông tin đồ án

> **Môn:** SEO — EC304.Q21 | **Website:** https://mixigui.id.vn | **Hạn nộp:** 19/05/2026

  

---

  

## PHẦN 1: QUY TRÌNH THỰC HIỆN SEO

  

### Bước 1 — Nghiên cứu từ khóa ✅

- Dùng **Google Keyword Planner** để tìm lượng tìm kiếm
- Nhóm từ khóa theo chủ đề (guitar, piano, ukulele, violin)
- Xem chi tiết trong [[FILE-D]]

### Bước 2 — Technical SEO ✅

| Hạng mục            | Trạng thái                 | Công cụ kiểm tra                 |
| ------------------- | -------------------------- | -------------------------------- |
| HTTPS               | ✅ Let's Encrypt qua Vercel | https://www.ssllabs.com/ssltest/ |
| Sitemap XML         | ✅ `/sitemap.xml` (dynamic) | Google Search Console            |
| Robots.txt          | ✅ `/robots.txt`            | https://mixigui.id.vn/robots.txt |
| Page Speed (Mobile) | ✅ > 90                     | PageSpeed Insights               |
| Mobile-friendly     | ✅ Next.js responsive       | Google Mobile Test               |
| Canonical URL       | ✅ Cấu hình trong Next.js   | Xem source code                  |
| Structured Data     | ✅ Product schema           | Schema Markup Validator          |
| Core Web Vitals     | ✅ Vercel Edge              | Search Console > Core Web Vitals |

  

### Bước 3 — Onpage SEO ✅
Mỗi trang sản phẩm đã có:
- **Title tag:** `[Tên sản phẩm từ khóa] - MixiGui` (< 60 ký tự)
- **Meta description:** có từ khóa + CTA, 150–160 ký tự
- **H1:** Đúng 1 H1/trang chứa từ khóa chính
- **URL slug:** Tiếng Việt không dấu, từ khóa trong URL
- **Alt text:** Mô tả ảnh chứa từ khóa

  

### Bước 4 — Content SEO ✅
- 4 bài blog đã đăng tại `/blog` (nhắm từ khóa TOFU — informational)
- Trang sản phẩm nhắm từ khóa BOFU (transactional)
### Bước 5 — Offpage SEO (Đang thực hiện)
- Đăng ký Google My Business
- Liên kết profile mạng xã hội về website
- Đăng sản phẩm lên Zalo Shop, Facebook Shop kèm link website
  

---

  

## PHẦN 2: GOOGLE SEARCH CONSOLE
### 2.1 Thêm Property
1. Vào https://search.google.com/search-console
2. Nhấn **+ Add property** → chọn **Domain**
3. Nhập: `mixigui.id.vn`
4. Xác minh bằng file HTML (đã upload tại `/google1c4c86ed5c110633.html`)
5. Nhấn **VERIFY**

### 2.2 Submit Sitemap
1. Vào **Sitemaps** (menu trái)
2. Nhập: `sitemap.xml`
3. Nhấn **SUBMIT**
4. Chờ Google crawl (1–3 ngày)

  

### 2.3 Các báo cáo cần xem

| Báo cáo | Mục đích | Vị trí |
|---------|---------|--------|
| Performance | Clicks, Impressions, CTR, Position | Performance > Search results |
| Coverage | Trang nào được index | Indexing > Pages |
| Core Web Vitals | Tốc độ tải | Experience > Core Web Vitals |
| Mobile Usability | Tối ưu mobile | Experience > Mobile Usability |

  

---

  

## PHẦN 3: GOOGLE ANALYTICS 4

  

> [!SUCCESS] Đã hoàn thành (18/05/2026)

> **Measurement ID:** `G-6PF4TE48Z7` | **Property:** MixiGui (538218322) | **Account:** 395223677

  

### 3.1 Cài đặt GA4 ✅
- [x] Tạo property `MixiGui` — Múi giờ GMT+7, Tiền tệ VND
- [x] Lấy Measurement ID: `G-6PF4TE48Z7`
- [x] Thêm vào `frontend/src/app/layout.tsx` qua env var `NEXT_PUBLIC_GA_ID`
- [x] Deploy lên Vercel, xác nhận tag hoạt động


```tsx

// layout.tsx — GA4 script (tự động bật khi có NEXT_PUBLIC_GA_ID)

const gaId = process.env.NEXT_PUBLIC_GA_ID

{gaId && (

  <>

    <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />

    <Script id="google-analytics" strategy="afterInteractive">

      {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}

    </Script>

  </>

)}

```


> [!TIP] Vercel env var

> Settings → Environment Variables → Key: `NEXT_PUBLIC_GA_ID` | Value: `G-6PF4TE48Z7`
### 3.2 Các báo cáo cần xem

| Báo cáo | Chỉ số | Vị trí |
|---------|--------|--------|
| Acquisition | Traffic source (Organic/Direct) | Reports > Acquisition > Traffic acquisition |
| Engagement | Bounce rate, session duration | Reports > Engagement > Overview |
| Pages | Trang xem nhiều nhất | Reports > Engagement > Pages and screens |

---


## PHẦN 4: BÁO CÁO LOOKER STUDIO

  

> [!INFO] Link

> https://lookerstudio.google.com

  

### 4.1 Kết nối Data Sources
**Bước 1 — Google Search Console**
1. Mở Looker Studio → **Create** → **Report**
2. Chọn connector: **Search Console**
3. Chọn site: `https://mixigui.id.vn/`
4. Chọn **Site Impression** (không phải URL Impression)
5. Nhấn **Add to report**

  

**Bước 2 — Google Analytics**
1. Nhấn **Add data** (góc trên)
2. Chọn connector: **Google Analytics**
3. Chọn property: `MixiGui`
4. Nhấn **Add to report**

  

**Bước 3 — Google Sheets (Danh sách từ khóa)**

> [!NOTE] File đã có sẵn

> **Keywrod Tracking** — https://docs.google.com/spreadsheets/d/1xgmTOw2yxEX5QMbxRozhHHlnGFVq-6Czk_xicT1fgc8/edit

> Danh sách 27 từ khóa đầy đủ xem tại [[FILE-F]]

1. Mở file **Keywrod Tracking** (hàng 1 là tiêu đề — Looker Studio dùng làm tên cột)
2. Trong Looker Studio → **Add data** → **Google Sheets**
3. Đăng nhập Google → tìm file **Keywrod Tracking** → chọn sheet chứa bảng từ khóa
4. Nhấn **Add**
5. **Blend data với Search Console:**
   - Vào **Resource** → **Manage blended data** → **Add a blend**
   - Data source 1: `Search Console` — Join key: `Query`
   - Data source 2: `Google Sheets` — Join key: `Từ khóa`
   - Join type: **Left outer join**
   - Nhấn **Save**

  
### 4.2 Các Chart cần tạo

**Chart 1 — Thứ hạng từ khóa theo dõi**

| Thuộc tính | Giá trị |
|-----------|---------|
| Loại | Table |
| Dimension | `Query` |
| Metrics | `Position`, `Clicks`, `Impressions`, `CTR` |
| Filter | Chỉ từ khóa có trong Google Sheets (Blend Data) |
| Sort | `Position` tăng dần |

  

**Chart 2 — Từ khóa Impressions cao nhất**

| Thuộc tính | Giá trị |
|-----------|---------|
| Loại | Bar Chart |
| Dimension | `Query` |
| Metric | `Impressions` giảm dần |
| Limit | Top 20 |


**Chart 3 — Từ khóa vị trí tốt nhất**

| Thuộc tính | Giá trị |
|-----------|---------|
| Loại | Table |
| Dimension | `Query` |
| Metrics | `Position`, `Clicks`, `Impressions`, `CTR` |
| Filter | `Position` ≤ 20 |
| Sort | `Position` tăng dần |

  

**Chart 4 — Từ khóa TOP 10 mới**

| Thuộc tính | Giá trị |
|-----------|---------|
| Loại | Table |
| Dimension | `Query`, `Date` |
| Filter | `Position` ≤ 10 |
| So sánh | Current period vs Previous period |

### 4.3 Cấu trúc báo cáo (4 trang)

```

Trang 1: TỔNG QUAN

├── Scorecard: Total Clicks | Total Impressions | Avg CTR | Avg Position

├── Line chart: Clicks & Impressions theo thời gian

└── Date range control

  

Trang 2: TỪ KHÓA ĐANG THEO DÕI

└── Table: Từ khóa từ Google Sheets + Position/Clicks/Impressions/CTR

  

Trang 3: PHÂN TÍCH TỪ KHÓA

├── Bar chart: Top 20 Impressions cao nhất

└── Table: Top 20 Position tốt nhất

  

Trang 4: TOP 10 MỚI

└── Table: Từ khóa mới vào TOP 10 so tháng trước

```

### 4.4 Blend Data — hướng dẫn nhanh

1. Click vào chart cần blend → **Blend data**
2. **Left table:** Search Console — Dimension: `Query`
3. **Right table:** Google Sheets — Dimension: `Từ khóa`
4. **Join condition:** `Query = Từ khóa` (Left outer join)
5. Chọn metrics từ cả 2 nguồn → **Save**

---

  

## PHẦN 5: TIMELINE

| Ngày | Việc làm | Trạng thái |
|------|---------|-----------|
| 12/05/2026 | Website live tại mixigui.id.vn | ✅ Hoàn thành |
| 13/05/2026 | Submit sitemap lên Google Search Console | ✅ Hoàn thành |
| 13/05/2026 | Tạo báo cáo Looker Studio | ✅ Hoàn thành |
| 15/05/2026 | Đăng 4 bài blog SEO | ✅ Hoàn thành |
| 18/05/2026 | Cài đặt Google Analytics 4 (`G-6PF4TE48Z7`) | ✅ Hoàn thành |
| 18/05/2026 | Tạo file theo dõi từ khóa (Keywrod Tracking) | ✅ Hoàn thành |
| 18–19/05/2026 | Hoàn thiện báo cáo đồ án | 🔄 Đang làm |
| 19/05/2026 | **NỘP ĐỒ ÁN** | ⏳ Deadline |