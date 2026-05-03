'use client'

import React, { useState } from 'react'

interface CyanMorphButtonProps {
    text: string
    href?: string
    onClick?: () => void
    ariaLabel?: string
    icon?: React.ReactNode
}

export default function CyanMorphButton({
    text,
    href,
    onClick,
    ariaLabel,
    icon,
}: CyanMorphButtonProps) {
    const [isHovered, setIsHovered] = useState(false)

    const buttonContent = (
        <>
            {/* Button Label - stays above the expanding background */}
            <span
                className={`
          relative z-10 text-sm sm:text-base font-semibold tracking-wide whitespace-nowrap pl-1
          transition-colors duration-300 ease-in-out
          ${isHovered ? 'text-[#06212e]' : 'text-[#ccf4ff]'}
        `}
            >
                {text}
            </span>

            {/* Icon Wrapper - Circle that expands into full rounded rectangle */}
            <div
                className={`
          flex items-center justify-center rounded-full bg-[#06e0ff] text-[#06212e] 
          shadow-md transition-all duration-500 ease-[cubic-bezier(0.2,0.9,0.4,1.1)]
          flex-shrink-0
          ${isHovered
                        ? 'absolute right-0 top-0 w-full h-full rounded-[60px] shadow-lg shadow-cyan-400/30'
                        : 'relative w-11 h-11'
                    }
        `}
            >
                {/* Arrow SVG or Custom Icon */}
                {icon || (
                    <svg
                        className={`
              w-5 h-5 stroke-current transition-transform duration-300 ease-out
              ${isHovered ? 'translate-x-1' : ''}
            `}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5 12H19M19 12L12 5M19 12L12 19"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </div>
        </>
    )

    if (href) {
        return (
            <a
                href={href}
                className="relative flex items-center justify-between gap-4 bg-transparent border-none cursor-pointer p-0 w-fit group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                aria-label={ariaLabel}
            >
                {buttonContent}
            </a>
        )
    }

    return (
        <button
            className="relative flex items-center justify-between gap-4 bg-transparent border-none cursor-pointer p-0 w-fit group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            aria-label={ariaLabel}
        >
            {buttonContent}
        </button>
    )
}
