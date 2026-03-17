import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-gray-500">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <span>/</span>}
          {item.href ? <Link href={item.href} className="hover:text-blue-600">{item.label}</Link> : <span className="text-gray-800">{item.label}</span>}
        </span>
      ))}
    </nav>
  )
}
