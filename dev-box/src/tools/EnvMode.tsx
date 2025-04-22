import React from 'react'

import { EmojiIcon } from '../components/EmojiIcon'
import { CSS_NAMESPACE, ENV_MODE } from '../constants'
import { cn } from '../utils/helpers'

export const EnvMode = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn(`${CSS_NAMESPACE}-env-mode flex items-center gap-1`, className)} {...props}>
      <EmojiIcon className="mr-1" emoji="🔧" label="environment" />
      <span>{ENV_MODE}</span>
    </div>
  )
}
