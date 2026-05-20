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
    loading?: 'lazy' | 'eager'
    sizes?: string
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
    loading = 'lazy',
    sizes = '100vw',
    objectFit = 'cover',
}: OptimizedImageProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [hasError, setHasError] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const observerRef = useRef<IntersectionObserver | null>(null)

    useEffect(() => {
        // Skip observer if image should be eagerly loaded
        if (priority || loading === 'eager') {
            setIsLoaded(true)
            return
        }

        // Create observer only once
        if (!observerRef.current) {
            observerRef.current = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setIsLoaded(true)
                            // Stop observing after image loads
                            if (observerRef.current) {
                                observerRef.current.unobserve(entry.target)
                            }
                        }
                    })
                },
                { rootMargin: '50px' }
            )
        }

        if (containerRef.current) {
            observerRef.current.observe(containerRef.current)
        }

        // Proper cleanup
        return () => {
            if (observerRef.current && containerRef.current) {
                observerRef.current.unobserve(containerRef.current)
            }
        }
    }, [priority, loading])

    // Cleanup observer when component unmounts
    useEffect(() => {
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect()
                observerRef.current = null
            }
        }
    }, [])

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden ${className}`}
            style={{
                aspectRatio: `${width} / ${height}`,
                background: 'hsl(var(--muted))',
            }}
        >
            {hasError ? (
                // Error state: show fallback UI
                <div
                    className="flex items-center justify-center w-full h-full bg-muted"
                    title={`Failed to load: ${alt}`}
                >
                    <span className="text-xs text-muted-foreground">Image unavailable</span>
                </div>
            ) : isLoaded ? (
                <Image
                    src={src}
                    alt={alt}
                    fill
                    priority={priority}
                    loading={loading}
                    sizes={sizes}
                    style={{
                        objectFit,
                        objectPosition: 'center',
                    }}
                    onError={() => {
                        setHasError(true)
                        if (process.env.NODE_ENV === 'development') {
                            console.warn(`Failed to load image: ${src}`)
                        }
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
