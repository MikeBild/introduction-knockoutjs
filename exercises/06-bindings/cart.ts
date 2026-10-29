import ko from 'knockout'
import type { Product } from '../shop.ts'

// Jede Position hat eine eigene Menge als Observable – das observableArray verfolgt nur die Liste
export type CartItem = {
  product: Product
  quantity: ko.Observable<number>
  // Das value-Binding schreibt Strings; quantityText übersetzt und lässt nur ganze Zahlen ab 1 durch
  quantityText: ko.WritablePureComputed<string>
}

export const createCartItem = (product: Product): CartItem => {
  const quantity = ko.observable(1)
  const quantityText = ko.pureComputed<string>({
    read: () => String(quantity()),
    write: (text) => {
      const value = Number(text)
      if (Number.isInteger(value) && value >= 1) quantity(value)
    },
  })
  return { product, quantity, quantityText }
}

export const createCart = () => {
  const items = ko.observableArray<CartItem>([])

  const add = (product: Product) => {
    const existing = items().find((item) => item.product.id === product.id)
    if (existing) existing.quantity(existing.quantity() + 1)
    else items.push(createCartItem(product))
  }
  const remove = (item: CartItem) => {
    items.remove(item)
  }
  const clear = () => {
    items.removeAll()
  }

  // Hängt von der Liste UND von jeder Menge ab
  const totalCents = ko.pureComputed(() =>
    items().reduce((sum, item) => sum + item.quantity() * item.product.priceCents, 0),
  )
  const itemCount = ko.pureComputed(() => items().reduce((sum, item) => sum + item.quantity(), 0))

  return { items, add, remove, clear, totalCents, itemCount }
}

export type Cart = ReturnType<typeof createCart>
