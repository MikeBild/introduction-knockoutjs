import { defineConfig } from 'vitest/config'

// TARGET=start prüft deine Lösung im Ordner start/, ohne Angabe laufen die Musterlösungen.
const target = process.env.TARGET === 'start' ? 'start' : 'solution'

export default defineConfig({
  test: {
    env: { TARGET: target },
    environment: 'happy-dom',
    include: ['exercises/*/*.test.ts', `exercises/*/${target}/**/*.test.ts`],
    setupFiles: ['./exercises/setup.ts'],
    restoreMocks: true,
  },
})
