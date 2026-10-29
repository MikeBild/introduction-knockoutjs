import ko from 'knockout'
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type * as Impl from './solution/bridge.ts'

const target = import.meta.env.TARGET
const impl: typeof Impl = await import(`./${target}/bridge.ts`)
const { createStore, toStore, fromStore, createSharedCart, defineCartBadge } = impl

describe('createStore', () => {
  it('meldet neue Werte an alle Listener, bis sie sich abmelden', () => {
    const store = createStore(1)
    const listener = vi.fn()
    const unsubscribe = store.subscribe(listener)
    store.set(2)
    store.set(2)
    unsubscribe()
    store.set(3)
    expect(listener.mock.calls).toEqual([[2]])
    expect(store.get()).toBe(3)
  })
})

describe('Knockout → Store', () => {
  it('liest den aktuellen Wert und meldet nur Änderungen', () => {
    const count = ko.observable(1)
    const store = toStore(count)
    const listener = vi.fn()
    const unsubscribe = store.subscribe(listener)
    expect(store.get()).toBe(1)
    expect(listener).not.toHaveBeenCalled()
    count(5)
    expect(listener).toHaveBeenCalledWith(5)
    unsubscribe()
    expect(count.getSubscriptionsCount()).toBe(0)
  })

  it('legt beim Lesen in einem Computed keine Abhängigkeit an', () => {
    const count = ko.observable(1)
    const store = toStore(count)
    const snapshot = ko.computed(() => store.get())
    count(2)
    expect(snapshot()).toBe(1)
    snapshot.dispose()
  })
})

describe('Store → Knockout', () => {
  it('startet mit get und folgt danach dem Store', () => {
    const store = createStore('Ada')
    const bridge = fromStore(store)
    expect(bridge.value()).toBe('Ada')
    store.set('Grace')
    expect(bridge.value()).toBe('Grace')
    expect(ko.isWritableObservable(bridge.value)).toBe(false)
  })

  it('bekommt nach dispose keine Updates mehr', () => {
    const store = createStore(1)
    const bridge = fromStore(store)
    bridge.dispose()
    store.set(2)
    expect(bridge.value()).toBe(1)
  })
})

describe('Gemeinsamer Warenkorb', () => {
  it('verbindet eine Knockout-Seite und eine Web Component über denselben Store', async () => {
    const cart = createSharedCart()
    defineCartBadge()
    const items = fromStore(cart)
    document.body.innerHTML = `
      <cart-badge></cart-badge>
      <button type="button" data-bind="click: () => add('Buch')">In den Warenkorb</button>
      <ul data-bind="foreach: items"><li data-bind="text: $data"></li></ul>`
    ko.applyBindings({ items: items.value, add: cart.add }, document.body)
    const badge = document.querySelector('cart-badge') as Impl.CartBadge
    badge.store = cart

    expect(document.querySelector('cart-badge')?.textContent).toBe('Warenkorb: 0')
    await userEvent.setup().click(screen.getByRole('button', { name: 'In den Warenkorb' }))
    expect(document.querySelector('cart-badge')?.textContent).toBe('Warenkorb: 1')
    expect(screen.getAllByRole('listitem').map((li) => li.textContent)).toEqual(['Buch'])

    cart.add('Stift')
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    items.dispose()
  })

  it('meldet die Web Component beim Entfernen vom Store ab', () => {
    const cart = createSharedCart()
    defineCartBadge()
    const badge = document.createElement('cart-badge') as Impl.CartBadge
    badge.store = cart
    document.body.append(badge)
    cart.add('Stift')
    expect(badge.textContent).toBe('Warenkorb: 1')
    badge.remove()
    cart.add('Buch')
    expect(badge.textContent).toBe('Warenkorb: 1')
  })
})
