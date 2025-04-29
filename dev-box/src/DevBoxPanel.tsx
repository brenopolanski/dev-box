import React from 'react'

import { Help } from './components/Help'
import { MaximizeButton } from './components/MaximizeButton'
import { MinimizeButton } from './components/MinimizeButton'
import { CSS_NAMESPACE } from './constants'
import { useDevBox } from './contexts/DevBoxContext'
import { useDevBoxTools } from './contexts/DevBoxToolsContext'
import { useIsMobile } from './hooks/useIsMobile'
import { Console } from './tools/Console'
import { CssDebug } from './tools/CssDebug'
import { CursorPosition } from './tools/CursorPosition'
import { DateTime } from './tools/DateTime'
import { DesignMode } from './tools/DesignMode'
import { Draw } from './tools/Draw'
import { EnvMode } from './tools/EnvMode'
import { Inspector } from './tools/Inspector'
import { Ruler } from './tools/Ruler'
import { ScreenSize } from './tools/ScreenSize'
import { Seo } from './tools/Seo'
import type { IDevBoxProps } from './types'
import { DEFAULT_FEATURE_VISIBILITY } from './utils/deviceVisibility'
import { cn, isInputElement, isKeyboardShortcut, shouldShowFeature } from './utils/helpers'

export const DevBoxPanel = ({
  className,
  featureVisibility = DEFAULT_FEATURE_VISIBILITY,
  position = 'bottom-left',
  showScreenSize = true,
  showEnvMode = true,
  showCursorPosition = true,
  showDateTime = false,
  showCssDebugButton = true,
  showRulerButton = true,
  showInspectorButton = true,
  showDesignModeButton = true,
  showDrawButton = true,
  showSeoButton = true,
  showConsoleButton = true,
  ...props
}: IDevBoxProps) => {
  const { showDevBox, showHelp, isMinimized, isMinimizedLoading, setShowDevBox, setShowHelp, setIsMinimized } =
    useDevBox()
  const { state: toolState, toggleTool } = useDevBoxTools()

  const isMobile = useIsMobile()

  const seoActive = toolState.seo
  const toggleSeo = () => toggleTool('seo')

  // Check feature visibility based on device type
  const shouldShowScreenSize = shouldShowFeature('screenSize', showScreenSize, featureVisibility, isMobile)
  const shouldShowEnvMode = shouldShowFeature('envMode', showEnvMode, featureVisibility, isMobile)
  const shouldShowCursorPosition = shouldShowFeature('cursorPosition', showCursorPosition, featureVisibility, isMobile)
  const shouldShowDateTime = shouldShowFeature('dateTime', showDateTime, featureVisibility, isMobile)
  const shouldShowCssDebugButton = shouldShowFeature('cssDebug', showCssDebugButton, featureVisibility, isMobile)
  const shouldShowRulerButton = shouldShowFeature('ruler', showRulerButton, featureVisibility, isMobile)
  const shouldShowInspectorButton = shouldShowFeature('inspector', showInspectorButton, featureVisibility, isMobile)
  const shouldShowDesignModeButton = shouldShowFeature('designMode', showDesignModeButton, featureVisibility, isMobile)
  const shouldShowDrawButton = shouldShowFeature('draw', showDrawButton, featureVisibility, isMobile)
  const shouldShowSeoButton = shouldShowFeature('seo', showSeoButton, featureVisibility, isMobile)
  const shouldShowConsoleButton = shouldShowFeature('console', showConsoleButton, featureVisibility, isMobile)

  // Calculate visible features
  const visibleInfoFeatures = [
    shouldShowScreenSize,
    shouldShowEnvMode,
    shouldShowCursorPosition,
    shouldShowDateTime,
  ].filter(Boolean).length

  // Calculate visible button features
  const visibleButtonFeatures = [
    shouldShowCssDebugButton,
    shouldShowRulerButton,
    shouldShowInspectorButton,
    shouldShowDesignModeButton,
    shouldShowDrawButton,
    shouldShowSeoButton,
    shouldShowConsoleButton,
  ].filter(Boolean).length

  // Global keyboard shortcut handler
  React.useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (isInputElement(event.target)) {
        return
      }

      if (isKeyboardShortcut(event, 'd', true)) {
        event.preventDefault()
        // @ts-ignore
        setShowDevBox((showDevBox) => !showDevBox)
        setShowHelp(false)
        toggleTool('seo', false)
      }

      if (!showDevBox) {
        return
      }

      if (isKeyboardShortcut(event, 't', true)) {
        event.preventDefault()
        // @ts-ignore
        setIsMinimized((isMinimized) => !isMinimized)
      }

      if (isKeyboardShortcut(event, '?', true)) {
        event.preventDefault()
        // @ts-ignore
        setShowHelp((showHelp) => !showHelp)
      }

      if (isKeyboardShortcut(event, 's', true)) {
        event.preventDefault()
        toggleTool('seo', !seoActive)
      }
    }

    document.addEventListener('keydown', handleGlobalKeyDown)

    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown)
    }
  }, [seoActive, setIsMinimized, setShowDevBox, setShowHelp, showDevBox, toggleTool])

  if (isMinimizedLoading || !showDevBox) {
    return null
  }

  return (
    <div className={`${CSS_NAMESPACE}-container tw:relative`}>
      {/* Container Content */}
      <Ruler.Selection />
      <Inspector.Panel />
      <Draw.ClearButton />

      <MaximizeButton
        className={cn('tw:border-0', {
          'tw:border-t tw:border-l': position === 'bottom-right',
          'tw:border-t tw:border-r': position === 'bottom-left',
          'tw:flex': isMinimized,
          'tw:hidden': !isMinimized,
        })}
        onClick={() => setIsMinimized(false)}
      />

      <div
        className={cn(
          `${CSS_NAMESPACE}-panel tw:border-white/20 tw:pointer-events-auto tw:fixed tw:bottom-0 tw:z-[2147483647] tw:w-fit tw:bg-black/90 tw:font-mono tw:text-[12px] tw:text-white`,
          {
            'tw:hidden': isMinimized,
            'tw:left-0 tw:border-t tw:border-r': position === 'bottom-left',
            'tw:right-0 tw:border-t tw:border-l': position === 'bottom-right',
          },
          className,
        )}
        {...props}
      >
        {/* Panel Info */}
        {visibleInfoFeatures > 0 && (
          <table className={`${CSS_NAMESPACE}-panel-info tw:w-full`}>
            <tbody>
              <tr
                className="tw:grid tw:divide-x tw:divide-white/20"
                style={{
                  gridTemplateColumns: [
                    shouldShowScreenSize && 'minmax(0, 1fr)',
                    shouldShowEnvMode && 'minmax(0, 1fr)',
                    shouldShowCursorPosition && 'minmax(0, 1fr)',
                    shouldShowDateTime && 'minmax(0, 1fr)',
                    '32px',
                    '32px',
                  ]
                    .filter(Boolean)
                    .join(' '),
                }}
              >
                {/* Screen Size */}
                {shouldShowScreenSize && (
                  <td className="tw:flex tw:items-center tw:justify-center tw:gap-1 tw:px-2 tw:py-1">
                    <ScreenSize />
                  </td>
                )}
                {/* Environment */}
                {shouldShowEnvMode && (
                  <td className="tw:flex tw:items-center tw:justify-center tw:gap-1 tw:px-2 tw:py-1">
                    <EnvMode />
                  </td>
                )}
                {/* Cursor Position */}
                {shouldShowCursorPosition && (
                  <td className="tw:flex tw:items-center tw:justify-center tw:gap-1 tw:px-2 tw:py-1 tw:tabular-nums">
                    <CursorPosition />
                  </td>
                )}
                {/* Date Time */}
                {shouldShowDateTime && (
                  <td className="tw:flex tw:items-center tw:justify-center tw:gap-1 tw:px-2 tw:py-1 tw:tabular-nums">
                    <DateTime />
                  </td>
                )}
                {/* Help Button */}
                <td className="tw:flex">
                  <Help.Button onClick={() => setShowHelp(!showHelp)} />
                </td>
                {/* Minimize Button */}
                <td className="tw:flex">
                  <MinimizeButton onClick={() => setIsMinimized(true)} />
                </td>
              </tr>
            </tbody>
          </table>
        )}

        {/* Panel Content */}
        <div className={`${CSS_NAMESPACE}-panel-content`}>
          <Console.View />
        </div>

        {/* Panel Buttons (Tools) */}
        {visibleButtonFeatures > 0 && (
          <table className={`${CSS_NAMESPACE}-panel-buttons tw:w-full tw:border-t tw:border-white/20`}>
            <tbody>
              <tr
                className="tw:grid tw:gap-2 tw:px-2 tw:py-1"
                style={{ gridTemplateColumns: `repeat(${visibleButtonFeatures}, minmax(0, 1fr))` }}
              >
                {/* CSS Debug Button */}
                {shouldShowCssDebugButton && (
                  <td>
                    <CssDebug.Button />
                  </td>
                )}
                {/* Ruler Button */}
                {shouldShowRulerButton && (
                  <td>
                    <Ruler.Button />
                  </td>
                )}
                {/* Inspector Button */}
                {shouldShowInspectorButton && (
                  <td>
                    <Inspector.Button />
                  </td>
                )}
                {/* Design Mode Button */}
                {shouldShowDesignModeButton && (
                  <td>
                    <DesignMode.Button />
                  </td>
                )}
                {/* Draw Button */}
                {shouldShowDrawButton && (
                  <td>
                    <Draw.Button />
                  </td>
                )}
                {/* SEO Button */}
                {shouldShowSeoButton && (
                  <td>
                    <Seo.Button isActive={seoActive} onToggle={toggleSeo} />
                  </td>
                )}
                {/* Console Button */}
                {shouldShowConsoleButton && (
                  <td>
                    <Console.Button />
                  </td>
                )}
              </tr>
            </tbody>
          </table>
        )}
      </div>

      {/* Modals */}
      <Help.Modal isOpen={showHelp} onClose={() => setShowHelp(false)} />
      <Seo.Modal isOpen={seoActive} onClose={() => toggleTool('seo', false)} />
    </div>
  )
}
