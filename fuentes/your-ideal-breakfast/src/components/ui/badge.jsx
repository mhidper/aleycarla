import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
const badgeVariants = cva('inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-bold [&_svg]:size-4', {
  variants: {
    variant: {
      default: 'bg-white text-chocolate',
      warning: 'bg-tostado text-white',
      outline: 'border-2 border-current',
    },
  },
  defaultVariants: { variant: 'default' },
})
export function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}
