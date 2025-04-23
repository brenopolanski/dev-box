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
      className={`${CSS_NAMESPACE}-clear-button tw:fixed tw:right-4 tw:top-4 tw:z-[2147483646] tw:cursor-pointer tw:bg-red-500/80 tw:px-3 tw:py-1 tw:text-xs tw:text-white tw:hover:tw:bg-red-500`}
      onClick={() => clearDrawings(isActive)}
    >
      Clear Drawing
    </button>
  )
}
