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
        `${CSS_NAMESPACE}-button tw:w-full tw:cursor-pointer tw:truncate tw:px-2 tw:py-0.5 tw:text-xs tw:outline-none tw:transition-colors ${
          isActive
            ? 'tw:bg-red-500/50 tw:text-white hover:tw:bg-red-500/60'
            : 'tw:bg-white/10 tw:text-white/80 hover:tw:bg-white/20'
        }`,
        className,
      )}
      {...props}
    >
      {icon && <EmojiIcon className="tw:mr-1" emoji={icon} label={label} />}
      {label}
    </button>
  )
}
