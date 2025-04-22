import React from 'react'

import { ToolButton } from '../../components/ToolButton'
import { useDevBox } from '../../contexts/DevBoxContext'
import { useDevBoxTools } from '../../contexts/DevBoxToolsContext'
import { isKeyboardShortcut } from '../../utils/helpers'
import { useConsole } from './Console.context'

export const ConsoleButton = () => {
  const { showDevBox } = useDevBox()
  const { state, toggleTool } = useDevBoxTools()
  const { consoleLogs, consoleEndRef, addConsoleLog } = useConsole()
  const isActive = state.console

  const toggleConsole = () => {
    toggleTool('console', !isActive)
  }

  // Handle keyboard shortcuts
  React.useEffect(() => {
    if (!showDevBox) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isActive && isKeyboardShortcut(event, 'Escape')) {
        event.preventDefault()
        toggleTool('console', false)
      }

      if (isKeyboardShortcut(event, 'l', true)) {
        event.preventDefault()
        toggleConsole()
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
      toggleTool('console', false)
      return
    }

    // Clean up on unmount if active
    return () => {
      toggleTool('console', false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, showDevBox])

  // Override console methods to capture logs
  React.useEffect(() => {
    if (!showDevBox || !isActive) {
      return
    }

    const originalConsole = {
      error: console.error,
      info: console.info,
      log: console.log,
      warn: console.warn,
    }

    const addLog = (type: 'log' | 'info' | 'warn' | 'error', args: any[]) => {
      const message = args
        .map((arg) => {
          if (typeof arg === 'string') {
            return arg
          }
          if (arg instanceof Error) {
            return arg.message
          }
          return JSON.stringify(arg, null, 2)
        })
        .join(' ')

      addConsoleLog({ message, timestamp: new Date(), type })
    }

    console.log = (...args) => {
      originalConsole.log(...args)
      addLog('log', args)
    }

    console.info = (...args) => {
      originalConsole.info(...args)
      addLog('info', args)
    }

    console.warn = (...args) => {
      originalConsole.warn(...args)
      addLog('warn', args)
    }

    console.error = (...args) => {
      originalConsole.error(...args)
      addLog('error', args)
    }

    return () => {
      console.log = originalConsole.log
      console.info = originalConsole.info
      console.warn = originalConsole.warn
      console.error = originalConsole.error
    }
  }, [isActive, showDevBox, addConsoleLog])

  // Auto-scroll console to bottom
  React.useEffect(() => {
    if (isActive && consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [consoleLogs, isActive, consoleEndRef])

  return <ToolButton icon="💻" isActive={isActive} label="Console" onClick={toggleConsole} />
}
