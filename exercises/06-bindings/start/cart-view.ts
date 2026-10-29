import ko from 'knockout'
import type { ShopViewModel } from '../shop-view.ts'

export { createShopViewModel } from '../shop-view.ts'

// TODO: Produktliste mit foreach: { data: products, as: 'product' }:
//       Name, Preis (text: $parent.formatCents(product.priceCents)),
//       Button „In den Warenkorb“ mit click: $parent.add, enable: product.stock > 0
//       und aria-label „In den Warenkorb: <Name>“ (attr)
// TODO: „Dein Warenkorb ist leer“ nur bei leerem Warenkorb (visible)
// TODO: Warenkorb mit foreach: { data: cart.items, as: 'item' }: Name,
//       <input type="number" min="1" aria-label="Menge"> mit value: item.quantityText,
//       Button „Entfernen“ mit click: $parent.cart.remove und aria-label „Entfernen: <Name>“
// TODO: Summe mit formatCents(cart.totalCents())
// TODO: Formular mit submit: placeOrder, Label „E-Mail“ mit textInput: email,
//       Button „Bestellen“ mit enable: canOrder; danach „Danke für deine Bestellung!“ (visible: placed)
export const shopTemplate = `
  <h2>Produkte</h2>
  <ul></ul>
`

export const mountShop = (root: HTMLElement, vm: ShopViewModel): (() => void) => {
  root.innerHTML = shopTemplate
  ko.applyBindings(vm, root)
  return () => ko.cleanNode(root)
}
