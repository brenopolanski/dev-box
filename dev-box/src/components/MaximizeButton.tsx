import React from 'react'

import { CSS_NAMESPACE } from '../constants'
import { cn } from '../utils/helpers'
import { EmojiIcon } from './EmojiIcon'

export const MaximizeButton = ({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        `${CSS_NAMESPACE}-maximize-button border-primary/20 pointer-events-auto fixed bottom-0 left-0 z-[2147483647] flex h-8 w-8 cursor-pointer items-center justify-center border bg-black/90 text-white transition-colors hover:bg-black/80`,
        className,
      )}
      title="Expand Dev Box Panel"
      {...props}
    >
      <EmojiIcon className="text-sm" emoji="🛠️" label="dev-box" />
    </button>
  )
}
