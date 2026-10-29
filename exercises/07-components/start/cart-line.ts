import ko from 'knockout'
import { formatCents } from '../../shop.ts'
import type { CartItem } from '../cart.ts'

export type CartLineParams = { item: CartItem; onRemove: (item: CartItem) => void }

// Achtung: Knockout ruft viewModel mit new auf – eine Arrow Function funktioniert hier nicht.
export class CartLineViewModel {
  readonly item: CartItem
  readonly lineTotalCents: ko.PureComputed<number>
  readonly changedAt = ko.observable<Date | null>(null)
  readonly formatCents = formatCents
  private readonly onRemove: (item: CartItem) => void

  constructor(params: CartLineParams) {
    this.item = params.item
    this.onRemove = params.onRemove
    // TODO: Positionssumme in Cent: Menge × priceCents
    this.lineTotalCents = ko.pureComputed(() => 0)
    // TODO: item.quantity abonnieren, bei jeder Änderung changedAt(new Date()) setzen,
    //       die Subscription in einem Feld merken
  }

  // TODO: onRemove mit der eigenen Position aufrufen
  remove = () => {}

  // TODO: Subscription aufräumen
  dispose() {}
}

// TODO: Name, Mengenfeld (value: item.quantityText, aria-label „Menge: <Name>“),
//       Positionssumme mit formatCents(lineTotalCents()), „geändert“ nur bei changedAt,
//       Button „Entfernen“ mit click: remove und aria-label „Entfernen: <Name>“
const template = `
  <span data-bind="text: item.product.name"></span>
`

// TODO: Komponente 'cart-line' nur einmal registrieren (ko.components.isRegistered)
export const registerCartLine = () => {
  void template
}
