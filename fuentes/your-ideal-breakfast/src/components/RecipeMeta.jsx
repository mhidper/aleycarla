import { Clock, Users, ChefHat, Flower2, Sun, Leaf, Snowflake, PartyPopper } from 'lucide-react'
import { usePrefs } from '@/lib/store'
import { SEASONS, HOLIDAYS, ALLERGENS } from '@/lib/i18n'
import { Badge } from './ui/badge'

export const SEASON_ICONS = { spring: Flower2, summer: Sun, autumn: Leaf, winter: Snowflake }

export function SeasonLabel({ season, holiday, className }) {
  const { lang } = usePrefs()
  const Icon = holiday ? PartyPopper : SEASON_ICONS[season]
  return (
    <span className={className}>
      <Icon className="mr-1 inline size-4 -translate-y-px" />
      {holiday ? HOLIDAYS[holiday][lang] : SEASONS[season][lang]}
    </span>
  )
}

export function RecipeFacts({ recipe, className }) {
  const { t } = usePrefs()
  return (
    <div className={className}>
      <span className="inline-flex items-center gap-1"><Clock className="size-4" />{recipe.time_minutes} {t.minutes}</span>
      <span className="inline-flex items-center gap-1"><Users className="size-4" />{t.servings(recipe.servings)}</span>
      <span className="inline-flex items-center gap-1"><ChefHat className="size-4" />{t.difficulty[recipe.difficulty]}</span>
    </div>
  )
}

// Alérgenos de la receta; los que coinciden con los del usuario salen marcados.
export function AllergenBadges({ recipe }) {
  const { lang, t, allergies } = usePrefs()
  if (recipe.allergens.length === 0) return <Badge>{t.no_allergens}</Badge>
  return (
    <div className="flex flex-wrap gap-1.5">
      {recipe.allergens.map((a) => (
        <Badge key={a} variant={allergies.includes(a) ? 'warning' : 'default'}>{ALLERGENS[a][lang]}</Badge>
      ))}
    </div>
  )
}
