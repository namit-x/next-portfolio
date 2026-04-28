'use client'

import { useRef, useState, useEffect } from 'react'
import { useScrollHijack } from '../../hooks/useScrollHijack'
import { useScrollContext } from '../../context/ScrollContext'
import { PROJECTS } from '../../data/projects'
import { OptimizedImage } from '../ui/OptimizedImage'
import gsap from 'gsap'

/**
 * Clueless: Blueprint Three-Column Room
 * Left: Technical spec sheet with ticks
 * Center: Architecture diagram with scroll-pulse
 * Right: Decision entries with click interactions
 */
export default function SelectedWorkClueless() {
    const centerRef = useRef<HTMLDivElement>(null)
    const rightRailRef = useRef<HTMLDivElement>(null)

    const [selectedNode, setSelectedNode] = useState<string | null>(null)
    const { setCurrentProject, setProjectProgress } = useScrollContext()
    const cluelessProject = PROJECTS.find(p => p.type === 'clueless')
    const cluelessData = cluelessProject?.cluelessData
    const nodes = cluelessData?.nodes ?? []
    const edges = cluelessData?.edges ?? []
    const decisions = cluelessData?.decisions ?? []
    const tags = cluelessData?.tags ?? []
    const imageUrl = cluelessData?.imageUrl ?? '/Shoporia.webp'
    const { containerRef, totalScroll } = useScrollHijack(Boolean(cluelessData))
    const progress = Math.min(100, (totalScroll / 2400) * 100)
    const isComplete = progress > 90

    useEffect(() => {
        setCurrentProject(3)
        setProjectProgress(progress)
    }, [progress, setCurrentProject, setProjectProgress])

    // Exit animation on completion
    useEffect(() => {
        if (!isComplete || !centerRef.current) return

        const tl = gsap.timeline()

        // Light up all nodes
        tl.to(centerRef.current.querySelectorAll('[data-node]'), {
            fill: 'hsl(180 100% 50%)',
            duration: 0.6,
            stagger: 0.05,
        })

        // Pulse twice
        tl.to(
            centerRef.current.querySelectorAll('[data-node]'),
            {
                r: 8,
                duration: 0.4,
                yoyo: true,
                repeat: 1,
            },
            '<'
        )

        // Show final stat
        if (rightRailRef.current) {
            tl.to(
                rightRailRef.current.querySelector('[data-final-stat]'),
                {
                    opacity: 1,
                    duration: 0.6,
                },
                '<'
            )
        }
    }, [isComplete])

    if (!cluelessData) {
        return <div>Clueless project data not found</div>
    }

    return (
        <section
            ref={containerRef}
            className="clueless"
            aria-label="Clueless Blueprint Room - Interactive architecture diagram with decision entries"
            role="region"
            style={{
                minHeight: '100vh',
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: '200px 1fr 280px',
                gap: '2rem',
                padding: 'var(--container-pad)',
                alignItems: 'center',
            }}
        >
            {/* Left Rail: Technical Spec */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2rem',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono, monospace)',
                    color: 'hsl(var(--muted-foreground))',
                }}
            >
                {/* Title section */}
                <div>
                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {cluelessData.title}
                    </div>
                    <div style={{ fontSize: '0.65rem', opacity: 0.6, marginTop: '0.5rem' }}>
                        {cluelessData.year}
                    </div>
                </div>

                {/* Measurement ticks */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[...Array(7)].map((_, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div
                                style={{
                                    width: i % 2 === 0 ? '1rem' : '0.75rem',
                                    height: '1px',
                                    background: 'hsl(var(--border))',
                                }}
                            />
                            <span style={{ opacity: 0.5 }}>·</span>
                        </div>
                    ))}
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {tags && tags.map(tag => (
                        <div
                            key={tag}
                            style={{
                                padding: '0.25rem 0.5rem',
                                background: 'hsl(var(--muted))',
                                borderRadius: '2px',
                                fontSize: '0.65rem',
                                opacity: 0.7,
                            }}
                        >
                            {tag}
                        </div>
                    ))}
                </div>
            </div>

            {/* Center: Architecture Diagram */}
            <div
                ref={centerRef}
                style={{
                    position: 'relative',
                    minHeight: '600px',
                    background: 'hsl(var(--card) / 0.3)',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    padding: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    perspective: '1000px',
                }}
            >
                <svg
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid meet"
                >
                    {/* Edges */}
                    {edges && edges.map((edge, i) => {
                        const fromNode = nodes.find(n => n.id === edge.from)
                        const toNode = nodes.find(n => n.id === edge.to)
                        if (!fromNode || !toNode) return null

                        return (
                            <g key={`edge-${i}`}>
                                <line
                                    x1={fromNode.x}
                                    y1={fromNode.y}
                                    x2={toNode.x}
                                    y2={toNode.y}
                                    stroke={
                                        selectedNode === edge.from || selectedNode === edge.to
                                            ? 'hsl(180 100% 50%)'
                                            : 'hsl(var(--border) / 0.5)'
                                    }
                                    strokeWidth="0.5"
                                    opacity={
                                        selectedNode === edge.from || selectedNode === edge.to ? 0.8 : 0.3
                                    }
                                    style={{ transition: 'all 0.2s ease' }}
                                />
                            </g>
                        )
                    })}

                    {/* Nodes */}
                    {nodes && nodes.map(node => (
                        <circle
                            key={node.id}
                            data-node={node.id}
                            cx={node.x}
                            cy={node.y}
                            r={selectedNode === node.id ? 8 : 5}
                            fill={
                                selectedNode === node.id
                                    ? 'hsl(180 100% 50%)'
                                    : 'hsl(var(--card))'
                            }
                            stroke={
                                selectedNode === node.id
                                    ? 'hsl(180 100% 50%)'
                                    : 'hsl(var(--border))'
                            }
                            strokeWidth="0.5"
                            style={{
                                transition: 'all 0.2s ease',
                                cursor: 'pointer',
                            }}
                            onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                        />
                    ))}
                </svg>

                {/* Node labels overlay */}
                <div style={{ position: 'relative', width: '100%', height: '100%', pointerEvents: 'none' }}>
                    {nodes && nodes.map(node => (
                        <div
                            key={`label-${node.id}`}
                            style={{
                                position: 'absolute',
                                left: `${node.x}%`,
                                top: `${node.y}%`,
                                transform: 'translate(-50%, -50%)',
                                fontSize: '0.7rem',
                                fontFamily: 'var(--font-mono, monospace)',
                                fontWeight: 600,
                                color:
                                    selectedNode === node.id
                                        ? 'hsl(180 100% 50%)'
                                        : 'hsl(var(--foreground))',
                                opacity: selectedNode === node.id ? 1 : 0.6,
                                whiteSpace: 'nowrap',
                                marginTop: '1.5rem',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            {node.label}
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Rail: Decisions */}
            <div
                ref={rightRailRef}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    maxHeight: '600px',
                    overflowY: 'auto',
                    paddingRight: '1rem',
                }}
            >
                {decisions && decisions.map(decision => {
                    const isHighlighted = selectedNode === decision.nodeId
                    return (
                        <div
                            key={decision.id}
                            style={{
                                padding: '1rem',
                                background: isHighlighted ? 'hsl(180 100% 50% / 0.1)' : 'hsl(var(--card) / 0.5)',
                                border: `1px solid ${isHighlighted ? 'hsl(180 100% 50%)' : 'hsl(var(--border))'}`,
                                borderRadius: '4px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                            }}
                            onClick={() => setSelectedNode(isHighlighted ? null : decision.nodeId || null)}
                        >
                            <div
                                style={{
                                    fontSize: '0.7rem',
                                    fontFamily: 'var(--font-mono, monospace)',
                                    color: isHighlighted ? 'hsl(180 100% 50%)' : 'hsl(var(--muted-foreground))',
                                    marginBottom: '0.25rem',
                                }}
                            >
                                Decision {decision.number}
                            </div>
                            <div
                                style={{
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    color: 'hsl(var(--foreground))',
                                    marginBottom: '0.5rem',
                                }}
                            >
                                {decision.title}
                            </div>
                            <div
                                style={{
                                    fontSize: '0.8rem',
                                    color: 'hsl(var(--muted-foreground))',
                                    lineHeight: '1.5',
                                }}
                            >
                                {decision.description}
                            </div>
                        </div>
                    )
                })}

                {/* Final stat (shown at completion) */}
                <div
                    data-final-stat
                    style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        background: 'hsl(180 100% 50% / 0.1)',
                        border: '1px solid hsl(180 100% 50%)',
                        borderRadius: '4px',
                        fontSize: '0.85rem',
                        color: 'hsl(180 100% 50%)',
                        fontWeight: 600,
                        textAlign: 'center',
                        opacity: 0,
                        transition: 'opacity 0.6s ease',
                    }}
                >
                    Architecture validated under load
                </div>
            </div>

            {/* Full-width image section */}
            <div
                style={{
                    gridColumn: '1 / -1',
                    marginTop: '4rem',
                    borderTop: '1px solid hsl(var(--border))',
                    paddingTop: '2rem',
                }}
            >
                <div
                    style={{
                        marginBottom: '1rem',
                        fontSize: '0.875rem',
                        fontFamily: 'var(--font-mono, monospace)',
                        color: 'hsl(var(--muted-foreground))',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                    }}
                >
                    Game Interface
                </div>
                <div
                    style={{
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '1px solid hsl(var(--border))',
                        maxHeight: '400px',
                    }}
                >
                    <OptimizedImage
                        src={imageUrl}
                        alt="Clueless Multiplayer Game"
                        width={800}
                        height={600}
                        objectFit="cover"
                    />
                </div>
            </div>
        </section>
    )
}
