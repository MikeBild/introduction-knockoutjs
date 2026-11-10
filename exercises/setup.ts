import ko from 'knockout'
import { afterEach, vi } from 'vitest'

// After every test: release bindings, clear the DOM, reset global Knockout options
afterEach(() => {
  ko.cleanNode(document.body)
  document.body.innerHTML = ''
  ko.options.deferUpdates = false
  vi.useRealTimers()
})
