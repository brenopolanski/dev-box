export type TDeviceVisibility = 'desktop' | 'mobile' | 'all' | 'none'

export interface IFeatureVisibility {
  screenSize?: TDeviceVisibility
  envMode?: TDeviceVisibility
  cursorPosition?: TDeviceVisibility
  dateTime?: TDeviceVisibility
  cssDebug?: TDeviceVisibility
  ruler?: TDeviceVisibility
  inspector?: TDeviceVisibility
  designMode?: TDeviceVisibility
  draw?: TDeviceVisibility
  seo?: TDeviceVisibility
  console?: TDeviceVisibility
}

export interface IDevBoxProps {
  className?: string
  featureVisibility?: IFeatureVisibility
  position?: 'bottom-left' | 'bottom-right'
  showScreenSize?: boolean
  showEnvMode?: boolean
  showCursorPosition?: boolean
  showDateTime?: boolean
  showCssDebugButton?: boolean
  showRulerButton?: boolean
  showInspectorButton?: boolean
  showDesignModeButton?: boolean
  showDrawButton?: boolean
  showSeoButton?: boolean
  showConsoleButton?: boolean
}
