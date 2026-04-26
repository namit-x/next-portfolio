'use client'

import { useRef, useState, useEffect } from 'react'
import { useScrollHijack } from '../../hooks/useScrollHijack'
import { useScrollContext } from '../../context/ScrollContext'

/**
 * Vesta: Horizontal Pan Cinema
 * Vertical scroll becomes horizontal pan across 4 panels
 * Each panel reveals different story: title → before → dashboard → result
 */
export default function SelectedWorkVesta() {
    const panelContainerRef = useRef<HTMLDivElement>(null)
    const [panX, setPanX] = useState(0)
    const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null)
    const { setCurrentProject, setProjectProgress } = useScrollContext()

    const { totalScroll } = useScrollHijack(true, (state) => {
        // Convert vertical scroll to horizontal pan
        // 1px vertical = 0.5px horizontal (adjust sensitivity)
        const newPanX = Math.max(0, Math.min(state.totalScroll * 0.5, 300 * 4 - 100))
        setPanX(newPanX)
    })

    useEffect(() => {
        // Max scroll range for Vesta ≈ 1200px of content
        const progress = Math.min(100, (totalScroll / 2400) * 100)
        setCurrentProject(1)
        setProjectProgress(progress)
    }, [totalScroll, setCurrentProject, setProjectProgress])

    const hotspots = [
        {
            id: 'auth',
            label: 'Role-based Auth',
            x: 30,
            y: 40,
            subLabel: 'Multi-level access',
        },
        {
            id: 'search',
            label: 'Patient Search',
            x: 60,
            y: 50,
            subLabel: 'Real-time indexed',
        },
        {
            id: 'reports',
            label: 'PDF Reports',
            x: 50,
            y: 65,
            subLabel: 'Auto-generated',
        },
    ]

    const stats = [
        { label: 'Faster', value: '70%' },
        { label: 'Records', value: '2,400' },
        { label: 'Load time', value: '0.9s' },
    ]

    return (
        <section
            ref={panelContainerRef}
            className="vesta"
            aria-label="Vesta project showcase"
            style={{
                minHeight: '100vh',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            {/* 4-panel horizontal strip */}
            <div
                className="vesta__strip"
                style={{
                    display: 'flex',
                    width: 'max(100vw, 100%)',
                    minHeight: '100vh',
                    transform: `translateX(-${panX}px)`,
                    transition: 'transform 0.1s ease-out',
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
                        <span style={{ fontWeight: 700 }}>Healthcare Tech</span> · 2024
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
                        Spreadsheets &rarr; production in 3 weeks.
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
                    }}
                >
                    {/* Isometric dashboard mockup */}
                    <div
                        style={{
                            width: '60vw',
                            height: '50vh',
                            background: 'hsl(var(--muted) / 0.3)',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            transform: 'rotateX(10deg) rotateZ(-15deg)',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'hsl(var(--muted-foreground))',
                            fontSize: '0.875rem',
                            fontFamily: 'var(--font-mono, monospace)',
                        }}
                    >
                        Dashboard UI Mockup
                        {/* Hotspots */}
                        {hotspots.map(hotspot => (
                            <div
                                key={hotspot.id}
                                className={`vesta__hotspot ${hoveredHotspot === hotspot.id ? 'active' : ''
                                    }`}
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
                                onMouseEnter={() => setHoveredHotspot(hotspot.id)}
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
                                {hoveredHotspot === hotspot.id && (
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

                    {/* Impact stats below */}
                    <div
                        style={{
                            marginTop: '2rem',
                            display: 'flex',
                            gap: '2rem',
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
                            borderRadius: '8px',
                            padding: '2rem',
                            maxWidth: '40rem',
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
                Scroll to explore
            </div>
        </section>
    )
}
