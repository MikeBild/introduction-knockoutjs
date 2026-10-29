import ko from 'knockout'
import type { ShopViewModel } from '../shop-view.ts'

export { createShopViewModel } from '../shop-view.ts'

// Nur eingebaute Bindings, kein eigener DOM-Code
export const shopTemplate = `
  <h2>Produkte</h2>
  <ul data-bind="foreach: { data: products, as: 'product' }">
    <li>
      <span data-bind="text: product.name"></span>
      <span data-bind="text: $parent.formatCents(product.priceCents)"></span>
      <button type="button" data-bind="click: $parent.add, enable: product.stock > 0, attr: { 'aria-label': 'In den Warenkorb: ' + product.name }">
        In den Warenkorb
      </button>
    </li>
  </ul>

  <h2>Warenkorb</h2>
  <p data-bind="visible: cart.items().length === 0">Dein Warenkorb ist leer. Leg oben ein Produkt hinein.</p>
  <ul data-bind="foreach: { data: cart.items, as: 'item' }">
    <li>
      <span data-bind="text: item.product.name"></span>
      <input type="number" min="1" aria-label="Menge" data-bind="value: item.quantityText" />
      <button type="button" data-bind="click: $parent.cart.remove, attr: { 'aria-label': 'Entfernen: ' + item.product.name }">
        Entfernen
      </button>
    </li>
  </ul>
  <p>Summe: <strong data-bind="text: formatCents(cart.totalCents())"></strong></p>

  <form data-bind="submit: placeOrder">
    <label>E-Mail <input type="email" data-bind="textInput: email" /></label>
    <button type="submit" data-bind="enable: canOrder">Bestellen</button>
  </form>
  <p data-bind="visible: placed">Danke für deine Bestellung.</p>
`

export const mountShop = (root: HTMLElement, vm: ShopViewModel): (() => void) => {
  root.innerHTML = shopTemplate
  ko.applyBindings(vm, root)
  return () => ko.cleanNode(root)
}
