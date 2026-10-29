import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '@/lib/utils'
export function Switch({ className, ...props }) {
  return (
    <SwitchPrimitive.Root
      className={cn('peer inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full p-1 transition-colors data-[state=checked]:bg-tostado data-[state=unchecked]:bg-chocolate/20', className)}
      {...props}
    >
      <SwitchPrimitive.Thumb className="block size-6 rounded-full bg-white shadow transition-transform data-[state=checked]:translate-x-6" />
    </SwitchPrimitive.Root>
  )
}
