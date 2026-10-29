import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, Lightbulb, TriangleAlert } from 'lucide-react'
import recipes from '@/data/recipes.json'
import { usePrefs } from '@/lib/store'
import { tr, ALLERGENS } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { Card, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Plate from '@/components/Plate'
import { SeasonLabel, RecipeFacts, AllergenBadges } from '@/components/RecipeMeta'

export default function RecipeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t, lang, allergies } = usePrefs()
  const recipe = recipes.find((r) => r.id === id)
  const [doneIng, setDoneIng] = useState([])
  const [doneSteps, setDoneSteps] = useState([])

  if (!recipe) return <p className="p-8 text-center font-bold">{t.not_found} <Link className="underline" to="/recetas">{t.back}</Link></p>

  const ingredients = tr(recipe, 'ingredients', lang)
  const steps = tr(recipe, 'steps', lang)
  const blocked = recipe.allergens.filter((a) => allergies.includes(a))
  const toggle = (setter) => (i) => setter((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]))

  return (
    <>
      <section className="bg-naranja px-5 pb-10 pt-3 text-white">
        <Button variant="ghost" size="sm" className="-ml-3 text-white hover:bg-white/15" onClick={() => navigate(-1)}>
          <ArrowLeft />{t.back}
        </Button>
        <div className="mt-2 flex flex-col items-center text-center">
          <Plate emoji={recipe.emoji} size="md" animateKey={recipe.id} />
          <h1 className="mt-5 font-display text-4xl leading-[1.05] text-balance">{tr(recipe, 'name', lang)}</h1>
          <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 font-bold text-chocolate">
            <SeasonLabel season={recipe.season} holiday={recipe.holiday} />
            <RecipeFacts recipe={recipe} className="contents" />
          </div>
        </div>
      </section>

      <div className="-mt-4 space-y-4 rounded-t-3xl bg-crema px-5 pt-6">
        {blocked.length > 0 && (
          <Card className="flex items-start gap-3 bg-tostado text-white">
            <TriangleAlert className="size-6 shrink-0" />
            <p className="font-bold">{t.contains}: {blocked.map((a) => ALLERGENS[a][lang].toLowerCase()).join(', ')}</p>
          </Card>
        )}
        <AllergenBadges recipe={recipe} />

        <Card>
          <CardTitle>{t.ingredients}</CardTitle>
          <ul className="mt-3 space-y-1">
            {ingredients.map((ing, i) => (
              <li key={i}>
                <button onClick={() => toggle(setDoneIng)(i)} className="flex w-full items-center gap-3 rounded-xl py-1.5 text-left text-lg">
                  <span className={cn('grid size-6 shrink-0 place-items-center rounded-md border-2 border-chocolate/30', doneIng.includes(i) && 'border-tostado bg-tostado text-white')}>
                    {doneIng.includes(i) && <Check className="size-4" strokeWidth={3} />}
                  </span>
                  <span className={cn(doneIng.includes(i) && 'text-chocolate/45 line-through')}>{ing}</span>
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardTitle>{t.steps}</CardTitle>
          <p className="mt-1 text-sm font-bold text-chocolate/60" aria-live="polite">
            {doneSteps.length === steps.length ? t.all_done : t.steps_done(doneSteps.length, steps.length)}
          </p>
          <ol className="mt-3 space-y-2">
            {steps.map((step, i) => {
              const done = doneSteps.includes(i)
              return (
                <li key={i}>
                  <button onClick={() => toggle(setDoneSteps)(i)}
                    className={cn('flex w-full items-start gap-3 rounded-2xl p-3 text-left text-lg leading-snug transition-colors', done ? 'bg-crema/70' : 'bg-crema')}>
                    <span className={cn('grid size-8 shrink-0 place-items-center rounded-full font-display text-lg', done ? 'bg-tostado text-white' : 'bg-naranja text-white')}>
                      {done ? <Check className="size-5" strokeWidth={3} /> : i + 1}
                    </span>
                    <span className={cn('pt-0.5', done && 'text-chocolate/45')}>{step}</span>
                  </button>
                </li>
              )
            })}
          </ol>
        </Card>

        <Card className="bg-chocolate text-crema">
          <h2 className="flex items-center gap-2 font-display text-xl"><Lightbulb className="size-5 text-naranja" />{t.tip}</h2>
          <p className="mt-2 text-lg leading-snug">{tr(recipe, 'tip', lang)}</p>
        </Card>
      </div>
    </>
  )
}
