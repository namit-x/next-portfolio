'use client'

import { useState, useEffect, useRef } from 'react'
import { useScrollHijack } from '../../hooks/useScrollHijack'
import { useScrollContext } from '../../context/ScrollContext'
import { PROJECTS } from '../../data/projects'
import { OptimizedImage } from '../ui/OptimizedImage'

/**
 * Vesta: Horizontal Pan Cinema
 * Vertical scroll becomes horizontal pan across 4 panels
 * Each panel reveals different story: title → before → dashboard → result
 */
export default function SelectedWorkVesta() {
    const [panX, setPanX] = useState(0)
    const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null)
    const [maxPanX, setMaxPanX] = useState(0)
    const { setCurrentProject, setProjectProgress } = useScrollContext()
    const stripRef = useRef<HTMLDivElement>(null)
    const sectionEntryScrollRef = useRef(0)
    const wasActiveRef = useRef(false)
    const panelCount = 4
    const [maxScroll, setMaxScroll] = useState(3600)

    // Safely get vesta project data with fallbacks at every level
    const vestaProject = PROJECTS?.find(p => p?.type === 'vesta')
    const vestaData = vestaProject?.vestaData
    const imageUrl = vestaData?.imageUrl || '/Vesta.webp'
    const clientType = vestaData?.clientType || 'Healthcare Tech'
    const year = vestaData?.year || '2024'
    const beforeSentence = vestaData?.beforeSentence || 'Spreadsheets to production in 3 weeks.'

    // CRITICAL FIX: Ensure arrays are always valid, even during SSR/hydration
    const hotspots = Array.isArray(vestaData?.hotspots) ? vestaData.hotspots : []
    const stats = Array.isArray(vestaData?.stats) ? vestaData.stats : []

    // Get dynamic scroll distance based on viewport
    const getScrollDistance = () => {
        if (typeof window === 'undefined') return 3600
        return Math.max(2400, Math.min(4800, window.innerHeight * 3.5))
    }

    // Update maxScroll dynamically on resize
    useEffect(() => {
        const updateScrollDistance = () => {
            const newMaxScroll = getScrollDistance()
            setMaxScroll(newMaxScroll)  // ✅ Use setMaxScroll here
        }

        updateScrollDistance()
        window.addEventListener('resize', updateScrollDistance)
        return () => window.removeEventListener('resize', updateScrollDistance)
    }, [])

    const { containerRef, isActive, totalScroll, resetScroll } = useScrollHijack(Boolean(vestaData), (state) => {
        const scrollDistance = maxScroll > 0 ? maxScroll : 3600
        const relativeScroll = Math.max(0, state.totalScroll - sectionEntryScrollRef.current)
        const progress = Math.min(1, Math.max(0, relativeScroll / scrollDistance))
        const newPanX = progress * maxPanX
        setPanX(newPanX)
    }, maxScroll)

    useEffect(() => {
        if (isActive && !wasActiveRef.current) {
            // Capture scroll position when section becomes active — keep it as baseline
            sectionEntryScrollRef.current = totalScroll
            setPanX(0)
            resetScroll()
            // ✅ Keep sectionEntryScrollRef.current — don't reset to 0
            // This ensures all panX calculations are relative to entry point
        }

        wasActiveRef.current = isActive
    }, [isActive, resetScroll, totalScroll])

    useEffect(() => {
        const updateMaxPan = () => {
            const stripWidth = stripRef.current?.scrollWidth ?? 0
            const viewportWidth = window.innerWidth
            setMaxPanX(Math.max(0, stripWidth - viewportWidth))
        }

        updateMaxPan()
        window.addEventListener('resize', updateMaxPan)

        return () => window.removeEventListener('resize', updateMaxPan)
    }, [])

    useEffect(() => {
        const relativeScroll = Math.max(0, totalScroll - sectionEntryScrollRef.current)
        const progress = Math.min(100, (relativeScroll / maxScroll) * 100)
        setCurrentProject(1)
        setProjectProgress(progress)
    }, [maxScroll, totalScroll, setCurrentProject, setProjectProgress])

    // Early return if vestaData is not available
    if (!vestaData) {
        return <div>Vesta project data not found</div>
    }

    return (
        <section
            ref={containerRef}
            className="vesta"
            aria-label="Vesta project showcase"
            style={{
                minHeight: '100vh',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {/* 4-panel horizontal strip */}
            <div
                ref={stripRef}
                className="vesta__strip"
                style={{
                    display: 'flex',
                    width: `${panelCount * 100}vw`,
                    minHeight: '100vh',
                    transform: `translateX(-${panX}px)`,
                    transition: 'transform 0.12s ease-out',
                    willChange: 'transform',
                }}
            >
                {/* Panel A: VESTA Title */}
                <div
                    className="vesta__panel vesta__panel--title"
                    style={{
                        minWidth: '100vw',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        padding: 'var(--container-pad)',
                    }}
                >
                    <div
                        style={{
                            fontSize: 'clamp(4rem, 20vw, 12rem)',
                            fontFamily: 'var(--font-syne, Syne, sans-serif)',
                            fontWeight: 900,
                            letterSpacing: '0.2em',
                            color: 'hsl(var(--foreground))',
                            lineHeight: 0.9,
                            textTransform: 'uppercase',
                            marginBottom: '2rem',
                        }}
                    >
                        VESTA
                    </div>
                    <div
                        style={{
                            fontSize: '0.875rem',
                            fontFamily: 'var(--font-mono, monospace)',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'hsl(var(--muted-foreground))',
                        }}
                    >
                        <span style={{ fontWeight: 700 }}>{clientType}</span> · {year}
                    </div>
                </div>

                {/* Panel B: Before state → Sentence */}
                <div
                    className="vesta__panel vesta__panel--before"
                    style={{
                        minWidth: '100vw',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 'var(--container-pad)',
                        position: 'relative',
                        background: `hsl(var(--background))`,
                    }}
                >
                    <p
                        style={{
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            fontWeight: 700,
                            color: 'hsl(var(--foreground))',
                            margin: 0,
                            textAlign: 'center',
                            maxWidth: '30ch',
                        }}
                    >
                        {beforeSentence}
                    </p>
                </div>

                {/* Panel C: Dashboard Isometric */}
                <div
                    className="vesta__panel vesta__panel--dashboard"
                    style={{
                        minWidth: '100vw',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 'var(--container-pad)',
                        perspective: '1200px',
                        gap: '1.5rem',
                    }}
                >
                    {/* Isometric dashboard mockup */}
                    <div
                        style={{
                            width: 'min(72vw, 820px)',
                            height: 'min(56vh, 560px)',
                            borderRadius: '18px',
                            transform: 'rotateX(8deg) rotateZ(-10deg)',
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: '0 32px 80px hsl(240 10% 4% / 0.18)',
                            border: '1px solid hsl(var(--border))',
                            background: 'hsl(var(--card))',
                        }}
                    >
                        <OptimizedImage
                            src={imageUrl}
                            alt="Vesta Healthcare Dashboard"
                            width={820}
                            height={560}
                            sizes="(max-width: 768px) 92vw, 72vw"
                            objectFit="cover"
                        />
                        {/* Hotspots - now safe with guaranteed array */}
                        {hotspots.length > 0 && hotspots.map((hotspot, index) => (
                            <div
                                key={`${hotspot.label}-${index}`}
                                className={`vesta__hotspot ${hoveredHotspot === hotspot.label ? 'active' : ''}`}
                                style={{
                                    position: 'absolute',
                                    left: `${hotspot.x}%`,
                                    top: `${hotspot.y}%`,
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    border: '2px solid hsl(var(--primary))',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    animation: 'vesta__pulse 2s ease-in-out infinite',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={() => setHoveredHotspot(hotspot.label)}
                                onMouseLeave={() => setHoveredHotspot(null)}
                            >
                                <span
                                    style={{
                                        width: '8px',
                                        height: '8px',
                                        background: 'hsl(var(--primary))',
                                        borderRadius: '50%',
                                    }}
                                />
                                {hoveredHotspot === hotspot.label && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '-3rem',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            background: 'hsl(var(--card))',
                                            border: '1px solid hsl(var(--border))',
                                            borderRadius: '4px',
                                            padding: '0.5rem 0.75rem',
                                            fontSize: '0.75rem',
                                            whiteSpace: 'nowrap',
                                            zIndex: 10,
                                        }}
                                    >
                                        <div style={{ fontWeight: 600 }}>{hotspot.label}</div>
                                        <div style={{ fontSize: '0.65rem', opacity: 0.7 }}>
                                            {hotspot.subLabel}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Impact stats below - now safe with guaranteed array */}
                    {stats.length > 0 && (
                        <div
                            style={{
                                display: 'flex',
                                gap: '2rem',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                fontFamily: 'var(--font-mono, monospace)',
                                fontSize: '0.875rem',
                            }}
                        >
                            {stats.map(stat => (
                                <div
                                    key={stat.label}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: '1.5rem',
                                            fontWeight: 700,
                                            color: 'hsl(var(--primary))',
                                        }}
                                    >
                                        {stat.value}
                                    </div>
                                    <div style={{ color: 'hsl(var(--muted-foreground))' }}>
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Panel D: Browser card result */}
                <div
                    className="vesta__panel vesta__panel--result"
                    style={{
                        minWidth: '100vw',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 'var(--container-pad)',
                    }}
                >
                    <div
                        style={{
                            background: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '14px',
                            padding: '2.5rem',
                            maxWidth: '42rem',
                            width: 'min(42rem, 100%)',
                        }}
                    >
                        <div
                            style={{
                                fontFamily: 'var(--font-mono, monospace)',
                                fontSize: '0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginBottom: '1rem',
                                paddingBottom: '1rem',
                                borderBottom: '1px solid hsl(var(--border))',
                            }}
                        >
                            <span style={{ width: '8px', height: '8px', background: '#ff5f56', borderRadius: '50%' }} />
                            <span style={{ width: '8px', height: '8px', background: '#ffbd2e', borderRadius: '50%' }} />
                            <span style={{ width: '8px', height: '8px', background: '#27c93f', borderRadius: '50%' }} />
                        </div>
                        <p
                            style={{
                                fontSize: '1rem',
                                fontWeight: 700,
                                color: 'hsl(var(--foreground))',
                                margin: '0 0 1rem 0',
                            }}
                        >
                            Live. In production. Still growing.
                        </p>
                        <div
                            style={{
                                height: '2px',
                                background: `linear-gradient(to right, hsl(var(--primary)), transparent)`,
                                marginTop: '1rem',
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Scroll progress indicator */}
            <div
                style={{
                    position: 'fixed',
                    bottom: '2.5rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono, monospace)',
                    color: 'hsl(var(--muted-foreground))',
                    pointerEvents: 'none',
                }}
            >
                {Math.round((panX / Math.max(maxPanX, 1)) * 100)}% explored
            </div>
        </section>
    )
}
