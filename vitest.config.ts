import { defineConfig } from 'vitest/config'

// TARGET=start checks your starting point in the folder start/; without it, the reference solutions in solution/ run.
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
