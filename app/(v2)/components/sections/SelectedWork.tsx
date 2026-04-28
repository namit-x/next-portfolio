'use client'

import { useRef, useEffect } from 'react'
import { ScrollContextProvider, useScrollContext } from '../../context/ScrollContext'
import SelectedWorkHUD from './SelectedWorkHUD'
import SelectedWorkVault from './SelectedWorkVault'
import SelectedWorkVesta from './SelectedWorkVesta'
import SelectedWorkRAG from './SelectedWorkRAG'
import SelectedWorkClueless from './SelectedWorkClueless'

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
            <div className='border-2'>
            <SelectedWorkVesta />
            </div>

            {/* Project 02: RAG — Terminal Theater Split Screen (Phase 4) */}
            <SelectedWorkRAG />

            {/* Project 03: Clueless — Blueprint Three-Column (Phase 5) */}
            <SelectedWorkClueless />
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
