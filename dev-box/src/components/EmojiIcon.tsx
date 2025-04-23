import React from 'react'

import { cn } from '../utils/helpers'

interface IEmojiIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  emoji: string
  label: string
}

export const EmojiIcon = ({ className, emoji, label, ...props }: IEmojiIconProps) => {
  const formattedLabel = label.toLowerCase().replace(/\s+/g, '-')

  return (
    <span aria-label={formattedLabel} className={cn('tw:inline-block', className)} role="img" {...props}>
      {emoji}
    </span>
  )
}
