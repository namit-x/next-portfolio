/**
 * Performance and Accessibility Utilities for Phase 6
 */

/**
 * Debounce scroll hijack updates to prevent excessive re-renders
 */
export function debounceScroll(callback: (delta: number) => void, delay: number = 16) {
    let timeoutId: NodeJS.Timeout | null = null
    let accumulatedDelta = 0

    return {
        accumulate: (delta: number) => {
            accumulatedDelta += delta
        },
        flush: () => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(() => {
                if (accumulatedDelta !== 0) {
                    callback(accumulatedDelta)
                    accumulatedDelta = 0
                }
                timeoutId = null
            }, delay)
        },
        cancel: () => {
            if (timeoutId) {
                clearTimeout(timeoutId)
                timeoutId = null
                accumulatedDelta = 0
            }
        },
    }
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Accessible button component with proper ARIA attributes
 */
export interface AccessibleButtonProps {
    label: string
    ariaLabel?: string
    ariaDescribedBy?: string
    onClick: () => void
    disabled?: boolean
}

/**
 * Format number with units for better readability
 */
export function formatMetric(value: string, label: string): string {
    return `${value} ${label}`
}
