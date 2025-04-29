# 🛠️ DevBox

A powerful and customizable developer toolbox for React applications that helps with debugging, inspecting, and analyzing web pages.

https://github.com/user-attachments/assets/aa546c62-f2ec-4063-898d-b01558972a2f

## ✨ Features

DevBox includes several powerful tools to assist developers:

- **Screen Size**: Shows current viewport dimensions.
- **Environment Mode**: Displays current environment (development, production, and etc).
- **Cursor Position**: Shows real-time cursor coordinates.
- **Date/Time**: Displays current date and time.
- **CSS Debug**: Highlight HTML elements for CSS debugging.
- **Ruler**: Measure dimensions and distances on the page.
- **Inspector**: Inspect and analyze HTML elements.
- **Design Mode**: Edit content directly in the browser.
- **Draw**: Draw and annotate on the page.
- **SEO**: Analyze page for SEO optimization.
- **Console**: View console logs directly on the page.

## 📦 Installation

```bash
# npm
npm install @breno.polanski/dev-box

# yarn
yarn add @breno.polanski/dev-box

# pnpm
pnpm add @breno.polanski/dev-box

# bun
bun add @breno.polanski/dev-box
```

## 🚀 Usage

```jsx
import { DevBox } from '@breno.polanski/dev-box'

function App() {
  return (
    <div>
      <h1>My App</h1>
      {/* Add DevBox to your application */}
      <DevBox />
    </div>
  )
}
```

## ⚙️ Configuration

DevBox is highly configurable. You can customize which features are shown and their position:

```jsx
<DevBox
  position="bottom-left" // or "bottom-right"
  showScreenSize={true}
  showCssDebugButton={true}
  showRulerButton={true}
  showInspectorButton={true}
  showDesignModeButton={true}
  showDrawButton={true}
  showSeoButton={true}
  showConsoleButton={true}
  showEnvMode={true}
  showCursorPosition={true}
  showDateTime={true}
  featureVisibility={{
    screenSize: 'all',
    cssDebug: 'desktop',
    ruler: 'all',
    // Configure visibility per device for each feature
    // Options: 'desktop', 'mobile', 'all', 'none'
  }}
/>
```

## ⌨️ Keyboard Shortcuts

DevBox provides convenient keyboard shortcuts for quick access to all features:

| Shortcut              | Description             |
| --------------------- | ----------------------- |
| Shift + D             | Toggle DevBox Panel     |
| Shift + T             | Minimize/Maximize Panel |
| Shift + O             | Toggle CSS Debug        |
| Shift + R             | Toggle Ruler            |
| Shift + I             | Toggle Inspector        |
| Shift + E             | Toggle Design Mode      |
| Shift + W             | Toggle Draw Mode        |
| Escape (in Draw mode) | Clear Drawing           |
| Shift + S             | Show SEO Panel          |
| Shift + L             | Toggle Console          |
| ?                     | Show Help Panel         |
| Escape                | Close Active Panel      |

## 🔧 Development

This project uses `pnpm` for package management.

```bash
# Install dependencies
pnpm install

# Build the library
pnpm build

# Develop with hot reloading
pnpm dev
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
