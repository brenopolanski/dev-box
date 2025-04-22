import type { IFeatureVisibility, TDeviceVisibility } from '../types'

/**
 * Checks if a feature should be shown based on the feature visibility and the device type
 * @param feature - The name of the feature
 * @param featureVisibility - The visibility of the feature
 * @param defaultValue - The default value
 * @param isMobile - Whether the device is mobile
 * @returns True if the feature should be shown, false otherwise
 */
export const isFeatureVisible = (
  feature: keyof IFeatureVisibility,
  featureVisibility: IFeatureVisibility | undefined,
  defaultValue: boolean,
  isMobile: boolean,
): boolean => {
  if (!featureVisibility || !featureVisibility[feature]) {
    return defaultValue
  }

  const visibility = featureVisibility[feature] as TDeviceVisibility

  switch (visibility) {
    case 'desktop':
      return !isMobile
    case 'mobile':
      return isMobile
    case 'all':
      return true
    case 'none':
      return false
    default:
      return defaultValue
  }
}

/**
 * Default feature visibility configuration
 */
export const DEFAULT_FEATURE_VISIBILITY: IFeatureVisibility = {
  console: 'all',
  cssDebug: 'all',
  cursorPosition: 'desktop',
  dateTime: 'desktop',
  designMode: 'all',
  draw: 'desktop',
  envMode: 'all',
  inspector: 'all',
  ruler: 'desktop',
  screenSize: 'all',
  seo: 'all',
}
