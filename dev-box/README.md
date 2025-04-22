# react-lib

This is the core React library package within the monorepo.

## Description

React library (You should replace this with a more specific description of what your library does).

## Installation

This package is intended to be used within the monorepo or published to a registry like npm.

If you are developing within this monorepo, pnpm workspaces handle the linking automatically after running `pnpm install` in the root directory.

If published, you would install it like any other package:

```bash
npm install react-lib # or yarn add react-lib or pnpm add react-lib
```

## Usage

```jsx
// Example of how to import and use components from this library
// (Update this section once you have components)
import { YourComponent } from 'react-lib'

function App() {
  return <YourComponent />
}
```

## Development

Navigate to the root of the monorepo to run development scripts.

### Build

To build the library once:

```bash
pnpm build --filter=react-lib
```

### Watch Mode

To build the library and watch for changes:

```bash
pnpm dev --filter=react-lib
```

This uses `tsup` to bundle the library into `dist/` with CommonJS (.js), ES Module (.mjs), and TypeScript definition (.d.ts) outputs.

## License

MIT License.
