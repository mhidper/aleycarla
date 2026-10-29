import { cn } from '@/lib/utils'
export function Card({ className, ...props }) {
  return <div className={cn('rounded-3xl bg-white p-5', className)} {...props} />
}
export function CardTitle({ className, ...props }) {
  return <h2 className={cn('font-display text-2xl leading-tight', className)} {...props} />
}
