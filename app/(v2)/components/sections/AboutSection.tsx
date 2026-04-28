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
      className="v2-about-extracted"
      aria-labelledby="about-title"
    >
      <div className="v2-about-extracted__section-label-container">
        <div className="v2-about-extracted__section-label">
          <span className="v2-about-extracted__section-num">02</span>
          <span className="v2-about-extracted__section-name">About</span>
          <span
            className="v2-about-extracted__section-tick"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="v2-container">
        <div className="v2-about-extracted__grid">
          <div className="v2-about-extracted__left">
            <div>
              <h2 id="about-title" className="v2-about-extracted__statement">
                No classroom.
                <br />
                No roadmap.
                <br />
                Just <em>shipped products.</em>
              </h2>
              <p className="v2-about-extracted__descriptor">
                Self-taught, third year in, already working with real clients. I build
                full-stack apps that perform cleanly under pressure because I learned by
                shipping, not by studying.
              </p>
            </div>

            <ul className="v2-about-extracted__stack" aria-label="Technology stack">
              {TECH_STACK.map((tech) => (
                <li key={tech} className="v2-about-extracted__pill">
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <dl className="v2-about-extracted__right">
            {FACTS.map((fact) => (
              <div className="v2-about-extracted__fact-row" key={fact.label}>
                <dt className="v2-about-extracted__fact-label">{fact.label}</dt>
                <dd className="v2-about-extracted__fact-value">
                  <span className={fact.accent ? 'v2-about-extracted__accent' : undefined}>
                    {fact.value}
                  </span>
                  {fact.detail ? (
                    <small className="v2-about-extracted__fact-detail">· {fact.detail}</small>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="v2-about-extracted__bottom-bar">
          <a href="#contact" className="v2-about-extracted__cta">
            Get in touch <span className="v2-about-extracted__cta-arrow">→</span>
          </a>
          <span className="v2-about-extracted__years">Bengaluru · self-taught since 2022</span>
        </div>
      </div>
    </section>
  )
}
