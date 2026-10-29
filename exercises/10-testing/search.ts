import ko from 'knockout'

// Gegeben: ein kleines Suchfeld. Deine Aufgabe sind die Tests, nicht der Code.
export const createSearch = (items: string[]) => {
  const query = ko.observable('')
  const results = ko.pureComputed(() => {
    const needle = query().trim().toLowerCase()
    return needle ? items.filter((item) => item.toLowerCase().includes(needle)) : items
  })
  return { query, results }
}

export const searchTemplate = `
  <label>Suche <input type="search" data-bind="textInput: query" /></label>
  <ul data-bind="foreach: results">
    <li data-bind="text: $data"></li>
  </ul>
  <p data-bind="ifnot: results().length">Keine Treffer</p>
`

export const mountSearch = (root: HTMLElement, items: string[]) => {
  const vm = createSearch(items)
  root.innerHTML = searchTemplate
  ko.applyBindings(vm, root)
  return vm
}
