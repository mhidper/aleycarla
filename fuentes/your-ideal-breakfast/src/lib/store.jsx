import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { STRINGS } from './i18n'
import { WEEK_STRINGS } from './i18n-week'

// Preferencias del usuario (en Base44 será la entidad UserPreferences).
const KEY = 'yib-preferences'
const load = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || {} } catch { return {} }
}

const Ctx = createContext(null)

export function PreferencesProvider({ children }) {
  const saved = load()
  const [lang, setLang] = useState(saved.lang || 'es')
  const [allergies, setAllergies] = useState(saved.allergies || [])
  const [demoDate, setDemoDate] = useState(null) // no se guarda: solo para la presentación

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify({ lang, allergies })) } catch { /* sin almacenamiento */ }
    document.documentElement.lang = lang
  }, [lang, allergies])

  const value = useMemo(() => {
    const today = demoDate ? new Date(`${demoDate}T09:00:00`) : new Date()
    return {
      lang, setLang, t: { ...STRINGS[lang], w: WEEK_STRINGS[lang] },
      allergies,
      toggleAllergy: (id) => setAllergies((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id])),
      demoDate, setDemoDate, today,
    }
  }, [lang, allergies, demoDate])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const usePrefs = () => useContext(Ctx)
