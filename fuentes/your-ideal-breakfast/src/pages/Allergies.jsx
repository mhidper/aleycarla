import { Wheat, Milk, Egg, Nut, Bean, Sprout, Circle, CalendarDays, RotateCcw } from 'lucide-react'
import { usePrefs } from '@/lib/store'
import { ALLERGENS } from '@/lib/i18n'
import { toISODate } from '@/lib/calendar'
import { Card, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'

const ICONS = { gluten: Wheat, milk: Milk, egg: Egg, nuts: Nut, peanut: Bean, soy: Sprout, sesame: Circle }

export default function Allergies() {
  const { t, lang, allergies, toggleAllergy, demoDate, setDemoDate } = usePrefs()
  return (
    <div className="space-y-4 px-5 pt-6">
      <div>
        <h1 className="font-display text-4xl">{t.allergies_title}</h1>
        <p className="mt-1 text-lg leading-snug">{t.allergies_intro}</p>
      </div>

      <Card className="p-2">
        <ul className="divide-y divide-chocolate/10">
          {Object.entries(ALLERGENS).map(([id, a]) => {
            const Icon = ICONS[id]
            const on = allergies.includes(id)
            return (
              <li key={id}>
                <label className="flex cursor-pointer items-center gap-3 p-3">
                  <span className={`grid size-11 shrink-0 place-items-center rounded-full ${on ? 'bg-tostado text-white' : 'bg-crema'}`}>
                    <Icon className="size-6" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-lg font-extrabold leading-tight">{a[lang]}</span>
                    <span className="block text-sm font-semibold text-chocolate/60">{a[`hint_${lang}`]}</span>
                  </span>
                  <Switch checked={on} onCheckedChange={() => toggleAllergy(id)} aria-label={a[lang]} />
                </label>
              </li>
            )
          })}
        </ul>
      </Card>
      <p className="px-1 font-bold text-chocolate/70" aria-live="polite">{t.allergies_count(allergies.length)}</p>

      <Card className="border-2 border-dashed border-chocolate/20 bg-transparent">
        <CardTitle className="flex items-center gap-2 text-xl"><CalendarDays className="size-5 text-tostado" />{t.demo_title}</CardTitle>
        <p className="mt-1 leading-snug">{t.demo_intro}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <input type="date" value={demoDate || toISODate(new Date())}
            onChange={(e) => setDemoDate(e.target.value || null)}
            className="h-11 rounded-full border-2 border-chocolate/20 bg-white px-4 font-bold" />
          {demoDate && <Button variant="ghost" size="sm" onClick={() => setDemoDate(null)}><RotateCcw />{t.demo_reset}</Button>}
        </div>
      </Card>
    </div>
  )
}
