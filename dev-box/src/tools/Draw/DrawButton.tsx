import React from 'react'

import { ToolButton } from '../../components/ToolButton'
import { CSS_NAMESPACE } from '../../constants'
import { useDevBox } from '../../contexts/DevBoxContext'
import { useDevBoxTools } from '../../contexts/DevBoxToolsContext'
import { isKeyboardShortcut } from '../../utils/helpers'
import { clearDrawings } from './Draw.utils'

export const DrawButton = () => {
  const { showDevBox } = useDevBox()
  const { state, toggleTool } = useDevBoxTools()
  const isActive = state.draw

  const toggleDraw = () => {
    toggleTool('draw', !isActive)
  }

  // Handle keyboard shortcuts
  React.useEffect(() => {
    if (!showDevBox) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isActive && isKeyboardShortcut(event, 'Escape')) {
        event.preventDefault()
        clearDrawings(isActive)
      }

      if (isKeyboardShortcut(event, 'w', true)) {
        event.preventDefault()
        toggleDraw()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, showDevBox])

  // Drawing canvas setup and cleanup
  React.useEffect(() => {
    if (!showDevBox || !isActive) {
      const canvas = document.querySelector(`.${CSS_NAMESPACE}-draw-canvas`) as HTMLCanvasElement

      if (canvas) {
        canvas.remove()
      }

      return
    }

    // Create the canvas initially when isActive becomes true
    clearDrawings(isActive)

    // Cleanup function
    return () => {
      const canvas = document.querySelector(`.${CSS_NAMESPACE}-draw-canvas`) as HTMLCanvasElement

      if (canvas) {
        canvas.remove()
      }

      // Clean up potential resize event listeners
      window.removeEventListener('resize', () => {})
    }
  }, [isActive, showDevBox])

  return <ToolButton icon="✏️" isActive={isActive} label="Draw" onClick={toggleDraw} />
}
