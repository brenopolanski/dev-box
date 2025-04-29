import React from 'react'

import { CSS_NAMESPACE } from '../constants'
import { cn } from '../utils/helpers'
import { EmojiIcon } from './EmojiIcon'

export const MaximizeButton = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        `${CSS_NAMESPACE}-maximize-button tw:border-white/20 tw:pointer-events-auto tw:fixed tw:bottom-0 tw:left-0 tw:z-[2147483647] tw:flex tw:h-8 tw:w-8 tw:cursor-pointer tw:items-center tw:justify-center tw:border tw:bg-black/90 tw:text-white tw:transition-colors hover:tw:bg-black/80`,
        className,
      )}
      title="Expand Dev Box Panel"
      {...props}
    >
      <EmojiIcon className="tw:text-sm" emoji="🛠️" label="dev-box" />
    </button>
  )
}
