import React from 'react'

import { ToolButton } from '../../components/ToolButton'

interface ISeoButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  onToggle: () => void
}

export const SeoButton = ({ className, isActive, onToggle, ...props }: ISeoButtonProps) => {
  return <ToolButton className={className} icon="🔎" isActive={isActive} label="SEO" onClick={onToggle} {...props} />
}
