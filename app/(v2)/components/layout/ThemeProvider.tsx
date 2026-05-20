'use client'
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type Theme = 'dark' | 'light'
interface ThemeCtxValue { theme: Theme; toggle: () => void }

const ThemeCtx = createContext<ThemeCtxValue>({ theme: 'dark', toggle: () => { } })
export const useTheme = () => useContext(ThemeCtx)

export default function ThemeProvider({
  children,
  fontClasses,
}: {
  children: ReactNode
  fontClasses: string
}) {
  // Initialize with 'dark' to match server render
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  // Hydrate from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('pf-v2-theme')
    const savedTheme: Theme = saved === 'light' || saved === 'dark' ? saved : 'dark'
    setTheme(savedTheme)
    setMounted(true)
  }, [])

  function toggle() {
    setTheme(prev => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem('pf-v2-theme', next)
      return next
    })
  }

  // Don't render with incorrect theme - wait for hydration
  if (!mounted) {
    return (
      <div data-theme="dark" className={`v2-root ${fontClasses}`} suppressHydrationWarning>
        {children}
      </div>
    )
  }

  return (
    <ThemeCtx.Provider value={{ theme, toggle }}>
      <div data-theme={theme} className={`v2-root ${fontClasses}`}>
        {children}
      </div>
    </ThemeCtx.Provider>
  )
}
