import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-extrabold transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-5 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-chocolate text-crema hover:bg-chocolate/90',
        secondary: 'bg-crema text-chocolate hover:bg-white',
        outline: 'border-2 border-current bg-transparent hover:bg-white/15',
        ghost: 'bg-transparent hover:bg-chocolate/5',
      },
      size: {
        default: 'h-12 px-6 text-base',
        sm: 'h-9 px-4 text-sm',
        icon: 'size-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

export function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
}
