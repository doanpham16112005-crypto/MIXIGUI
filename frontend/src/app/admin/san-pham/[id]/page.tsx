import { PageHeader } from '@/components/shared/page-header'
import { ProductForm } from '@/components/shop/product-form'

export default async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div>
      <PageHeader title={`Chỉnh sửa sản phẩm #${id}`} />
      <ProductForm onSubmit={(data) => console.log(data)} />
    </div>
  )
}
