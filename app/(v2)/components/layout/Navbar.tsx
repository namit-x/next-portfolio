import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <nav className="v2-nav">
      <span className="v2-nav-logo">NR</span>
      <div className="v2-nav-right">
        <div className="v2-nav-links">
          <a href="#work" className="v2-nav-link">Work</a>
          <a href="#about" className="v2-nav-link">About</a>
          <a href="#contact" className="v2-nav-link">Contact</a>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  )
}
