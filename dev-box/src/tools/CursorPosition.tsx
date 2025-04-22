import React from 'react'

import { EmojiIcon } from '../components/EmojiIcon'
import { CSS_NAMESPACE } from '../constants'
import { useDevBox } from '../contexts/DevBoxContext'
import { cn } from '../utils/helpers'

export const CursorPosition = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const { showDevBox } = useDevBox()

  const [cursorPos, setCursorPos] = React.useState({ x: 0, y: 0 })

  React.useEffect(() => {
    if (!showDevBox) {
      return
    }

    const handleMouseMove = (event: MouseEvent) => {
      setCursorPos({ x: event.clientX, y: event.clientY })
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [showDevBox])

  return (
    <div className={cn(`${CSS_NAMESPACE}-cursor-position flex items-center gap-1`, className)} {...props}>
      <EmojiIcon className="mr-1" emoji="📍" label="cursor" />
      <span className="inline-block w-[4ch] text-right">{cursorPos.x}</span>
      <span className="px-1">×</span>
      <span className="inline-block w-[4ch] text-left">{cursorPos.y}</span>
    </div>
  )
}
