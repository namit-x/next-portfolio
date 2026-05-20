import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: "Namit's Portfolio | Full-Stack Developer & Designer",
  description:
    'Full-stack developer with expertise in React, Node.js, and AI/ML. Check out my latest projects and signal.',
  keywords: [
    'portfolio',
    'developer',
    'react',
    'nodejs',
    'typescript',
    'full-stack',
    'web development',
  ],
  authors: [{ name: 'Namit' }],
  creator: 'Namit',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://namit-portfolio.com',
    siteName: "Namit's Portfolio",
    title: "Namit's Portfolio | Full-Stack Developer & Designer",
    description:
      'Full-stack developer with expertise in React, Node.js, and AI/ML. Check out my latest projects and signal.',
    images: [
      {
        url: 'https://namit-portfolio.com/og-image.png',
        width: 1200,
        height: 630,
        alt: "Namit's Portfolio",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Namit's Portfolio | Full-Stack Developer & Designer",
    description:
      'Full-stack developer with expertise in React, Node.js, and AI/ML.',
    images: ['https://namit-portfolio.com/og-image.png'],
    creator: '@namit_x',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="canonical" href="https://namit-portfolio.com" />
      </head>
      <body>{children}</body>
    </html>
  )
}
