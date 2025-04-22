import React from 'react'

import { ToolButton } from '../../components/ToolButton'
import { useDevBox } from '../../contexts/DevBoxContext'
import { useDevBoxTools } from '../../contexts/DevBoxToolsContext'
import { isKeyboardShortcut } from '../../utils/helpers'

export const DesignModeButton = () => {
  const { showDevBox } = useDevBox()
  const { state, toggleTool } = useDevBoxTools()
  const isActive = state.designMode

  const toggleDesignMode = () => {
    toggleTool('designMode', !isActive)
  }

  // Handle keyboard shortcuts
  React.useEffect(() => {
    if (!showDevBox) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isActive && isKeyboardShortcut(event, 'Escape')) {
        event.preventDefault()
        document.designMode = 'off'
        toggleDesignMode()
      }

      if (isKeyboardShortcut(event, 'e', true)) {
        event.preventDefault()
        toggleDesignMode()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, showDevBox])

  // Handle design mode on/off
  React.useEffect(() => {
    if (!showDevBox) {
      document.designMode = 'off'
      return
    }

    document.designMode = isActive ? 'on' : 'off'

    return () => {
      document.designMode = 'off'
    }
  }, [isActive, showDevBox])

  return <ToolButton icon="✍️" isActive={isActive} label="Design" onClick={toggleDesignMode} />
}
