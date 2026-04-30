import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/20 dark:bg-black/20 backdrop-blur-md border-b border-white/20 dark:border-white/10 shadow-lg">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Empty div to maintain flex spacing with theme toggle */}
          <div className="w-10 sm:w-12"></div>

          {/* Centered navigation links */}
          <div className="flex items-center gap-4 sm:gap-6 md:gap-14">
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

          {/* Theme toggle - kept exactly in place */}
          <div className="w-10 sm:w-12 flex justify-end">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
