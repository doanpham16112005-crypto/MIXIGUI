-- ============================================================
-- MIXIGUI - Supabase Migration
-- Chạy file này trong Supabase Dashboard > SQL Editor
-- ============================================================

-- 1. CATEGORIES (Danh mục)
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  type VARCHAR(50) NOT NULL CHECK (type IN ('course', 'product', 'blog')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. COURSES (Khóa học)
CREATE TABLE IF NOT EXISTS courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  description TEXT,
  thumbnail_url TEXT,
  price DECIMAL(12,0) DEFAULT 0,
  original_price DECIMAL(12,0) DEFAULT 0,
  level VARCHAR(50) DEFAULT 'beginner' CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  duration_hours INT DEFAULT 0,
  lessons_count INT DEFAULT 0,
  students_count INT DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  category_id UUID REFERENCES categories(id),
  instructor_name VARCHAR(255),
  is_published BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PRODUCTS (Sản phẩm nhạc cụ)
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  description TEXT,
  thumbnail_url TEXT,
  price DECIMAL(12,0) NOT NULL,
  original_price DECIMAL(12,0) DEFAULT 0,
  stock INT DEFAULT 0,
  brand VARCHAR(255),
  category_id UUID REFERENCES categories(id),
  is_published BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  rating DECIMAL(3,2) DEFAULT 0,
  reviews_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. POSTS (Bài viết blog)
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  thumbnail_url TEXT,
  author_name VARCHAR(255),
  category_id UUID REFERENCES categories(id),
  is_published BOOLEAN DEFAULT true,
  views INT DEFAULT 0,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SEED DATA MẪU
-- ============================================================

-- Categories
INSERT INTO categories (name, slug, type) VALUES
  ('Guitar', 'guitar', 'course'),
  ('Piano', 'piano', 'course'),
  ('Trống', 'trong', 'course'),
  ('Nhạc cụ', 'nhac-cu', 'product'),
  ('Phụ kiện', 'phu-kien', 'product'),
  ('Kiến thức âm nhạc', 'kien-thuc-am-nhac', 'blog')
ON CONFLICT (slug) DO NOTHING;

-- Courses
INSERT INTO courses (title, slug, description, price, original_price, level, duration_hours, lessons_count, students_count, rating, instructor_name, is_featured, category_id)
SELECT
  'Học Guitar từ Cơ Bản đến Nâng Cao',
  'hoc-guitar-co-ban-nang-cao',
  'Khóa học guitar toàn diện dành cho người mới bắt đầu, giúp bạn tự tin biểu diễn trong 3 tháng.',
  990000, 1500000, 'beginner', 24, 48, 1250, 4.8,
  'Thầy Nguyễn Minh Tuấn', true, c.id
FROM categories c WHERE c.slug = 'guitar'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO courses (title, slug, description, price, original_price, level, duration_hours, lessons_count, students_count, rating, instructor_name, is_featured, category_id)
SELECT
  'Piano Cơ Bản cho Người Mới',
  'piano-co-ban-nguoi-moi',
  'Học đàn piano từ con số 0 với phương pháp giảng dạy hiện đại, dễ hiểu.',
  1200000, 2000000, 'beginner', 30, 60, 890, 4.7,
  'Cô Trần Thị Lan', true, c.id
FROM categories c WHERE c.slug = 'piano'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO courses (title, slug, description, price, original_price, level, duration_hours, lessons_count, students_count, rating, instructor_name, is_featured, category_id)
SELECT
  'Kỹ Thuật Đánh Trống Chuyên Nghiệp',
  'ky-thuat-danh-trong-chuyen-nghiep',
  'Nâng cao kỹ năng đánh trống với các bài học từ nhạc sĩ chuyên nghiệp.',
  800000, 1200000, 'intermediate', 20, 40, 560, 4.6,
  'Thầy Lê Hoàng Nam', false, c.id
FROM categories c WHERE c.slug = 'trong'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO courses (title, slug, description, price, original_price, level, duration_hours, lessons_count, students_count, rating, instructor_name, is_featured, category_id)
SELECT
  'Guitar Fingerstyle Nâng Cao',
  'guitar-fingerstyle-nang-cao',
  'Kỹ thuật fingerstyle cho người đã có nền tảng guitar, học cách tạo ra âm thanh độc đáo.',
  1500000, 2500000, 'advanced', 36, 72, 320, 4.9,
  'Thầy Phạm Duy Khánh', false, c.id
FROM categories c WHERE c.slug = 'guitar'
ON CONFLICT (slug) DO NOTHING;

-- Products
INSERT INTO products (name, slug, description, price, original_price, stock, brand, is_featured, rating, reviews_count, category_id)
SELECT
  'Đàn Guitar Acoustic Yamaha F310',
  'dan-guitar-acoustic-yamaha-f310',
  'Đàn guitar acoustic chất lượng cao của Yamaha, âm thanh ấm áp, phù hợp cho người mới học.',
  2500000, 3200000, 15, 'Yamaha', true, 4.7, 128, c.id
FROM categories c WHERE c.slug = 'nhac-cu'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, original_price, stock, brand, is_featured, rating, reviews_count, category_id)
SELECT
  'Đàn Piano Điện Casio CT-S300',
  'dan-piano-dien-casio-ct-s300',
  '61 phím đàn piano điện nhỏ gọn, phù hợp để học tập và biểu diễn nhạc nhẹ.',
  3200000, 4000000, 8, 'Casio', true, 4.5, 95, c.id
FROM categories c WHERE c.slug = 'nhac-cu'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, original_price, stock, brand, is_featured, rating, reviews_count, category_id)
SELECT
  'Bộ Trống Điện Roland TD-1K',
  'bo-trong-dien-roland-td-1k',
  'Bộ trống điện nhỏ gọn, âm thanh chân thực, lý tưởng để tập luyện tại nhà.',
  8500000, 10000000, 5, 'Roland', true, 4.8, 64, c.id
FROM categories c WHERE c.slug = 'nhac-cu'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, original_price, stock, brand, is_featured, rating, reviews_count, category_id)
SELECT
  'Pick Guitar Dunlop Variety Pack',
  'pick-guitar-dunlop-variety-pack',
  'Bộ pick guitar đa dạng độ dày từ 0.38mm đến 1mm, phù hợp nhiều phong cách chơi.',
  120000, 150000, 100, 'Dunlop', false, 4.6, 210, c.id
FROM categories c WHERE c.slug = 'phu-kien'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, price, original_price, stock, brand, is_featured, rating, reviews_count, category_id)
SELECT
  'Dây Đàn Guitar Elixir Nanoweb 80/20',
  'day-dan-guitar-elixir-nanoweb',
  'Dây đàn guitar chất lượng cao với lớp phủ Nanoweb giúp dây bền lâu, âm thanh sáng.',
  350000, 420000, 50, 'Elixir', false, 4.9, 183, c.id
FROM categories c WHERE c.slug = 'phu-kien'
ON CONFLICT (slug) DO NOTHING;

-- Posts
INSERT INTO posts (title, slug, excerpt, author_name, is_published, views, category_id)
SELECT
  '5 Bài Tập Ngón Tay Guitar Giúp Bạn Tiến Bộ Nhanh',
  '5-bai-tap-ngon-tay-guitar',
  'Luyện tập ngón tay đúng cách là chìa khóa giúp bạn tiến bộ nhanh chóng trong học guitar. Khám phá 5 bài tập hiệu quả nhất.',
  'Thầy Nguyễn Minh Tuấn', true, 1520, c.id
FROM categories c WHERE c.slug = 'kien-thuc-am-nhac'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO posts (title, slug, excerpt, author_name, is_published, views, category_id)
SELECT
  'So Sánh Guitar Acoustic và Guitar Classic: Nên Chọn Loại Nào?',
  'so-sanh-guitar-acoustic-va-classic',
  'Người mới học guitar thường băn khoăn giữa guitar acoustic và guitar classic. Bài viết này sẽ giúp bạn đưa ra lựa chọn phù hợp.',
  'Biên tập viên MixiGui', true, 3240, c.id
FROM categories c WHERE c.slug = 'kien-thuc-am-nhac'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO posts (title, slug, excerpt, author_name, is_published, views, category_id)
SELECT
  'Hướng Dẫn Chỉnh Dây Đàn Guitar Chuẩn Cho Người Mới',
  'huong-dan-chinh-day-dan-guitar',
  'Chỉnh dây đàn đúng chuẩn là bước đầu tiên bạn cần thực hiện trước mỗi buổi tập. Xem hướng dẫn chi tiết.',
  'Cô Trần Thị Lan', true, 2100, c.id
FROM categories c WHERE c.slug = 'kien-thuc-am-nhac'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO posts (title, slug, excerpt, author_name, is_published, views, category_id)
SELECT
  'Top 10 Bản Nhạc Piano Dễ Học Dành Cho Người Mới Bắt Đầu',
  'top-10-ban-nhac-piano-de-hoc',
  'Bắt đầu hành trình piano của bạn với những bản nhạc đẹp và không quá khó. Tổng hợp 10 bản nhạc được yêu thích nhất.',
  'Cô Trần Thị Lan', true, 4510, c.id
FROM categories c WHERE c.slug = 'kien-thuc-am-nhac'
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- ROW LEVEL SECURITY (cho phép đọc public)
-- ============================================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read courses" ON courses FOR SELECT USING (is_published = true);
CREATE POLICY "Public read products" ON products FOR SELECT USING (is_published = true);
CREATE POLICY "Public read posts" ON posts FOR SELECT USING (is_published = true);
