import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'

export default function V2Page() {
  return (
    <main>
      <HeroSection />
      <div className="v2-about-extracted__section-label">
        <span className="v2-about-extracted__section-num">02</span>
        <span className="v2-about-extracted__section-name">About</span>
        <span className="v2-about-extracted__section-tick" aria-hidden="true" />
      </div>
      <AboutSection />
    </main>
  )
}
