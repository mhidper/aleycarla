// Estaciones (hemisferio norte) y festivos.
export function getSeason(date) {
  const m = date.getMonth() + 1, d = date.getDate()
  const md = m * 100 + d
  if (md >= 320 && md < 621) return 'spring'
  if (md >= 621 && md < 923) return 'summer'
  if (md >= 923 && md < 1221) return 'autumn'
  return 'winter'
}

// Domingo de Pascua (algoritmo de Meeus/Butcher)
function easterSunday(y) {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(y, month - 1, day)
}

export function getHoliday(date) {
  const m = date.getMonth() + 1, d = date.getDate()
  if ((m === 12 && d >= 20) || (m === 1 && d <= 2)) return 'christmas'
  if (m === 1 && (d === 5 || d === 6)) return 'kings'
  if (m === 2 && d === 14) return 'valentine'
  if (m === 10 && d === 31) return 'halloween'
  const easter = easterSunday(date.getFullYear())
  const diff = Math.round((new Date(date.getFullYear(), m - 1, d) - easter) / 86400000)
  if (diff >= -3 && diff <= 0) return 'easter' // Jueves Santo a Domingo de Resurrección
  return null
}

const dayNumber = (date) => Math.floor(new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() / 86400000)

const isSafe = (recipe, allergies) => !recipe.allergens.some((a) => allergies.includes(a))

// Elige el desayuno del día. "offset" avanza con el botón "Otra idea".
export function pickBreakfast(recipes, date, allergies, offset = 0) {
  const season = getSeason(date)
  const holiday = getHoliday(date)
  const safe = recipes.filter((r) => isSafe(r, allergies))

  if (holiday && offset === 0) {
    const special = safe.find((r) => r.holiday === holiday)
    if (special) return { recipe: special, holiday, season, fallback: false }
  }
  let pool = safe.filter((r) => r.season === season && !r.holiday)
  let fallback = false
  if (pool.length === 0) { pool = safe.filter((r) => !r.holiday); fallback = true }
  if (pool.length === 0) return { recipe: null, holiday, season, fallback: true }
  const idx = (dayNumber(date) + offset) % pool.length
  return { recipe: pool[idx], holiday, season, fallback }
}

export const toISODate = (date) => {
  const p = (n) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}`
}
