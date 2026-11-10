import ko from 'knockout'
import type { CartItem } from '../exercises/06-bindings/cart.ts'
import { formatCents } from '../exercises/shop.ts'

type CartLineParams = { item: CartItem; onRemove: (item: CartItem) => void }

// Component from exercise 07: a cart line with its line total
class CartLineViewModel {
  readonly item: CartItem
  readonly lineTotalCents: ko.PureComputed<number>
  readonly formatCents = formatCents
  private readonly onRemove: (item: CartItem) => void

  constructor(params: CartLineParams) {
    this.item = params.item
    this.onRemove = params.onRemove
    this.lineTotalCents = ko.pureComputed(() => this.item.quantity() * this.item.product.priceCents)
  }

  remove = () => this.onRemove(this.item)
}

const template = `
  <span data-bind="text: item.product.name"></span>
  <input type="number" min="1" data-bind="value: item.quantityText, attr: { 'aria-label': 'Menge: ' + item.product.name }" />
  <span data-bind="text: formatCents(lineTotalCents())"></span>
  <button type="button" data-bind="click: remove, attr: { 'aria-label': 'Entfernen: ' + item.product.name }">
    Entfernen
  </button>
`

export const registerCartLine = () => {
  if (ko.components.isRegistered('cart-line')) return
  ko.components.register('cart-line', { viewModel: CartLineViewModel, template })
}
