import { defineConfig } from 'vite'
import { buildCsp } from './exercises/16-csp/solution/csp.ts'

// Knockout 3.5 ist ein UMD-Paket; Vite bündelt es vorab als ESM, mehr Konfiguration braucht es nicht.
// npm run build && npx vite preview liefert die Todo-App mit Content Security Policy aus (Übung 16).
// Probe: allowEval auf false setzen – dann bindet Knockout 3.5 nichts mehr.
export default defineConfig({
  build: { target: 'es2024' },
  preview: {
    headers: { 'Content-Security-Policy': buildCsp({ allowEval: true }) },
  },
})
