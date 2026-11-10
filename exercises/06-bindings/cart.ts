import ko from 'knockout'
import type { Product } from '../shop.ts'

// Every line item has its own quantity as an Observable – the observableArray only tracks the list
export type CartItem = {
  product: Product
  quantity: ko.Observable<number>
  // The value binding writes strings; quantityText translates and only lets whole numbers from 1 through
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

  // Depends on the list AND on every quantity
  const totalCents = ko.pureComputed(() =>
    items().reduce((sum, item) => sum + item.quantity() * item.product.priceCents, 0),
  )
  const itemCount = ko.pureComputed(() => items().reduce((sum, item) => sum + item.quantity(), 0))

  return { items, add, remove, clear, totalCents, itemCount }
}

export type Cart = ReturnType<typeof createCart>
