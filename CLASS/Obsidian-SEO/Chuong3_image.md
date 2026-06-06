# Hướng dẫn chụp hình minh chứng — Chương 3

> Tổng cộng **20 tiêu chí** cần chụp minh chứng. Mỗi mục bên dưới ghi rõ: **chụp gì** và **chụp ở đâu**.

---

## 3.1 On-page SEO (6 tiêu chí)

	### ① Tối ưu SEO Title chứa từ khóa chính

**Chụp gì:** Tab trình duyệt hiển thị tiêu đề trang có từ khóa

**Cách chụp:**
1. Mở `https://mixigui.id.vn/san-pham/dan-guitar-acoustic-yamaha-f310`
2. Chụp toàn màn hình — thấy rõ **tab trình duyệt** ghi tên sản phẩm + "MixiGui"
3. Hoặc: Chuột phải → **View Page Source** → Ctrl+F tìm `<title>` → chụp dòng đó
![[3.1_1 Tối ưu SEO Title chứa từ khóa chính.png]]
---

### ② Tối ưu Meta Description tăng CTR

**Chụp gì:** Thẻ `<meta name="description">` trong source code

**Cách chụp:**
1. Mở `https://mixigui.id.vn`
2. Chuột phải → **View Page Source** (hoặc Ctrl+U)
3. Ctrl+F tìm `meta name="description"`
4. Chụp màn hình dòng đó
![[3.1_2 Tối ưu Meta Description tăng CTR.png]]
---

### ③ H1 duy nhất

**Chụp gì:** DevTools → Elements hiển thị đúng 1 thẻ H1

**Cách chụp:**
1. Mở bất kỳ trang sản phẩm, ví dụ `https://mixigui.id.vn/san-pham/dan-guitar-acoustic-yamaha-f310`
2. Nhấn **F12** → tab **Elements**
3. Ctrl+F trong DevTools gõ `<h1` — chụp kết quả **"1 of 1"**
![[3.1_3 H1 duy nhất.png]]
---

### ④ H2 và H3 phân cấp logic

**Chụp gì:** Outline heading của trang blog

**Cách chụp:**
1. Mở `https://mixigui.id.vn/blog/bam-hop-am-guitar-bi-re`
2. Nhấn **F12** → tab **Elements**
3. Ctrl+F gõ `<h2` → chụp thấy các thẻ H2/H3 xuất hiện theo thứ tự
![[3.1_4 H2 và H3 phân cấp logic.png]]
---

### ⑤ Tối ưu Alt hình ảnh

**Chụp gì:** Thẻ `<img>` có thuộc tính `alt` trong DevTools

**Cách chụp:**
1. Mở `https://mixigui.id.vn/san-pham/dan-guitar-acoustic-yamaha-f310`
2. Nhấn **F12** → tab **Elements**
3. Click vào hình ảnh sản phẩm → xem phần HTML bên phải
4. Chụp thấy `alt="tên sản phẩm"`
![[3.1_5 Tối ưu Alt hình ảnh.png]]
---

### ⑥ Tăng cường Internal Link giữa các bài viết

**Chụp gì:** Section "Có thể bạn quan tâm" cuối bài blog có link đến khóa học + sản phẩm

**Cách chụp:**
1. Mở `https://mixigui.id.vn/blog/bam-hop-am-guitar-bi-re`
2. Scroll xuống cuối trang
3. Chụp section **"Có thể bạn quan tâm"** — thấy 2 ô khóa học + 2 ô nhạc cụ kèm link
![[3.1_6 Tăng cường Internal Link giữa các bài viết.png]]
---

## 3.2 Technical SEO (6 tiêu chí)

### ⑦ Sitemap XML

**Chụp gì:** File sitemap.xml mở trên trình duyệt

**Cách chụp:**
1. Mở `https://mixigui.id.vn/sitemap.xml`
2. Chụp màn hình thấy danh sách URL (blog, sản phẩm, khóa học)
![[3.2_7 Sitemap XML.png]]
---

### ⑧ Robots.txt

**Chụp gì:** File robots.txt mở trên trình duyệt

**Cách chụp:**
1. Mở `https://mixigui.id.vn/robots.txt`
2. Chụp màn hình thấy `Sitemap: https://mixigui.id.vn/sitemap.xml`
![[3.2_8 Robots.txt.png]]
---

### ⑨ Structured Data JSON-LD

**Chụp gì:** Kết quả kiểm tra Rich Results Test — PASS

**Cách chụp:**
1. Mở `https://search.google.com/test/rich-results`
2. Dán URL: `https://mixigui.id.vn/san-pham/dan-guitar-acoustic-yamaha-f310`
3. Nhấn **Test URL** → chờ kết quả
4. Chụp màn hình thấy **"Product"** schema được phát hiện ✅
![[3.2_9 Structured Data JSON-LD.png]]
---

### ⑩ Tối ưu tốc độ tải trang

**Chụp gì:** PageSpeed Insights điểm ≥ 90

**Cách chụp:**
1. Mở `https://pagespeed.web.dev/`
2. Dán URL: `https://mixigui.id.vn`
3. Nhấn **Analyze** → chờ kết quả
4. Chụp màn hình tab **Mobile** hoặc **Desktop** — thấy điểm số
![[3.2_10 Tối ưu tốc độ tải trang.png]]
---

### ⑪ Responsive Design

**Chụp gì:** Website hiển thị đẹp trên mobile

**Cách chụp:**
1. Mở `https://mixigui.id.vn` trên **điện thoại thật** hoặc DevTools
2. Nếu dùng DevTools: F12 → nhấn biểu tượng điện thoại 📱 (Toggle device toolbar)
3. Chọn **iPhone 14** hoặc tương đương
4. Chụp màn hình thấy layout mobile đẹp, menu thu gọn
![[3.2_11 Responsive Design.png]]
---

### ⑫ HTTPS / SSL

**Chụp gì:** Ổ khóa 🔒 trên thanh địa chỉ trình duyệt

**Cách chụp:**
1. Mở `https://mixigui.id.vn`
2. Chụp vùng **thanh địa chỉ** — thấy ổ khóa 🔒 và `https://`
3. Tùy chọn: Click vào ổ khóa → **Connection is secure** → chụp popup
![[3.2_12 HTTPS SSL.png]]
---

## 3.3 Off-page SEO (5 tiêu chí)

### ⑬ Facebook

**Chụp gì:** Trang/Profile Facebook có tên MixiGui + link website

**Cách chụp:**
1. Mở trang Facebook của MixiGui
2. Chụp phần **About / Giới thiệu** — thấy link `https://mixigui.id.vn`
![[3.3_13 Facebook.png]]
---

### ⑭ TikTok

**Chụp gì:** Profile TikTok có tên MixiGui + link website trong bio

**Cách chụp:**
1. Mở profile TikTok của MixiGui
2. Chụp phần **bio** — thấy link hoặc tên thương hiệu

---

### ⑮ YouTube

**Chụp gì:** Kênh YouTube có tên MixiGui + link website trong phần mô tả

**Cách chụp:**
1. Mở kênh YouTube của MixiGui
2. Chụp tab **About** — thấy link `https://mixigui.id.vn`

---

### ⑯ Chia sẻ bài viết lên mạng xã hội

**Chụp gì:** Post Facebook/TikTok đang chia sẻ link bài blog

**Cách chụp:**
1. Mở bài đăng trên Facebook đã share link blog mixigui.id.vn
2. Chụp màn hình — thấy preview link bài viết

---

### ⑰ Tín hiệu thương hiệu — tìm kiếm "mixigui"

**Chụp gì:** Kết quả Google khi tìm từ khóa "mixigui"

**Cách chụp:**
1. Mở `https://www.google.com`
2. Gõ tìm kiếm: `mixigui`
3. Chụp màn hình trang kết quả — thấy `mixigui.id.vn` xuất hiện
![[3.3_17 Tín hiệu thương hiệu  tìm kiếm mixigui.png]]
---

## 3.4 Internal Link Structure (3 tiêu chí)

### ⑱ Blog → Khóa học (Link Juice / Phân phối)

**Chụp gì:** Cuối bài blog có section link đến trang khóa học

**Cách chụp:**
1. Mở `https://mixigui.id.vn/blog/tap-guitar-bi-dau-co-tay`
2. Scroll xuống cuối — thấy **"Khóa học liên quan"**
3. Chụp + click vào một khóa học → chụp thêm trang khóa học vừa mở
![[3.4_18 Blog Khóa học (Link Juice Phân phối).png]]
---

### ⑲ Khóa học → Sản phẩm (Điều hướng phễu)

**Chụp gì:** Trang khóa học có link/banner dẫn đến trang sản phẩm

**Cách chụp:**
1. Mở `https://mixigui.id.vn/khoa-hoc`
2. Chụp phần có nút hoặc link dẫn đến `/san-pham`
3. Hoặc: Chụp section "Nhạc cụ liên quan" cuối bài blog
![[3.4_19 Khóa học Sản phẩm (Điều hướng phễu).png]]
---

### ⑳ Cấu trúc Blog → Khóa học → Sản phẩm (Toàn phễu)

**Chụp gì:** 3 màn hình ghép lại thể hiện toàn bộ hành trình

**Cách chụp:**
1. Chụp 1: Trang blog `https://mixigui.id.vn/blog/vi-sao-day-dan-guitar-nhanh-dut`
2. Chụp 2: Trang khóa học `https://mixigui.id.vn/khoa-hoc`
3. Chụp 3: Trang sản phẩm `https://mixigui.id.vn/san-pham`
4. Ghép 3 ảnh thành 1 (dùng Paint hoặc PowerPoint) — vẽ mũi tên → →
![[3.4_20 Cấu trúc Blog  Khóa học Sản phẩm (Toàn phễu).png]]
---

> [!TIP] Công cụ chụp màn hình nhanh
> - **Windows:** `Win + Shift + S` để chụp vùng tùy chọn
> - **Đặt tên file:** `3.1-①-seo-title.png`, `3.2-⑦-sitemap.png`... để dễ quản lý
