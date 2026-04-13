import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { clsx } from 'clsx';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className={clsx(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
      isScrolled
        ? 'glass backdrop-blur-lg border-b border-border/20 shadow-lg'
        : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className={clsx("flex-shrink-0",
            theme === 'light'
            ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-600"
            : "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500"
          )}>
            <a
              href="#home"
              className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text transition-all duration-300"
            >
              Namit
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    'px-3 py-2 lg:px-4 lg:py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-300 hover:scale-105',
                    theme === 'light'
                      ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  )}
                >
                  {link.label}
                </a>
              ))}

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={clsx(
                  'ml-4 p-2 lg:p-3 rounded-lg transition-all duration-300',
                  theme === 'light'
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    : 'bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white'
                )}
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="w-4 h-4 lg:w-5 lg:h-5" />
                ) : (
                  <Sun className="w-4 h-4 lg:w-5 lg:h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={clsx(
                'p-2 rounded-lg transition-all duration-300',
                theme === 'light'
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  : 'bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white'
              )}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={clsx(
                'p-2 rounded-lg transition-all duration-300',
                theme === 'light'
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  : 'bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white'
              )}
              aria-label="Toggle mobile menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={clsx(
          'md:hidden transition-all duration-300 ease-in-out overflow-hidden',
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        )}>
          <div className={clsx(
            'py-4 space-y-2 border-t border-border/20',
            theme === 'light' ? 'bg-white/95' : 'bg-black/95'
          )}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  'block px-4 py-3 text-base font-medium rounded-lg transition-all duration-300',
                  theme === 'light'
                    ? 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                )}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}