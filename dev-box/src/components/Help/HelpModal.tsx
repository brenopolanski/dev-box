import React from 'react'

import { CSS_NAMESPACE } from '../../constants'
import { isKeyboardShortcut } from '../../utils/helpers'
import { FEATURES, KEYBOARD_SHORTCUTS } from './Help.constants'

interface IHelpModalProps {
  isOpen?: boolean
  onClose: () => void
}

export const HelpModal = ({ isOpen = false, onClose }: IHelpModalProps) => {
  React.useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isKeyboardShortcut(event, 'Escape')) {
        event.preventDefault()
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <dialog
      aria-labelledby="help-modal-title"
      aria-modal="true"
      className={`${CSS_NAMESPACE}-help-modal fixed left-1/2 top-4 z-[2147483646] max-h-[calc(100vh-8rem)] w-full max-w-xl -translate-x-1/2 overflow-y-auto bg-black/90 p-4 font-mono text-sm text-white`}
      open={isOpen}
    >
      <div className="mb-4 flex items-center justify-between border-b border-white/20 pb-2">
        <span className="text-lg font-bold" id="help-modal-title">
          Help
        </span>
        <button aria-label="Close button" className="cursor-pointer text-white/60 hover:text-white" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="space-y-6">
        {/* Features Section */}
        <div>
          <h2 className="mb-2 text-base font-bold text-white/80">Features</h2>
          <ul className="list-inside list-disc space-y-2">
            {FEATURES.map((feature, index) => (
              <li key={index}>
                <span className="text-white/60">{feature.name}:</span> {feature.description}
              </li>
            ))}
          </ul>
        </div>

        {/* Keyboard Shortcuts Section */}
        <div>
          <h2 className="mb-2 text-base font-bold text-white/80">Keyboard Shortcuts</h2>
          <div className="grid gap-2">
            {KEYBOARD_SHORTCUTS.map((shortcut, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-white/60">{shortcut.description}</span>
                <code className="rounded bg-white/10 px-2 py-0.5 font-mono text-xs">{shortcut.key}</code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </dialog>
  )
}
