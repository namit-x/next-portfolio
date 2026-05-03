import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md shadow-sm"
      style={{
        backgroundColor: 'hsl(var(--card) / 0.75)',
        borderBottom: '1px solid hsl(var(--border))',
      }}
    >
      <style>{`
        .nav-link {
          color: hsl(var(--foreground));
          transition: color 0.2s ease;
        }
        .nav-link:hover {
          color: hsl(180 100% 50%);
        }
      `}</style>
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Empty div to maintain flex spacing with theme toggle */}
          <div className="w-10 sm:w-12"></div>

          {/* Centered navigation links */}
          <div className="flex items-center gap-4 sm:gap-6 md:gap-14">
            <a href="#work" className="nav-link text-sm font-medium">
              Work
            </a>
            <a href="#about" className="nav-link text-sm font-medium">
              About
            </a>
            <a href="#contact" className="nav-link text-sm font-medium">
              Contact
            </a>
          </div>

          {/* Theme toggle - kept exactly in place */}
          <div className="w-10 sm:w-12 flex justify-end">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
