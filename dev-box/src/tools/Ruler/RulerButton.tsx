import React from 'react'

import { ToolButton } from '../../components/ToolButton'
import { CSS_NAMESPACE } from '../../constants'
import { useDevBox } from '../../contexts/DevBoxContext'
import { useDevBoxTools } from '../../contexts/DevBoxToolsContext'
import { getElementByAttribute } from '../../utils/dom'
import { isKeyboardShortcut } from '../../utils/helpers'
import { useRuler } from './Ruler.context'

// CSS for the ruler grid
const RULER_GRID_CSS = `
  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 2147483646;
    user-select: none;
    -webkit-user-select: none;
    background-image:
      linear-gradient(rgb(252, 231, 230) 1px, transparent 0),
      linear-gradient(90deg, rgb(252, 231, 230) 1px, transparent 0);
    background-size: 10px 10px;
  }
  body.${`${CSS_NAMESPACE}-ruler-active`} {
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`

export const RulerButton = () => {
  const { showDevBox } = useDevBox()
  const { state, toggleTool } = useDevBoxTools()
  const isActive = state.ruler

  const {
    selectionBox,
    moveOffset,
    isMoving,
    isSelecting,
    setSelectionBox,
    setMoveOffset,
    setIsMoving,
    setIsSelecting,
  } = useRuler()

  const removeRulerGrid = () => {
    const rulerElement = getElementByAttribute(`${CSS_NAMESPACE}-ruler-grid`)
    rulerElement?.remove()
    setSelectionBox(null)
    toggleTool('ruler', false)
  }

  const createRulerGrid = () => {
    const styleElement = document.createElement('style')
    styleElement.setAttribute(`${CSS_NAMESPACE}-ruler-grid`, '')
    styleElement.innerText = RULER_GRID_CSS
    document.head.append(styleElement)
    toggleTool('ruler', true)
  }

  const toggleRuler = () => {
    const rulerElement = getElementByAttribute(`${CSS_NAMESPACE}-ruler-grid`)

    if (rulerElement) {
      removeRulerGrid()
    } else {
      createRulerGrid()
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
        removeRulerGrid()
      }

      if (isKeyboardShortcut(event, 'r', true)) {
        event.preventDefault()
        toggleRuler()
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
      removeRulerGrid()
      return
    }

    // Clean up on unmount if active
    return () => {
      removeRulerGrid()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, showDevBox])

  // Manage ruler-active class on body
  React.useEffect(() => {
    if (!showDevBox) {
      return
    }

    if (isActive) {
      document.body.classList.add(`${CSS_NAMESPACE}-ruler-active`)
    } else {
      document.body.classList.remove(`${CSS_NAMESPACE}-ruler-active`)
    }

    return () => {
      document.body.classList.remove(`${CSS_NAMESPACE}-ruler-active`)
    }
  }, [isActive, showDevBox])

  // Handle selection box mouse interactions
  React.useEffect(() => {
    if (!showDevBox || !isActive) {
      return
    }

    const handleMouseDown = (event: MouseEvent) => {
      // Check if clicking inside existing selection box
      if (selectionBox) {
        const boxLeft = Math.min(selectionBox.startX, selectionBox.startX + selectionBox.width)
        const boxTop = Math.min(selectionBox.startY, selectionBox.startY + selectionBox.height)
        const boxRight = Math.max(selectionBox.startX, selectionBox.startX + selectionBox.width)
        const boxBottom = Math.max(selectionBox.startY, selectionBox.startY + selectionBox.height)

        if (
          event.clientX >= boxLeft &&
          event.clientX <= boxRight &&
          event.clientY >= boxTop &&
          event.clientY <= boxBottom
        ) {
          setIsMoving(true)
          setMoveOffset({
            x: event.clientX - selectionBox.startX,
            y: event.clientY - selectionBox.startY,
          })
          return
        }

        // If we have a selection box and clicked outside, clear it
        setSelectionBox(null)
        return
      }

      setIsSelecting(true)
      setSelectionBox({
        height: 0,
        startX: event.clientX,
        startY: event.clientY,
        width: 0,
      })
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (isMoving && selectionBox) {
        // Move the entire selection box
        const newStartX = event.clientX - moveOffset.x
        const newStartY = event.clientY - moveOffset.y

        setSelectionBox({
          height: selectionBox.height,
          startX: newStartX,
          startY: newStartY,
          width: selectionBox.width,
        })
      } else if (isSelecting && selectionBox) {
        // Create or resize selection box
        setSelectionBox({
          ...selectionBox,
          height: event.clientY - selectionBox.startY,
          width: event.clientX - selectionBox.startX,
        })
      }
    }

    const handleMouseUp = () => {
      setIsSelecting(false)
      setIsMoving(false)
    }

    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [
    isActive,
    isMoving,
    isSelecting,
    moveOffset,
    selectionBox,
    setIsMoving,
    setIsSelecting,
    setMoveOffset,
    setSelectionBox,
    showDevBox,
  ])

  return <ToolButton icon="📏" isActive={isActive} label="Ruler" onClick={toggleRuler} />
}
