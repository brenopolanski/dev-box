interface IStorage {
  get<T>(key: string, defaultValue: T): T
  set<T>(key: string, value: T): void
}

/**
 * Storage utility for DevBox
 * Provides methods to get and set items in localStorage
 */
export const storage: IStorage = {
  get: (key, defaultValue) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      console.error('Error setting localStorage item', key, value)
    }
  },
}
