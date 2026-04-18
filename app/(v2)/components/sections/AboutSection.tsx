import Image from 'next/image'

/**
 * Editorial-style about section.
 *
 * Composition notes (why the details matter):
 *  - Meta strip on top: chapter number + availability dot + location.
 *    Hairline below grounds it as a "lede" block.
 *  - 5:7 grid on desktop — portrait gets less width than text (golden-ish).
 *  - Title uses a serif italic for ONE word so the headline has a "moment".
 *    Mixed type pairing is what separates editorial from template.
 *  - Portrait has a rotated monospace label in its margin — tiny, 11px,
 *    0.25em tracking. You only notice it on a second read; that's the point.
 *  - Lede paragraph is foreground color + medium weight.
 *    Body paragraph is muted + regular. Creates a voice hierarchy.
 *  - Stats use tabular-nums so digits align vertically.
 *  - Frosted card (backdrop-blur over the body image) gives the section
 *    a "paper inset" feel rather than bleeding into the background.
 */
export default function AboutSection() {
  return (
    <section id="about" className="v2-about">
      <div className="v2-container">
        <article className="v2-about-card">
          {/* ── Meta strip ─────────────────────────────────────────── */}
          <header className="v2-about-meta">
            <span className="v2-about-meta__num">02 / About</span>
            <span className="v2-about-meta__spacer" aria-hidden="true" />
            <span className="v2-about-meta__status">
              <span className="v2-about-meta__dot" aria-hidden="true" />
              Available for work
            </span>
            <span>Based · India</span>
          </header>

          {/* ── Body ───────────────────────────────────────────────── */}
          <div className="v2-about-grid">
            {/* Portrait column */}
            <div className="v2-about-portrait">
              <span className="v2-about-portrait-label">
                Portrait · {new Date().getFullYear()}
              </span>

              <Image
                src="/Namit.webp"
                alt="Namit Rana"
                fill
                sizes="(min-width: 56rem) 40vw, 90vw"
                className="only-light"
              />
              <Image
                src="/NamitDark.webp"
                alt="Namit Rana"
                fill
                sizes="(min-width: 56rem) 40vw, 90vw"
                className="only-dark"
              />
            </div>

            {/* Content column */}
            <div className="v2-about-content">
              <h2 className="v2-about-title">
                Building software that <em>feels&nbsp;inevitable.</em>
              </h2>

              <hr className="v2-about-rule" aria-hidden="true" />

              <p className="v2-about-lede">
                I&apos;m Namit — a self-taught developer from India, obsessed
                with the details most portfolios skip.
              </p>

              <p className="v2-about-body">
                Clean architecture, considered typography, interfaces that feel
                obvious in retrospect — that&apos;s the work I want to do.
                I care about the weight of a <strong>hairline</strong>, the
                rhythm of a paragraph, and the moment a hover reveals something
                you didn&apos;t know you needed.
              </p>

              <p className="v2-about-body">
                Currently building tools that remove friction for people who
                make things for the web. Previously: startups, freelance, a lot
                of late-night refactors.
              </p>
            </div>
          </div>

          {/* ── Stats footer ───────────────────────────────────────── */}
          <footer className="v2-about-stats">
            <Stat value="4+" label="Years building" />
            <Stat value="30+" label="Projects shipped" />
            <Stat value="TS" label="Primary stack" />
            <Stat value="IND" label="Timezone · IST" />
          </footer>
        </article>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="v2-stat">
      <span className="v2-stat__value">{value}</span>
      <span className="v2-stat__label">{label}</span>
    </div>
  )
}
