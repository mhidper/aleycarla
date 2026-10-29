import { useEffect, useState } from 'react'

// Vídeo de las cuatro estaciones (se usa salvo con "reducir movimiento" o ahorro de datos)
export const HERO_VIDEO = './hero/estaciones.mp4'
export function useHeroVideo() {
  const ok = () => {
    if (typeof window === 'undefined') return false
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const saveData = navigator.connection?.saveData
    return !reduce && !saveData
  }
  const [use, setUse] = useState(ok)
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    const fn = () => setUse(ok())
    mq?.addEventListener?.('change', fn)
    return () => mq?.removeEventListener?.('change', fn)
  }, [])
  return use
}

// Fondo del hero: amanecer de cada estación + partículas que caen.
export const SKY = {
  spring: { img: './hero/spring.webp', base: '#374028', particle: 'petal' },
  summer: { img: './hero/summer.webp', base: '#6f481f', particle: 'spark' },
  autumn: { img: './hero/autumn.webp', base: '#542816', particle: 'leaf' },
  winter: { img: './hero/winter.webp', base: '#5b566a', particle: 'snow' },
}

// Posiciones fijas (pseudoaleatorias) para que no cambien en cada render
const SEEDS = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  delay: -((i * 1.7) % 12),
  duration: 9 + ((i * 13) % 7),
  size: 0.6 + ((i * 7) % 5) / 6,
  drift: ((i % 2 ? 1 : -1) * (20 + ((i * 11) % 40))),
}))

const STYLES = {
  petal: { width: 10, height: 7, background: '#F7C6D3', borderRadius: '70% 0 70% 0' },
  spark: { width: 6, height: 6, background: '#FFE7A3', borderRadius: '50%', boxShadow: '0 0 8px 2px rgba(255,231,163,.8)' },
  leaf: { width: 11, height: 8, background: '#D9692F', borderRadius: '0 80% 0 80%' },
  snow: { width: 7, height: 7, background: '#FFFFFF', borderRadius: '50%', opacity: 0.9 },
}

export function Particles({ kind }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {SEEDS.map((s, i) => (
        <span key={i} className="particle absolute top-0"
          style={{
            ...STYLES[kind],
            left: `${s.left}%`,
            transform: `scale(${s.size})`,
            animationDuration: `${kind === 'spark' ? s.duration * 0.8 : s.duration}s`,
            animationDelay: `${s.delay}s`,
            animationName: kind === 'spark' ? 'flotar' : 'caer',
            '--drift': `${s.drift}px`,
          }} />
      ))}
    </div>
  )
}
