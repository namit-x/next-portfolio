import Image from 'next/image'

type FeaturedProject = {
  id: string
  number: string
  name: string
  category: string
  year: string
  summary: string
  impact: string
  imageUrl: string
  tags: string[]
}

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'vesta',
    number: '01',
    name: 'Vesta Diagnostics',
    category: 'Healthcare platform',
    year: '2024',
    summary:
      'A calmer digital experience for a diagnostics brand, focused on clarity, trust, and quicker booking paths.',
    impact: 'Turned a complex service catalog into a cleaner conversion flow.',
    imageUrl: '/Vesta.webp',
    tags: ['React', 'Tailwind', 'Conversion UX'],
  },
  {
    id: 'advance',
    number: '02',
    name: 'Advance Architect',
    category: 'Studio website',
    year: '2024',
    summary:
      'A polished marketing site for an architecture studio, balancing editorial typography with strong inquiry CTAs.',
    impact: 'Shifted the brand presentation toward a more premium, client-ready feel.',
    imageUrl: '/Advance.webp',
    tags: ['Brand Site', 'Landing Page', 'Responsive UI'],
  },
  {
    id: 'shoporia',
    number: '03',
    name: 'Shoporia',
    category: 'E-commerce storefront',
    year: '2024',
    summary:
      'A modern retail interface designed to keep product discovery simple, visual, and fast across screen sizes.',
    impact: 'Created a cleaner browsing experience with a lighter visual footprint.',
    imageUrl: '/Shoporia.webp',
    tags: ['E-commerce', 'Frontend', 'UI Systems'],
  },
]

export default function ProjectsSection() {
  return (
    <section
      id="work"
      className="relative py-12 sm:py-16 md:py-20 lg:py-[clamp(4.5rem,_3.5rem_+_4vw,_6rem)]"
      aria-labelledby="work-title"
    >
      <div className="px-3 sm:px-4 md:px-6 lg:px-[var(--container-pad)] mb-8 sm:mb-10 md:mb-12">
        <div className="flex items-center gap-3 sm:gap-4 font-mono text-xs sm:text-sm uppercase tracking-[0.1em]">
          <span className="text-sm sm:text-base font-bold text-primary">02</span>
          <span className="text-sm sm:text-base font-bold text-foreground">Work</span>
          <span
            className="w-1 h-1 rounded-full [background:hsl(var(--primary))] flex-shrink-0"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-[var(--container-pad)] w-full max-w-[75rem]">
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-[minmax(0,_0.78fr)_minmax(0,_1.22fr)] lg:items-end lg:gap-16">
          <div className="max-w-xl">
            <p className="font-mono text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.12em] text-muted-foreground/70">
              Selected projects
            </p>
            <h2
              id="work-title"
              className="mt-3 font-display font-bold text-[clamp(2rem,_4vw,_4.75rem)] leading-[1.04] tracking-tight text-foreground"
            >
              Work that feels
              <br />
              modern, useful,
              <br />
              and quietly sharp.
            </h2>
          </div>

          <p className="max-w-2xl font-mono text-[11px] sm:text-xs md:text-sm font-light leading-relaxed text-muted-foreground lg:justify-self-end">
            A few recent builds across healthcare, architecture, and commerce. The
            common thread is simple: make the interface feel clearer, faster, and
            more considered than what came before it.
          </p>
        </div>

        <div className="mt-10 sm:mt-12 md:mt-14 space-y-4 sm:space-y-5 md:space-y-6">
          {FEATURED_PROJECTS.map((project, index) => {
            const reverseLayout = index % 2 === 1

            return (
              <article
                key={project.id}
                className="group rounded-[1.5rem] border border-border [background:hsl(var(--card)/0.42)] backdrop-blur-sm overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,_0.88fr)_minmax(0,_1.12fr)]">
                  <div
                    className={[
                      'flex flex-col justify-between gap-8 p-5 sm:p-6 md:p-8 lg:p-10',
                      reverseLayout ? 'lg:order-2' : '',
                    ].join(' ')}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4 pb-4 border-b border-border">
                        <span className="font-mono text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.1em] text-muted-foreground/75">
                          {project.number}
                        </span>
                        <span className="font-mono text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.1em] text-muted-foreground/75">
                          {project.year}
                        </span>
                      </div>

                      <div className="mt-5 sm:mt-6">
                        <p className="font-mono text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.1em] text-[var(--hero-accent)]">
                          {project.category}
                        </p>
                        <h3 className="mt-2 font-display text-[clamp(1.5rem,_3vw,_3rem)] leading-[1.02] tracking-tight text-foreground">
                          {project.name}
                        </h3>
                        <p className="mt-4 max-w-lg font-mono text-[11px] sm:text-xs md:text-sm font-light leading-relaxed text-muted-foreground">
                          {project.summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-5">
                      <ul className="flex flex-wrap gap-2" aria-label={`${project.name} technologies`}>
                        {project.tags.map((tag) => (
                          <li
                            key={tag}
                            className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.08em] text-muted-foreground border border-border px-2.5 py-1 rounded-full transition-colors group-hover:text-foreground group-hover:border-[var(--hero-accent-line)]"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>

                      <p className="font-mono text-[11px] sm:text-xs md:text-sm text-foreground/90 leading-relaxed">
                        {project.impact}
                      </p>
                    </div>
                  </div>

                  <div className={reverseLayout ? 'lg:order-1' : ''}>
                    <div className="relative aspect-[16/11] min-h-full overflow-hidden border-t border-border lg:border-t-0 lg:border-l lg:border-border">
                      <div
                        className="absolute inset-0 z-10"
                        aria-hidden="true"
                        style={{
                          background:
                            'linear-gradient(180deg, transparent 0%, hsl(var(--background) / 0.1) 100%)',
                        }}
                      />
                      <Image
                        src={project.imageUrl}
                        alt={`${project.name} project preview`}
                        fill
                        sizes="(min-width: 1024px) 55vw, 100vw"
                        className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
