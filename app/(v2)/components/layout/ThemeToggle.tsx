'use client'
import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isLight = theme === 'light'

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={`relative w-9 h-5 flex-shrink-0 rounded-full border border-border cursor-pointer p-0 transition-all duration-250 ${isLight ? 'bg-[var(--hero-accent-dim)] border-[var(--hero-accent-line)]' : 'bg-border'
        }`}
    >
      {/* Toggle indicator */}
      <span
        className={`absolute w-3.5 h-3.5 rounded-full top-1/2 -translate-y-1/2 transition-all duration-[400ms] [cubic-bezier(0.34,1.56,0.64,1)] ${isLight
            ? 'left-[18px] bg-[var(--hero-accent)]'
            : 'left-0.5 bg-muted-foreground'
          }`}
        aria-hidden="true"
      />
    </button>
  )
}
