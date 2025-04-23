import React from 'react'

import { EmojiIcon } from '../components/EmojiIcon'
import { CSS_NAMESPACE } from '../constants'
import { cn } from '../utils/helpers'

interface IBreakpoint {
  className: string
  size: string
}

const breakpoints: readonly IBreakpoint[] = [
  { className: 'tw:block tw:sm:hidden', size: 'xs' },
  { className: 'tw:hidden tw:sm:block tw:md:hidden', size: 'sm' },
  { className: 'tw:hidden tw:md:block tw:lg:hidden', size: 'md' },
  { className: 'tw:hidden tw:lg:block tw:xl:hidden', size: 'lg' },
  { className: 'tw:hidden tw:xl:block tw:2xl:hidden', size: 'xl' },
  { className: 'tw:hidden tw:2xl:block', size: '2xl' },
] as const

export const ScreenSize = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn(`${CSS_NAMESPACE}-screen-size tw:flex tw:items-center tw:gap-1`, className)} {...props}>
      <EmojiIcon className="tw:mr-1" emoji="📱" label="screen" />
      {breakpoints.map(({ className, size }) => (
        <div key={size} className={className}>
          {size}
        </div>
      ))}
    </div>
  )
}
