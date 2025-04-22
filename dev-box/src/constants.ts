export const IS_DEV = process.env.NODE_ENV === 'development'
export const ENV_MODE = IS_DEV ? 'dev' : 'prod'

export const CSS_NAMESPACE = 'dev-box'

export const STORAGE_KEYS = {
  IS_MINIMIZED: `${CSS_NAMESPACE}-is-minimized`,
} as const
