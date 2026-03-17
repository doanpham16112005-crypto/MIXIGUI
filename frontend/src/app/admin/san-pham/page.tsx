'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { PageHeader } from '@/components/shared/page-header'
import { Button } from '@/components/ui/button'

type Product = { id: string; name: string; slug: string; brand: string; price: number; stock: number; is_published: boolean; images: string[] }

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    setLoading(true)
    const { data } = await supabase.from('products').select('id, name, slug, brand, price, stock, is_published, images').order('created_at', { ascending: false })
    setProducts(data ?? [])
    setLoading(false)
  }

  const togglePublish = async (id: string, current: boolean) => {
    await supabase.from('products').update({ is_published: !current }).eq('id', id)
    fetchProducts()
  }

  const deleteProduct = async (id: string, name: string) => {
    if (!confirm(`Xóa sản phẩm "${name}"?`)) return
    await supabase.from('products').delete().eq('id', id)
    fetchProducts()
  }

  useEffect(() => { fetchProducts() }, [])

  return (
    <div>
      <div className="flex items-center justify-between">
        <PageHeader title="Quản lý sản phẩm" />
        <Link href="/admin/san-pham/tao-moi"><Button>+ Thêm mới</Button></Link>
      </div>
      {loading ? <div className="py-10 text-center text-gray-400">Đang tải...</div> : (
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-500">
              <tr>
                <th className="px-4 py-3">Sản phẩm</th>
                <th className="px-4 py-3">Thương hiệu</th>
                <th className="px-4 py-3">Giá</th>
                <th className="px-4 py-3">Tồn kho</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.length === 0 ? (
                <tr><td colSpan={6} className="py-10 text-center text-gray-400">Chưa có sản phẩm</td></tr>
              ) : products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.images?.[0] && <img src={p.images[0]} alt={p.name} className="h-10 w-10 rounded object-cover" />}
                      <div>
                        <p className="font-medium text-gray-800 line-clamp-1">{p.name}</p>
                        <p className="text-xs text-gray-400">{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{p.brand}</td>
                  <td className="px-4 py-3">{Number(p.price).toLocaleString('vi-VN')}₫</td>
                  <td className="px-4 py-3"><span className={p.stock === 0 ? 'text-red-500' : 'text-gray-700'}>{p.stock}</span></td>
                  <td className="px-4 py-3">
                    <button onClick={() => togglePublish(p.id, p.is_published)} className={`rounded-full px-2 py-0.5 text-xs font-medium ${p.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {p.is_published ? 'Đang hiện' : 'Ẩn'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link href={`/admin/san-pham/${p.id}`} className="text-blue-600 hover:underline">Sửa</Link>
                      <button onClick={() => deleteProduct(p.id, p.name)} className="text-red-500 hover:underline">Xóa</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
