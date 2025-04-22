import React from 'react'

import { CSS_NAMESPACE } from '../constants'
import { useDevBox } from '../contexts/DevBoxContext'
import { cn } from '../utils/helpers'

export const DateTime = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const { showDevBox } = useDevBox()

  const [dateTime, setDateTime] = React.useState(new Date())

  React.useEffect(() => {
    if (!showDevBox) {
      return
    }

    const timer = setInterval(() => {
      setDateTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [showDevBox])

  return (
    <div className={cn(`${CSS_NAMESPACE}-date-time flex items-center gap-1`, className)} {...props}>
      <span aria-label="clock" role="img">
        🕒
      </span>
      <span>
        {dateTime.toLocaleTimeString()} - {dateTime.toLocaleDateString()}
      </span>
    </div>
  )
}
