import { Link } from 'react-router-dom'
import { usePrefs } from '@/lib/store'
import { FlagES, FlagGB } from './Flags'
import { cn } from '@/lib/utils'

const LANGS = [
  { id: 'es', label: 'Español', Flag: FlagES },
  { id: 'en', label: 'English', Flag: FlagGB },
]

export default function TopBar() {
  const { lang, setLang } = usePrefs()
  return (
    <header className="sticky top-0 z-20 bg-naranja">
      <div className="mx-auto flex max-w-md items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-white">
          <img src="./logo.png" alt="" className="size-11 drop-shadow-sm" />
          <span className="font-display text-xl leading-none">Your Ideal<br />Breakfast</span>
        </Link>
        <div role="radiogroup" aria-label="Idioma / Language" className="flex rounded-full bg-chocolate/15 p-1">
          {LANGS.map(({ id, label, Flag }) => (
            <button
              key={id}
              role="radio"
              aria-checked={lang === id}
              aria-label={label}
              title={label}
              onClick={() => setLang(id)}
              className={cn('flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-extrabold transition-colors',
                lang === id ? 'bg-white text-chocolate shadow-sm' : 'text-white/90 hover:bg-white/15')}
            >
              <Flag className="h-4 w-6 rounded-[3px]" />
              {id.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
