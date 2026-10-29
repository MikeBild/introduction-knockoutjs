import ko from 'knockout'
import { formatCents, products, type Product } from '../shop.ts'
import { createCart } from './cart.ts'

// Gegeben: das ViewModel des Werkstatt-Shops. Deine Aufgabe ist das Template.
export const createShopViewModel = (catalog: Product[] = products) => {
  const cart = createCart()
  const email = ko.observable('')
  const placed = ko.observable(false)
  const canOrder = ko.pureComputed(() => cart.items().length > 0 && /^\S+@\S+\.\S+$/.test(email()))
  // Sagt, warum „Bestellen“ gesperrt ist – leer, sobald canOrder gilt
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
