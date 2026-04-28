'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { useTheme } from '../layout/ThemeProvider'
import { resolveThemeHsl } from '../../utils/resolveThemeHsl'

/**
 * Entry Animation: "The Vault"
 * Background inverts → dot grid becomes starfield → codenames type
 * → shrink into HUD → background restores
 */
export default function SelectedWorkVault() {
    const containerRef = useRef<HTMLDivElement>(null)
    const backgroundRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)
    const codenamesRef = useRef<HTMLDivElement>(null)
    const [hasAnimated, setHasAnimated] = useState(false)
    const { theme } = useTheme()
    const backgroundColor = resolveThemeHsl(
        '--background',
        theme === 'dark' ? 'hsl(240 10% 4%)' : 'hsl(240 10% 97%)'
    )

    const animateVault = useCallback(() => {
        if (!backgroundRef.current || !gridRef.current || !codenamesRef.current) {
            return
        }

        const tl = gsap.timeline()

        // 1. Background inverts to black
        tl.to(backgroundRef.current, {
            background: '#000000',
            duration: 0.8,
            ease: 'power2.inOut',
        })

        // 2. Grid dilates into starfield (parallel)
        tl.to(
            gridRef.current,
            {
                opacity: 0.1,
                filter: 'blur(2px) brightness(1.5)',
                duration: 0.8,
                ease: 'power2.inOut',
            },
            '<'
        )

        // 3. Codenames type themselves (staggered)
        const codenames = codenamesRef.current.querySelectorAll(
            '.vault__codename'
        )
        codenames.forEach((codename, index) => {
            tl.fromTo(
                codename,
                { opacity: 0, y: 10 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'back.out',
                },
                0.5 + index * 0.3
            )
        })

        // 4. Hold for a beat
        tl.to({}, { duration: 0.5 })

        // 5. All three shrink and move to top-right HUD
        codenames.forEach((codename) => {
            tl.to(
                codename,
                {
                    opacity: 0,
                    scale: 0.1,
                    x: 500,
                    y: -500,
                    duration: 0.6,
                    ease: 'back.in',
                },
                '<+0.1'
            )
        })

        // 6. Background restores (parallel)
        tl.to(
            backgroundRef.current,
            {
                background: backgroundColor,
                duration: 0.6,
                ease: 'power2.inOut',
            },
            '<'
        )

        // 7. Grid fades back (parallel)
        tl.to(
            gridRef.current,
            {
                opacity: 0.45,
                filter: 'blur(0px) brightness(1)',
                duration: 0.6,
                ease: 'power2.inOut',
            },
            '<'
        )
    }, [backgroundColor])

    useEffect(() => {
        if (hasAnimated || !containerRef.current) return

        // Check if section is in viewport
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting || hasAnimated) return

            setHasAnimated(true)
            animateVault()
        }, { threshold: 0.5 })

        observer.observe(containerRef.current)
        return () => observer.disconnect()
    }, [hasAnimated, animateVault])

    return (
        <div
            ref={containerRef}
            className="vault"
            style={{ position: 'relative', minHeight: '100vh' }}
        >
            {/* Background layer */}
            <div
                ref={backgroundRef}
                className="vault__background"
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: backgroundColor,
                    transition: 'none',
                    zIndex: 1,
                }}
            />

            {/* Dot grid */}
            <div
                ref={gridRef}
                className="vault__grid"
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'radial-gradient(circle, hsl(var(--muted-foreground) / 0.3) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                    opacity: 0.45,
                    zIndex: 2,
                    pointerEvents: 'none',
                }}
            />

            {/* Codenames */}
            <div
                ref={codenamesRef}
                className="vault__codenames"
                style={{
                    position: 'relative',
                    zIndex: 3,
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '2rem',
                    padding: '0 var(--container-pad)',
                }}
            >
                {['VESTA', 'RAG', 'CLUELESS'].map(name => (
                    <div
                        key={name}
                        className="vault__codename"
                        style={{
                            fontSize: 'clamp(3rem, 8vw, 6rem)',
                            fontFamily: 'var(--font-syne, Syne, sans-serif)',
                            fontWeight: 700,
                            letterSpacing: '0.15em',
                            color: 'hsl(var(--foreground))',
                            lineHeight: 1,
                            opacity: 0,
                        }}
                    >
                        {name}
                    </div>
                ))}
            </div>
        </div>
    )
}
