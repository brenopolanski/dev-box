import React from 'react'

import { EmojiIcon } from '../components/EmojiIcon'
import { CSS_NAMESPACE } from '../constants'
import { cn } from '../utils/helpers'

interface IBreakpoint {
  className: string
  size: string
}

const breakpoints: readonly IBreakpoint[] = [
  { className: 'block sm:hidden', size: 'xs' },
  { className: 'hidden sm:block md:hidden', size: 'sm' },
  { className: 'hidden md:block lg:hidden', size: 'md' },
  { className: 'hidden lg:block xl:hidden', size: 'lg' },
  { className: 'hidden xl:block 2xl:hidden', size: 'xl' },
  { className: 'hidden 2xl:block', size: '2xl' },
] as const

export const ScreenSize = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn(`${CSS_NAMESPACE}-screen-size flex items-center gap-1`, className)} {...props}>
      <EmojiIcon className="mr-1" emoji="📱" label="screen" />
      {breakpoints.map(({ className, size }) => (
        <div key={size} className={className}>
          {size}
        </div>
      ))}
    </div>
  )
}
