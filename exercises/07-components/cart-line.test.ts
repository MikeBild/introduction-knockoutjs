import ko from 'knockout'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it } from 'vitest'
import { products } from '../shop.ts'
import { createCart } from './cart.ts'
import type * as Impl from './solution/cart-line.ts'

const target = import.meta.env.TARGET
const impl: typeof Impl = await import(`./${target}/cart-line.ts`)
const { registerCartLine } = impl

beforeAll(() => registerCartLine())

const setup = (count: number) => {
  const cart = createCart()
  for (const product of products.slice(0, count)) cart.add(product)
  const root = document.createElement('ul')
  root.setAttribute('data-bind', "foreach: { data: items, as: 'item' }")
  root.innerHTML = '<li><cart-line params="item: item, onRemove: $parent.remove"></cart-line></li>'
  document.body.append(root)
  ko.applyBindings(cart, root)
  return { root, cart, user: userEvent.setup() }
}

describe('Component cart-line', () => {
  it('renders one line with total per line item – components load asynchronously', async () => {
    setup(2)
    expect(await screen.findByRole('spinbutton', { name: 'Menge: Schraubenset' })).toBeTruthy()
    expect(screen.getAllByRole('spinbutton')).toHaveLength(2)
    expect(screen.getByText(/^89,90\s€$/)).toBeTruthy()
  })

  it('recalculates the line total on a new quantity and shows the hint', async () => {
    const { user } = setup(1)
    const quantity = await screen.findByRole('spinbutton', { name: 'Menge: Schraubenset' })
    await user.clear(quantity)
    await user.type(quantity, '3')
    await user.tab()
    expect(screen.getByText(/^38,70\s€$/)).toBeTruthy()
    expect(screen.getByText('geändert')).toBeTruthy()
  })

  it('calls onRemove with its own line item', async () => {
    const { cart, user } = setup(2)
    await user.click(await screen.findByRole('button', { name: 'Entfernen: Akkuschrauber' }))
    expect(cart.items().map((item) => item.product.name)).toEqual(['Schraubenset'])
  })

  it('cleans up all subscriptions on removal (dispose)', async () => {
    const { root, cart } = setup(1)
    await screen.findByRole('spinbutton', { name: 'Menge: Schraubenset' })
    const item = cart.items()[0]
    if (!item) throw new Error('keine Position')
    expect(item.quantity.getSubscriptionsCount()).toBeGreaterThan(0)
    ko.removeNode(root)
    expect(item.quantity.getSubscriptionsCount()).toBe(0)
  })
})
