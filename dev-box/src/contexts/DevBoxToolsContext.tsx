import React from 'react'

interface IDevBoxToolState {
  cssDebug: boolean
  ruler: boolean
  inspector: boolean
  designMode: boolean
  draw: boolean
  seo: boolean
  console: boolean
}

interface IDevBoxToolsContext {
  state: IDevBoxToolState
  toggleTool: (tool: keyof IDevBoxToolState, forcedState?: boolean) => void
  disableAllExcept: (keepActive: keyof IDevBoxToolState | null) => void
  resetAllTools: () => void
}

const DevBoxToolsContext = React.createContext<IDevBoxToolsContext | undefined>(undefined)

export const DevBoxToolsProvider = ({ children }: React.PropsWithChildren) => {
  const [toolState, setToolState] = React.useState<IDevBoxToolState>({
    console: false,
    cssDebug: false,
    designMode: false,
    draw: false,
    inspector: false,
    ruler: false,
    seo: false,
  })

  const resetAllTools = () => {
    setToolState({
      console: false,
      cssDebug: false,
      designMode: false,
      draw: false,
      inspector: false,
      ruler: false,
      seo: false,
    })
  }

  const disableAllExcept = (keepActive: keyof IDevBoxToolState | null) => {
    setToolState((prev) => ({
      ...prev,
      console: keepActive === 'console' ? prev.console : false,
      cssDebug: keepActive === 'cssDebug' ? prev.cssDebug : false,
      designMode: keepActive === 'designMode' ? prev.designMode : false,
      draw: keepActive === 'draw' ? prev.draw : false,
      inspector: keepActive === 'inspector' ? prev.inspector : false,
      ruler: keepActive === 'ruler' ? prev.ruler : false,
      seo: keepActive === 'seo' ? prev.seo : false,
    }))
  }

  const toggleTool = (tool: keyof IDevBoxToolState, forcedState?: boolean) => {
    setToolState((prev) => {
      const newState = forcedState !== undefined ? forcedState : !prev[tool]

      // Create a new state object
      const updatedState = { ...prev }

      // First, set all tools to false except the one we're toggling
      if (newState) {
        Object.keys(updatedState).forEach((key) => {
          const toolKey = key as keyof IDevBoxToolState

          if (toolKey !== tool) {
            updatedState[toolKey] = false
          }
        })
      }

      // Then set the current tool's state
      updatedState[tool] = newState

      return updatedState
    })
  }

  const value = {
    disableAllExcept,
    resetAllTools,
    state: toolState,
    toggleTool,
  }

  return <DevBoxToolsContext.Provider value={value}>{children}</DevBoxToolsContext.Provider>
}

export const useDevBoxTools = () => {
  const context = React.useContext(DevBoxToolsContext)

  if (context === undefined) {
    throw new Error('useDevBoxTools must be used within a DevBoxToolsProvider')
  }

  return context
}
