export function resolveThemeHsl(variableName: string, fallback: string): string {
    if (typeof window === 'undefined') {
        return fallback
    }

    const themeRoot = document.querySelector('[data-theme]') as HTMLElement | null
    if (!themeRoot) {
        return fallback
    }

    const value = getComputedStyle(themeRoot).getPropertyValue(variableName).trim()
    return value ? `hsl(${value})` : fallback
}
