import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { IFeatureVisibility } from '../types'
import { isFeatureVisible } from './deviceVisibility'

/**
 * Merges multiple class names using clsx and tailwind-merge
 * @param inputs - Class values to merge
 * @returns Merged class names
 * @example
 * cn('bg-red-500', 'text-white', 'p-4') // => 'bg-red-500 text-white p-4'
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

/**
 * Counts the number of words in a string
 * @param str - The string to count the words of
 * @returns The number of words in the string
 */
export const countWords = (str: string): number => {
  if (!str) {
    return 0
  }

  // Remove extra whitespace and split on whitespace
  return str.trim().split(/\s+/).filter(Boolean).length
}

/**
 * Checks if the length of a string is outside the specified range
 * @param length - The length of the string
 * @param min - The minimum length
 * @param max - The maximum length
 * @returns True if the length is outside the range, false otherwise
 */
export const isLengthError = (length: number, min: number, max: number): boolean => {
  return length < min || length > max
}

/**
 * Checks if the event target is an input element
 * Used to prevent keyboard shortcuts from firing while typing
 * @param target - The event target
 * @returns True if the event target is an input element, false otherwise
 */
export const isInputElement = (target: EventTarget | null): boolean => {
  if (!target) {
    return false
  }

  return (
    (target instanceof HTMLElement && target.isContentEditable) ||
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  )
}

/**
 * Checks if a keyboard shortcut is pressed
 * @param event - The keyboard event
 * @param key - The key to check (case-insensitive)
 * @param requireShift - Whether the shift key should be pressed
 * @returns True if the shortcut is pressed, false otherwise
 */
export const isKeyboardShortcut = (event: KeyboardEvent, key: string, requireShift = false): boolean => {
  if (isInputElement(event.target)) {
    return false
  }

  const keyMatch = event.key.toLowerCase() === key.toLowerCase() || event.key === key

  return keyMatch && (!requireShift || event.shiftKey)
}

/**
 * Checks if a feature should be shown based on the feature visibility and the device type
 * @param featureName - The name of the feature
 * @param showFeature - Whether the feature should be shown
 * @param featureVisibility - The visibility of the feature
 * @param isMobile - Whether the device is mobile
 * @returns True if the feature should be shown, false otherwise
 */
export const shouldShowFeature = (
  featureName: keyof IFeatureVisibility,
  showFeature: boolean,
  featureVisibility: IFeatureVisibility,
  isMobile: boolean,
): boolean => {
  return showFeature ? isFeatureVisible(featureName, featureVisibility, showFeature, isMobile) : false
}
