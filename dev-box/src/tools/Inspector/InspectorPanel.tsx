import React from 'react'

import { CSS_NAMESPACE } from '../../constants'
import { useDevBoxTools } from '../../contexts/DevBoxToolsContext'
import { formatClasses, getAccessibilityInfo, getElementDimensions } from '../../utils/dom'
import { useInspector } from './Inspector.context'

export const InspectorPanel = () => {
  const { inspectedElement } = useInspector()
  const { state } = useDevBoxTools()
  const isActive = state.inspector

  if (!isActive || !inspectedElement.element) {
    return null
  }

  return (
    <div
      className={`${CSS_NAMESPACE}-inspector-panel`}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        color: 'white',
        fontSize: '12px',
        left: `${inspectedElement.position.x + 10}px`,
        maxWidth: '300px',
        padding: '8px',
        position: 'fixed',
        top: `${inspectedElement.position.y + 10}px`,
        zIndex: 2147483646,
      }}
    >
      {/* Element Tag */}
      <div className="tw:mb-2">
        <span className="tw:text-blue-400">&lt;{inspectedElement.element.tagName.toLowerCase()}</span>
        {inspectedElement.element.id && (
          <span className="tw:text-orange-400"> id=&quot;{inspectedElement.element.id}&quot;</span>
        )}
        {inspectedElement.element.classList.length > 0 && (
          <span className="tw:text-green-400">
            {' '}
            class=&quot;{formatClasses(inspectedElement.element.classList)}
            &quot;
          </span>
        )}
        <span className="tw:text-blue-400">&gt;</span>
      </div>

      {/* Box Model */}
      {(() => {
        const dimensions = getElementDimensions(inspectedElement.element)

        return (
          <div className="tw:mb-2 tw:border-t tw:border-white/10 tw:pt-2">
            <div className="tw:mb-1 tw:text-xs tw:font-bold tw:text-white/60">
              <span aria-label="box model" className="tw:mr-1" role="img">
                📦
              </span>
              Box Model
            </div>
            <div className="tw:grid tw:grid-cols-2 tw:gap-2">
              <div>
                <span className="tw:text-white/60">Width: </span>
                <span>{dimensions.width}px</span>
              </div>
              <div>
                <span className="tw:text-white/60">Height: </span>
                <span>{dimensions.height}px</span>
              </div>
              <div>
                <span className="tw:text-white/60">Padding: </span>
                <span>
                  {dimensions.padding.top} {dimensions.padding.right} {dimensions.padding.bottom}{' '}
                  {dimensions.padding.left}
                </span>
              </div>
              <div>
                <span className="tw:text-white/60">Margin: </span>
                <span>
                  {dimensions.margin.top} {dimensions.margin.right} {dimensions.margin.bottom} {dimensions.margin.left}
                </span>
              </div>
              <div>
                <span className="tw:text-white/60">Border: </span>
                <span>
                  {dimensions.border.top} {dimensions.border.right} {dimensions.border.bottom} {dimensions.border.left}
                </span>
              </div>
            </div>
          </div>
        )
      })()}

      {/* Computed Styles */}
      <div className="tw:mb-2 tw:border-t tw:border-white/10 tw:pt-2">
        <div className="tw:mb-1 tw:text-xs tw:font-bold tw:text-white/60">
          <span aria-label="computed styles" className="tw:mr-1" role="img">
            🎨
          </span>
          Computed Styles
        </div>
        <div className="tw:grid tw:grid-cols-2 tw:gap-2">
          {(() => {
            const computedStyle = window.getComputedStyle(inspectedElement.element)
            const relevantStyles = ['display', 'position', 'color', 'background-color', 'font-size', 'font-family']

            return relevantStyles.map((style) => (
              <div key={style}>
                <span className="tw:text-white/60">{style}: </span>
                <span>{computedStyle.getPropertyValue(style)}</span>
              </div>
            ))
          })()}
        </div>
      </div>

      {/* Accessibility Info */}
      {(() => {
        const a11y = getAccessibilityInfo(inspectedElement.element)
        const hasA11yInfo = Object.values(a11y).some((value) => value !== null)

        if (!hasA11yInfo) {
          return null
        }

        return (
          <div className="tw:border-t tw:border-white/10 tw:pt-2">
            <div className="tw:mb-1 tw:text-xs tw:font-bold tw:text-white/60">
              <span aria-label="accessibility" className="tw:mr-1" role="img">
                ♿
              </span>
              Accessibility
            </div>
            <div className="tw:grid tw:grid-cols-2 tw:gap-2">
              {a11y.role && (
                <div>
                  <span className="tw:text-white/60">Role: </span>
                  <span>{a11y.role}</span>
                </div>
              )}
              {a11y.ariaLabel && (
                <div>
                  <span className="tw:text-white/60">Label: </span>
                  <span>{a11y.ariaLabel}</span>
                </div>
              )}
              {a11y.ariaDescribedby && (
                <div>
                  <span className="tw:text-white/60">Described by: </span>
                  <span>{a11y.ariaDescribedby}</span>
                </div>
              )}
              {a11y.tabIndex && (
                <div>
                  <span className="tw:text-white/60">Tab index: </span>
                  <span>{a11y.tabIndex}</span>
                </div>
              )}
            </div>
          </div>
        )
      })()}
    </div>
  )
}
