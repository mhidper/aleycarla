import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, RefreshCw, TriangleAlert, Download, ArrowLeft, ListChecks, CalendarPlus, X } from 'lucide-react'
import recipes from '@/data/recipes.json'
import ingredients from '@/data/ingredients.json'
import { usePrefs } from '@/lib/store'
import { tr, ALLERGENS } from '@/lib/i18n'
import { AISLE_ORDER } from '@/lib/i18n-week'
import { nextWeekDates, buildWeek, alternatives, toISODate } from '@/lib/calendar'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Plate from '@/components/Plate'
import { SeasonLabel } from '@/components/RecipeMeta'

// Plan semanal (en Base44 será la entidad WeeklyPlan).
const KEY = 'yib-week'
const byId = Object.fromEntries(recipes.map((r) => [r.id, r]))
const ingById = Object.fromEntries(ingredients.map((i) => [i.id, i]))
const asDate = (iso) => new Date(`${iso}T09:00:00`)

function loadPlan() { try { return JSON.parse(localStorage.getItem(KEY)) } catch { return null } }
function savePlan(p) { try { localStorage.setItem(KEY, JSON.stringify(p)) } catch { /* sin almacenamiento */ } }

function freshPlan(today, allergies) {
  return { days: buildWeek(recipes, nextWeekDates(today), allergies), step: 0, missing: [] }
}

export default function Week() {
  const { t, lang, allergies, today } = usePrefs()
  const w = t.w
  const locale = lang === 'es' ? 'es-ES' : 'en-GB'

  const [plan, setPlan] = useState(() => {
    const saved = loadPlan()
    const firstDay = toISODate(nextWeekDates(today)[0])
    return saved && saved.days?.[0]?.date === firstDay ? saved : freshPlan(today, allergies)
  })
  const [changing, setChanging] = useState(null) // índice del día que se está cambiando
  const [page, setPage] = useState(0)

  // Si cambia la fecha (fecha de prueba), se rehace el plan.
  useEffect(() => {
    const firstDay = toISODate(nextWeekDates(today)[0])
    if (plan.days[0]?.date !== firstDay) setPlan(freshPlan(today, allergies))
  }, [today]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { savePlan(plan) }, [plan])

  const update = (fn) => setPlan((p) => ({ ...p, ...fn(p) }))
  const isUnsafe = (r) => r && r.allergens.some((a) => allergies.includes(a))
  const okCount = plan.days.filter((d) => d.accepted && !isUnsafe(byId[d.recipeId])).length

  const fmtDay = (iso, opts) => asDate(iso).toLocaleDateString(locale, opts)
  const fmtLong = (iso) => `${fmtDay(iso, { weekday: 'long' })} ${fmtDay(iso, { day: 'numeric', month: 'long' })}`
  const range = w.range(fmtLong(plan.days[0].date), fmtLong(plan.days[6].date))

  // Ingredientes de la semana, agrupados por sección del súper
  const needed = useMemo(() => {
    const count = {}
    plan.days.forEach((d) => (byId[d.recipeId]?.shopping_items || []).forEach((k) => { count[k] = (count[k] || 0) + 1 }))
    return AISLE_ORDER.map((aisle) => ({
      aisle,
      items: Object.keys(count).filter((k) => ingById[k].aisle === aisle)
        .map((k) => ({ ...ingById[k], count: count[k] }))
        .sort((a, b) => tr(a, 'name', lang).localeCompare(tr(b, 'name', lang), locale)),
    })).filter((g) => g.items.length)
  }, [plan.days, lang, locale])

  const allNeededIds = needed.flatMap((g) => g.items.map((i) => i.id))
  const missing = plan.missing.filter((id) => allNeededIds.includes(id))

  const accept = (i) => update((p) => ({ days: p.days.map((d, j) => (j === i ? { ...d, accepted: true } : d)) }))
  const choose = (i, recipeId) => {
    update((p) => ({ days: p.days.map((d, j) => (j === i ? { ...d, recipeId, accepted: true } : d)) }))
    setChanging(null)
  }
  const toggleMissing = (id) => update((p) => ({ missing: p.missing.includes(id) ? p.missing.filter((x) => x !== id) : [...p.missing, id] }))

  const pdf = async () => (await import('@/lib/pdf')).downloadShoppingList({
    title: w.list_title,
    subtitle: range,
    groups: needed.map((g) => ({
      title: w.aisles[g.aisle],
      items: g.items.filter((i) => missing.includes(i.id)).map((i) => ({ name: tr(i, 'name', lang), note: w.for_n(i.count) })),
    })).filter((g) => g.items.length),
    breakfastsTitle: w.week_breakfasts,
    breakfasts: plan.days.map((d) => ({
      day: fmtDay(d.date, { weekday: 'long', day: 'numeric' }).replace(/^./, (c) => c.toUpperCase()),
      name: tr(byId[d.recipeId], 'name', lang),
    })),
    slogan: t.slogan,
    fileName: `${w.pdf_file}-${plan.days[0].date}`,
  })

  return (
    <>
      <section className="bg-naranja px-5 pb-9 pt-5 text-white">
        <h1 className="font-display text-4xl">{w.title}</h1>
        <p className="mt-1 font-bold text-white/90">{range}</p>
        <ol className="mt-5 grid grid-cols-3 gap-2" aria-label={w.title}>
          {w.steps.map((label, i) => (
            <li key={label} aria-current={plan.step === i ? 'step' : undefined}
              className={cn('flex flex-col items-center gap-1 rounded-2xl px-1 py-2 text-sm font-extrabold',
                plan.step === i ? 'bg-white text-chocolate' : plan.step > i ? 'bg-chocolate/20 text-white' : 'text-white/75')}>
              <span className={cn('grid size-6 shrink-0 place-items-center rounded-full font-display',
                plan.step === i ? 'bg-naranja text-white' : 'bg-white/25')}>
                {plan.step > i ? <Check className="size-4" strokeWidth={3} /> : i + 1}
              </span>
              <span>{label}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="-mt-4 space-y-3 rounded-t-3xl bg-crema px-5 pt-6">
        {/* PASO 1: desayunos */}
        {plan.step === 0 && (
          <>
            <p className="text-lg leading-snug">{w.plan_intro}</p>
            {plan.days.map((d, i) => {
              const r = byId[d.recipeId]
              const unsafe = isUnsafe(r)
              const ok = d.accepted && !unsafe
              const opts = changing === i
                ? alternatives(recipes, asDate(d.date), allergies, plan.days.map((x) => x.recipeId))
                : []
              const shown = opts.length ? Array.from({ length: Math.min(4, opts.length) }, (_, k) => opts[(page * 4 + k) % opts.length]) : []
              return (
                <Card key={d.date} className={cn('p-4', ok && 'ring-2 ring-tostado/60')}>
                  <div className="flex items-center gap-3">
                    <div className="w-11 shrink-0 text-center leading-none">
                      <span className="block text-xs font-extrabold uppercase text-chocolate/55">{fmtDay(d.date, { weekday: 'short' }).replace('.', '')}</span>
                      <span className="block font-display text-2xl">{asDate(d.date).getDate()}</span>
                    </div>
                    <Plate emoji={r.emoji} size="sm" className="ring-crema" animateKey={r.id} />
                    <div className="min-w-0 flex-1">
                      <Link to={`/receta/${r.id}`} className="font-display text-lg leading-tight hover:underline">{tr(r, 'name', lang)}</Link>
                      <p className="text-sm font-bold text-chocolate/60"><SeasonLabel season={r.season} holiday={r.holiday} /></p>
                    </div>
                    {ok && <span className="grid size-8 shrink-0 place-items-center rounded-full bg-tostado text-white" title={w.accepted}><Check className="size-5" strokeWidth={3} /></span>}
                  </div>

                  {unsafe && (
                    <p className="mt-3 flex items-start gap-2 text-sm font-extrabold text-tostado">
                      <TriangleAlert className="size-4 shrink-0" />{w.unsafe} ({r.allergens.filter((a) => allergies.includes(a)).map((a) => ALLERGENS[a][lang].toLowerCase()).join(', ')})
                    </p>
                  )}

                  {changing !== i && !ok && (
                    <div className="mt-3 flex gap-2">
                      {!unsafe && <Button size="sm" className="flex-1" onClick={() => accept(i)}><Check />{w.ok}</Button>}
                      <Button size="sm" variant="secondary" className="flex-1 bg-crema" onClick={() => { setChanging(i); setPage(0) }}><RefreshCw />{w.change}</Button>
                    </div>
                  )}
                  {changing !== i && ok && (
                    <button className="mt-2 text-sm font-extrabold text-chocolate/60 underline-offset-2 hover:underline" onClick={() => { setChanging(i); setPage(0) }}>{w.change}</button>
                  )}

                  {changing === i && (
                    <div className="mt-3 rounded-2xl bg-crema p-3">
                      <p className="font-extrabold">{w.choose_other}</p>
                      <ul className="mt-2 space-y-2">
                        {shown.map((o) => (
                          <li key={o.id}>
                            <button onClick={() => choose(i, o.id)}
                              className="flex w-full items-center gap-3 rounded-xl bg-white p-2.5 text-left transition-colors hover:bg-naranja/10">
                              <span className="text-3xl leading-none" aria-hidden="true">{o.emoji}</span>
                              <span className="min-w-0 flex-1">
                                <span className="block font-display leading-tight">{tr(o, 'name', lang)}</span>
                                <span className="block text-sm font-bold text-chocolate/55">{o.time_minutes} {t.minutes} <SeasonLabel className="ml-2" season={o.season} holiday={o.holiday} /></span>
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2 flex gap-2">
                        {opts.length > 4 && <Button size="sm" variant="ghost" onClick={() => setPage((n) => n + 1)}><RefreshCw />{w.more_options}</Button>}
                        <Button size="sm" variant="ghost" onClick={() => setChanging(null)}><X />{w.cancel}</Button>
                      </div>
                    </div>
                  )}
                </Card>
              )
            })}

            <div className="sticky bottom-[76px] z-10 -mx-5 mt-2 border-t border-chocolate/10 bg-crema/95 px-5 py-3 backdrop-blur">
              <p className="mb-2 text-center text-sm font-extrabold text-chocolate/70" aria-live="polite">{w.progress(okCount)}</p>
              <div className="flex gap-2">
                <Button variant="secondary" className="flex-1 bg-white"
                  onClick={() => update((p) => ({ days: p.days.map((d) => (isUnsafe(byId[d.recipeId]) ? d : { ...d, accepted: true })) }))}>
                  {w.ok_all}
                </Button>
                <Button className="flex-[1.4]" disabled={okCount < 7} onClick={() => { update(() => ({ step: 1 })); window.scrollTo(0, 0) }}>
                  {w.accept_week}
                </Button>
              </div>
            </div>
          </>
        )}

        {/* PASO 2: ingredientes que faltan */}
        {plan.step === 1 && (
          <>
            <h2 className="font-display text-3xl">{w.pantry_title}</h2>
            <p className="text-lg leading-snug">{w.pantry_intro}</p>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={() => update(() => ({ missing: allNeededIds }))}><ListChecks />{w.mark_all}</Button>
              {missing.length > 0 && <Button size="sm" variant="ghost" onClick={() => update(() => ({ missing: [] }))}><X />{w.unmark_all}</Button>}
            </div>
            {needed.map((g) => (
              <Card key={g.aisle} className="p-4">
                <h3 className="font-display text-xl text-tostado">{w.aisles[g.aisle]}</h3>
                <ul className="mt-2">
                  {g.items.map((it) => {
                    const on = missing.includes(it.id)
                    return (
                      <li key={it.id}>
                        <button onClick={() => toggleMissing(it.id)} aria-pressed={on}
                          className="flex w-full items-center gap-3 rounded-xl py-2 text-left">
                          <span className={cn('grid size-6 shrink-0 place-items-center rounded-md border-2', on ? 'border-tostado bg-tostado text-white' : 'border-chocolate/30')}>
                            {on && <Check className="size-4" strokeWidth={3} />}
                          </span>
                          <span className="flex-1 text-lg font-semibold">{tr(it, 'name', lang)}</span>
                          <span className="text-sm font-bold text-chocolate/50">{w.for_n(it.count)}</span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </Card>
            ))}
            <div className="sticky bottom-[76px] z-10 -mx-5 mt-2 border-t border-chocolate/10 bg-crema/95 px-5 py-3 backdrop-blur">
              {missing.length === 0 && <p className="mb-2 text-center text-sm font-extrabold text-chocolate/70">{w.nothing_missing}</p>}
              <div className="flex gap-2">
                <Button variant="secondary" size="icon" className="size-12 bg-white" aria-label={w.back} title={w.back} onClick={() => update(() => ({ step: 0 }))}><ArrowLeft /></Button>
                <Button className="min-w-0 flex-1 px-4" disabled={missing.length === 0} onClick={() => { update(() => ({ step: 2 })); window.scrollTo(0, 0) }}>
                  {w.make_list(missing.length)}
                </Button>
              </div>
            </div>
          </>
        )}

        {/* PASO 3: lista de la compra */}
        {plan.step === 2 && (
          <>
            <h2 className="font-display text-3xl">{w.list_title}</h2>
            <p className="text-lg">{w.list_intro(missing.length)}</p>
            <Card className="p-0">
              {needed.map((g) => {
                const items = g.items.filter((i) => missing.includes(i.id))
                if (!items.length) return null
                return (
                  <div key={g.aisle} className="border-b border-chocolate/10 p-4 last:border-0">
                    <h3 className="font-display text-xl text-tostado">{w.aisles[g.aisle]}</h3>
                    <ul className="mt-1">
                      {items.map((it) => (
                        <li key={it.id} className="flex items-center gap-3 py-1.5 text-lg">
                          <span className="size-5 shrink-0 rounded border-2 border-chocolate/30" aria-hidden="true" />
                          <span className="flex-1 font-semibold">{tr(it, 'name', lang)}</span>
                          <span className="text-sm font-bold text-chocolate/50">{w.for_n(it.count)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </Card>
            <Button className="w-full" onClick={pdf}><Download />{w.download_pdf}</Button>
            <div className="flex flex-col gap-2">
              <Button variant="secondary" className="bg-white" onClick={() => update(() => ({ step: 1 }))}><ArrowLeft />{w.edit_list}</Button>
              <Button variant="ghost" onClick={() => { setPlan(freshPlan(today, allergies)); window.scrollTo(0, 0) }}><CalendarPlus />{w.new_week}</Button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
