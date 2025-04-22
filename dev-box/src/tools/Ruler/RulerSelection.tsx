import React from 'react'

import { CSS_NAMESPACE } from '../../constants'
import { useDevBoxTools } from '../../contexts/DevBoxToolsContext'
import { useRuler } from './Ruler.context'

export const RulerSelection = () => {
  const { selectionBox } = useRuler()
  const { state } = useDevBoxTools()
  const isActive = state.ruler

  if (!isActive || !selectionBox) {
    return null
  }

  return (
    <div
      className={`${CSS_NAMESPACE}-ruler-selection`}
      style={{
        backgroundColor: 'rgba(252, 176, 173, 0.15)',
        border: '1px solid rgb(252, 176, 173)',
        cursor: 'move',
        height: `${Math.abs(selectionBox.height)}px`,
        left: `${Math.min(selectionBox.startX, selectionBox.startX + selectionBox.width)}px`,
        pointerEvents: 'auto',
        position: 'fixed',
        top: `${Math.min(selectionBox.startY, selectionBox.startY + selectionBox.height)}px`,
        width: `${Math.abs(selectionBox.width)}px`,
        zIndex: 2147483646,
      }}
    >
      <div
        className={`${CSS_NAMESPACE}-dimensions`}
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          fontSize: '12px',
          left: '100%',
          marginLeft: '3px',
          marginTop: '3px',
          padding: '4px 8px',
          pointerEvents: 'none',
          position: 'absolute',
          top: '100%',
          whiteSpace: 'nowrap',
        }}
      >
        <div>w: {Math.abs(selectionBox.width)} px</div>
        <div>h: {Math.abs(selectionBox.height)} px</div>
      </div>
    </div>
  )
}
