// Banderas en SVG (los emojis de bandera no se ven en Windows).
export function FlagES(props) {
  return (
    <svg viewBox="0 0 30 20" aria-hidden="true" {...props}>
      <rect width="30" height="20" fill="#AA151B" />
      <rect y="5" width="30" height="10" fill="#F1BF00" />
    </svg>
  )
}
export function FlagGB(props) {
  return (
    <svg viewBox="0 0 60 30" aria-hidden="true" {...props}>
      <clipPath id="gb-c"><path d="M0,0 v30 h60 v-30 z" /></clipPath>
      <clipPath id="gb-t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" /></clipPath>
      <g clipPath="url(#gb-c)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#gb-t)" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  )
}
