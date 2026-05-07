import HeroSection from './components/sections/HeroSection'
import ProjectsSection from './components/sections/ProjectsSection'
import AboutSection from './components/sections/AboutSection'
import SignalGridSection from './components/sections/SignalGridSection'
import ContactSection from './components/sections/ContactSection'

export default function V2Page() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SignalGridSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  )
}
