import React from 'react'

import { CSS_NAMESPACE } from '../../constants'
import { useDevBoxTools } from '../../contexts/DevBoxToolsContext'
import { clearDrawings } from './Draw.utils'

export const ClearDrawingButton = () => {
  const { state } = useDevBoxTools()
  const isActive = state.draw

  if (!isActive) {
    return null
  }

  return (
    <button
      className={`${CSS_NAMESPACE}-clear-button fixed right-4 top-4 z-[2147483646] cursor-pointer bg-red-500/80 px-3 py-1 text-xs text-white hover:bg-red-500`}
      onClick={() => clearDrawings(isActive)}
    >
      Clear Drawing
    </button>
  )
}
