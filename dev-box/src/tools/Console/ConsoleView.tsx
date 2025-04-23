import React from 'react'

import { useDevBoxTools } from '../../contexts/DevBoxToolsContext'
import { useConsole } from './Console.context'

export const ConsoleView = () => {
  const { state } = useDevBoxTools()
  const { consoleLogs, consoleEndRef, clearConsoleLogs } = useConsole()
  const isActive = state.console

  if (!isActive) {
    return null
  }

  return (
    <div className="tw:border-t tw:border-white/20">
      <div className="tw:flex tw:items-center tw:justify-between tw:p-2">
        <span className="tw:text-xs tw:font-bold">Console</span>
        <button
          className="tw:cursor-pointer tw:text-xs tw:text-white/60 tw:outline-none tw:hover:tw:text-white"
          title="Clear Console"
          onClick={clearConsoleLogs}
        >
          Clear
        </button>
      </div>
      <div className="tw:max-h-32 tw:overflow-y-auto tw:border-t tw:border-white/20 tw:bg-black/30 tw:p-2">
        {consoleLogs.length === 0 ? (
          <div className="tw:text-center tw:text-xs tw:text-white/40">No console logs</div>
        ) : (
          consoleLogs.map((log, index) => (
            <div
              key={index}
              className={`tw:mb-1 tw:whitespace-pre-wrap tw:font-mono tw:text-xs ${
                log.type === 'error'
                  ? 'tw:text-red-400'
                  : log.type === 'warn'
                    ? 'tw:text-yellow-400'
                    : log.type === 'info'
                      ? 'tw:text-blue-400'
                      : 'tw:text-white'
              }`}
            >
              <span className="tw:mr-2 tw:text-white/40">{log.timestamp.toLocaleTimeString()}</span>
              {log.message}
            </div>
          ))
        )}
        <div ref={consoleEndRef} />
      </div>
    </div>
  )
}
