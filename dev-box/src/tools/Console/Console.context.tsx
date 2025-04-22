'use client'

import React from 'react'

interface IConsoleLog {
  type: 'log' | 'info' | 'warn' | 'error'
  message: string
  timestamp: Date
}

interface IConsoleContext {
  consoleLogs: IConsoleLog[]
  consoleEndRef: React.RefObject<HTMLDivElement | null>
  addConsoleLog: (log: IConsoleLog) => void
  clearConsoleLogs: () => void
}

const ConsoleContext = React.createContext<IConsoleContext | undefined>(undefined)

export const ConsoleProvider = ({ children }: React.PropsWithChildren) => {
  const [consoleLogs, setConsoleLogs] = React.useState<IConsoleLog[]>([])
  const consoleEndRef = React.useRef<HTMLDivElement | null>(null)

  const addConsoleLog = (log: IConsoleLog) => {
    setConsoleLogs((prev) => [...prev, log])
  }

  const clearConsoleLogs = () => {
    setConsoleLogs([])
  }

  return (
    <ConsoleContext.Provider
      value={{
        addConsoleLog,
        clearConsoleLogs,
        consoleEndRef,
        consoleLogs,
      }}
    >
      {children}
    </ConsoleContext.Provider>
  )
}

export const useConsole = () => {
  const context = React.useContext(ConsoleContext)

  if (context === undefined) {
    throw new Error('useConsole must be used within a ConsoleProvider')
  }

  return context
}
