# 🛠️ DevBox

A powerful and customizable developer toolbox for React applications that helps with debugging, inspecting, and analyzing web pages.

https://github.com/user-attachments/assets/aa546c62-f2ec-4063-898d-b01558972a2f

## ✨ Features

- 🚀 **Turborepo**: High-performance build system for monorepos.
- 📦 **pnpm**: Fast, disk space-efficient package manager.
- ⚛️ **React**: JavaScript library for building user interfaces.
- 🔒 **TypeScript**: Typed superset of JavaScript.
- 🛠️ **tsup**: Simple and fast TypeScript bundler powered by esbuild.
- 💅 **TailwindCSS**: Utility-first CSS framework.
- 📋 **ESLint & Prettier**: Code linting and formatting.

## 📁 Project Structure

The repository is structured as a monorepo:

```
.
├── examples/                 # Example projects using the library
│   └── nextjs/               # Next.js examples
│       └── app-router/       # Next.js App Router example
├── dev-box/                  # The developer toolbox source code
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

- **`dev-box/`**: Contains the source code for the developer toolbox library. This is where you'll find all the components, utilities, and tools for debugging and analyzing web pages.
- **`examples/`**: Contains example projects demonstrating how to use the library in different frameworks and scenarios.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (>= 18)
- [pnpm](https://pnpm.io/) (>= 9)

### Installation

Clone the repository and install dependencies:

```bash
git clone git@github.com:brenopolanski/dev-box.git
cd dev-box
pnpm install
```

### Development

To start the development server for the library (watches for changes and rebuilds):

```bash
pnpm dev --filter=dev-box
```

To start the development server for an example project (e.g., Next.js app router):

```bash
pnpm dev --filter=nextjs-app-router
```

### Build

To build the library for production:

```bash
pnpm build --filter=dev-box
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

To fix linting issues:

```bash
pnpm lint:fix
```

To format the codebase:

```bash
pnpm format
```

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
