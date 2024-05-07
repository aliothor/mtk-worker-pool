import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    browser: {
      name: 'chromium',
      enabled: true,
      provider:"playwright"
    },
  },
})
