'use client'

import { useEffect, useRef, useCallback, useState } from 'react'

export interface ScrollHijackState {
    isActive: boolean
    scrollDelta: number
    totalScroll: number
}

/**
 * Hook for hijacking scroll in a section
 * Converts wheel/pointer events into controllable scroll state
 * Automatically re-enables normal scroll when section is exited
 */
export function useScrollHijack(
    enabled: boolean = true,
    onScrollChange?: (state: ScrollHijackState) => void
) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isActive, setIsActive] = useState(false)
    const [scrollDelta, setScrollDelta] = useState(0)
    const [totalScroll, setTotalScroll] = useState(0)
    const lastWheelTimeRef = useRef(0)

    // Wheel event handler
    const handleWheel = useCallback(
        (e: WheelEvent) => {
            if (!enabled || !isActive) return

            e.preventDefault()
            e.stopPropagation()

            // Accumulate scroll delta
            const deltaY = e.deltaY
            const now = Date.now()

            // Debounce rapid fires
            if (now - lastWheelTimeRef.current < 16) return
            lastWheelTimeRef.current = now

            setScrollDelta(deltaY)
            setTotalScroll(prev => {
                const nextTotalScroll = prev + deltaY

                onScrollChange?.({
                    isActive: true,
                    scrollDelta: deltaY,
                    totalScroll: nextTotalScroll,
                })

                return nextTotalScroll
            })
        },
        [enabled, isActive, onScrollChange]
    )

    // Detect when hijack section is in view
    useEffect(() => {
        if (!enabled || !containerRef.current) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsActive(entry.isIntersecting)
            },
            { threshold: 0.1 }
        )

        observer.observe(containerRef.current)

        return () => observer.disconnect()
    }, [enabled])

    // Add/remove wheel listener
    useEffect(() => {
        if (!isActive) return

        window.addEventListener('wheel', handleWheel, { passive: false })

        return () => {
            window.removeEventListener('wheel', handleWheel)
        }
    }, [isActive, handleWheel])

    // Reset scroll delta each frame (for per-frame tracking)
    useEffect(() => {
        if (!isActive) return

        const resetInterval = setInterval(() => {
            setScrollDelta(0)
        }, 50)

        return () => clearInterval(resetInterval)
    }, [isActive])

    return {
        containerRef,
        isActive,
        scrollDelta,
        totalScroll,
        resetScroll: () => setTotalScroll(0),
    }
}
