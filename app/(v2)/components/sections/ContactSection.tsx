'use client'

import {
  ArrowUpRight,
  BriefcaseBusiness,
  Camera,
  Code2,
  Mail,
  MapPin,
  Terminal,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import CyanMorphButton from '../ui/CyanMorphButton'
import { ENCODED_EMAIL, decodeEmail } from '@/lib/email'

export default function ContactSection() {
  const [email, setEmail] = useState('')

  useEffect(() => {
    // Decode email on client side only to prevent bots from seeing it
    setEmail(decodeEmail(ENCODED_EMAIL))
  }, [])

  const CONTACT_DETAILS = [
    {
      label: 'Email',
      value: email || '...loading',
      href: email ? `mailto:${email}` : 'javascript:void(0)',
      icon: Mail,
    },
    {
      label: 'Location',
      value: 'Bengaluru, IN',
      href: 'https://www.google.com/maps/search/?api=1&query=Bengaluru%2C%20IN',
      icon: MapPin,
    },
  ]

  const SOCIAL_LINKS = [
    {
      label: 'GitHub',
      handle: '@namit-x',
      href: 'https://github.com/namit-x',
      icon: Terminal,
    },
    {
      label: 'LinkedIn',
      handle: '/in/namitrana',
      href: 'https://www.linkedin.com/in/namit-raana',
      icon: BriefcaseBusiness,
    },
    {
      label: 'Instagram',
      handle: '@namit.raana',
      href: 'https://www.instagram.com/namit.raana',
      icon: Camera,
    },
    {
      label: 'LeetCode',
      handle: 'namitrana',
      href: 'https://leetcode.com/u/namitrana',
      icon: Code2,
    },
  ]
  return (
    <section
      id="contact"
      className="relative min-h-dvh overflow-hidden py-12 sm:py-16 md:py-20 lg:py-[clamp(4.5rem,_3.5rem_+_4vw,_6rem)] scroll-mt-24"
      aria-labelledby="contact-title"
    >
      <div
        className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full [background:radial-gradient(ellipse_at_center,oklch(0.72_0.17_195_/_0.13)_0%,transparent_66%)] blur-2xl dark:[background:radial-gradient(ellipse_at_center,oklch(0.72_0.17_195_/_0.10)_0%,transparent_68%)]"
        aria-hidden="true"
      />

      <div
        className="absolute bottom-0 left-0 right-0 h-px [background:linear-gradient(90deg,transparent,hsl(var(--primary)/0.55),transparent)]"
        aria-hidden="true"
      />

      <div className="relative z-10 px-3 sm:px-4 md:px-6 lg:px-[var(--container-pad)]">
        <div className="mb-8 sm:mb-10 md:mb-12 animate-fade-in">
          <div className="flex items-center gap-3 sm:gap-4 font-mono text-xs sm:text-sm uppercase tracking-[0.1em]">
            <span className="text-sm sm:text-base font-bold text-primary">05</span>
            <span className="text-sm sm:text-base font-bold text-foreground">
              Contact
            </span>

            <span
              className="h-1 w-1 flex-shrink-0 rounded-full [background:hsl(var(--primary))]"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-[75rem] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,_1.18fr)_minmax(20rem,_0.62fr)] lg:gap-16">
          {/* LEFT */}
          <div className="flex min-w-0 flex-col justify-between gap-10 border-border lg:border-r lg:pr-[clamp(3rem,_1.75rem_+_3.5vw,_5.5rem)]">
            <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <p className="font-mono text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.1em] text-muted-foreground">
                Open for freelance, internships, and sharp product ideas
              </p>

              <h2
                id="contact-title"
                className="mt-5 max-w-[11ch] font-display text-[clamp(3rem,_9vw,_8.5rem)] font-black leading-[0.92] text-foreground"
              >
                Let&apos;s build something clean.
              </h2>
            </div>

            <div
              className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between animate-fade-in"
              style={{ animationDelay: '220ms' }}
            >
              <CyanMorphButton
                text="Write an email"
                href={email ? `mailto:${email}` : 'javascript:void(0)'}
                ariaLabel={email ? `Send an email to ${email}` : 'Email will load shortly'}
              />

              <p className="max-w-sm font-mono text-xs sm:text-sm font-light leading-relaxed text-muted-foreground">
                Based in Bengaluru, building with React, Node, and a dangerous
                amount of late-night curiosity.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div
            className="rounded-[10px] border border-border [background:hsl(var(--card)/0.42)] p-4 sm:p-5 backdrop-blur-sm animate-fade-in"
            style={{ animationDelay: '260ms' }}
          >
            {/* CONTACT DETAILS */}
            <ul className="grid list-none gap-4 p-0">
              {CONTACT_DETAILS.map((item) => {
                const Icon = item.icon

                return (
                  <li
                    key={item.label}
                    className="border-b border-border/60 first:pt-0 last:border-b-0"
                  >
                    <a
                      href={item.href}
                      target={item.label === 'Location' ? '_blank' : undefined}
                      rel={item.label === 'Location' ? 'noreferrer' : undefined}
                      className="group grid grid-cols-[2.75rem_minmax(0,_1fr)_auto] items-center gap-3 py-4 first:pt-0"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--hero-accent-line)] [background:var(--hero-accent-dim)] text-[var(--hero-accent)] transition-transform duration-300 group-hover:scale-105">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>

                      <span className="min-w-0">
                        <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground/75">
                          {item.label}
                        </span>

                        <span className="block leading-[1.5] font-display text-base font-semibold text-foreground sm:text-lg">
                          {item.value}
                        </span>
                      </span>

                      <ArrowUpRight
                        className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                )
              })}
            </ul>

            {/* DIVIDER */}
            <div className="my-4 h-px w-full bg-border/60" />

            {/* SOCIALS */}
            <ul className="grid gap-2">
              {SOCIAL_LINKS.map((social, index) => {
                const Icon = social.icon

                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between rounded-[8px] px-3 py-3 transition-all duration-300 hover:[background:var(--hero-accent-dim)]"
                      style={{ animationDelay: `${340 + index * 55}ms` }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors group-hover:text-[var(--hero-accent)]">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>

                        <div className="min-w-0">
                          <span className="block font-display text-sm font-semibold text-foreground">
                            {social.label}
                          </span>

                          <span className="block leading-[1.5] font-mono text-[11px] text-muted-foreground">
                            {social.handle}
                          </span>
                        </div>
                      </div>

                      <ArrowUpRight
                        className="h-4 w-4 flex-shrink-0 text-muted-foreground/70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
