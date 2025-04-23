import React from 'react'

import { ToolButton } from '../../components/ToolButton'

interface ISeoButtonProps {
  isActive?: boolean
  onToggle: () => void
}

export const SeoButton = ({ isActive, onToggle }: ISeoButtonProps) => {
  return <ToolButton icon="🔎" isActive={isActive} label="SEO" onClick={onToggle} />
}
