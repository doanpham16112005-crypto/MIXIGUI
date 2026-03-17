export { FormProvider as Form, useFormContext, Controller as FormField } from 'react-hook-form'

export function FormItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`space-y-1 ${className ?? ''}`}>{children}</div>
}

export function FormMessage({ children }: { children?: React.ReactNode }) {
  if (!children) return null
  return <p className="text-sm text-red-500">{children}</p>
}
