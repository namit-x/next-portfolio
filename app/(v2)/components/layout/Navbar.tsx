import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/20 dark:bg-black/20 backdrop-blur-md border-b border-white/20 dark:border-white/10 shadow-lg">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-400 bg-clip-text text-transparent">
            NR
          </span>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden md:flex items-center gap-6">
              <a
                href="#work"
                className="text-sm text-gray-700 dark:text-gray-200 hover:text-cyan-400 dark:hover:text-cyan-400 transition-colors duration-200 font-medium"
              >
                Work
              </a>
              <a
                href="#about"
                className="text-sm text-gray-700 dark:text-gray-200 hover:text-cyan-400 dark:hover:text-cyan-400 transition-colors duration-200 font-medium"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-sm text-gray-700 dark:text-gray-200 hover:text-cyan-400 dark:hover:text-cyan-400 transition-colors duration-200 font-medium"
              >
                Contact
              </a>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}