import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Shuffle, ShieldCheck, Lightbulb, CalendarDays, ShoppingBasket } from 'lucide-react'
import recipes from '@/data/recipes.json'
import { usePrefs } from '@/lib/store'
import { pickBreakfast } from '@/lib/calendar'
import { tr, HOLIDAYS } from '@/lib/i18n'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Plate from '@/components/Plate'
import { SeasonLabel, RecipeFacts } from '@/components/RecipeMeta'

function greeting(t, date) {
  const h = new Date().getHours()
  return h < 13 ? t.greeting_morning : h < 21 ? t.greeting_afternoon : t.greeting_night
}

export default function Today() {
  const { t, lang, allergies, today, demoDate } = usePrefs()
  const [offset, setOffset] = useState(0)
  const { recipe, holiday, season, fallback } = pickBreakfast(recipes, today, allergies, offset)
  const dateText = today.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <>
      <section className="bg-naranja px-5 pb-10 pt-4 text-white">
        <p className="font-bold text-white/90">{greeting(t, today)}. {dateText.charAt(0).toUpperCase() + dateText.slice(1)}</p>
        {demoDate && (
          <Link to="/alergias" className="mt-2 inline-flex items-center gap-1 rounded-full bg-chocolate/20 px-3 py-1 text-sm font-bold">
            <CalendarDays className="size-4" />{t.demo_active(today.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-GB'))}
          </Link>
        )}
        {holiday && offset === 0 && recipe?.holiday === holiday && (
          <p className="mt-3 font-display text-2xl text-chocolate">{t.holiday_today} {HOLIDAYS[holiday][lang]}</p>
        )}

        {recipe && (
          <div className="mt-6 flex flex-col items-center text-center">
            <Plate emoji={recipe.emoji} animateKey={recipe.id} />
            <p className="mt-6 text-lg font-bold text-white/90">{t.today_label}</p>
            <h1 className="mt-1 font-display text-[2.4rem] leading-[1.05] text-balance">{tr(recipe, 'name', lang)}</h1>
            <p className="mt-3 max-w-[34ch] text-lg leading-snug text-white/95">{tr(recipe, 'description', lang)}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 font-bold text-chocolate">
              <SeasonLabel season={recipe.season} holiday={recipe.holiday} />
              <RecipeFacts recipe={recipe} className="contents" />
            </div>
            <div className="mt-7 flex w-full gap-3">
              <Button asChild className="flex-1"><Link to={`/receta/${recipe.id}`}>{t.see_recipe}</Link></Button>
              <Button variant="outline" className="flex-1 text-white" onClick={() => setOffset((o) => o + 1)}>
                <Shuffle />{t.another}
              </Button>
            </div>
          </div>
        )}
      </section>

      <div className="-mt-4 space-y-4 rounded-t-3xl bg-crema px-5 pt-6">
        {fallback && <Card className="bg-tostado text-white font-bold">{t.fallback_note}</Card>}

        {allergies.length > 0 ? (
          <Card className="flex items-center gap-3">
            <ShieldCheck className="size-7 shrink-0 text-tostado" />
            <p className="font-bold">{t.safe_for_you}</p>
          </Card>
        ) : (
          <Card>
            <p className="font-semibold">{t.set_allergies}</p>
            <Button asChild variant="secondary" size="sm" className="mt-3"><Link to="/alergias"><ShieldCheck />{t.set_allergies_btn}</Link></Button>
          </Card>
        )}

        {recipe && (
          <Card>
            <h2 className="flex items-center gap-2 font-display text-xl"><Lightbulb className="size-5 text-tostado" />{t.why_good}</h2>
            <p className="mt-2 text-lg leading-snug">{tr(recipe, 'tip', lang)}</p>
          </Card>
        )}
        <Card className="flex items-center gap-4 bg-chocolate text-crema">
          <ShoppingBasket className="size-9 shrink-0 text-naranja" />
          <div className="flex-1">
            <h2 className="font-display text-xl">{t.w.plan_card_title}</h2>
            <p className="leading-snug text-crema/85">{t.w.plan_card_text}</p>
          </div>
          <Button asChild variant="secondary" size="sm"><Link to="/semana">{t.w.plan_card_btn}</Link></Button>
        </Card>
        <p className="pb-2 pt-2 text-center font-display text-lg text-tostado">{t.slogan}</p>
      </div>
    </>
  )
}
