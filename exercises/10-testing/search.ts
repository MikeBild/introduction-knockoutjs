import ko from 'knockout'
import type { Product } from '../shop.ts'

// Gegeben: die Produktsuche des Werkstatt-Shops. Deine Aufgabe sind die Tests, nicht der Code.
export const createProductSearch = (products: Product[]) => {
  const query = ko.observable('')
  const results: ko.PureComputed<Product[]> = ko.pureComputed(() => {
    const needle = query().trim().toLowerCase()
    return needle ? products.filter((product) => product.name.toLowerCase().includes(needle)) : products
  })
  return { query, results }
}

export const searchTemplate = `
  <label>Suche <input type="search" data-bind="textInput: query" /></label>
  <ul data-bind="foreach: { data: results, as: 'product' }">
    <li data-bind="text: product.name"></li>
  </ul>
  <p data-bind="ifnot: results().length">Keine Treffer</p>
`

export const mountSearch = (root: HTMLElement, products: Product[]) => {
  const vm = createProductSearch(products)
  root.innerHTML = searchTemplate
  ko.applyBindings(vm, root)
  return vm
}
