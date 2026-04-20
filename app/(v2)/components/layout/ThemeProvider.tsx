'use client'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type Theme = 'dark' | 'light'
interface ThemeCtxValue { theme: Theme; toggle: () => void }

const ThemeCtx = createContext<ThemeCtxValue>({ theme: 'dark', toggle: () => {} })
export const useTheme = () => useContext(ThemeCtx)

export default function ThemeProvider({
  children,
  fontClasses,
}: {
  children: ReactNode
  fontClasses: string
}) {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('pf-v2-theme') as Theme | null
    if (saved === 'dark' || saved === 'light') setTheme(saved)
  }, [])

  function toggle() {
    setTheme(prev => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem('pf-v2-theme', next)
      return next
    })
  }

  return (
    <ThemeCtx.Provider value={{ theme, toggle }}>
      <div data-theme={theme} className={`v2-root ${fontClasses}`} suppressHydrationWarning>
        {children}
      </div>
    </ThemeCtx.Provider>
  )
}
