import ScrollHint from '../hero/ScrollHint'
import RoleTypewriter from '../hero/RoleTypewriter'

export default function HeroSection() {
  return (
    <section className="relative min-h-dvh flex flex-col justify-end px-[3rem] pb-[4.5rem] overflow-hidden sm:px-6 sm:pb-12">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-45 [background-image:radial-gradient(circle,var(--hero-dot-dark)_1px,transparent_1px)] [background-size:28px_28px] dark:opacity-55 dark:[background-image:radial-gradient(circle,var(--hero-dot-light)_1px,transparent_1px)]"
        aria-hidden="true"
      />

      {/* Glow effect */}
      <div
        className="absolute -bottom-[10%] -left-[5%] w-[70vw] h-[70vw] rounded-full pointer-events-none [background:radial-gradient(ellipse_at_center,oklch(0.72_0.17_195_/_0.07)_0%,transparent_65%)] dark:[background:radial-gradient(ellipse_at_center,oklch(0.72_0.17_195_/_0.04)_0%,transparent_65%)]"
        aria-hidden="true"
      />

      {/* Year label - hidden on mobile */}
      <span
        className="absolute top-1/2 right-12 -translate-y-1/2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground writing-mode-vertical hidden sm:block"
        aria-hidden="true"
      >
        Est. 2026 · Portfolio
      </span>

      {/* Main content */}
      <div className="relative z-10 flex flex-col gap-7">
        {/* Status indicator */}
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
          <span className="relative flex-shrink-0 w-[7px] h-[7px] rounded-full [background:var(--hero-status-green)]" aria-hidden="true">
            <span className="absolute -inset-1.5 rounded-full [background:oklch(0.72_0.22_145_/_0.25)] animate-pulse-custom" />
          </span>
          Available for freelance
        </div>

        {/* Name heading */}
        <h1 className="font-display font-black leading-[0.88] tracking-tight text-foreground whitespace-nowrap overflow-hidden" style={{ fontSize: 'clamp(4.5rem, 13.5vw, 13.75rem)' }}>
          NAMIT
        </h1>

        {/* Role and location line */}
        <div className="flex items-baseline gap-6 flex-wrap">
          <span className="font-mono text-[clamp(0.8125rem,1.3vw,1.0625rem)] font-light text-muted-foreground tracking-[0.02em]">
            <RoleTypewriter />
            <span className="inline-block w-[9px] h-[1.2em] ml-0.5 rounded-sm [background:var(--hero-accent)] align-text-bottom animate-blink-custom" aria-hidden="true" />
          </span>
          <div className="w-px h-5 self-center [background:hsl(var(--border))] flex-shrink-0" aria-hidden="true" />
          <span className="font-mono text-xs font-normal uppercase tracking-[0.08em] text-muted-foreground/70">
            Bengaluru, IN
          </span>
        </div>
      </div>

      <ScrollHint />
    </section>
  )
}
