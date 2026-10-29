import type ko from 'knockout'
import { describe, expect, it } from 'vitest'
import { products, type Product } from '../shop.ts'
import type * as Impl from './solution/cart.ts'

const target = import.meta.env.TARGET
const impl: typeof Impl = await import(`./${target}/cart.ts`)
const { createCart } = impl

const product = (index: number): Product => {
  const found = products[index]
  if (!found) throw new Error(`kein Produkt an Index ${index}`)
  return found
}
const schrauben = product(0)
const akkuschrauber = product(1)

describe('Warenkorb mit observableArray', () => {
  it('legt neue Produkte als Position mit Menge 1 an', () => {
    const cart = createCart()
    cart.add(schrauben)
    expect(cart.items().map((item) => [item.product.name, item.quantity()])).toEqual([
      ['Schraubenset', 1],
    ])
  })

  it('erhöht die Menge, wenn das Produkt schon im Warenkorb liegt', () => {
    const cart = createCart()
    cart.add(schrauben)
    cart.add(schrauben)
    expect(cart.items()).toHaveLength(1)
    expect(cart.items()[0]?.quantity()).toBe(2)
  })

  it('rechnet Summe und Anzahl in Cent neu, auch wenn sich eine Menge ändert', () => {
    const cart = createCart()
    cart.add(schrauben)
    cart.add(akkuschrauber)
    expect(cart.totalCents()).toBe(1290 + 8990)
    cart.items()[0]?.quantity(3)
    expect(cart.totalCents()).toBe(3 * 1290 + 8990)
    expect(cart.itemCount()).toBe(4)
  })

  it('entfernt einzelne Positionen und leert den Warenkorb', () => {
    const cart = createCart()
    cart.add(schrauben)
    cart.add(akkuschrauber)
    const [first] = cart.items()
    if (!first) throw new Error('keine Position')
    cart.remove(first)
    expect(cart.items().map((item) => item.product.name)).toEqual(['Akkuschrauber'])
    cart.clear()
    expect(cart.items()).toEqual([])
    expect(cart.totalCents()).toBe(0)
  })

  it('übernimmt über quantityText nur ganze Mengen ab 1', () => {
    const cart = createCart()
    cart.add(schrauben)
    const item = cart.items()[0]
    if (!item) throw new Error('keine Position')
    item.quantityText('3')
    expect(item.quantity()).toBe(3)
    cart.add(schrauben)
    expect(item.quantity()).toBe(4)
    item.quantityText('0')
    item.quantityText('2,5')
    item.quantityText('')
    expect(item.quantityText()).toBe('4')
  })

  it('meldet Änderungen als arrayChange', () => {
    const cart = createCart()
    const changes: ko.utils.ArrayChange[] = []
    const subscription = cart.items.subscribe(
      (batch: ko.utils.ArrayChange[]) => changes.push(...batch),
      null,
      'arrayChange',
    )
    cart.add(schrauben)
    cart.add(schrauben)
    subscription.dispose()
    expect(changes.map((change) => change.status)).toEqual(['added'])
  })
})
