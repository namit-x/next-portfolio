'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'

interface CyanMorphButtonProps {
  text: string
  href?: string
  onClick?: () => void
  ariaLabel?: string
  icon?: React.ReactNode
}

function ButtonContent({ text, icon }: Pick<CyanMorphButtonProps, 'text' | 'icon'>) {
  return (
    <>
      {/* Cyan fill expanding from right */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-11 rounded-full bg-[#06e0ff] shadow-[0_10px_30px_rgba(6,224,255,0.22)] transition-[width,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full group-hover:shadow-[0_18px_42px_rgba(6,224,255,0.28)] group-focus-visible:w-full group-focus-visible:shadow-[0_18px_42px_rgba(6,224,255,0.28)]"
      />

      {/* Single arrow — travels from right edge to left edge, turns white on hover */}
      <span
        className="absolute z-10 right-1 flex h-9 w-9 items-center justify-center rounded-full text-[#06212e]
          transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          group-hover:right-[calc(100%-2.5rem)] group-hover:text-white
          group-focus-visible:right-[calc(100%-2.5rem)] group-focus-visible:text-white"
      >
        {icon || <ArrowRight className="h-5 w-5 transition-colors duration-300" aria-hidden="true" />}
      </span>

      {/* Text — shifts right on hover, turns white on hover */}
      <span
        className="relative z-10 text-black text-sm font-semibold tracking-wide
          pl-3 pr-11
          transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          group-hover:pl-11 group-hover:pr-3 group-hover:text-white
          group-focus-visible:pl-11 group-focus-visible:pr-3 group-focus-visible:text-white"
      >
        {text}
      </span>
    </>
  )
}

const rootClassName =
  'group relative border-4 bg-white inline-flex h-11 w-fit max-w-max flex-none self-start items-center overflow-hidden rounded-full bg-transparent text-left select-none whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06e0ff]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'

export default function CyanMorphButton({
  text,
  href,
  onClick,
  ariaLabel,
  icon,
}: CyanMorphButtonProps) {
  if (href) {
    return (
      <a href={href} className={rootClassName} aria-label={ariaLabel}>
        <ButtonContent text={text} icon={icon} />
      </a>
    )
  }
  return (
    <button
      type="button"
      className={rootClassName}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <ButtonContent text={text} icon={icon} />
    </button>
  )
}