import { NavLink } from 'react-router-dom'
import { Sunrise, BookOpen, ShieldCheck } from 'lucide-react'
import { usePrefs } from '@/lib/store'
import { cn } from '@/lib/utils'

export default function BottomNav() {
  const { t, allergies } = usePrefs()
  const items = [
    { to: '/', label: t.nav_today, Icon: Sunrise, end: true },
    { to: '/recetas', label: t.nav_recipes, Icon: BookOpen },
    { to: '/alergias', label: t.nav_allergies, Icon: ShieldCheck, count: allergies.length },
  ]
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-chocolate/10 bg-white pb-[env(safe-area-inset-bottom)]">
      <ul className="mx-auto grid max-w-md grid-cols-3">
        {items.map(({ to, label, Icon, end, count }) => (
          <li key={to}>
            <NavLink to={to} end={end}
              className={({ isActive }) => cn('relative flex flex-col items-center gap-0.5 py-2.5 text-xs font-extrabold',
                isActive ? 'text-tostado' : 'text-chocolate/55 hover:text-chocolate')}>
              <Icon className="size-6" strokeWidth={2.4} />
              {label}
              {count > 0 && (
                <span className="absolute right-[calc(50%-22px)] top-1.5 grid size-5 place-items-center rounded-full bg-tostado text-[11px] text-white">{count}</span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
