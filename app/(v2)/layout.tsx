import type { Metadata } from 'next'
import { Syne, IBM_Plex_Mono } from 'next/font/google'
import './styles/theme.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

const ibmMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['300', '400', '500'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Namit's Portfolio",
  description: 'Personal portfolio',
}

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div data-theme="dark" className={`v2-root ${syne.variable} ${ibmMono.variable}`}>
      {children}
    </div>
  )
}
