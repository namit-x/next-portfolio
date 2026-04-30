'use client'

import { useScrollContext } from '../../context/ScrollContext'

export default function SelectedWorkHUD() {
    const { currentProject, sectionProgress } = useScrollContext()

    const breadcrumbs = ['', '/work/vesta', '/work/rag', '/work/clueless']
    const currentBreadcrumb = breadcrumbs[currentProject] || ''

    return (
        <>
            {/* Top-left: Breadcrumb */}
            <div className="fixed top-7 left-12 z-50 font-mono pointer-events-none">
                <span className="text-xs uppercase tracking-[0.08em] text-muted-foreground/70 lowercase opacity-0 [animation:fade-in_0.6s_ease_forwards]">
                    {currentBreadcrumb}
                </span>
            </div>

            {/* Top-right: Progress indicator (01 · 02 · 03) */}
            <div className="fixed top-7 right-12 z-50 flex items-center gap-4 font-mono pointer-events-none">
                {[1, 2, 3].map(num => (
                    <div
                        key={num}
                        className={`text-sm font-semibold uppercase tracking-[0.1em] transition-colors duration-300 ${currentProject === num
                            ? 'text-primary'
                            : 'text-muted-foreground/50'
                            }`}
                    >
                        {String(num).padStart(2, '0')}
                    </div>
                ))}
            </div>

            {/* Bottom-right: Scroll progress line with ticks */}
            <div className="fixed bottom-10 right-12 z-50 flex flex-col items-center gap-3 font-mono pointer-events-none">
                {[1, 2, 3].map(tick => {
                    const tickProgress = (tick / 3) * 100
                    const isActive = sectionProgress >= tickProgress - 5
                    return (
                        <div
                            key={tick}
                            className={`w-px transition-all duration-300 ${isActive
                                ? 'h-6 bg-primary shadow-[0_0_8px_hsl(var(--primary)_/_0.5)]'
                                : 'h-4 bg-muted-foreground/30'
                                }`}
                        />
                    )
                })}
            </div>
        </>
    )
}
