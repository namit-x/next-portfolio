'use client'

import Image from 'next/image'
import { useRef, useEffect, useState, useCallback } from 'react'

type FeaturedProject = {
  id: string
  number: string
  name: string
  category: string
  year: string
  summary: string
  impact: string
  imageUrl: string
  tags: string[]
}

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'vesta',
    number: '01',
    name: 'Vesta Diagnostics',
    category: 'Healthcare platform',
    year: '2024',
    summary:
      'A calmer digital experience for a diagnostics brand, focused on clarity, trust, and quicker booking paths.',
    impact: 'Turned a complex service catalog into a cleaner conversion flow.',
    imageUrl: '/Vesta.webp',
    tags: ['React', 'Tailwind', 'Conversion UX'],
  },
  {
    id: 'advance',
    number: '02',
    name: 'Advance Architect',
    category: 'Studio website',
    year: '2024',
    summary:
      'A polished marketing site for an architecture studio, balancing editorial typography with strong inquiry CTAs.',
    impact: 'Shifted the brand presentation toward a more premium, client-ready feel.',
    imageUrl: '/Advance.webp',
    tags: ['Brand Site', 'Landing Page', 'Responsive UI'],
  },
  {
    id: 'shoporia',
    number: '03',
    name: 'Shoporia',
    category: 'E-commerce storefront',
    year: '2024',
    summary:
      'A modern retail interface designed to keep product discovery simple, visual, and fast across screen sizes.',
    impact: 'Created a cleaner browsing experience with a lighter visual footprint.',
    imageUrl: '/Shoporia.webp',
    tags: ['E-commerce', 'Frontend', 'UI Systems'],
  },
  {
    id: 'openup',
    number: '04',
    name: 'Open Up',
    category: 'Online therapy platform',
    year: '2024',
    summary:
      'A comprehensive mental health platform connecting users with licensed therapists through seamless video calls, smart matching, and flexible booking.',
    impact: 'Reduced appointment booking time by 70% and increased therapist-client matching accuracy by 45%.',
    imageUrl: '/OpenUp.webp',
    tags: ['Video Calling', 'WebRTC', 'Calendar Integration', 'Therapist Matching'],
  },
]

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const dragStartXRef = useRef(0)
  const dragScrollLeftRef = useRef(0)

  const scrollSpeed = 1.2

  // Function to update current index based on scroll position
  const updateCurrentIndex = useCallback(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track || track.children.length === 0) return

    const firstCard = track.children[0] as HTMLElement
    const cardWidth = firstCard.offsetWidth
    const gap = 24
    const cardTotalWidth = cardWidth + gap
    const scrollPosition = container.scrollLeft

    // Calculate which card is most visible
    let mostVisibleIndex = 0
    let maxVisibleWidth = 0

    for (let i = 0; i < track.children.length; i++) {
      const card = track.children[i] as HTMLElement
      const cardLeft = i * cardTotalWidth
      const cardRight = cardLeft + cardWidth
      const containerLeft = scrollPosition
      const containerRight = scrollPosition + container.clientWidth

      // Calculate visible portion of this card
      const visibleLeft = Math.max(cardLeft, containerLeft)
      const visibleRight = Math.min(cardRight, containerRight)
      const visibleWidth = Math.max(0, visibleRight - visibleLeft)

      if (visibleWidth > maxVisibleWidth) {
        maxVisibleWidth = visibleWidth
        const cardElement = card as HTMLElement
        const projectId = cardElement.getAttribute('data-project-id')
        const foundIndex = FEATURED_PROJECTS.findIndex(p => p.id === projectId)
        if (foundIndex !== -1) {
          mostVisibleIndex = foundIndex
        }
      }
    }

    setCurrentIndex(mostVisibleIndex)
  }, [])

  // 🚀 TRUE INFINITE SCROLL LOGIC
  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    let rafId: number

    const step = () => {
      if (!isHovered && !isDragging) {
        container.scrollLeft += scrollSpeed

        const firstChild = track.children[0] as HTMLElement
        if (!firstChild) return

        // If first card completely out of view → move it to end
        if (container.scrollLeft >= firstChild.offsetWidth + 24) {
          container.scrollLeft -= firstChild.offsetWidth + 24
          track.appendChild(firstChild)
          // Update index after reordering
          updateCurrentIndex()
        }
      }

      rafId = requestAnimationFrame(step)
    }

    rafId = requestAnimationFrame(step)

    return () => cancelAnimationFrame(rafId)
  }, [isHovered, isDragging, scrollSpeed, updateCurrentIndex])

  // Update index on scroll events
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('scroll', updateCurrentIndex)
    // Initial update
    updateCurrentIndex()

    return () => container.removeEventListener('scroll', updateCurrentIndex)
  }, [updateCurrentIndex])

  const onMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current
    if (!container) return

    setIsDragging(true)
    dragStartXRef.current = e.pageX
    dragScrollLeftRef.current = container.scrollLeft
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    e.preventDefault()
    const walk = (e.pageX - dragStartXRef.current) * 1.5
    containerRef.current.scrollLeft = dragScrollLeftRef.current - walk
    // Update index while dragging
    updateCurrentIndex()
  }

  const onMouseUp = () => {
    setIsDragging(false)
    updateCurrentIndex()
  }

  // Navigate to specific project
  const goToProject = (index: number) => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    const cardWidth = (track.children[0] as HTMLElement)?.offsetWidth || 0
    const gap = 24
    const cardTotalWidth = cardWidth + gap

    // Find which card currently shows the target project
    let targetCardIndex = -1
    for (let i = 0; i < track.children.length; i++) {
      const card = track.children[i] as HTMLElement
      const projectId = card.getAttribute('data-project-id')
      if (projectId === FEATURED_PROJECTS[index].id) {
        targetCardIndex = i
        break
      }
    }

    if (targetCardIndex !== -1) {
      const targetScroll = targetCardIndex * cardTotalWidth
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      })
      // Update index after smooth scroll
      setTimeout(() => updateCurrentIndex(), 500)
    }
  }

  return (
    <section
      id="work"
      className="relative py-12 sm:py-16 md:py-20 lg:py-[clamp(4.5rem,_3.5rem_+_4vw,_6rem)] overflow-hidden"
      aria-labelledby="work-title"
    >
      <div className="px-3 sm:px-4 md:px-6 lg:px-[var(--container-pad)] mb-8 sm:mb-10 md:mb-12">
        <div className="flex items-center gap-3 sm:gap-4 font-mono text-xs sm:text-sm uppercase tracking-[0.1em]">
          <span className="text-sm sm:text-base font-bold text-primary">04</span>
          <span className="text-sm sm:text-base font-bold text-foreground">Work</span>
          <span
            className="w-1 h-1 rounded-full [background:hsl(var(--primary))] flex-shrink-0"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="relative">
        {/* Project Counter */}
        <div className="absolute left-4 top-4 z-20 lg:left-8">
          <div className="bg-background/80 backdrop-blur-sm border border-border rounded-full px-5 py-2.5 shadow-lg">
            <span className="font-mono text-base font-semibold">
              <span className="text-primary">{String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="text-muted-foreground">/{String(FEATURED_PROJECTS.length).padStart(2, '0')}</span>
            </span>
          </div>
        </div>

        {/* Infinite Scroll Container */}
        <div
          ref={containerRef}
          className="overflow-x-auto cursor-grab active:cursor-grabbing scrollbar-hide"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false)
            setIsDragging(false)
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <div
            ref={trackRef}
            className="flex gap-6 px-3 sm:px-4 md:px-6 lg:px-[var(--container-pad)]"
          >
            {FEATURED_PROJECTS.map((project) => (
              <article
                key={project.id}
                data-project-id={project.id}
                className="group relative flex-shrink-0 w-[95vw] md:w-[90vw] lg:w-[1100px] xl:w-[1200px] rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
                  {/* Full background image */}
                  <Image
                    src={project.imageUrl}
                    alt={`${project.name} project preview`}
                    fill
                    sizes="(min-width: 1024px) 90vw, 95vw"
                    className="object-cover object-center"
                    priority
                  />

                  {/* Black overlay panel - slides in from left on hover */}
                  <div
                    className="absolute inset-y-0 left-0 w-full md:w-2/3 lg:w-1/2 bg-black/95 backdrop-blur-sm transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-10 overflow-y-auto"
                  >
                    <div className="flex flex-col justify-between h-full p-8 sm:p-10 md:p-12 lg:p-14">
                      {/* Top section - number and year */}
                      <div>
                        <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/20">
                          <span className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-white/90">
                            {project.number}
                          </span>
                          <span className="font-mono text-sm sm:text-base uppercase tracking-[0.1em] text-white/70 font-semibold">
                            {project.year}
                          </span>
                        </div>
                      </div>

                      {/* Middle section - main content */}
                      <div className="flex-1 flex flex-col justify-center py-8">
                        <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-primary font-semibold mb-3">
                          {project.category.toUpperCase()}
                        </p>
                        <h3 className="font-display text-[clamp(2rem,_5vw,_3.5rem)] leading-[1.1] tracking-tight text-white font-bold mb-5">
                          {project.name}
                        </h3>
                        <p className="font-mono text-sm sm:text-base font-light leading-relaxed text-white/70 max-w-lg mb-8">
                          {project.summary}
                        </p>

                        {/* Navigation UI mockup */}
                        <div className="space-y-4 mb-8">
                          <div className="flex gap-6 border-b border-white/10 pb-3">
                            <span className="font-mono text-xs uppercase tracking-wider text-white/40">New</span>
                            <span className="font-mono text-xs uppercase tracking-wider text-white/40">Women</span>
                            <span className="font-mono text-xs uppercase tracking-wider text-white/40">Men</span>
                            <span className="font-mono text-xs uppercase tracking-wider text-white/40">Beauty</span>
                            <span className="font-mono text-xs uppercase tracking-wider text-white/40">Home</span>
                          </div>

                          <div>
                            <h4 className="font-display text-xl text-white font-semibold mb-1">Luxury Essentials</h4>
                            <p className="font-mono text-xs text-white/50">Timeless pieces for your wardrobe</p>
                          </div>

                          <button className="bg-white text-black px-6 py-2 rounded-full font-mono text-sm font-semibold hover:bg-primary hover:text-white transition-colors">
                            Shop Now
                          </button>
                        </div>
                      </div>

                      {/* Bottom section - tags and impact */}
                      <div className="space-y-4 pt-6 border-t border-white/20">
                        <ul className="flex flex-wrap gap-2" aria-label={`${project.name} technologies`}>
                          {project.tags.map((tag) => (
                            <li
                              key={tag}
                              className="font-mono text-xs uppercase tracking-[0.08em] text-white/60 border border-white/20 px-2.5 py-1 rounded-full"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>

                        <p className="font-mono text-sm text-white/80 leading-relaxed border-l-2 border-primary pl-4">
                          {project.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Gradient overlays for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />

        {/* Dot Indicators */}
        <div className="flex justify-center gap-4 mt-8">
          {FEATURED_PROJECTS.map((_, index) => (
            <button
              key={index}
              onClick={() => goToProject(index)}
              className={`transition-all duration-300 rounded-full ${currentIndex === index
                ? 'w-10 bg-primary'
                : 'w-2.5 bg-border hover:bg-primary/50'
                } h-2.5`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
            <span>Hover to pause • Drag to scroll manually • Hover cards to reveal project details</span>
          </div>
        </div>
      </div>
    </section>
  )
}