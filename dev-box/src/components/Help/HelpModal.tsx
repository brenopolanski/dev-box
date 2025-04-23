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
      className={`${CSS_NAMESPACE}-help-modal tw:fixed tw:left-1/2 tw:top-4 tw:z-[2147483646] tw:max-h-[calc(100vh-8rem)] tw:w-full tw:max-w-xl tw:-translate-x-1/2 tw:overflow-y-auto tw:bg-black tw:p-4 tw:font-mono tw:text-sm tw:text-white`}
      open={isOpen}
    >
      <div className="tw:mb-4 tw:flex tw:items-center tw:justify-between tw:border-b tw:border-white/20 tw:pb-2">
        <span className="tw:text-lg tw:font-bold" id="help-modal-title">
          Help
        </span>
        <button
          aria-label="Close button"
          className="tw:cursor-pointer tw:text-white/60 tw:hover:text-white"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <div className="tw:space-y-6">
        {/* Features Section */}
        <div>
          <h2 className="tw:mb-2 tw:text-base tw:font-bold tw:text-white/80">Features</h2>
          <ul className="tw:list-inside tw:list-disc tw:space-y-2">
            {FEATURES.map((feature, index) => (
              <li key={index}>
                <span className="tw:text-white/60">{feature.name}:</span> {feature.description}
              </li>
            ))}
          </ul>
        </div>

        {/* Keyboard Shortcuts Section */}
        <div>
          <h2 className="tw:mb-2 tw:text-base tw:font-bold tw:text-white/80">Keyboard Shortcuts</h2>
          <div className="tw:grid tw:gap-2">
            {KEYBOARD_SHORTCUTS.map((shortcut, index) => (
              <div key={index} className="tw:flex tw:items-center tw:justify-between">
                <span className="tw:text-white/60">{shortcut.description}</span>
                <code className="tw:rounded tw:bg-white/10 tw:px-2 tw:py-0.5 tw:font-mono tw:text-xs">
                  {shortcut.key}
                </code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </dialog>
  )
}
