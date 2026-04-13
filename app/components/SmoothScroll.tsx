import { useEffect, useRef, ReactNode } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  children: ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with optimal settings for buttery smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,        // Scroll duration - sweet spot for smoothness
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
      wheelMultiplier: 1,   // Mouse wheel sensitivity
      touchMultiplier: 2,   // Touch sensitivity
    });

    lenisRef.current = lenis;

    // Animation loop for continuous smooth scrolling
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  // Allow external scroll control (optional)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lenisRef.current) return;
      
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          lenisRef.current.scrollTo(lenisRef.current.scroll - window.innerHeight * 0.1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          lenisRef.current.scrollTo(lenisRef.current.scroll + window.innerHeight * 0.1);
          break;
        case ' ':
          e.preventDefault();
          lenisRef.current.scrollTo(lenisRef.current.scroll + window.innerHeight * 0.8);
          break;
        case 'Home':
          e.preventDefault();
          lenisRef.current.scrollTo(0);
          break;
        case 'End':
          e.preventDefault();
          lenisRef.current.scrollTo(document.body.scrollHeight);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;