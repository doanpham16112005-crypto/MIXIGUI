'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

type Product = {
  id: string
  name: string
  slug: string
  description: string | null
  images: string[]
  price: number
  discount_price: number | null
  brand: string | null
  stock: number | null
  is_published: boolean
}

export default function SanPhamDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  const [product, setProduct] = useState<Product | null>(null)
  const [related, setRelated] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('products')
        .select('id, name, slug, description, images, price, discount_price, brand, stock, is_published')
        .eq('slug', slug)
        .single()
      setProduct(data)

      if (data?.brand) {
        const { data: rel } = await supabase
          .from('products')
          .select('id, name, slug, images, price, discount_price, brand')
          .eq('is_published', true)
          .eq('brand', data.brand)
          .neq('slug', slug)
          .limit(4)
        setRelated(rel ?? [])
      }
      setLoading(false)
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <div className="text-6xl">😕</div>
        <h1 className="text-2xl font-bold text-gray-800">Không tìm thấy sản phẩm</h1>
        <Link href="/san-pham" className="rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700">
          Xem tất cả sản phẩm
        </Link>
      </div>
    )
  }

  const images = Array.isArray(product.images) && product.images.length > 0 ? product.images : []
  const discountPct = product.discount_price && product.discount_price < product.price
    ? Math.round((1 - product.discount_price / product.price) * 100)
    : null
  const inStock = product.stock == null || product.stock > 0

  const handleAddToCart = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <main>
      {/* ── BREADCRUMB ── */}
      <div className="border-b bg-gray-50 py-3">
        <div className="mx-auto max-w-7xl px-4">
          <nav className="text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
            <span className="mx-2">/</span>
            <Link href="/san-pham" className="hover:text-blue-600">Sản phẩm</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* ── CHI TIẾT ── */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2">

            {/* Ảnh sản phẩm */}
            <div>
              <div className="relative overflow-hidden rounded-2xl border bg-gray-50 aspect-square">
                {images[activeImg] ? (
                  <img
                    src={images[activeImg]}
                    alt={product.name}
                    className="h-full w-full object-contain p-4"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-8xl">🎵</div>
                )}
                {discountPct && (
                  <span className="absolute left-4 top-4 rounded-full bg-red-500 px-3 py-1 text-sm font-bold text-white">
                    -{discountPct}%
                  </span>
                )}
              </div>
              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`shrink-0 h-16 w-16 overflow-hidden rounded-lg border-2 transition ${
                        activeImg === i ? 'border-blue-500' : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Thông tin */}
            <div>
              {product.brand && (
                <span className="mb-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                  {product.brand}
                </span>
              )}
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{product.name}</h1>

              {/* Giá */}
              <div className="mt-4 flex items-end gap-3">
                <span className="text-3xl font-extrabold text-blue-600">
                  {Number(product.price).toLocaleString('vi-VN')}₫
                </span>
                {product.discount_price && product.discount_price < product.price && (
                  <span className="mb-1 text-lg text-gray-400 line-through">
                    {Number(product.discount_price).toLocaleString('vi-VN')}₫
                  </span>
                )}
                {discountPct && (
                  <span className="mb-1 rounded bg-red-100 px-2 py-0.5 text-sm font-semibold text-red-600">
                    Tiết kiệm {discountPct}%
                  </span>
                )}
              </div>

              {/* Trạng thái kho */}
              <div className="mt-3 flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                  inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                  {inStock ? 'Còn hàng' : 'Hết hàng'}
                </span>
                {product.stock != null && product.stock > 0 && product.stock <= 10 && (
                  <span className="text-xs text-orange-500">Chỉ còn {product.stock} sản phẩm</span>
                )}
              </div>

              {/* Cam kết */}
              <div className="mt-5 grid grid-cols-2 gap-2">
                {[
                  { icon: '✅', text: 'Hàng chính hãng 100%' },
                  { icon: '🔄', text: 'Đổi trả trong 7 ngày' },
                  { icon: '🚚', text: 'Giao hàng toàn quốc' },
                  { icon: '🛠️', text: 'Bảo hành 12–24 tháng' },
                ].map((c) => (
                  <div key={c.text} className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-600">
                    <span>{c.icon}</span>{c.text}
                  </div>
                ))}
              </div>

              {/* Số lượng + Mua */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">Số lượng:</span>
                  <div className="flex items-center rounded-lg border">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-l-lg transition"
                    >−</button>
                    <span className="min-w-[2.5rem] text-center text-sm font-semibold">{qty}</span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      className="px-3 py-2 text-gray-500 hover:bg-gray-100 rounded-r-lg transition"
                    >+</button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!inStock}
                    className={`flex-1 rounded-full py-3 font-semibold text-white shadow transition ${
                      added
                        ? 'bg-green-500'
                        : inStock
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    {added ? '✓ Đã thêm vào giỏ' : '🛒 Thêm vào giỏ hàng'}
                  </button>
                  <button className="rounded-full border-2 border-blue-600 px-6 py-3 font-semibold text-blue-600 transition hover:bg-blue-50">
                    Mua ngay
                  </button>
                </div>

                <Link
                  href="/lien-he"
                  className="flex items-center justify-center gap-2 rounded-full border border-gray-300 py-2.5 text-sm text-gray-600 transition hover:bg-gray-50"
                >
                  📞 Tư vấn mua hàng miễn phí
                </Link>
              </div>

              {/* Mô tả ngắn */}
              {product.description && (
                <div className="mt-6 rounded-xl bg-blue-50 p-4">
                  <h3 className="mb-2 font-semibold text-gray-800">Mô tả sản phẩm</h3>
                  <p className="text-sm leading-relaxed text-gray-600 whitespace-pre-line">{product.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── THÔNG TIN THÊM ── */}
      <section className="border-t bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-3">

            {/* Thông số kỹ thuật */}
            <div className="lg:col-span-2">
              <h2 className="mb-5 text-xl font-bold text-gray-900">Thông tin sản phẩm</h2>
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ['Tên sản phẩm', product.name],
                    ['Thương hiệu', product.brand ?? '—'],
                    ['Tình trạng', inStock ? 'Còn hàng' : 'Hết hàng'],
                    ['Bảo hành', '12 – 24 tháng chính hãng'],
                    ['Xuất xứ', 'Nhập khẩu chính hãng'],
                    ['Giao hàng', 'Toàn quốc, miễn phí từ 2 triệu'],
                  ].map(([key, val]) => (
                    <tr key={key} className="border-b">
                      <td className="py-3 pr-4 font-medium text-gray-500 w-40">{key}</td>
                      <td className="py-3 text-gray-800">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Hỗ trợ */}
            <div className="space-y-4">
              <h2 className="mb-5 text-xl font-bold text-gray-900">Hỗ trợ mua hàng</h2>
              {[
                { icon: '📞', title: 'Hotline tư vấn', sub: '1800 6868 (miễn phí)', desc: 'Thứ 2 – Thứ 7, 8:00 – 21:00' },
                { icon: '💬', title: 'Chat trực tuyến', sub: 'Phản hồi trong 5 phút', desc: 'Tất cả các ngày trong tuần' },
                { icon: '🏪', title: 'Xem tại showroom', sub: 'Hà Nội & TP.HCM', desc: 'Thử sản phẩm trước khi mua' },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 rounded-xl border bg-white p-4 shadow-sm">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                    <p className="text-sm text-blue-600 font-medium">{item.sub}</p>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SẢN PHẨM LIÊN QUAN ── */}
      {related.length > 0 && (
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Sản phẩm cùng thương hiệu</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => {
                const img = Array.isArray(p.images) ? p.images[0] : null
                const pct = p.discount_price && p.discount_price < p.price
                  ? Math.round((1 - p.discount_price / p.price) * 100) : null
                return (
                  <Link key={p.id} href={`/san-pham/${p.slug}`}
                    className="group overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md">
                    <div className="relative h-44 overflow-hidden bg-gray-50">
                      {img
                        ? <img src={img} alt={p.name} className="h-full w-full object-contain p-3 transition group-hover:scale-105" loading="lazy" />
                        : <div className="flex h-full items-center justify-center text-5xl">🎵</div>
                      }
                      {pct && (
                        <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">-{pct}%</span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="line-clamp-2 text-sm font-semibold text-gray-800 group-hover:text-blue-600">{p.name}</h3>
                      <p className="mt-2 font-bold text-blue-600">{Number(p.price).toLocaleString('vi-VN')}₫</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="bg-blue-50 py-10 text-center">
        <div className="mx-auto max-w-xl px-4">
          <p className="text-lg font-semibold text-gray-800">Cần tư vấn thêm về sản phẩm?</p>
          <p className="mt-1 text-sm text-gray-500">Đội ngũ MixiGui sẵn sàng hỗ trợ bạn chọn nhạc cụ phù hợp nhất</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link href="/lien-he" className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 transition">
              Liên hệ tư vấn
            </Link>
            <Link href="/san-pham" className="rounded-full border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition">
              Xem thêm sản phẩm
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
