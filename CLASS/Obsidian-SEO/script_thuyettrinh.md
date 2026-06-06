# Script Thuyết Trình — Chương 3: Triển Khai SEO trên Website MixiGui

---

> **Quy ước đọc:**
> - Chữ **đậm** = nhấn mạnh giọng khi nói
> - `---` = dừng thở ngắn, chuyển ý
> - Khối `🖥️ SHOW` = hành động trên trình duyệt, làm **trước** hoặc **trong khi** đọc đoạn đó

---

## ═══ MỞ ĐẦU ═══

> 🖥️ **SHOW:** Mở `https://mixigui.id.vn` — để nguyên trang chủ hiện ra, thấy header + hero image

Em sẽ phụ trách trình bày **Chương 3 — Triển khai SEO trên website MixiGui**.


Về mặt kỹ thuật, website được xây dựng bằng **Next.js 15** với kiến trúc **App Router** — đây là framework của React hỗ trợ **Server-Side Rendering**, nghĩa là toàn bộ HTML của trang được render từ phía server trước khi gửi về trình duyệt. Điều này **cực kỳ quan trọng với SEO** vì Googlebot đọc được nội dung ngay lập tức mà không cần chờ JavaScript chạy. Website deploy trên **Vercel** và dùng **Supabase** làm database.

Nhóm triển khai SEO theo **4 nhóm tiêu chí lớn**: On-page SEO, Technical SEO, Off-page SEO, và cấu trúc Internal Link. Mình sẽ đi lần lượt từng phần.

---

## ═══ 3.1 — ON-PAGE SEO ═══

On-page SEO là toàn bộ những gì có thể tối ưu **ngay trên từng trang** của website — từ tiêu đề, mô tả, cấu trúc heading cho đến hình ảnh và liên kết nội bộ. Nhóm triển khai **6 tiêu chí on-page** theo chuẩn của Google.

---

### SEO Title chứa từ khóa chính

> 🖥️ **SHOW:** Mở `https://mixigui.id.vn/san-pham/dan-guitar-acoustic-yamaha-f310` → nhìn vào **tab trình duyệt** thấy tiêu đề trang

Tiêu chí đầu tiên là **tối ưu SEO Title chứa từ khóa chính**. Nhìn lên tab trình duyệt, tiêu đề hiện tại là tên sản phẩm đầy đủ cộng với "MixiGui" — đây không phải tiêu đề cố định mà thay đổi theo từng sản phẩm.

> 🖥️ **SHOW:** F12 → tab **Elements** → Ctrl+F tìm `<title` → thấy `<title>Dan Guitar Acoustic Yamaha F310 - MixiGui</title>`

Để xác nhận title đúng, mở DevTools → tab Elements — ở đây thấy thẻ `<title>` đã chứa đúng tên sản phẩm. Nhóm thực hiện điều này bằng cách dùng **`useEffect`** trong React — sau khi fetch dữ liệu sản phẩm từ Supabase về, code tự động cập nhật `document.title` theo tên sản phẩm tương ứng. Cách này hoạt động tốt vì Googlebot cũng **thực thi JavaScript** trước khi đọc nội dung — nên Google thấy đúng title chứa tên sản phẩm, không phải title mặc định.

---

### Meta Description tăng CTR

> 🖥️ **SHOW:** Vẫn ở View Page Source → Ctrl+F tìm `meta name="description"` → highlight dòng đó

Tiêu chí thứ hai là **tối ưu Meta Description để tăng CTR**. Thẻ meta description là đoạn text hiển thị dưới tiêu đề trên trang kết quả Google — nó không ảnh hưởng trực tiếp đến ranking nhưng ảnh hưởng rất lớn đến **Click-Through Rate**, tức là tỷ lệ người dùng click vào kết quả đó. Một meta description rõ ràng, hấp dẫn có thể tăng CTR lên đáng kể.

Nhóm cũng cập nhật meta description **động theo từng trang** — trang sản phẩm có description mô tả sản phẩm đó, trang blog có description là đoạn excerpt của bài viết, trang khóa học có description tóm tắt nội dung khóa học.

---

### Cấu trúc Heading H1, H2, H3

> 🖥️ **SHOW:** F12 → tab Elements → Ctrl+F gõ `<h1` → thấy **"1 of 1"**

Tiêu chí thứ ba là **H1 duy nhất trên mỗi trang**. Như DevTools đang hiển thị, kết quả tìm kiếm `<h1` chỉ trả về **"1 of 1"** — đúng một thẻ H1 duy nhất. Theo nguyên tắc SEO, H1 là headline chính của trang, Google dùng nó để xác định chủ đề cốt lõi. Nếu có hai H1 trở lên, Google sẽ bị confused về chủ đề của trang và giảm độ tin cậy của trang đó.

> 🖥️ **SHOW:** Mở `https://mixigui.id.vn/blog/bam-hop-am-guitar-bi-re` → F12 → Ctrl+F gõ `<h2` → thấy nhiều thẻ H2/H3 xuất hiện theo thứ tự

Tiêu chí thứ tư là **H2 và H3 phân cấp logic**. Trong các bài blog, nhóm sử dụng H2 cho các phần nội dung chính và H3 cho các mục con bên trong. Cấu trúc phân cấp này giúp Googlebot "đọc" bài viết như một mục lục — hiểu được flow nội dung, từ đó đánh giá bài viết có liên quan và có chiều sâu về chủ đề hay không.

---

### Alt Text hình ảnh

> 🖥️ **SHOW:** Click vào ảnh sản phẩm → xem thuộc tính `alt` trong panel Elements bên phải

Tiêu chí thứ năm là **Alt text hình ảnh**. Google không "nhìn" được ảnh như con người — nó đọc thuộc tính `alt` để hiểu ảnh đó chứa gì. Nhóm bổ sung alt text đầy đủ trên toàn bộ hình ảnh — alt của ảnh sản phẩm chứa tên sản phẩm, alt của ảnh blog chứa tiêu đề bài viết.

Việc dùng component **`next/image`** của Next.js không chỉ đảm bảo alt text, mà còn mang lại một lợi ích quan trọng khác: Next.js tự động convert ảnh sang định dạng **WebP** hoặc **AVIF** — những định dạng có dung lượng nhỏ hơn JPEG gốc từ 30 đến 50 phần trăm. Đây là một trong những yếu tố giúp cải thiện điểm PageSpeed đáng kể mà mình sẽ trình bày ở phần sau.

---

### Internal Link

Tiêu chí thứ sáu là **Internal Link** — nhóm mình sẽ trình bày riêng ở mục 3.4 vì đây là phần được thiết kế có hệ thống nhất.

---

## ═══ 3.2 — TECHNICAL SEO ═══

Technical SEO là nền tảng kỹ thuật phía dưới mà người dùng không thấy nhưng Googlebot rất quan tâm. Đây là phần nhóm **đầu tư nhiều nhất về kỹ thuật**.

---

### Sitemap XML

> 🖥️ **SHOW:** Mở `https://mixigui.id.vn/sitemap.xml` — thấy danh sách các URL được liệt kê

**Sitemap XML** là file khai báo toàn bộ URL của website cho Googlebot. Thay vì tạo file XML tĩnh phải cập nhật thủ công mỗi khi có bài mới, nhóm implement sitemap **hoàn toàn bằng code** qua file `app/sitemap.ts` trong Next.js.

Cơ chế hoạt động như sau: khi Googlebot request đến `/sitemap.xml`, server sẽ **tự động fetch** danh sách toàn bộ blog, sản phẩm, khóa học từ Supabase trong thời gian thực, sau đó trả về file XML đúng định dạng với tất cả URL cùng ngày cập nhật. Nghĩa là sitemap **luôn luôn phản ánh đúng** nội dung database mà không cần can thiệp thủ công.

Sitemap này đã được **submit lên Google Search Console** — đây là bước quan trọng để đẩy nhanh quá trình Googlebot crawl và index nội dung, thay vì phải chờ Googlebot tự khám phá.

---

### Robots.txt

> 🖥️ **SHOW:** Mở `https://mixigui.id.vn/robots.txt` — thấy nội dung file

**robots.txt** là file giao tiếp giữa website và các search engine crawler. Nhóm cũng tự code file này qua `app/robots.ts` — cấu hình **cho phép** Googlebot crawl toàn bộ trang public, nhưng **chặn** các đường dẫn private như `/admin/` và `/hoc-vien/`. Nếu không có robots.txt, Googlebot có thể crawl vào các trang admin hoặc trang học viên — vừa không có giá trị SEO, vừa có thể làm lộ cấu trúc ứng dụng.

Dòng cuối của file là khai báo đường dẫn sitemap — giúp Googlebot tự động biết sitemap ở đâu mà không cần tìm.

---

### Structured Data — JSON-LD Schema

> 🖥️ **SHOW:** Mở `https://mixigui.id.vn/san-pham/dan-guitar-acoustic-yamaha-f310` → F12 → tab Elements → Ctrl+F tìm `application/ld+json` → thấy JSON trong thẻ script

**Structured Data** hay **JSON-LD** là cách inject dữ liệu có cấu trúc vào trang để Google không chỉ đọc được nội dung mà còn **hiểu được ngữ nghĩa** của nội dung đó.

Nhóm xây dựng hai React component riêng biệt:

**`ProductSchema`** — được inject vào mỗi trang sản phẩm. Component này tạo ra một JSON object theo chuẩn **Schema.org/Product** mô tả đầy đủ: tên sản phẩm, mô tả, hình ảnh, giá tiền, thương hiệu, tình trạng còn hàng, và URL trang sản phẩm.

**`CourseSchema`** — tương tự nhưng theo chuẩn **Schema.org/Course**, inject vào mỗi trang khóa học, mô tả tên khóa học, nội dung, giá và provider là MixiGui.

Kết quả kiểm tra trên **Google Rich Results Test** cho thấy schema được nhận diện đúng kiểu `Product` với trạng thái **PASS**. Đây là điều kiện tiên quyết để Google có thể hiển thị **Rich Snippets** trên SERP — tức là hiển thị giá tiền, đánh giá sao ngay dưới tiêu đề kết quả tìm kiếm, giúp tăng CTR đáng kể so với kết quả tìm kiếm thông thường.

---

### Tốc độ tải trang — Core Web Vitals

> 🖥️ **SHOW:** Mở ảnh chụp màn hình PageSpeed Insights Desktop đã chụp sẵn

Đây là tiêu chí mà nhóm mình **tốn nhiều công tối ưu nhất** và cũng là tiêu chí có thể trình bày cụ thể nhất bằng số liệu.

Nhóm đo trên **PageSpeed Insights** của Google — tab **Desktop**. Kết quả sau khi tối ưu:

- **First Contentful Paint: 0.3 giây** — xanh ✅ — người dùng thấy nội dung đầu tiên chỉ sau 300 milliseconds
- **Largest Contentful Paint: 1.1 giây** — xanh ✅ — phần tử lớn nhất, thường là ảnh hero, load hoàn toàn trong 1.1 giây
- **Cumulative Layout Shift: 0** — xanh ✅ — trang không bị giật, nhảy layout trong quá trình load
- **SEO Score: 100 trên 100** — xanh ✅
- **Best Practices: 96 trên 100** — xanh ✅

---

Để đạt được **LCP 1.1 giây**, nhóm thực hiện một chuỗi tối ưu có hệ thống.

Thứ nhất, chuyển toàn bộ thẻ `<img>` HTML thông thường sang component **`next/image`** của Next.js. Component này tự động serve ảnh đúng kích thước theo màn hình người dùng, tự convert sang WebP, và quan trọng nhất là tự thêm **`loading="lazy"`** để các ảnh ngoài viewport không cần load ngay.

Thứ hai, với ảnh hero trên trang chủ — đây là ảnh lớn nhất và quan trọng nhất — nhóm thêm thuộc tính **`priority`** để Next.js inject thẻ `<link rel="preload">` vào `<head>`. Điều này báo cho browser biết phải tải ảnh này trước tiên, ngay khi HTML được parse, không cần chờ CSS hay JavaScript.

Thứ ba, nhóm thêm **Cloudinary transformation parameters** — cụ thể là `w_1920,f_auto,q_auto` — vào URL ảnh gốc. Cloudinary sẽ tự động resize ảnh xuống độ rộng 1920px, chọn format tốt nhất (WebP hoặc AVIF), và tối ưu chất lượng. Kết quả là ảnh gốc từ vài MB giảm xuống còn vài trăm KB.

Theo chuẩn **Core Web Vitals** của Google, LCP dưới **2.5 giây** là "Good". Nhóm đạt **1.1 giây** — tốt hơn ngưỡng yêu cầu **2.3 lần**.

---

### HTTPS / SSL

> 🖥️ **SHOW:** Nhìn vào thanh địa chỉ — thấy ổ khóa 🔒 → click vào → thấy "Connection is secure"

**HTTPS** là yêu cầu bắt buộc của Google từ năm 2014 và hiện tại là một trong các **ranking signal**. Website không có HTTPS bị trình duyệt đánh dấu "Not Secure" và Google sẽ đặt ưu tiên thấp hơn so với website có HTTPS trong kết quả tìm kiếm.

Website MixiGui deploy trên Vercel — Vercel **tự động cấp SSL certificate** miễn phí cho mọi domain, gia hạn tự động. Toàn bộ traffic HTTP đều được **redirect tự động** về HTTPS. Trình duyệt hiển thị ổ khóa xanh và "Connection is secure" — đây là minh chứng trực quan nhất.

---

### Responsive Design

> 🖥️ **SHOW:** F12 → nhấn biểu tượng điện thoại 📱 → chọn **iPhone 14** → thấy layout mobile gọn gàng, menu thu nhỏ

**Responsive Design** — hay khả năng hiển thị tốt trên mọi kích thước màn hình — là yếu tố quan trọng vì Google sử dụng **Mobile-First Indexing**: tức là Google crawl và đánh giá website dựa trên phiên bản **mobile** trước, không phải desktop.

Website MixiGui sử dụng **Tailwind CSS** với hệ thống breakpoints `sm`, `md`, `lg`. Nhìn trên DevTools với thiết bị iPhone 14, layout tự động co giãn đúng cách — các thẻ sản phẩm từ 4 cột desktop xuống 2 cột tablet rồi 1 cột mobile, header chuyển sang menu compact. Không có phần tử nào bị tràn ra ngoài màn hình.

---

### Google Analytics 4

**GA4** đã được tích hợp với Measurement ID **G-6PF4TE48Z7** thông qua Next.js `next/script` với strategy **`afterInteractive`** — script chỉ load sau khi trang đã tương tác được, tránh làm chậm quá trình render ban đầu. GA4 tracking toàn bộ pageview, session, user behavior — dữ liệu này là input quan trọng cho việc tối ưu SEO về sau.

---

## ═══ 3.3 — OFF-PAGE SEO ═══

Off-page SEO là các hoạt động **bên ngoài website** nhằm xây dựng độ tin cậy và thẩm quyền của thương hiệu trong mắt Google.

> 🖥️ **SHOW:** Mở ảnh chụp trang Facebook hoặc profile TikTok của MixiGui — thấy link website trong bio

Do thời gian thực hiện đồ án có hạn, nhóm tập trung vào việc **xây dựng Social Entity** — tức là tạo ra sự hiện diện có thực của thương hiệu MIXIGUI trên internet, vượt ra ngoài phạm vi domain `mixigui.id.vn`.

Nhóm đã thiết lập hiện diện trên ba nền tảng lớn: **Facebook**, **TikTok**, và **YouTube**. Mỗi trang đều có tên thương hiệu MIXIGUI nhất quán và có link dẫn về `mixigui.id.vn` trong phần giới thiệu. Điều này tạo ra các **backlink từ các nền tảng domain authority cao** — Facebook và YouTube là hai trong số những website có DA cao nhất thế giới.

---

Nhóm cũng chia sẻ các bài viết blog lên mạng xã hội với preview link đầy đủ — tạo ra **social signal** và **tín hiệu thương hiệu**. Khi nhiều người share link `mixigui.id.vn`, Google ghi nhận đây là nội dung được lan truyền tự nhiên và tăng độ tin cậy cho domain.

---

> 🖥️ **SHOW:** Mở Google → gõ tìm kiếm `mixigui` → thấy `mixigui.id.vn` xuất hiện trong kết quả

Kết quả cụ thể nhất có thể thấy ngay bây giờ: khi tìm kiếm từ khóa **"mixigui"** trên Google, website đã xuất hiện trong kết quả tìm kiếm. Đây là **tín hiệu thương hiệu quan trọng** — khi người dùng tìm đúng tên thương hiệu và click vào kết quả, Google hiểu rằng đây là thương hiệu thật có người dùng tìm kiếm. Theo thời gian, tín hiệu này sẽ giúp cải thiện ranking cho cả các từ khóa liên quan.

---

## ═══ 3.4 — CẤU TRÚC INTERNAL LINK ═══

> 🖥️ **SHOW:** Mở `https://mixigui.id.vn/blog/bam-hop-am-guitar-bi-re` → scroll từ từ xuống cuối trang

Đây là phần nhóm mình tự hào nhất về mặt **thiết kế kỹ thuật có chủ đích**.

**Internal Link** là các liên kết giữa các trang trong cùng một website. Nhiều người nghĩ internal link chỉ là menu navigation — nhưng thực tế internal link là một trong những công cụ SEO mạnh nhất mà chủ website có thể kiểm soát hoàn toàn.

---

Nhóm xây dựng cấu trúc Internal Link theo **mô hình phễu chuyển đổi 3 tầng**:

> **Blog bài viết → Landing Page khóa học → Trang sản phẩm**

Tầng đầu tiên — **Blog** — là nội dung thông tin, thu hút người dùng ở giai đoạn "awareness". Người đọc bài "Bấm hợp âm guitar bị rè phải làm sao" là người đang học guitar, có nhu cầu cải thiện kỹ năng.

Tầng thứ hai — **Khóa học** — điều hướng người dùng sang giai đoạn "consideration". Cuối bài blog xuất hiện section **"Khóa học liên quan"** với 2 card khóa học guitar — người đọc tự nhiên click vào để tìm hiểu thêm.

Tầng thứ ba — **Sản phẩm** — điều hướng sang "decision". Từ trang khóa học, có section **"Cần nhạc cụ để luyện tập?"** với nút dẫn thẳng sang `/san-pham`.

---

> 🖥️ **SHOW:** Thấy section "Có thể bạn quan tâm" với cards khóa học và nhạc cụ

Điểm kỹ thuật quan trọng: toàn bộ các card trong section "Có thể bạn quan tâm" được **lấy động từ database Supabase** qua API call — không phải link cứng được gắn thủ công. Điều này đảm bảo tính linh hoạt: khi thêm sản phẩm hay khóa học mới vào database, chúng tự động xuất hiện trong phần gợi ý của blog.

---

> 🖥️ **SHOW:** Click vào một card khóa học → mở trang khóa học → scroll xuống thấy section "Cần nhạc cụ để luyện tập?"

Tiếp tục hành trình người dùng — từ trang khóa học, section **"Cần nhạc cụ để luyện tập?"** với ba nút: "Xem nhạc cụ", "Guitar Yamaha", "Piano Roland" — tất cả đều dẫn về `/san-pham`. Toàn bộ phễu từ blog đến sản phẩm được kết nối hoàn chỉnh.

---

Về ý nghĩa SEO, cấu trúc này phục vụ **ba mục tiêu cụ thể**:

Thứ nhất là **phân phối Link Juice**. Link Juice — hay PageRank — là "điểm uy tín" Google gán cho mỗi trang. Khi trang blog có nhiều nội dung tốt được Google đánh giá cao, các internal link từ blog sẽ "truyền" một phần uy tín đó sang trang khóa học và sản phẩm — giúp những trang này tăng thứ hạng dù bản thân chúng có ít nội dung hơn.

Thứ hai là **tăng thời gian onsite và giảm bounce rate**. Khi người dùng click qua nhiều trang trong cùng một session, thời gian trên trang tăng lên và bounce rate giảm. Google đọc hai tín hiệu này như một dấu hiệu cho thấy website cung cấp nội dung hữu ích — từ đó cải thiện ranking tổng thể.

Thứ ba là **điều hướng theo conversion funnel**. Về mặt kinh doanh, cấu trúc này dẫn dắt người dùng từ giai đoạn nhận thức, đến cân nhắc, đến quyết định mua hàng — đây là nền tảng cho tỷ lệ chuyển đổi cao hơn trong dài hạn.

---

## ═══ KẾT ═══

> 🖥️ **SHOW:** Quay lại trang chủ `https://mixigui.id.vn`

Nhìn lại toàn bộ Chương 3, nhóm mình đã triển khai SEO theo hướng **xây dựng nền tảng kỹ thuật vững chắc** thay vì chỉ tối ưu bề mặt.

**On-page**: Title và meta description động theo từng trang, H1 đúng chuẩn, alt text đầy đủ, ảnh được tối ưu WebP tự động.

**Technical**: Sitemap và robots.txt tự code bằng TypeScript — không cần plugin. JSON-LD Schema cho Product và Course — Rich Results Test PASS. Core Web Vitals đạt chuẩn: LCP **1.1 giây**, FCP **0.3 giây**, SEO **100 trên 100**. HTTPS, Responsive Design, GA4 đầy đủ.

**Off-page**: Social Entity trên Facebook, TikTok, YouTube — Google đã nhận diện thương hiệu MIXIGUI.

**Internal Link**: Mô hình phễu 3 tầng Blog → Khóa học → Sản phẩm được code hoàn chỉnh với dữ liệu động từ database.

---

Tất cả những thứ này được xây dựng trực tiếp vào codebase — không phải cấu hình qua giao diện, không phải plugin. Đây là cách một đội kỹ thuật triển khai SEO — không phải bật tắt setting mà là **viết code để SEO là một phần của kiến trúc hệ thống**.

Cảm ơn thầy cô và các bạn đã lắng nghe.
