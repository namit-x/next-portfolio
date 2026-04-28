'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface OptimizedImageProps {
    src: string
    alt: string
    width?: number
    height?: number
    className?: string
    priority?: boolean
    objectFit?: 'cover' | 'contain' | 'fill'
}

/**
 * Optimized image component with lazy loading and blur placeholder
 * Uses Next.js Image for automatic optimization
 */
export function OptimizedImage({
    src,
    alt,
    width = 800,
    height = 600,
    className = '',
    priority = false,
    objectFit = 'cover',
}: OptimizedImageProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Preload images on intersection (lazy load)
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsLoaded(true)
                        observer.unobserve(entry.target)
                    }
                })
            },
            { rootMargin: '50px' }
        )

        if (containerRef.current && !priority) {
            observer.observe(containerRef.current)
        } else {
            setIsLoaded(true)
        }

        return () => observer.disconnect()
    }, [priority])

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden ${className}`}
            style={{
                aspectRatio: `${width} / ${height}`,
                background: 'hsl(var(--muted))',
            }}
        >
            {isLoaded ? (
                <Image
                    src={src}
                    alt={alt}
                    fill
                    priority={priority}
                    style={{
                        objectFit,
                        objectPosition: 'center',
                    }}
                    onError={() => {
                        console.warn(`Failed to load image: ${src}`)
                    }}
                />
            ) : (
                <div
                    className="animate-pulse"
                    style={{
                        width: '100%',
                        height: '100%',
                        background: 'hsl(var(--muted) / 0.5)',
                    }}
                />
            )}
        </div>
    )
}
