import { defineConfig } from 'vite'

// Knockout 3.5 ist ein UMD-Paket; Vite bündelt es vorab als ESM, mehr Konfiguration braucht es nicht.
export default defineConfig({
  build: { target: 'es2024' },
})
