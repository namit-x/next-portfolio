'use client'
import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { toggle } = useTheme()
  return (
    <button className="v2-theme-toggle" onClick={toggle} aria-label="Toggle theme" />
  )
}
