import type { Metadata } from 'next'
import { Syne, IBM_Plex_Mono } from 'next/font/google'
import ThemeProvider from './components/layout/ThemeProvider'
import Navbar from './components/layout/Navbar'
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
    <ThemeProvider fontClasses={`${syne.variable} ${ibmMono.variable}`}>
      <div className="relative">
        <Navbar />
        <main className="pt-14 sm:pt-16">{children}</main>
      </div>
    </ThemeProvider>
  )
}