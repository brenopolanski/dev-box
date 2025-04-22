import { defineConfig } from 'tsup'

export default defineConfig({
  bundle: true, // Bundle the library
  clean: true, // Clean output directory before build
  dts: true, // Generate declaration files (.d.ts)
  entry: ['src/index.ts'], // Your library's entry point
  external: ['react', 'react-dom'], // Specify external dependencies (like React)
  format: ['cjs', 'esm'], // Output formats
  minify: true, // Minify the output
  sourcemap: false, // Generate source maps
  splitting: false, // Split the output into multiple files
})
