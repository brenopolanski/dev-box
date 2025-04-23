import React from 'react'

import { IS_DEV, STORAGE_KEYS } from '../constants'
import { storage } from '../utils/storage'

interface IDevBoxContextContext {
  isMinimized: boolean
  isMinimizedLoading: boolean
  showDevBox: boolean
  showHelp: boolean
  setIsMinimized: (value: boolean) => void
  setIsMinimizedLoading: (value: boolean) => void
  setShowDevBox: (value: boolean) => void
  setShowHelp: (value: boolean) => void
}

const DevBoxContext = React.createContext<IDevBoxContextContext | undefined>(undefined)

export const DevBoxProvider = ({ children }: React.PropsWithChildren) => {
  const [showDevBox, setShowDevBox] = React.useState(IS_DEV)
  const [showHelp, setShowHelp] = React.useState(false)
  const [isMinimized, setIsMinimized] = React.useState(false)
  const [isMinimizedLoading, setIsMinimizedLoading] = React.useState(true)

  // Initialize from localStorage on client-side only
  React.useEffect(() => {
    const storedValue = storage.get(STORAGE_KEYS.IS_MINIMIZED, false)
    setIsMinimized(storedValue)
    setIsMinimizedLoading(false)
  }, [])

  // Save minimized state to localStorage
  React.useEffect(() => {
    if (!isMinimizedLoading) {
      storage.set(STORAGE_KEYS.IS_MINIMIZED, isMinimized)
    }
  }, [isMinimized, isMinimizedLoading])

  const value = {
    isMinimized,
    isMinimizedLoading,
    setIsMinimized,
    setIsMinimizedLoading,
    setShowDevBox,
    setShowHelp,
    showDevBox,
    showHelp,
  }

  return <DevBoxContext.Provider value={value}>{children}</DevBoxContext.Provider>
}

export const useDevBox = () => {
  const context = React.useContext(DevBoxContext)

  if (context === undefined) {
    throw new Error('useDevBox must be used within a DevBoxProvider')
  }

  return context
}
