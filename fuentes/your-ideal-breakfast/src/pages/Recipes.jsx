import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TriangleAlert } from 'lucide-react'
import recipes from '@/data/recipes.json'
import { usePrefs } from '@/lib/store'
import { tr, SEASONS, ALLERGENS } from '@/lib/i18n'
import { getSeason } from '@/lib/calendar'
import { cn } from '@/lib/utils'
import Plate from '@/components/Plate'
import { SEASON_ICONS, SeasonLabel } from '@/components/RecipeMeta'
import { PartyPopper } from 'lucide-react'

export default function Recipes() {
  const { t, lang, allergies, today } = usePrefs()
  const [filter, setFilter] = useState(getSeason(today))

  const filters = [
    { id: 'all', label: t.filter_all },
    ...Object.keys(SEASONS).map((s) => ({ id: s, label: SEASONS[s][lang], Icon: SEASON_ICONS[s] })),
    { id: 'holidays', label: t.filter_holidays, Icon: PartyPopper },
  ]
  const list = recipes.filter((r) =>
    filter === 'all' ? true : filter === 'holidays' ? !!r.holiday : r.season === filter && !r.holiday)

  return (
    <div className="px-5 pt-6">
      <h1 className="font-display text-4xl">{t.recipes_title}</h1>
      <p className="mt-1 text-lg">{t.recipes_intro}</p>

      <div className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-1" role="tablist">
        {filters.map(({ id, label, Icon }) => (
          <button key={id} role="tab" aria-selected={filter === id} onClick={() => setFilter(id)}
            className={cn('inline-flex shrink-0 items-center gap-1.5 rounded-full border-2 px-4 py-2 font-extrabold transition-colors',
              filter === id ? 'border-chocolate bg-chocolate text-crema' : 'border-chocolate/15 bg-white hover:border-chocolate/40')}>
            {Icon && <Icon className="size-4" />}{label}
          </button>
        ))}
      </div>

      <ul className="mt-5 divide-y divide-chocolate/10 rounded-3xl bg-white">
        {list.map((r) => {
          const blocked = r.allergens.filter((a) => allergies.includes(a))
          return (
            <li key={r.id}>
              <Link to={`/receta/${r.id}`} className={cn('flex items-center gap-4 p-4', blocked.length && 'opacity-60')}>
                <Plate emoji={r.emoji} size="sm" className="ring-crema" />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg leading-tight">{tr(r, 'name', lang)}</p>
                  <p className="mt-0.5 text-sm font-bold text-chocolate/60">
                    <SeasonLabel season={r.season} holiday={r.holiday} /> <span className="ml-2">{r.time_minutes} {t.minutes}</span>
                  </p>
                  {blocked.length > 0 && (
                    <p className="mt-1 flex items-center gap-1 text-sm font-extrabold text-tostado">
                      <TriangleAlert className="size-4" />{t.contains}: {blocked.map((a) => ALLERGENS[a][lang].toLowerCase()).join(', ')}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          )
        })}
        {list.length === 0 && <li className="p-6 text-center font-bold">{t.empty_filter}</li>}
      </ul>
    </div>
  )
}
