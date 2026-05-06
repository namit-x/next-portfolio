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

const rootClassName =
  'group relative inline-flex h-11 w-fit max-w-max flex-none self-start items-center gap-4 overflow-hidden rounded-full bg-transparent pl-5 pr-1 text-left select-none whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#06e0ff]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'

function ButtonContent({ text, icon }: Pick<CyanMorphButtonProps, 'text' | 'icon'>) {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-11 rounded-full bg-[#06e0ff] shadow-[0_10px_30px_rgba(6,224,255,0.22)] transition-[width,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full group-hover:shadow-[0_18px_42px_rgba(6,224,255,0.28)] group-focus-visible:w-full group-focus-visible:shadow-[0_18px_42px_rgba(6,224,255,0.28)]"
      />

      <span className="relative z-10 pl-1 text-sm font-semibold tracking-wide text-[#ccf4ff] transition-colors duration-300 ease-out group-hover:text-[#06212e] group-focus-visible:text-[#06212e] sm:text-base">
        {text}
      </span>

      <span className="relative z-10 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-[#06212e] -mr-0.5">
        {icon || (
          <ArrowRight
            className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5"
            aria-hidden="true"
          />
        )}
      </span>
    </>
  )
}

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