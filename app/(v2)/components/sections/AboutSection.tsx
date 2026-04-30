type Fact = {
  label: string
  value: string
  detail?: string
  accent?: boolean
}

const TECH_STACK = [
  'React.js',
  'Node.js',
  'Express.js',
  'TypeScript',
  'Redux',
  'GraphQL',
  'Tailwind CSS',
  'REST APIs',
  'Git',
]

const FACTS: Fact[] = [
  { label: 'Education', value: 'Jain University', detail: '3rd year CS' },
  { label: 'CGPA', value: '9.07', detail: '/ 10.0', accent: true },
  {
    label: 'Status',
    value: 'Freelancing',
    detail: 'open to more',
    accent: true,
  },
  { label: 'Focus', value: 'Full-Stack', detail: 'React · Node' },
  {
    label: 'Open to',
    value: 'Freelance',
    detail: 'internships · collabs',
  },
  {
    label: 'Outside code',
    value: 'Public speaking',
    detail: 'Gym · Late builds',
  },
]

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-dvh py-12 sm:py-16 md:py-20 lg:py-[clamp(4.5rem,_3.5rem_+_4vw,_6rem)] pb-12 sm:pb-16 md:pb-20"
      aria-labelledby="about-title"
    >
      {/* Section label */}
      <div className="px-3 sm:px-4 md:px-6 lg:px-[var(--container-pad)] mb-8 sm:mb-10 md:mb-12 animate-fade-in">
        <div className="flex items-center gap-3 sm:gap-4 font-mono text-xs sm:text-sm uppercase tracking-[0.1em]">
          <span className="text-sm sm:text-base font-bold text-primary">02</span>
          <span className="text-sm sm:text-base font-bold text-foreground">About</span>
          <span
            className="w-1 h-1 rounded-full [background:hsl(var(--primary))] flex-shrink-0"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Main container */}
      <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-[var(--container-pad)] w-full max-w-[75rem]">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:gap-12 lg:grid-cols-[1.2fr_0.95fr] lg:gap-16">

          {/* Left column - Statement & Stack */}
          <div className="flex flex-col justify-between min-w-0 lg:pb-[clamp(3rem,_1.75rem_+_3.5vw,_5.5rem)] lg:border-r lg:border-border">
            <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <h2 id="about-title" className="font-display font-bold text-[clamp(1.875rem,_4vw,_4.75rem)] leading-[1.12] tracking-tight text-foreground">
                No classroom.
                <br />
                No roadmap.
                <br />
                Just <em className="font-normal italic text-primary tracking-tighter not-italic">shipped products.</em>
              </h2>
              <p className="font-mono text-[11px] sm:text-xs md:text-sm font-light leading-relaxed text-muted-foreground mt-6 sm:mt-7 md:mt-8 max-w-prose">
                Self-taught, third year in, already working with real clients. I build
                full-stack apps that perform cleanly under pressure because I learned by
                shipping, not by studying.
              </p>
            </div>

            {/* Tech stack pills */}
            <ul className="flex flex-wrap gap-2 list-none mt-8 sm:mt-9 md:mt-10 p-0" aria-label="Technology stack">
              {TECH_STACK.map((tech, index) => (
                <li
                  key={tech}
                  className="font-mono text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.06em] text-muted-foreground border border-border px-2.5 sm:px-3 py-1 rounded-[2px] transition-all hover:border-[var(--hero-accent-line)] hover:text-[var(--hero-accent)] hover:[background:var(--hero-accent-dim)] animate-fade-in"
                  style={{ animationDelay: `${200 + index * 40}ms` }}
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          {/* Right column - Facts */}
          <dl className="flex flex-col lg:pl-[clamp(3rem,_1.75rem_+_3.5vw,_5.5rem)]">
            {FACTS.map((fact, index) => (
              <div
                key={fact.label}
                className="grid grid-cols-[auto_1fr] sm:grid-cols-[minmax(6.5rem,_8rem)_minmax(0,_1fr)] gap-2 sm:gap-3 align-baseline py-4 sm:py-5 border-b border-border animate-fade-in transition-all"
                style={{ animationDelay: `${300 + index * 60}ms` }}
              >
                <dt className="font-mono text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.1em] text-muted-foreground/75 truncate">
                  {fact.label}
                </dt>
                <dd className="font-display text-[0.875rem] sm:text-[0.9375rem] md:text-base font-semibold text-foreground tracking-tighter">
                  <span className={fact.accent ? 'text-[var(--hero-accent)]' : undefined}>
                    {fact.value}
                  </span>
                  {fact.detail ? (
                    <small className="font-mono text-[10px] sm:text-xs md:text-sm font-normal text-muted-foreground ml-1">· {fact.detail}</small>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-border animate-fade-in" style={{ animationDelay: '500ms' }}>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 sm:gap-2.5 py-2.5 sm:py-3 px-4 sm:px-5 border border-border rounded-[2px] font-mono text-[11px] sm:text-xs uppercase tracking-[0.08em] text-foreground transition-all hover:border-[var(--hero-accent-line)] hover:text-[var(--hero-accent)] hover:[background:var(--hero-accent-dim)] hover:scale-105"
          >
            Get in touch <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <span className="font-mono text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.1em] text-muted-foreground/75 whitespace-nowrap">
            Bengaluru · self-taught since 2022
          </span>
        </div>
      </div>
    </section>
  )
}
