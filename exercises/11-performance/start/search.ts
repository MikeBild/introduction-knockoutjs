import ko from 'knockout'

// TODO: query mit .extend({ rateLimit: { timeout: 300, method: 'notifyWhenChangesStop' } }) drosseln
export const createLiveSearch = (load: (query: string) => string[]) => {
  let loadCount = 0
  const query = ko.observable('')
  const results = ko.pureComputed(() => {
    loadCount += 1
    return load(query())
  })
  return { query, results, loads: () => loadCount }
}

// TODO: ko.options.deferUpdates einschalten
export const enableDeferredUpdates = () => {}
