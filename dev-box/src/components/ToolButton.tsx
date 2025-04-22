import React from 'react'

import { CSS_NAMESPACE } from '../constants'
import { cn } from '../utils/helpers'
import { EmojiIcon } from './EmojiIcon'

interface IToolButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string
  label: string
  isActive?: boolean
}

export const ToolButton = ({ className, icon, label, isActive = false, ...props }: IToolButtonProps) => {
  return (
    <button
      className={cn(
        `${CSS_NAMESPACE}-button w-full cursor-pointer truncate px-2 py-0.5 text-xs outline-none transition-colors ${
          isActive ? 'bg-red-500/50 text-white hover:bg-red-500/60' : 'bg-white/10 text-white/80 hover:bg-white/20'
        }`,
        className,
      )}
      {...props}
    >
      {icon && <EmojiIcon className="mr-1" emoji={icon} label={label} />}
      {label}
    </button>
  )
}
