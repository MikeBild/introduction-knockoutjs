import ko from 'knockout'
import { formatCents } from '../../shop.ts'
import type { CartItem } from '../cart.ts'

export type CartLineParams = { item: CartItem; onRemove: (item: CartItem) => void }

// Note: Knockout calls viewModel with new – an Arrow Function does not work here.
export class CartLineViewModel {
  readonly item: CartItem
  readonly lineTotalCents: ko.PureComputed<number>
  readonly changedAt = ko.observable<Date | null>(null)
  readonly formatCents = formatCents
  private readonly onRemove: (item: CartItem) => void

  constructor(params: CartLineParams) {
    this.item = params.item
    this.onRemove = params.onRemove
    // TODO: Line total in cents: quantity × priceCents
    this.lineTotalCents = ko.pureComputed(() => 0)
    // TODO: Subscribe to item.quantity, set changedAt(new Date()) on every change,
    //       remember the subscription in a field
  }

  // TODO: Call onRemove with its own line item
  remove = () => {}

  // TODO: Clean up the subscription
  dispose() {}
}

// TODO: Name, quantity field (value: item.quantityText, aria-label “Menge: <Name>”),
//       line total with formatCents(lineTotalCents()), “geändert” only when changedAt is set,
//       button “Entfernen” with click: remove and aria-label “Entfernen: <Name>”
const template = `
  <span data-bind="text: item.product.name"></span>
`

// TODO: Register the component 'cart-line' only once (ko.components.isRegistered)
export const registerCartLine = () => {
  void template
}
