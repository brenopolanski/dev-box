'use client'

import React from 'react'

interface IElementInspectorState {
  element: HTMLElement | null
  position: { x: number; y: number }
}

interface IInspectorContext {
  inspectedElement: IElementInspectorState
  setInspectedElement: (state: IElementInspectorState) => void
}

const InspectorContext = React.createContext<IInspectorContext | undefined>(undefined)

export const InspectorProvider = ({ children }: React.PropsWithChildren) => {
  const [inspectedElement, setInspectedElement] = React.useState<IElementInspectorState>({
    element: null,
    position: { x: 0, y: 0 },
  })

  return (
    <InspectorContext.Provider
      value={{
        inspectedElement,
        setInspectedElement,
      }}
    >
      {children}
    </InspectorContext.Provider>
  )
}

export const useInspector = () => {
  const context = React.useContext(InspectorContext)

  if (context === undefined) {
    throw new Error('useInspector must be used within an InspectorProvider')
  }

  return context
}
