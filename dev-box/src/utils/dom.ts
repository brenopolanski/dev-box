/**
 * Formats a DOMTokenList into a string
 * @param classList - The DOMTokenList to format
 * @returns The formatted string
 */
export const formatClasses = (classList: DOMTokenList): string => {
  return Array.from(classList).join(' ')
}

/**
 * Gets the dimensions of an element
 * @param element - The element to get the dimensions of
 * @returns The dimensions of the element
 */
export const getElementDimensions = (element: HTMLElement) => {
  const computedStyle = window.getComputedStyle(element)
  const rect = element.getBoundingClientRect()

  return {
    border: {
      bottom: parseInt(computedStyle.borderBottomWidth),
      left: parseInt(computedStyle.borderLeftWidth),
      right: parseInt(computedStyle.borderRightWidth),
      top: parseInt(computedStyle.borderTopWidth),
    },
    height: Math.round(rect.height),
    margin: {
      bottom: parseInt(computedStyle.marginBottom),
      left: parseInt(computedStyle.marginLeft),
      right: parseInt(computedStyle.marginRight),
      top: parseInt(computedStyle.marginTop),
    },
    padding: {
      bottom: parseInt(computedStyle.paddingBottom),
      left: parseInt(computedStyle.paddingLeft),
      right: parseInt(computedStyle.paddingRight),
      top: parseInt(computedStyle.paddingTop),
    },
    width: Math.round(rect.width),
  }
}

/**
 * Gets the accessibility information of an element
 * @param element - The element to get the accessibility information of
 * @returns The accessibility information of the element
 */
export const getAccessibilityInfo = (element: HTMLElement) => {
  return {
    ariaDescribedby: element.getAttribute('aria-describedby'),
    ariaLabel: element.getAttribute('aria-label'),
    role: element.getAttribute('role'),
    tabIndex: element.getAttribute('tabindex'),
  }
}

/**
 * Gets an element by a data attribute from a parent element
 * @param attributeName The name of the data attribute to search for
 * @param parent The parent element to search within (defaults to document.head)
 * @returns The found element or null if not found
 */
export const getElementByAttribute = <T extends Element>(
  attributeName: string,
  parent: ParentNode = document.head,
): T | null => {
  return parent.querySelector(`[${attributeName}]`) as T | null
}

/**
 * Gets the content of a meta tag by name
 * @param name - The name of the meta tag
 * @returns The content of the meta tag
 */
export const getMetaContentByName = (name: string): string => {
  const meta = document.querySelector(`meta[name="${name}"]`)
  return meta?.getAttribute('content') || ''
}

/**
 * Gets the content of a meta tag by property
 * @param property - The property of the meta tag
 * @returns The content of the meta tag
 */
export const getMetaContentByProperty = (property: string): string => {
  const meta = document.querySelector(`meta[property="${property}"]`)
  return meta?.getAttribute('content') || ''
}

/**
 * Gets the link by rel
 * @param rel - The rel of the link
 * @returns The link
 */
export const getLinkByRel = (rel: string): string => {
  const link = document.querySelector(`link[rel="${rel}"]`)
  return link?.getAttribute('href') || ''
}
