'use client'

import { useRef, useState, useEffect } from 'react'
import { useScrollHijack } from '../../hooks/useScrollHijack'
import { useScrollContext } from '../../context/ScrollContext'
import { PROJECTS } from '../../data/projects'

/**
 * RAG: Terminal Theater Split Screen
 * Left: Terminal output typing as you scroll
 * Right: Graph building nodes/edges in sync with terminal
 * Interaction: Hover nodes to highlight corresponding terminal line
 */
export default function SelectedWorkRAG() {
    const containerRef = useRef<HTMLDivElement>(null)
    const terminalRef = useRef<HTMLDivElement>(null)
    const [terminalLines, setTerminalLines] = useState(0)
    const [nodeBuiltCount, setNodeBuiltCount] = useState(0)
    const [edgeBuiltCount, setEdgeBuiltCount] = useState(0)
    const [hoveredNode, setHoveredNode] = useState<string | null>(null)
    const { setCurrentProject, setProjectProgress } = useScrollContext()

    const ragProject = PROJECTS.find(p => p.type === 'rag')!
    const { terminalOutput, nodes, edges, finalStat } = ragProject.ragData!

    const { totalScroll } = useScrollHijack(true, () => {
        // Calculate progress: max scroll ~2400px
        const progress = Math.min(100, (totalScroll / 2400) * 100)
        const lineCount = Math.floor((progress / 100) * terminalOutput.length)
        const nodeCount = Math.floor((progress / 100) * nodes.length)
        const edgeCount = Math.floor((progress / 100) * edges.length)

        setTerminalLines(lineCount)
        setNodeBuiltCount(nodeCount)
        setEdgeBuiltCount(edgeCount)
    })

    useEffect(() => {
        setCurrentProject(2)
        const progress = Math.min(100, (totalScroll / 2400) * 100)
        setProjectProgress(progress)
    }, [totalScroll, setCurrentProject, setProjectProgress])

    return (
        <section
            ref={containerRef}
            className="rag"
            aria-label="RAG project showcase"
            style={{
                minHeight: '100vh',
                position: 'relative',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem',
                padding: 'var(--container-pad)',
                alignItems: 'center',
            }}
        >
            {/* Left: Terminal */}
            <div
                ref={terminalRef}
                style={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.875rem',
                    lineHeight: '1.6',
                    color: 'hsl(var(--foreground))',
                    minHeight: '60vh',
                    overflow: 'hidden',
                }}
            >
                {/* Terminal header */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                    <div style={{ width: '8px', height: '8px', background: '#ff5f56', borderRadius: '50%' }} />
                    <div style={{ width: '8px', height: '8px', background: '#ffbd2e', borderRadius: '50%' }} />
                    <div style={{ width: '8px', height: '8px', background: '#27c93f', borderRadius: '50%' }} />
                </div>

                {/* Terminal lines */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {terminalOutput.slice(0, terminalLines).map((line, i) => (
                        <div
                            key={i}
                            style={{
                                opacity: 1,
                                animation: 'fade-in 0.3s ease-in',
                                color:
                                    line.type === 'command'
                                        ? 'hsl(180 100% 50%)'
                                        : line.type === 'output'
                                            ? 'hsl(var(--foreground))'
                                            : 'hsl(var(--muted-foreground))',
                            }}
                        >
                            {line.type === 'command' && <span>$ </span>}
                            {line.text}
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: Graph */}
            <div
                style={{
                    position: 'relative',
                    minHeight: '60vh',
                    background: 'hsl(var(--card) / 0.3)',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    padding: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <svg
                    style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        pointerEvents: 'none',
                    }}
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid meet"
                >
                    {/* Draw edges */}
                    {edges.slice(0, edgeBuiltCount).map((edge, i) => {
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
                                    stroke="hsl(var(--border))"
                                    strokeWidth="0.5"
                                    opacity="0.5"
                                />
                                <text
                                    x={(fromNode.x + toNode.x) / 2}
                                    y={(fromNode.y + toNode.y) / 2 - 1}
                                    fontSize="2"
                                    fill="hsl(var(--muted-foreground))"
                                    textAnchor="middle"
                                >
                                    {edge.duration}
                                </text>
                            </g>
                        )
                    })}
                </svg>

                {/* Node elements */}
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    {nodes.slice(0, nodeBuiltCount).map(node => (
                        <div
                            key={node.id}
                            style={{
                                position: 'absolute',
                                left: `${node.x}%`,
                                top: `${node.y}%`,
                                transform: 'translate(-50%, -50%)',
                                pointerEvents: 'auto',
                            }}
                            onMouseEnter={() => setHoveredNode(node.id)}
                            onMouseLeave={() => setHoveredNode(null)}
                        >
                            <div
                                style={{
                                    padding: '0.5rem 0.75rem',
                                    background:
                                        hoveredNode === node.id ? 'hsl(180 100% 50% / 0.2)' : 'hsl(var(--card))',
                                    border: `1px solid ${hoveredNode === node.id ? 'hsl(180 100% 50%)' : 'hsl(var(--border))'}`,
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    fontFamily: 'var(--font-mono, monospace)',
                                    fontWeight: 600,
                                    color:
                                        hoveredNode === node.id
                                            ? 'hsl(180 100% 50%)'
                                            : 'hsl(var(--foreground))',
                                    whiteSpace: 'nowrap',
                                    transition: 'all 0.2s ease',
                                    cursor: 'pointer',
                                }}
                            >
                                {node.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Final stat overlay (shows at end of scroll) */}
            {nodeBuiltCount === nodes.length && edgeBuiltCount === edges.length && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                        animation: 'fade-in 0.5s ease-in',
                        zIndex: 40,
                    }}
                >
                    <div
                        style={{
                            fontSize: 'clamp(2rem, 10vw, 5rem)',
                            fontWeight: 900,
                            color: 'hsl(180 100% 50%)',
                            textAlign: 'center',
                            opacity: 0.3,
                            letterSpacing: '0.05em',
                        }}
                    >
                        {finalStat}
                    </div>
                </div>
            )}
        </section>
    )
}
