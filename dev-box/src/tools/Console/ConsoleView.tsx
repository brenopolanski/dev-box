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
    <div className="border-t border-white/20">
      <div className="flex items-center justify-between p-2">
        <span className="text-xs font-bold">Console</span>
        <button
          className="cursor-pointer text-xs text-white/60 outline-none hover:text-white"
          title="Clear Console"
          onClick={clearConsoleLogs}
        >
          Clear
        </button>
      </div>
      <div className="max-h-32 overflow-y-auto border-t border-white/20 bg-black/30 p-2">
        {consoleLogs.length === 0 ? (
          <div className="text-center text-xs text-white/40">No console logs</div>
        ) : (
          consoleLogs.map((log, index) => (
            <div
              key={index}
              className={`mb-1 whitespace-pre-wrap font-mono text-xs ${
                log.type === 'error'
                  ? 'text-red-400'
                  : log.type === 'warn'
                    ? 'text-yellow-400'
                    : log.type === 'info'
                      ? 'text-blue-400'
                      : 'text-white'
              }`}
            >
              <span className="mr-2 text-white/40">{log.timestamp.toLocaleTimeString()}</span>
              {log.message}
            </div>
          ))
        )}
        <div ref={consoleEndRef} />
      </div>
    </div>
  )
}
