import React from 'react'

import { CSS_NAMESPACE } from '../../constants'
import { cn } from '../../utils/helpers'

export const HelpButton = ({ className, ...props }: React.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        `${CSS_NAMESPACE}-help-button flex h-full w-full cursor-pointer items-center justify-center bg-white/10 text-white/80 outline-none transition-colors hover:bg-white/20`,
        className,
      )}
      title="Help"
      {...props}
    >
      ?
    </button>
  )
}
