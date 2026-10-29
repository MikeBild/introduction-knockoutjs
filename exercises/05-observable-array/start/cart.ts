import ko from 'knockout'
import type { Product } from '../../shop.ts'

export type CartItem = {
  product: Product
  quantity: ko.Observable<number>
  quantityText: ko.WritablePureComputed<string>
}

// TODO: quantity startet bei 1. quantityText liest String(quantity()) und schreibt nur
//       ganze Zahlen ab 1 zurück – das value-Binding liefert Strings wie "3"
export const createCartItem = (product: Product): CartItem => {
  const quantity = ko.observable(1)
  const quantityText = ko.pureComputed<string>({
    read: () => String(quantity()),
    write: (text) => {
      void text
    },
  })
  return { product, quantity, quantityText }
}

export const createCart = () => {
  const items = ko.observableArray<CartItem>([])

  // TODO: Ist das Produkt schon im Warenkorb, Menge um eins erhöhen, sonst createCartItem(product) anhängen
  const add = (product: Product) => {
    void product
  }
  // TODO: genau diese Position entfernen (items.remove)
  const remove = (item: CartItem) => {
    void item
  }
  // TODO: alle Positionen entfernen (items.removeAll)
  const clear = () => {}

  // TODO: Summe über quantity × priceCents – liest die Liste UND jede Menge
  const totalCents = ko.pureComputed(() => 0)
  // TODO: Summe aller Mengen
  const itemCount = ko.pureComputed(() => items().length)

  return { items, add, remove, clear, totalCents, itemCount }
}

export type Cart = ReturnType<typeof createCart>
