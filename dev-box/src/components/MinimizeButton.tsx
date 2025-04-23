import React from 'react'

import { CSS_NAMESPACE } from '../constants'
import { cn } from '../utils/helpers'

export const MinimizeButton = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        `${CSS_NAMESPACE}-minimize-button tw:flex tw:h-full tw:w-full tw:cursor-pointer tw:items-center tw:justify-center tw:bg-white/10 tw:text-white/80 tw:outline-none tw:transition-colors hover:tw:bg-white/20`,
        className,
      )}
      title="Minimize Dev Box Panel"
      {...props}
    >
      -
    </button>
  )
}
