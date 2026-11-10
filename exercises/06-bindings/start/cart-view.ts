import ko from 'knockout'
import type { ShopViewModel } from '../shop-view.ts'

export { createShopViewModel } from '../shop-view.ts'

// TODO: Product list with foreach: { data: products, as: 'product' }:
//       name, price (text: $parent.formatCents(product.priceCents)),
//       button “In den Warenkorb” with click: $parent.add, enable: product.stock > 0
//       and aria-label “In den Warenkorb: <Name>” (attr); at stock 0 next to it
//       <small id="sold-out-<id>">Ausverkauft</small> and aria-describedby on the button pointing to it
// TODO: “Dein Warenkorb ist leer. Leg oben ein Produkt hinein.” only when the cart is empty (visible)
// TODO: Cart with foreach: { data: cart.items, as: 'item' }: name,
//       <input type="number" min="1" aria-label="Menge"> with value: item.quantityText,
//       button “Entfernen” with click: $parent.cart.remove and aria-label “Entfernen: <Name>”
// TODO: Total with formatCents(cart.totalCents())
// TODO: Form with submit: placeOrder, label “E-Mail” with textInput: email,
//       button “Bestellen” with enable: canOrder and aria-describedby="order-hint",
//       plus <small id="order-hint"> with text: orderHint, visible when !canOrder();
//       after it “Danke für deine Bestellung.” (visible: placed)
export const shopTemplate = `
  <h2>Produkte</h2>
  <ul></ul>
`

export const mountShop = (root: HTMLElement, vm: ShopViewModel): (() => void) => {
  root.innerHTML = shopTemplate
  ko.applyBindings(vm, root)
  return () => ko.cleanNode(root)
}
