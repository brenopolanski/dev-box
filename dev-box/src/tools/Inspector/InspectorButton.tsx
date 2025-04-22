import React from 'react'

import { ToolButton } from '../../components/ToolButton'
import { CSS_NAMESPACE } from '../../constants'
import { useDevBox } from '../../contexts/DevBoxContext'
import { useDevBoxTools } from '../../contexts/DevBoxToolsContext'
import { isKeyboardShortcut } from '../../utils/helpers'
import { useInspector } from './Inspector.context'

export const InspectorButton = () => {
  const { showDevBox } = useDevBox()
  const { state, toggleTool } = useDevBoxTools()
  const { setInspectedElement } = useInspector()
  const isActive = state.inspector

  const removeInspector = () => {
    document.body.classList.remove(`${CSS_NAMESPACE}-inspector-active`)
    toggleTool('inspector', false)
  }

  const createInspector = () => {
    document.body.classList.add(`${CSS_NAMESPACE}-inspector-active`)
    toggleTool('inspector', true)
  }

  const toggleInspector = () => {
    if (isActive) {
      removeInspector()
    } else {
      createInspector()
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
        removeInspector()
      }

      if (isKeyboardShortcut(event, 'i', true)) {
        event.preventDefault()
        toggleInspector()
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
      removeInspector()
      return
    }

    // Clean up on unmount if active
    return () => {
      removeInspector()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, showDevBox])

  // Track inspected element when debug and inspector are active
  React.useEffect(() => {
    if (!showDevBox || !isActive) {
      return
    }

    let lastHighlightedElement: HTMLElement | null = null

    const handleMouseMove = (event: MouseEvent) => {
      const target = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement

      if (target && !target.closest(`.${CSS_NAMESPACE}-container`)) {
        // Remove highlight from previous element
        if (lastHighlightedElement) {
          lastHighlightedElement.style.removeProperty('outline')
          lastHighlightedElement.style.removeProperty('outline-offset')
        }

        // Add highlight to current element
        target.style.setProperty('outline', '2px solid #3b82f6', 'important')
        target.style.setProperty('outline-offset', '-1px', 'important')
        lastHighlightedElement = target

        setInspectedElement({
          element: target,
          position: { x: event.clientX, y: event.clientY },
        })
      }
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      // Clean up highlight on unmount
      if (lastHighlightedElement) {
        lastHighlightedElement.style.removeProperty('outline')
        lastHighlightedElement.style.removeProperty('outline-offset')
      }
    }
  }, [isActive, setInspectedElement, showDevBox])

  // Handle inspector-active class and cleanup
  React.useEffect(() => {
    if (!showDevBox) {
      return
    }

    if (isActive) {
      document.body.classList.add(`${CSS_NAMESPACE}-inspector-active`)
      // Add global styles for inspector
      const styleElement = document.createElement('style')
      styleElement.setAttribute(`${CSS_NAMESPACE}-inspector-styles`, '')
      styleElement.textContent = `
        .${CSS_NAMESPACE}-inspector-active * {
          cursor: crosshair !important;
        }
      `
      document.head.appendChild(styleElement)
    } else {
      document.body.classList.remove(`${CSS_NAMESPACE}-inspector-active`)
      // Remove global styles
      const styleElement = document.head.querySelector(`[${CSS_NAMESPACE}-inspector-styles]`)
      styleElement?.remove()
    }

    return () => {
      document.body.classList.remove(`${CSS_NAMESPACE}-inspector-active`)
      const styleElement = document.head.querySelector(`[${CSS_NAMESPACE}-inspector-styles]`)
      styleElement?.remove()
    }
  }, [isActive, showDevBox])

  return <ToolButton icon="🔍" isActive={isActive} label="Inspector" onClick={toggleInspector} />
}
