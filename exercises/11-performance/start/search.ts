import ko from 'knockout'
import type { Product } from '../../shop.ts'

// TODO: Throttle query with .extend({ rateLimit: { timeout: 300, method: 'notifyWhenChangesStop' } })
export const createLiveSearch = (load: (query: string) => Product[]) => {
  let loadCount = 0
  const query = ko.observable('')
  const results = ko.pureComputed(() => {
    loadCount += 1
    return load(query())
  })
  return { query, results, loads: () => loadCount }
}

// TODO: Switch on ko.options.deferUpdates
export const enableDeferredUpdates = () => {}
