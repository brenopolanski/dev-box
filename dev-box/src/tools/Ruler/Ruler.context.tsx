import React from 'react'

interface ISelectionBoxState {
  startX: number
  startY: number
  width: number
  height: number
}

interface IRulerContext {
  moveOffset: { x: number; y: number }
  selectionBox: ISelectionBoxState | null
  isMoving: boolean
  isSelecting: boolean
  setMoveOffset: (value: { x: number; y: number }) => void
  setSelectionBox: (value: ISelectionBoxState | null) => void
  setIsMoving: (value: boolean) => void
  setIsSelecting: (value: boolean) => void
}

const RulerContext = React.createContext<IRulerContext | undefined>(undefined)

export const RulerProvider = ({ children }: React.PropsWithChildren) => {
  const [selectionBox, setSelectionBox] = React.useState<ISelectionBoxState | null>(null)
  const [moveOffset, setMoveOffset] = React.useState({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = React.useState(false)
  const [isSelecting, setIsSelecting] = React.useState(false)

  const value = {
    isMoving,
    isSelecting,
    moveOffset,
    selectionBox,
    setIsMoving,
    setIsSelecting,
    setMoveOffset,
    setSelectionBox,
  }

  return <RulerContext.Provider value={value}>{children}</RulerContext.Provider>
}

export const useRuler = () => {
  const context = React.useContext(RulerContext)

  if (context === undefined) {
    throw new Error('useRuler must be used within a RulerProvider')
  }

  return context
}
