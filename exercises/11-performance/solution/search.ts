import ko from 'knockout'
import type { Product } from '../../shop.ts'

// rateLimit with notifyWhenChangesStop: dependents learn about the new value only after 300 ms of rest
export const createLiveSearch = (load: (query: string) => Product[]) => {
  let loadCount = 0
  const query = ko
    .observable('')
    .extend({ rateLimit: { timeout: 300, method: 'notifyWhenChangesStop' } })
  const results = ko.pureComputed(() => {
    loadCount += 1
    return load(query())
  })
  return { query, results, loads: () => loadCount }
}

// deferUpdates batches all changes of one pass into a microtask
export const enableDeferredUpdates = () => {
  ko.options.deferUpdates = true
}
