import { defineConfig } from 'vite'
import { buildCsp } from './exercises/16-csp/solution/csp.ts'

// Knockout 3.5 is a UMD package; Vite pre-bundles it as ESM, no further configuration needed.
// npm run build && npx vite preview serves the workshop shop with a Content Security Policy (exercise 16).
// Trial: set allowEval to false – then Knockout 3.5 binds nothing anymore.
export default defineConfig({
  build: { target: 'es2024' },
  preview: {
    headers: { 'Content-Security-Policy': buildCsp({ allowEval: true }) },
  },
})
