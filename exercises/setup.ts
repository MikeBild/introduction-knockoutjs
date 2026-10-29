import ko from 'knockout'
import { afterEach, vi } from 'vitest'

// Nach jedem Test: Bindings lösen, DOM leeren, globale Knockout-Optionen zurücksetzen
afterEach(() => {
  ko.cleanNode(document.body)
  document.body.innerHTML = ''
  ko.options.deferUpdates = false
  vi.useRealTimers()
})
