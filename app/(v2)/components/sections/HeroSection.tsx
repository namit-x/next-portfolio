import ScrollHint from '../hero/ScrollHint'
import RoleTypewriter from '../hero/RoleTypewriter'

export default function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-dot-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <span className="hero-year" aria-hidden="true">Est. 2026 · Portfolio</span>

      <div className="hero-content">
        <div className="hero-status">
          <span className="hero-status-dot" aria-hidden="true" />
          Available for freelance
        </div>

        <h1 className="hero-name">NAMIT</h1>

        <div className="hero-role-line">
          <span className="hero-role">
            <RoleTypewriter />
            <span className="hero-cursor" aria-hidden="true" />
          </span>
          <span className="hero-divider" aria-hidden="true" />
          <span className="hero-location">Bengaluru, IN</span>
        </div>
      </div>

      <ScrollHint />
    </section>
  )
}
