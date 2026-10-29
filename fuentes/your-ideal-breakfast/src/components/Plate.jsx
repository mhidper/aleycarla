import { cn } from '@/lib/utils'
// El "plato": círculo crema con borde, y el desayuno encima.
export default function Plate({ emoji, size = 'lg', animateKey, className }) {
  const s = size === 'lg' ? 'size-48 text-[6rem]' : size === 'md' ? 'size-36 text-7xl' : 'size-14 text-3xl'
  const ring = size === 'sm' ? 'ring-4' : 'ring-[10px]'
  return (
    <div className={cn('grid shrink-0 place-items-center rounded-full bg-crema ring-white/70', s, ring, className)}>
      <span key={animateKey} className="servir leading-none" aria-hidden="true">{emoji}</span>
    </div>
  )
}
