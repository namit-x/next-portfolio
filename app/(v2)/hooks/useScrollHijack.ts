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
    onScrollChange?: (state: ScrollHijackState) => void,
    maxScroll: number = 2400
) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isActive, setIsActive] = useState(false)
    const [scrollDelta, setScrollDelta] = useState(0)
    const [totalScroll, setTotalScroll] = useState(0)
    const lastWheelTimeRef = useRef(0)
    const totalScrollRef = useRef(0)

    useEffect(() => {
        totalScrollRef.current = totalScroll
    }, [totalScroll])

    const updateActiveState = useCallback(() => {
        if (!enabled || !containerRef.current || typeof window === 'undefined') {
            setIsActive(false)
            return
        }

        const rect = containerRef.current.getBoundingClientRect()
        const viewportCenter = window.innerHeight * 0.5
        const isCenterInsideSection = rect.top <= viewportCenter && rect.bottom >= viewportCenter
        const sectionIsVisible = rect.bottom > 0 && rect.top < window.innerHeight

        setIsActive(isCenterInsideSection && sectionIsVisible)
    }, [enabled])

    // Wheel event handler
    const handleWheel = useCallback(
        (e: WheelEvent) => {
            if (!enabled || !isActive) return

            const deltaY = e.deltaY
            const currentScroll = totalScrollRef.current
            const isTryingToScrollPastTop = deltaY < 0 && currentScroll <= 0
            const isTryingToScrollPastBottom = deltaY > 0 && currentScroll >= maxScroll

            if (isTryingToScrollPastTop || isTryingToScrollPastBottom) {
                return
            }

            e.preventDefault()
            e.stopPropagation()

            const now = Date.now()

            // Debounce rapid fires
            if (now - lastWheelTimeRef.current < 16) return
            lastWheelTimeRef.current = now

            setScrollDelta(deltaY)
            setTotalScroll(prev => {
                const nextTotalScroll = Math.max(0, Math.min(prev + deltaY, maxScroll))
                totalScrollRef.current = nextTotalScroll

                onScrollChange?.({
                    isActive: true,
                    scrollDelta: deltaY,
                    totalScroll: nextTotalScroll,
                })

                return nextTotalScroll
            })
        },
        [enabled, isActive, maxScroll, onScrollChange]
    )

    useEffect(() => {
        if (!enabled) return

        updateActiveState()
        window.addEventListener('scroll', updateActiveState, { passive: true })
        window.addEventListener('resize', updateActiveState)

        return () => {
            window.removeEventListener('scroll', updateActiveState)
            window.removeEventListener('resize', updateActiveState)
        }
    }, [enabled, updateActiveState])

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
        resetScroll: () => {
            totalScrollRef.current = 0
            setTotalScroll(0)
        },
    }
}
