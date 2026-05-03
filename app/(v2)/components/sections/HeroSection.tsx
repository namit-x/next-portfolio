import ScrollHint from '../hero/ScrollHint'
import RoleTypewriter from '../hero/RoleTypewriter'

export default function HeroSection() {
  return (
    <section className="relative min-h-dvh flex flex-col justify-end px-4 pb-16 sm:px-6 sm:pb-12 md:px-12 md:pb-16 overflow-hidden">
      {/* Glow effect - repositioned for mobile */}
      <div className="absolute -bottom-[15%] -left-[15%] w-[120vw] h-[120vw] sm:w-[90vw] sm:h-[90vw] md:w-[70vw] md:h-[70vw] rounded-full pointer-events-none [background:radial-gradient(ellipse_at_center,oklch(0.72_0.17_195_/_0.05)_0%,transparent_70%)] sm:[background:radial-gradient(ellipse_at_center,oklch(0.72_0.17_195_/_0.06)_0%,transparent_68%)] dark:[background:radial-gradient(ellipse_at_center,oklch(0.72_0.17_195_/_0.04)_0%,transparent_65%)]"
        aria-hidden="true" />

      {/* Year label - vertically written on the right side */}
      <span
        className="absolute top-1/2 right-4 sm:right-6 md:right-12 -translate-y-1/2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.14em] text-muted-foreground hidden sm:block"
        style={{
          writingMode: 'vertical-rl',
          transform: 'translateY(-50%)',
          textOrientation: 'mixed'
        }}
        aria-hidden="true"
      >
        Est. 2026 · Portfolio
      </span>

      {/* Main content */}
      <div className="relative z-10 flex flex-col gap-4 sm:gap-5 md:gap-7 max-w-full">
        {/* Status indicator */}
        <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.08em] text-muted-foreground flex-wrap">
          <span className="relative flex-shrink-0 w-[6px] h-[6px] sm:w-[7px] sm:h-[7px] rounded-full [background:var(--hero-status-green)]" aria-hidden="true">
            <span className="absolute -inset-1.5 rounded-full [background:oklch(0.72_0.22_145_/_0.25)] animate-pulse-custom" />
          </span>
          <span>Active</span>
        </div>

        {/* Name heading */}
        <h1 className="font-display font-black leading-[0.88] tracking-tight text-foreground" style={{ fontSize: 'clamp(2.5rem, 12vw, 13.75rem)' }}>
          NAMIT
        </h1>

        {/* Role and location line - stacked on mobile */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-4 md:gap-6 flex-wrap">
          <span className="font-mono text-[13px] sm:text-sm md:text-[clamp(0.8125rem,1.3vw,1.0625rem)] font-light text-muted-foreground tracking-[0.02em] leading-relaxed">
            <RoleTypewriter />
            <span className="inline-block w-[8px] sm:w-[9px] h-[1.1em] sm:h-[1.2em] ml-0.5 rounded-sm [background:var(--hero-accent)] align-text-bottom animate-blink-custom" aria-hidden="true" />
          </span>
          <div className="hidden sm:block w-px h-4 sm:h-5 [background:hsl(var(--border))] flex-shrink-0" aria-hidden="true" />
          <span className="font-mono text-[11px] sm:text-xs font-normal uppercase tracking-[0.08em] text-muted-foreground/70">
            Bengaluru, IN
          </span>
        </div>
      </div>

      <ScrollHint />
    </section>
  )
}
