import ko from 'knockout'
import { formatCents } from '../../shop.ts'
import type { CartItem } from '../cart.ts'

export type CartLineParams = { item: CartItem; onRemove: (item: CartItem) => void }

// Klasse als viewModel: Knockout ruft new mit den params auf und später dispose
export class CartLineViewModel {
  readonly item: CartItem
  readonly lineTotalCents: ko.PureComputed<number>
  readonly changedAt = ko.observable<Date | null>(null)
  readonly formatCents = formatCents
  private readonly onRemove: (item: CartItem) => void
  private readonly subscription: ko.Subscription

  constructor(params: CartLineParams) {
    this.item = params.item
    this.onRemove = params.onRemove
    this.lineTotalCents = ko.pureComputed(() => this.item.quantity() * this.item.product.priceCents)
    this.subscription = this.item.quantity.subscribe(() => this.changedAt(new Date()))
  }

  remove = () => this.onRemove(this.item)

  // Läuft, wenn Knockout das Element entfernt – sonst hält die Subscription die Komponente fest
  dispose() {
    this.subscription.dispose()
  }
}

const template = `
  <span data-bind="text: item.product.name"></span>
  <input type="number" min="1" data-bind="value: item.quantityText, attr: { 'aria-label': 'Menge: ' + item.product.name }" />
  <span data-bind="text: formatCents(lineTotalCents())"></span>
  <small data-bind="if: changedAt">geändert</small>
  <button type="button" data-bind="click: remove, attr: { 'aria-label': 'Entfernen: ' + item.product.name }">
    Entfernen
  </button>
`

export const registerCartLine = () => {
  if (ko.components.isRegistered('cart-line')) return
  ko.components.register('cart-line', { viewModel: CartLineViewModel, template })
}
