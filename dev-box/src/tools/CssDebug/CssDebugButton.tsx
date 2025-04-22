import React from 'react'

import { ToolButton } from '../../components/ToolButton'
import { CSS_NAMESPACE } from '../../constants'
import { useDevBox } from '../../contexts/DevBoxContext'
import { useDevBoxTools } from '../../contexts/DevBoxToolsContext'
import { getElementByAttribute } from '../../utils/dom'
import { isKeyboardShortcut } from '../../utils/helpers'

// CSS for the css debug
const CSS_DEBUG_CSS = `
  *:not(.${CSS_NAMESPACE}-container, .${CSS_NAMESPACE}-container *) {
    outline: 1px solid tomato;
  }
`

export const CssDebugButton = () => {
  const { showDevBox } = useDevBox()
  const { state, toggleTool } = useDevBoxTools()
  const isActive = state.cssDebug

  const removeCssDebug = () => {
    const cssDebugElement = getElementByAttribute(`${CSS_NAMESPACE}-css-debug`)
    cssDebugElement?.remove()
    toggleTool('cssDebug', false)
  }

  const createCssDebug = () => {
    const styleElement = document.createElement('style')
    styleElement.setAttribute(`${CSS_NAMESPACE}-css-debug`, '')
    styleElement.innerText = CSS_DEBUG_CSS
    document.head.append(styleElement)
    toggleTool('cssDebug', true)
  }

  const toggleCssDebug = () => {
    const cssDebugElement = getElementByAttribute(`${CSS_NAMESPACE}-css-debug`)

    if (cssDebugElement) {
      removeCssDebug()
    } else {
      createCssDebug()
    }
  }

  // Handle keyboard shortcuts
  React.useEffect(() => {
    if (!showDevBox) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isActive && isKeyboardShortcut(event, 'Escape')) {
        event.preventDefault()
        removeCssDebug()
      }

      if (isKeyboardShortcut(event, 'o', true)) {
        event.preventDefault()
        toggleCssDebug()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, showDevBox])

  // Sync UI state with isActive flag
  React.useEffect(() => {
    if (!isActive) {
      removeCssDebug()
      return
    }

    // Clean up on unmount if active
    return () => {
      removeCssDebug()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, showDevBox])

  return <ToolButton icon="🎨" isActive={isActive} label="Debug" onClick={toggleCssDebug} />
}
