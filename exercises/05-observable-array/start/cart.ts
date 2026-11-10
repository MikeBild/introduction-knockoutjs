import ko from 'knockout'
import type { Product } from '../../shop.ts'

export type CartItem = {
  product: Product
  quantity: ko.Observable<number>
  quantityText: ko.WritablePureComputed<string>
}

// TODO: quantity starts at 1. quantityText reads String(quantity()) and only writes back
//       whole numbers from 1 – the value binding delivers strings like "3"
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

  // TODO: If the product is already in the cart, increase the quantity by one, otherwise append createCartItem(product)
  const add = (product: Product) => {
    void product
  }
  // TODO: remove exactly this line item (items.remove)
  const remove = (item: CartItem) => {
    void item
  }
  // TODO: remove all line items (items.removeAll)
  const clear = () => {}

  // TODO: Sum over quantity × priceCents – reads the list AND every quantity
  const totalCents = ko.pureComputed(() => 0)
  // TODO: Sum of all quantities
  const itemCount = ko.pureComputed(() => items().length)

  return { items, add, remove, clear, totalCents, itemCount }
}

export type Cart = ReturnType<typeof createCart>
