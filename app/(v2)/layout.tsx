import type { Metadata } from 'next'
import './styles/theme.css'

export const metadata: Metadata = {
  title: "Namit's Portfolio",
  description: 'Personal portfolio',
}

export default function V2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div data-theme="light" className="v2-root">
      {children}
    </div>
  )
}
