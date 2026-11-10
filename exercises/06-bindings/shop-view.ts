import ko from 'knockout'
import { formatCents, products, type Product } from '../shop.ts'
import { createCart } from './cart.ts'

// Given: the ViewModel of the workshop shop. Your task is the template.
export const createShopViewModel = (catalog: Product[] = products) => {
  const cart = createCart()
  const email = ko.observable('')
  const placed = ko.observable(false)
  const canOrder = ko.pureComputed(() => cart.items().length > 0 && /^\S+@\S+\.\S+$/.test(email()))
  // Says why “Bestellen” is disabled – empty as soon as canOrder holds
  const orderHint = ko.pureComputed(() => {
    if (canOrder()) return ''
    if (cart.items().length === 0) return 'Leg zuerst ein Produkt in den Warenkorb.'
    return 'Gib deine E-Mail-Adresse ein, dann kannst du bestellen.'
  })

  return {
    products: catalog,
    cart,
    email,
    placed,
    canOrder,
    orderHint,
    formatCents,
    add: (product: Product) => cart.add(product),
    placeOrder: () => {
      if (canOrder()) placed(true)
    },
  }
}

export type ShopViewModel = ReturnType<typeof createShopViewModel>
