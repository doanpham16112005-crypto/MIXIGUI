import { PageHeader } from '@/components/shared/page-header'
import { ProductForm } from '@/components/shop/product-form'

export default function CreateProduct() {
  return (
    <div>
      <PageHeader title="Tạo sản phẩm mới" />
      <ProductForm onSubmit={(data) => console.log(data)} />
    </div>
  )
}
