export const FEATURES = [
  { description: 'Outline all elements on the page.', name: 'CSS Debug' },
  { description: 'Show grid and measure dimensions.', name: 'Ruler' },
  { description: 'View element details and styles.', name: 'Inspector' },
  { description: 'Make the entire document editable.', name: 'Design' },
  { description: 'Draw on the page for annotations.', name: 'Draw' },
  { description: 'Analyze page SEO elements.', name: 'SEO' },
  { description: 'View console logs.', name: 'Console' },
] as const

export const KEYBOARD_SHORTCUTS = [
  { description: 'Toggle Dev Box Panel', key: 'Shift + D' },
  { description: 'Minimize/Maximize Panel', key: 'Shift + T' },
  { description: 'Toggle CSS Debug', key: 'Shift + O' },
  { description: 'Toggle Ruler', key: 'Shift + R' },
  { description: 'Toggle Inspector', key: 'Shift + I' },
  { description: 'Toggle Design Mode', key: 'Shift + E' },
  { description: 'Toggle Draw Mode', key: 'Shift + W' },
  { description: 'Clear Drawing', key: 'Escape (while in Draw mode)' },
  { description: 'Show SEO Panel', key: 'Shift + S' },
  { description: 'Toggle Console', key: 'Shift + L' },
  { description: 'Show Help Panel', key: '?' },
  { description: 'Close Active Panel', key: 'Escape' },
] as const
