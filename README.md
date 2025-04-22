# React Library Template

React library template using pnpm, Turborepo, TypeScript, tsup, ESLint, and Prettier.

## ✨ Features

- 🚀 **Turborepo**: High-performance build system for monorepos.
- 📦 **pnpm**: Fast, disk space-efficient package manager.
- ⚛️ **React**: JavaScript library for building user interfaces.
- 🔒 **TypeScript**: Typed superset of JavaScript.
- 🛠️ **tsup**: Simple and fast TypeScript bundler powered by esbuild.
- 💅 **ESLint & Prettier**: Code linting and formatting.

## 📁 Project Structure

The repository is structured as a monorepo:

```
.
├── examples/                 # Example projects using the library
│   └── basic/                # Basic example
├── react-lib/                # The actual React library source code
│   ├── src/                  # Library source files
│   ├── package.json          # Library package configuration
│   └── tsup.config.ts        # tsup build configuration
├── scripts/                  # Utility scripts
├── .editorconfig             # Editor configuration
├── .gitignore                # Git ignore rules
├── .prettierignore           # Prettier ignore rules
├── LICENSE                   # Project License
├── package.json              # Root package configuration
├── pnpm-lock.yaml            # pnpm lock file
├── pnpm-workspace.yaml       # pnpm workspace configuration
├── prettier.config.mjs       # Prettier configuration
└── turbo.json                # Turborepo configuration
```

- **`react-lib/`**: Contains the source code for your React library. This is where you'll build your components, hooks, etc.
- **`examples/`**: Contains example projects demonstrating how to use the library. This is useful for testing and showcasing features.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (>= 18)
- [pnpm](https://pnpm.io/) (>= 9)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/brenopolanski/react-lib-template.git
cd react-lib-template
pnpm install
```

### Development

To start the development server for the library (watches for changes and rebuilds):

```bash
pnpm dev --filter=react-lib
```

To start the development server for an example project (e.g., `basic`):

```bash
pnpm dev --filter=basic
```

### Build

To build the library for production:

```bash
pnpm build --filter=react-lib
```

To build all packages in the monorepo:

```bash
pnpm build
```

### Linting and Formatting

To lint the codebase:

```bash
pnpm lint
```

To format the codebase:

```bash
pnpm format
```

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
