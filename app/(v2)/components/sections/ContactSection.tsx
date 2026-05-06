import {
  ArrowUpRight,
  BriefcaseBusiness,
  Camera,
  Code2,
  Mail,
  MapPin,
  Terminal,
} from 'lucide-react'
import CyanMorphButton from '../ui/CyanMorphButton'

const CONTACT_DETAILS = [
  {
    label: 'Email',
    value: 'rnamit099@gmail.com',
    href: 'mailto:rnamit099@gmail.com',
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
    handle: '@rnamit099',
    href: 'https://github.com/rnamit099',
    icon: Terminal,
  },
  {
    label: 'LinkedIn',
    handle: '/in/rnamit099',
    href: 'https://www.linkedin.com/in/rnamit099',
    icon: BriefcaseBusiness,
  },
  {
    label: 'Instagram',
    handle: '@rnamit099',
    href: 'https://www.instagram.com/rnamit099',
    icon: Camera,
  },
  {
    label: 'LeetCode',
    handle: 'rnamit099',
    href: 'https://leetcode.com/u/rnamit099',
    icon: Code2,
  },
]

export default function ContactSection() {
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
            <span className="text-sm sm:text-base font-bold text-primary">04</span>
            <span className="text-sm sm:text-base font-bold text-foreground">Contact</span>
            <span
              className="h-1 w-1 flex-shrink-0 rounded-full [background:hsl(var(--primary))]"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-[75rem] grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-[minmax(0,_1.08fr)_minmax(22rem,_0.72fr)] lg:gap-16">
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
                href="mailto:rnamit099@gmail.com"
                ariaLabel="Send an email to rnamit099@gmail.com"
              />
              <p className="max-w-sm font-mono text-xs sm:text-sm font-light leading-relaxed text-muted-foreground">
                Based in Bengaluru, building with React, Node, and a dangerous amount of late-night curiosity.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:gap-5">
            <div
              className="rounded-[8px] border border-border [background:hsl(var(--card)/0.46)] p-4 sm:p-5 backdrop-blur-sm animate-fade-in"
              style={{ animationDelay: '260ms' }}
            >
              <ul className="grid list-none gap-1 p-0">
                {CONTACT_DETAILS.map((item) => {
                  const Icon = item.icon

                  return (
                    <li key={item.label} className="border-b border-border first:pt-0 last:border-b-0">
                      <a
                        href={item.href}
                        target={item.label === 'Location' ? '_blank' : undefined}
                        rel={item.label === 'Location' ? 'noreferrer' : undefined}
                        className="group grid grid-cols-[2.75rem_minmax(0,_1fr)_auto] items-center gap-3 py-4 first:pt-0 last:pb-0"
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--hero-accent-line)] [background:var(--hero-accent-dim)] text-[var(--hero-accent)] transition-transform duration-300 group-hover:scale-105">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground/75">
                            {item.label}
                          </span>
                          <span className="block truncate font-display text-base font-semibold text-foreground sm:text-lg">
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
            </div>

            <div
              className="rounded-[8px] border border-border [background:hsl(var(--card)/0.32)] p-2 backdrop-blur-sm animate-fade-in"
              style={{ animationDelay: '340ms' }}
            >
              <ul className="grid list-none gap-2 p-0 sm:grid-cols-2">
                {SOCIAL_LINKS.map((social, index) => {
                  const Icon = social.icon

                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex min-h-[6rem] flex-col justify-between rounded-[6px] border border-transparent p-4 transition-all duration-300 hover:border-[var(--hero-accent-line)] hover:[background:var(--hero-accent-dim)]"
                        style={{ animationDelay: `${380 + index * 55}ms` }}
                      >
                        <span className="flex items-center justify-between gap-3">
                          <Icon
                            className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-[var(--hero-accent)]"
                            aria-hidden="true"
                          />
                          <ArrowUpRight
                            className="h-4 w-4 text-muted-foreground/70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                            aria-hidden="true"
                          />
                        </span>
                        <span>
                          <span className="block font-display text-base font-semibold text-foreground">
                            {social.label}
                          </span>
                          <span className="block truncate font-mono text-[11px] text-muted-foreground">
                            {social.handle}
                          </span>
                        </span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
