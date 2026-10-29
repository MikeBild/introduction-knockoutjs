import ko from 'knockout'

// rateLimit mit notifyWhenChangesStop: Abhängige erfahren erst nach 300 ms Ruhe vom neuen Wert
export const createLiveSearch = (load: (query: string) => string[]) => {
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

// deferUpdates bündelt alle Änderungen eines Durchlaufs in einer Microtask
export const enableDeferredUpdates = () => {
  ko.options.deferUpdates = true
}
