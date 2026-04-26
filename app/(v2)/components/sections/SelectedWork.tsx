'use client'

import { useRef, useEffect } from 'react'
import { ScrollContextProvider, useScrollContext } from '../../context/ScrollContext'
import SelectedWorkHUD from './SelectedWorkHUD'
import SelectedWorkVault from './SelectedWorkVault'
import SelectedWorkVesta from './SelectedWorkVesta'

/**
 * Inner component that uses the scroll context
 */
function SelectedWorkContent() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { setSectionProgress } = useScrollContext()

    useEffect(() => {
        if (!containerRef.current) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const rect = entry.boundingClientRect
                    const progress = Math.max(
                        0,
                        Math.min(100, ((-rect.top / rect.height) * 100) | 0)
                    )
                    setSectionProgress(progress)
                }
            },
            { threshold: 0.1 }
        )

        observer.observe(containerRef.current)

        return () => observer.disconnect()
    }, [setSectionProgress])

    return (
        <section
            ref={containerRef}
            id="work"
            className="selected-work"
            aria-labelledby="work-title"
        >
            {/* Section label */}
            <div className="selected-work__section-label">
                <span className="selected-work__section-num">03</span>
                <span className="selected-work__section-name">Selected Work</span>
                <span className="selected-work__section-tick" aria-hidden="true" />
            </div>

            {/* HUD overlay (fixed) */}
            <SelectedWorkHUD />

            {/* Entry animation: "The Vault" (Phase 2) */}
            <SelectedWorkVault />

            {/* Project 01: Vesta — Horizontal Pan Cinema (Phase 3) */}
            <SelectedWorkVesta />

            {/* Project 02: RAG (Phase 4) */}
            <div className="selected-work__project selected-work__project--rag">
                <div
                    style={{
                        minHeight: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'hsl(var(--muted-foreground))',
                    }}
                >
                    RAG - Terminal Theater Split Screen (Phase 4)
                </div>
            </div>

            {/* Project 03: Clueless (Phase 5) */}
            <div className="selected-work__project selected-work__project--clueless">
                <div
                    style={{
                        minHeight: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'hsl(var(--muted-foreground))',
                    }}
                >
                    Clueless - Blueprint Room Three-Column (Phase 5)
                </div>
            </div>
        </section>
    )
}

/**
 * Outer component that wraps with context provider
 */
export default function SelectedWork() {
    return (
        <ScrollContextProvider>
            <SelectedWorkContent />
        </ScrollContextProvider>
    )
}
