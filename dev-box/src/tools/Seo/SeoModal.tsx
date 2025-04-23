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
      className={`${CSS_NAMESPACE}-seo-modal tw:fixed tw:left-1/2 tw:top-4 tw:z-[2147483646] tw:max-h-[calc(100vh-8rem)] tw:w-full tw:max-w-xl tw:-translate-x-1/2 tw:overflow-y-auto tw:bg-black tw:p-4 tw:font-mono tw:text-sm tw:text-white`}
      open={isOpen}
    >
      <div className="tw:mb-4 tw:flex tw:items-center tw:justify-between tw:border-b tw:border-white/20 tw:pb-2">
        <span className="tw:text-lg tw:font-bold" id="seo-modal-title">
          SEO Analysis
        </span>
        <button
          aria-label="Close button"
          className="tw:cursor-pointer tw:text-white/60 tw:hover:tw:text-white"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <Seo />
    </dialog>
  )
}
