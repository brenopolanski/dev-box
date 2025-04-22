import React from 'react'

import { CSS_NAMESPACE } from '../../constants'
import { isKeyboardShortcut } from '../../utils/helpers'
import { Seo } from './Seo'

interface ISeoModalProps {
  isOpen?: boolean
  onClose: () => void
}

export const SeoModal = ({ isOpen = false, onClose }: ISeoModalProps) => {
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
      aria-labelledby="seo-modal-title"
      aria-modal="true"
      className={`${CSS_NAMESPACE}-seo-modal fixed left-1/2 top-4 z-[2147483646] max-h-[calc(100vh-8rem)] w-full max-w-xl -translate-x-1/2 overflow-y-auto bg-black/90 p-4 font-mono text-sm text-white`}
      open={isOpen}
    >
      <div className="mb-4 flex items-center justify-between border-b border-white/20 pb-2">
        <span className="text-lg font-bold" id="seo-modal-title">
          SEO Analysis
        </span>
        <button aria-label="Close button" className="cursor-pointer text-white/60 hover:text-white" onClick={onClose}>
          ✕
        </button>
      </div>

      <Seo />
    </dialog>
  )
}
